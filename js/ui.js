/* ==================== LUNA WANTS ME - UI.JS ==================== */
/* Gerenciamento da Interface do Usuário */

class UI {
    static init() {
        console.log('🎨 Inicializando UI...');
        this.currentTypingText = '';
        this.typingInterval = null;
        this.currentScreen = 'menu';
        this.previousScreen = 'menu';
        this.currentEndingData = null;
        this.currentGameState = null;
        this.creditsTimeout = null;
        
        // Sistema melhorado de menu stack
        this.menuStack = []; // Stack COMPLETO: ['game'], ['game', 'pause'], ['game', 'pause', 'saves']
        this.pauseIsOpen = false; // Flag para saber se pause está aberto
        
        // Gerar slots de save
        this.generateSaveSlots();
        
        console.log('✅ UI inicializada!');
    }
    
    /* ==================== NAVEGAÇÃO DE TELAS ==================== */
    
    static showScreen(screenName) {
        console.log(`📺 Mostrando tela: ${screenName}`);
        
        // Se há menu overlay aberto, ignorar showScreen
        if (this.menuStack.length > 1 || this.pauseIsOpen) {
            console.log('⚠️ Menu overlay aberto, ignorando showScreen');
            return;
        }
        
        // Fechar pause se houver
        const pauseMenu = document.getElementById('pause-menu');
        if (pauseMenu && pauseMenu.classList.contains('active')) {
            this.togglePause();
        }
        
        // Esconder todas as telas
        const allScreens = document.querySelectorAll('.screen');
        console.log(`🔍 Total de telas encontradas: ${allScreens.length}`);
        allScreens.forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Limpar menu stack quando muda tela
        this.menuStack = [];
        
        // Salvar tela anterior (apenas se for tela válida e diferente)
        if (screenName !== this.currentScreen && this.currentScreen !== 'menu') {
            this.previousScreen = this.currentScreen;
        }
        this.currentScreen = screenName;
        
        // Mostrar tela selecionada
        const screen = document.getElementById(screenName);
        console.log(`🔍 Tela #${screenName} encontrada:`, !!screen);
        if (screen) {
            screen.classList.add('active');
            console.log(`✅ Classe 'active' adicionada a #${screenName}`);
            
            // Atualizar música baseado na tela
            if (screenName === 'menu') {
                AudioManager.playMusic('menu');
            } else if (screenName === 'game') {
                AudioManager.playMusic('normal');
            }
        } else {
            console.error(`❌ Tela não encontrada: ${screenName}`);
        }
    }
    
    // Abrir menu como overlay (em cima do pause-menu) - CORRIGIDO
    static showMenuOverlay(menuName) {
        console.log(`🎨 Abrindo menu overlay: ${menuName}`);
        
        // Proteção: não abrir se já está aberto
        if (this.menuStack.includes(menuName)) {
            console.log(`⚠️ Menu ${menuName} já está aberto`);
            return;
        }
        
        // Só funciona se pause-menu está aberto
        const pauseMenu = document.getElementById('pause-menu');
        if (!pauseMenu || !pauseMenu.classList.contains('active')) {
            console.log('⚠️ Pause não está aberto, usando showScreen normalmente');
            this.showScreen(menuName);
            return;
        }
        
        // Esconder conteúdo do pause-menu
        const pauseContent = pauseMenu.querySelector('.overlay-content');
        if (pauseContent) {
            pauseContent.style.display = 'none';
        }
        
        // Esconder tela anterior se houver (saves/config/etc)
        if (this.menuStack.length > 1) {
            const previousScreen = document.getElementById(this.menuStack[this.menuStack.length - 1]);
            if (previousScreen) {
                previousScreen.classList.remove('active');
            }
        }
        
        // Mostrar menu overlay
        const menu = document.getElementById(menuName);
        if (menu) {
            menu.classList.add('active');
            this.menuStack.push(menuName);
            console.log(`✅ Menu overlay aberto: ${menuName}, Stack:`, this.menuStack);
            AudioManager.playSFX('click');
        } else {
            console.error(`❌ Menu não encontrado: ${menuName}`);
        }
    }
    
    // CORRIGIDO: Voltar para o menu anterior na stack
    static goBack() {
        console.log('🔙 Voltando...', 'Stack atual:', this.menuStack);
        
        if (this.menuStack.length === 0) {
            console.log('⚠️ Stack vazia, nada para fazer');
            return;
        }
        
        // Pop do topo da stack
        const currentScreen = this.menuStack.pop();
        console.log(`🔙 Fechando: ${currentScreen}`);
        
        // Remover elemento da tela
        if (currentScreen === 'achievements-overlay') {
            // Remover achievement gallery
            const gallery = document.querySelector('.achievement-gallery');
            if (gallery) {
                gallery.classList.remove('active');
                setTimeout(() => {
                    gallery.remove();
                }, 300);
            }
        } else if (currentScreen === 'inventory-overlay') {
            // Remover inventory panel
            const inventory = document.getElementById('inventory-panel');
            if (inventory) {
                inventory.classList.remove('active');
                setTimeout(() => {
                    inventory.remove();
                }, 300);
            }
        } else {
            // Screen normal
            const currentEl = document.getElementById(currentScreen);
            if (currentEl) {
                currentEl.classList.remove('active');
            }
        }
        
        // Se há items na stack depois do pop
        if (this.menuStack.length > 0) {
            const nextScreen = this.menuStack[this.menuStack.length - 1];
            console.log(`🔙 Voltando para: ${nextScreen}`);
            
            // Se é pause, mostrar pause content
            if (nextScreen === 'pause') {
                const pauseMenu = document.getElementById('pause-menu');
                const pauseContent = pauseMenu.querySelector('.overlay-content');
                if (pauseContent) {
                    pauseContent.style.display = 'block';
                }
            } else if (nextScreen !== 'achievements-overlay' && nextScreen !== 'inventory-overlay') {
                // Mostrar próxima tela (se não for overlay especial)
                const nextEl = document.getElementById(nextScreen);
                if (nextEl) {
                    nextEl.classList.add('active');
                }
            }
        } else {
            // Stack vazia - voltamos para o jogo
            console.log('✅ Voltado para o jogo');
        }
    }
    
    // Abrir inventário como overlay - CORRIGIDO
    static showInventoryOverlay() {
        console.log('🎒 Abrindo inventário como overlay...');
        
        // Proteção: não abrir se já está aberto
        if (this.menuStack.includes('inventory-overlay')) {
            console.log('⚠️ Inventário já está aberto');
            return;
        }
        
        // Só funciona se pause está aberto
        const pauseMenu = document.getElementById('pause-menu');
        if (!pauseMenu || !pauseMenu.classList.contains('active')) {
            console.log('⚠️ Pause não está aberto');
            return;
        }
        
        // Esconder pause content
        const pauseContent = pauseMenu.querySelector('.overlay-content');
        if (pauseContent) {
            pauseContent.style.display = 'none';
        }
        
        // Abrir inventário com InventorySystem
        InventorySystem.openInventoryAsOverlay();
        
        // Adicionar ao stack
        this.menuStack.push('inventory-overlay');
        console.log('✅ Inventário overlay aberto, Stack:', this.menuStack);
    }
    
    // Abrir achievements como overlay - CORRIGIDO
    static showAchievementsOverlay() {
        console.log('🏆 Abrindo achievements como overlay...');
        
        // Proteção: não abrir se já está aberto
        if (this.menuStack.includes('achievements-overlay')) {
            console.log('⚠️ Achievements já estão abertos');
            return;
        }
        
        // Só funciona se pause está aberto
        const pauseMenu = document.getElementById('pause-menu');
        if (!pauseMenu || !pauseMenu.classList.contains('active')) {
            console.log('⚠️ Pause não está aberto');
            return;
        }
        
        // Esconder pause content
        const pauseContent = pauseMenu.querySelector('.overlay-content');
        if (pauseContent) {
            pauseContent.style.display = 'none';
        }
        
        // Abrir achievements com AchievementSystem
        AchievementSystem.showGalleryAsOverlay();
        
        // Adicionar ao stack
        this.menuStack.push('achievements-overlay');
        console.log('✅ Achievements overlay aberto, Stack:', this.menuStack);
    }
    
    /* ==================== DIÁLOGO ==================== */
    
    static showDialogue(name, text, speed = 15) {
        console.log(`💬 showDialogue() chamado - Nome: ${name}, Velocidade: ${speed}`);
        const nameBox = document.getElementById('name-box');
        const textBox = document.getElementById('text-box');
        const choicesBox = document.getElementById('choices-box');
        const dialogBox = document.getElementById('dialog-box');
        
        console.log(`🔍 Elementos encontrados - nameBox:`, !!nameBox, `textBox:`, !!textBox, `dialogBox:`, !!dialogBox);
        console.log(`📦 dialog-box display:`, dialogBox?.style.display, `computed:`, window.getComputedStyle(dialogBox).display);
        
        // Limpar escolhas anteriores
        choicesBox.innerHTML = '';
        
        // Atualizar nome
        nameBox.textContent = name || '';
        console.log(`✅ Nome atualizado: ${name}`);
        
        // Efeito de digitação
        console.log(`⏱️ Iniciando digitação com velocidade ${speed}ms`);
        this.typeText(textBox, text, speed);
        
        // SFX de texto
        if (speed > 0) {
            AudioManager.playSFX('text');
        }
    }
    
    static typeText(element, text, speed) {
        console.log(`🔤 typeText() - elemento:`, !!element, `texto: "${text.substring(0, 30)}...", speed: ${speed}`);
        
        // Parar digitação anterior
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
        }
        
        element.textContent = '';
        this.currentTypingText = text;
        
        // Se velocidade for 0, mostrar instantaneamente
        if (speed === 0) {
            console.log(`⚡ Mostrando texto instantaneamente`);
            element.textContent = text;
            game.state.typing = false;
            return;
        }
        
        let index = 0;
        game.state.typing = true;
        console.log(`✏️ Iniciando interval para digitação, velocidade: ${speed}ms`);
        
        this.typingInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
            } else {
                console.log(`✅ Digitação concluída`);
                clearInterval(this.typingInterval);
                this.typingInterval = null;
                game.state.typing = false;
            }
        }, speed);
        
        console.log(`✏️ Interval criado com ID: ${this.typingInterval}`);
    }
    
    static completeText() {
        console.log('⚡ completeText() - interval:', !!this.typingInterval, 'currentText:', this.currentTypingText?.substring(0, 30));
        if (this.typingInterval) {
            clearInterval(this.typingInterval);
            this.typingInterval = null;
            
            const textBox = document.getElementById('text-box');
            textBox.textContent = this.currentTypingText;
            game.state.typing = false;
            console.log('✅ Texto completado instantaneamente');
        }
    }
    
    /* ==================== ESCOLHAS ==================== */
    
    static showChoices(options) {
        const choicesBox = document.getElementById('choices-box');
        const textBox = document.getElementById('text-box');
        
        // Limpar texto e escolhas anteriores
        textBox.textContent = '';
        choicesBox.innerHTML = '';
        
        // Criar botões de escolha
        options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            // Traduzir texto da opção
            button.textContent = Translations.getDialogue(option.text) || option.text;
            button.onclick = () => {
                AudioManager.playSFX('click');
                game.makeChoice(index);
            };
            
            choicesBox.appendChild(button);
        });
    }
    
    /* ==================== PERSONAGENS ==================== */
    
    static showPortrait(character, expression) {
        const portrait = document.getElementById('portrait');
        const portraitPath = CHARACTERS[character]?.portraits[expression];
        
        if (portraitPath) {
            portrait.src = portraitPath;
            portrait.style.display = 'block';
            portrait.classList.add('animate-fade-in');
        } else {
            console.warn(`⚠️ Portrait não encontrado: ${character} - ${expression}`);
            // Fallback: mostrar placeholder colorido
            portrait.style.display = 'block';
            portrait.alt = `${character} - ${expression}`;
        }
    }
    
    static hidePortrait() {
        const portrait = document.getElementById('portrait');
        portrait.style.display = 'none';
    }
    
    /* ==================== BACKGROUNDS ==================== */
    
    static setBackground(backgroundName) {
        console.log(`🖼️ Definindo background: ${backgroundName}`);
        const sceneBackground = document.getElementById('scene-background');
        const backgroundPath = BACKGROUNDS[backgroundName];
        console.log(`📍 Caminho do background: ${backgroundPath}`);
        
        if (backgroundPath) {
            sceneBackground.style.backgroundImage = `url('${backgroundPath}')`;
            console.log(`✅ Background aplicado: ${backgroundPath}`);
        } else {
            console.warn(`⚠️ Background não encontrado: ${backgroundName}`);
            // Fallback: cor sólida baseada no nome
            const colors = {
                rua: '#4a5568',
                sala_aula: '#f7fafc',
                casa_luna: '#2d3748',
                porao: '#1a202c'
            };
            sceneBackground.style.backgroundColor = colors[backgroundName] || '#000';
            sceneBackground.style.backgroundImage = 'none';
        }
    }
    
    /* ==================== SANIDADE ==================== */
    
    static updateSanity(value) {
        const sanityValue = document.getElementById('sanity-value');
        const sanityFill = document.getElementById('sanity-fill');
        
        // Atualizar valor
        sanityValue.textContent = Math.round(value);
        
        // Atualizar barra
        sanityFill.style.width = `${value}%`;
        
        // Remover classes anteriores
        sanityFill.classList.remove('low', 'critical');
        
        // Adicionar classe baseada no valor
        if (value <= 20) {
            sanityFill.classList.add('critical');
        } else if (value <= 40) {
            sanityFill.classList.add('low');
        }
        
        // Animação de redução
        if (value < 50) {
            sanityFill.style.transition = 'width 0.5s ease, background 0.5s ease';
        }
    }
    
    /* ==================== EFEITOS VISUAIS ==================== */
    
    static applyVisualEffect(effect) {
        const gameElement = document.getElementById('game');
        const vignette = document.getElementById('vignette');
        
        switch(effect) {
            case 'glitch':
                gameElement.classList.add('glitch-mode');
                setTimeout(() => {
                    gameElement.classList.remove('glitch-mode');
                }, 500);
                break;
                
            case 'shake':
                gameElement.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    gameElement.style.animation = '';
                }, 500);
                break;
                
            case 'vignette':
                vignette.classList.add('active');
                break;
                
            case 'dark':
                vignette.classList.add('active');
                vignette.style.background = 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.9) 80%)';
                break;
                
            default:
                console.warn(`⚠️ Efeito visual desconhecido: ${effect}`);
        }
    }
    
    /* ==================== DICA DE CLIQUE ==================== */
    
    static showClickHint() {
        const hint = document.getElementById('click-hint');
        hint.classList.remove('hidden');
    }
    
    static hideClickHint() {
        const hint = document.getElementById('click-hint');
        hint.classList.add('hidden');
    }
    
    /* ==================== MENU DE PAUSA - CORRIGIDO ==================== */
    
    static togglePause() {
        const pauseMenu = document.getElementById('pause-menu');
        const pauseOverlay = document.getElementById('pause-overlay');
        
        if (pauseMenu.classList.contains('active')) {
            // Fechar pause
            console.log('❌ Fechando pause menu');
            pauseMenu.classList.remove('active');
            if (pauseOverlay) pauseOverlay.classList.remove('active');
            
            // Limpar todo o menu stack
            this.menuStack = [];
            
            // Fechar todos os overlays
            const screens = document.querySelectorAll('.screen.active');
            screens.forEach(screen => {
                if (screen.id !== 'game') {
                    screen.classList.remove('active');
                }
            });
            
            // Limpar achievement/inventory overlays
            document.querySelectorAll('.achievement-gallery, #inventory-panel').forEach(el => {
                el.remove();
            });
            
            // Restaurar overlay-content do pause
            const pauseContent = pauseMenu.querySelector('.overlay-content');
            if (pauseContent) {
                pauseContent.style.display = 'block';
            }
            
            this.pauseIsOpen = false;
            AudioManager.resumeMusic();
        } else {
            // Abrir pause
            console.log('✅ Abrindo pause menu');
            pauseMenu.classList.add('active');
            this.pauseIsOpen = true;
            this.menuStack = ['pause']; // Iniciar stack com pause
            
            // Criar overlay se não existir
            if (!pauseOverlay) {
                const overlay = document.createElement('div');
                overlay.id = 'pause-overlay';
                overlay.className = 'pause-overlay';
                overlay.onclick = () => this.togglePause();
                document.body.insertBefore(overlay, pauseMenu);
            }
            
            const overlay = document.getElementById('pause-overlay');
            if (overlay) overlay.classList.add('active');
            
            AudioManager.pauseMusic();
        }
    }
    
    static confirmQuit() {
        if (confirm('Tem certeza que deseja voltar ao menu? O progresso não salvo será perdido.')) {
            this.togglePause();
            game.stopPlayTime();
            this.showScreen('menu');
        }
    }
    
    /* ==================== SISTEMA DE SAVES ==================== */
    
    static generateSaveSlots() {
        const savesList = document.getElementById('saves-list');
        if (!savesList) return;
        
        savesList.innerHTML = '';
        
        for (let i = 1; i <= 5; i++) {
            const saveData = SaveSystem.load(i);
            const slot = this.createSaveSlot(i, saveData);
            savesList.appendChild(slot);
        }
    }
    
    static createSaveSlot(slotNumber, saveData) {
        const slot = document.createElement('div');
        slot.className = saveData ? 'save-slot' : 'save-slot empty';
        
        const info = document.createElement('div');
        info.className = 'save-info';
        
        if (saveData) {
            const title = document.createElement('h3');
            title.textContent = `${Translations.get('saves.save')} ${slotNumber}`;
            
            const scene = document.createElement('p');
            scene.textContent = `${Translations.get('saves.scene')}: ${saveData.state.currentScene}`;
            
            const sanity = document.createElement('p');
            sanity.textContent = `${Translations.get('saves.sanity')}: ${Math.round(saveData.state.sanity)}%`;
            
            const date = document.createElement('p');
            date.textContent = `${Translations.get('saves.date')}: ${new Date(saveData.timestamp).toLocaleString()}`;
            
            info.appendChild(title);
            info.appendChild(scene);
            info.appendChild(sanity);
            info.appendChild(date);
        } else {
            const title = document.createElement('h3');
            title.textContent = `${Translations.get('saves.save')} ${slotNumber}`;
            
            const empty = document.createElement('p');
            empty.textContent = Translations.get('saves.empty');
            
            info.appendChild(title);
            info.appendChild(empty);
        }
        
        const actions = document.createElement('div');
        actions.className = 'save-actions';
        
        if (saveData) {
            const loadBtn = document.createElement('button');
            loadBtn.textContent = Translations.get('saves.load');
            loadBtn.onclick = () => {
                game.loadGame(slotNumber);
                AudioManager.playSFX('click');
            };
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = Translations.get('saves.delete');
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = () => {
                if (confirm(Translations.get('saves.deleteConfirm') || 'Tem certeza que deseja deletar este save?')) {
                    SaveSystem.deleteSave(slotNumber);
                    this.generateSaveSlots();
                    AudioManager.playSFX('click');
                }
            };
            
            actions.appendChild(loadBtn);
            actions.appendChild(deleteBtn);
        } else {
            const saveBtn = document.createElement('button');
            saveBtn.textContent = Translations.get('saves.saveHere') || 'Salvar Aqui';
            saveBtn.onclick = () => {
                if (game.state.currentScene !== 'cap1_inicio') {
                    game.saveGame(slotNumber);
                    this.generateSaveSlots();
                    AudioManager.playSFX('click');
                    alert(Translations.get('saves.savedSuccess') || 'Jogo salvo com sucesso!');
                } else {
                    alert(Translations.get('saves.startGameFirst') || 'Inicie um jogo antes de salvar!');
                }
            };
            
            actions.appendChild(saveBtn);
        }
        
        slot.appendChild(info);
        slot.appendChild(actions);
        
        return slot;
    }
    
    /* ==================== TELA DE FINAL ==================== */
    
    static showEnding(endingData, gameState) {
        console.log(`🎬 Mostrando final: ${endingData.title}`);
        
        // Limpar timeout dos créditos se ainda estiver ativo
        if (this.creditsTimeout) {
            clearTimeout(this.creditsTimeout);
            this.creditsTimeout = null;
        }
        
        // Remover listener de teclado dos créditos
        if (this.creditsKeyListener) {
            document.removeEventListener('keydown', this.creditsKeyListener);
            this.creditsKeyListener = null;
        }
        
        // Mostrar tela de final
        this.showScreen('ending');
        
        // Preencher informações
        document.getElementById('ending-title').textContent = endingData.title;
        document.getElementById('ending-text').textContent = endingData.text;
        document.getElementById('final-sanity').textContent = Math.round(gameState.sanity);
        document.getElementById('total-choices').textContent = gameState.stats.choicesMade;
        
        // Preencher estatísticas adicionais (se elementos existirem)
        const daysElement = document.getElementById('total-days');
        if (daysElement) {
            daysElement.textContent = gameState.stats.daysElapsed || gameState.currentDay - 1;
        }
        
        const playTimeElement = document.getElementById('play-time');
        if (playTimeElement) {
            const minutes = Math.floor((gameState.stats.playTime || 0) / 60);
            const seconds = (gameState.stats.playTime || 0) % 60;
            playTimeElement.textContent = `${minutes}m ${seconds}s`;
        }
        
        const minigamesElement = document.getElementById('minigames-total');
        if (minigamesElement) {
            const completed = gameState.stats.minigamesCompleted || 0;
            const correct = gameState.stats.correctAnswers || 0;
            const accuracy = completed > 0 ? Math.round((correct / completed) * 100) : 0;
            minigamesElement.textContent = `${correct}/${completed} (${accuracy}%)`;
        }
        
        // Aplicar efeitos especiais baseados no final
        if (endingData.id.includes('bad')) {
            document.getElementById('ending-title').style.color = '#ff0000';
        } else if (endingData.id.includes('good')) {
            document.getElementById('ending-title').style.color = '#00ff88';
        } else if (endingData.id.includes('secret')) {
            document.getElementById('ending-title').style.color = '#ff00ff';
            document.getElementById('ending').style.animation = 'glitch 0.5s infinite';
        }
    }
    
    /* ==================== ATUALIZAR DIA ==================== */
    
    static updateDayDisplay() {
        const dayElement = document.getElementById('current-day');
        if (dayElement && game) {
            dayElement.textContent = `📅 Dia ${game.getCurrentDay()}`;
        }
    }
    
    static playDayTransition() {
        console.log('🌅 Reproduzindo transição de dia...');
        
        const dayElement = document.getElementById('current-day');
        if (!dayElement) return;
        
        // Remover animação anterior se existir
        dayElement.style.animation = 'none';
        
        // Forçar reflow para reiniciar animação
        void dayElement.offsetWidth;
        
        // Aplicar animações
        dayElement.style.animation = 'dayBadgeSlide 0.6s ease-out, dayBadgeGlow 1.5s ease-in-out 0.3s';
        
        // Som de transição
        AudioManager.playSFX('click');
        
        // Mostrar notificação visual
        const dayValue = game.getCurrentDay();
        this.showNotification(`📅 Dia ${dayValue} iniciado!`, 'neutral');
    }
    
    /* ==================== CONFIGURAÇÕES ==================== */
    
    static updateConfigUI() {
        // Atualizar sliders e valores
        const musicVolume = document.getElementById('music-volume');
        const sfxVolume = document.getElementById('sfx-volume');
        const textSpeed = document.getElementById('text-speed');
        
        if (musicVolume) {
            musicVolume.value = game.config.musicVolume;
            document.getElementById('music-value').textContent = `${game.config.musicVolume}%`;
        }
        
        if (sfxVolume) {
            sfxVolume.value = game.config.sfxVolume;
            document.getElementById('sfx-value').textContent = `${game.config.sfxVolume}%`;
        }
        
        if (textSpeed) {
            textSpeed.value = game.config.textSpeed;
        }
    }
    
    /* ==================== TELA DE CRÉDITOS ==================== */
    
    static showCredits(endingData) {
        console.log('🎬 Mostrando créditos finais...');
        
        // Limpar créditos anteriores
        const container = document.getElementById('credits-container');
        container.innerHTML = '';
        
        // Créditos da estrutura base
        const credits = [
            {
                title: 'LUNA WANTS ME',
                items: [
                    { role: 'Conceito & História', name: 'Você' }
                ]
            },
            {
                title: 'Programação',
                items: [
                    { role: 'JavaScript', name: 'HTML5, CSS3, Vanilla JS' },
                    { role: 'Game Engine', name: 'Construído do zero' }
                ]
            },
            {
                title: 'Arte & Design',
                items: [
                    { role: 'UI/UX Design', name: 'Visual Novel UI' },
                    { role: 'Animações', name: 'CSS Animations' }
                ]
            },
            {
                title: 'Música & Som',
                items: [
                    { role: 'Sound Design', name: 'Atmosfera Psicológica' },
                    { role: 'Efeitos Sonoros', name: 'Imersão' }
                ]
            },
            {
                title: 'Sistema de Jogo',
                items: [
                    { role: 'Save System', name: 'LocalStorage' },
                    { role: 'UI System', name: 'Sistema de Telas' },
                    { role: 'Sanity System', name: 'Mecânica Psicológica' }
                ]
            }
        ];
        
        // Criar seções de créditos
        credits.forEach((section, index) => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'credits-section';
            
            const titleDiv = document.createElement('div');
            titleDiv.className = 'credits-title';
            titleDiv.textContent = section.title;
            sectionDiv.appendChild(titleDiv);
            
            section.items.forEach(item => {
                const roleDiv = document.createElement('div');
                roleDiv.className = 'credits-role';
                roleDiv.textContent = item.role;
                sectionDiv.appendChild(roleDiv);
                
                const nameDiv = document.createElement('div');
                nameDiv.className = 'credits-name';
                nameDiv.textContent = item.name;
                sectionDiv.appendChild(nameDiv);
            });
            
            container.appendChild(sectionDiv);
        });
        
        // Seção final
        const finalSection = document.createElement('div');
        finalSection.className = 'credits-section credits-final';
        
        const finalText1 = document.createElement('div');
        finalText1.className = 'credits-final-text';
        finalText1.textContent = '"Algumas pessoas amam demais..."';
        finalSection.appendChild(finalText1);
        
        const finalText2 = document.createElement('div');
        finalText2.className = 'credits-final-text';
        finalText2.textContent = `Final: ${endingData.title}`;
        finalSection.appendChild(finalText2);
        
        const endDiv = document.createElement('div');
        endDiv.className = 'credits-end';
        endDiv.textContent = 'FIM';
        finalSection.appendChild(endDiv);
        
        container.appendChild(finalSection);
        
        console.log(`✅ Créditos gerados! Total de seções: ${container.children.length}`);
        console.log('📋 Container HTML:', container.innerHTML.substring(0, 200));
        
        // Mostrar tela de créditos
        this.showScreen('credits-screen');
        
        // Tocar música de créditos
        AudioManager.playMusic('final');
        
        // Mostrar tela final automaticamente após 240 segundos (duração da animação)
        this.creditsTimeout = setTimeout(() => {
            this.showEndingAfterCredits();
        }, 240000);
        
        // Pular com ESC
        setTimeout(() => {
            document.addEventListener('keydown', this.creditsKeyListener = (e) => {
                if (e.key === 'Escape') {
                    this.skipCredits();
                }
            });
        }, 500);
    }
    
    static skipCredits() {
        console.log('⏭️ Pulando créditos...');
        
        // Limpar timeout
        if (this.creditsTimeout) {
            clearTimeout(this.creditsTimeout);
            this.creditsTimeout = null;
        }
        
        // Remover listener
        if (this.creditsKeyListener) {
            document.removeEventListener('keydown', this.creditsKeyListener);
        }
        
        // Mostrar tela final
        this.showEndingAfterCredits();
    }
    
    static showEndingAfterCredits() {
        console.log('🎬 Mostrando ending após créditos...');
        if (this.currentEndingData && this.currentGameState) {
            this.showEnding(this.currentEndingData, this.currentGameState);
        } else {
            console.warn('⚠️ Dados de ending não encontrados!');
            this.showScreen('menu');
        }
    }
    
    static cleanupCredits() {
        console.log('🧹 Limpando créditos...');
        
        // Limpar timeout dos créditos
        if (this.creditsTimeout) {
            clearTimeout(this.creditsTimeout);
            this.creditsTimeout = null;
        }
        
        // Remover listener de teclado
        if (this.creditsKeyListener) {
            document.removeEventListener('keydown', this.creditsKeyListener);
            this.creditsKeyListener = null;
        }
        
        // Limpar dados de ending
        this.currentEndingData = null;
        this.currentGameState = null;
    }
    
    static goToMenu() {
        console.log('🔙 Voltando para menu...');
        this.cleanupCredits();
        this.showScreen('menu');
    }
    
    static replayGame() {
        console.log('🔄 Começando novo jogo...');
        this.cleanupCredits();
        game.newGame();
    }
    
    /* ==================== ENTRADA DO NOME DO JOGADOR ==================== */
    
    static showPlayerNameScreen() {
        console.log('👤 Mostrando tela de entrada do nome do jogador');
        this.showScreen('player-name-screen');
        
        // Tentar mostrar Luna na tela
        const lunaPortrait = document.getElementById('luna-intro-portrait');
        if (lunaPortrait && CHARACTERS && CHARACTERS.luna) {
            lunaPortrait.src = CHARACTERS.luna.portraits.feliz || '';
        }
        
        // Focar no input
        const input = document.getElementById('player-name-input');
        if (input) {
            input.focus();
            input.onkeypress = (e) => {
                if (e.key === 'Enter') {
                    this.confirmPlayerName();
                }
            };
        }
    }
    
    static confirmPlayerName() {
        const input = document.getElementById('player-name-input');
        const name = input.value.trim();
        
        if (!name || name.length === 0) {
            console.warn('⚠️ Nome não pode estar vazio');
            input.style.borderColor = 'red';
            setTimeout(() => {
                input.style.borderColor = '';
            }, 500);
            return;
        }
        
        if (name.length > 20) {
            console.warn('⚠️ Nome muito longo');
            return;
        }
        
        console.log(`✅ Nome confirmado: ${name}`);
        game.setPlayerName(name);
        AudioManager.playSFX('click');
        
        // Voltar para o jogo
        this.showScreen('game');
        
        // Chamar callback de minijogo se existir
        if (game.currentMinigameCallback) {
            console.log('🎮 Chamando callback de minijogo');
            game.currentMinigameCallback();
        } else {
            game.showDialogue();
        }
    }
    
    /* ==================== MÉTODOS DE SUPORTE PARA MINIJOGOS ==================== */
    
    static playMiniGameInvestigation(items, callback) {
        console.log('🎮 Iniciando minijogo de investigação');
        MiniGames.investigationGame(items, (success) => {
            UI.showScreen('game');
            if (callback) callback(success);
        });
        this.showScreen('game'); // Manter na tela do jogo
    }
    
    static playMiniGameSequence(sequence, callback) {
        console.log('🎮 Iniciando minijogo de sequência');
        MiniGames.sequencePuzzle(sequence, (success) => {
            UI.showScreen('game');
            if (callback) callback(success);
        });
        this.showScreen('game');
    }
    
    static playMiniGameReflex(duration, callback) {
        console.log('🎮 Iniciando minijogo de reflexos');
        MiniGames.reflexGame(duration, (score) => {
            UI.showScreen('game');
            if (callback) callback(score >= 5);
        });
        this.showScreen('game');
    }
    
    static playMiniGameAnagram(word, hint, callback) {
        console.log('🎮 Iniciando minijogo de anagrama');
        MiniGames.anagramGame(word, hint, (success) => {
            UI.showScreen('game');
            if (callback) callback(success);
        });
        this.showScreen('game');
    }
    
    static playMiniGameSanityTest(scenario, options, callback) {
        console.log('🎮 Iniciando minijogo de teste de sanidade');
        MiniGames.sanityTest(scenario, options, (sanityChange, selectedOption) => {
            UI.showScreen('game');
            if (callback) callback(sanityChange, selectedOption);
        });
        this.showScreen('game');
    }
    
    /* ==================== NOVOS MINIJOGOS ==================== */
    
    static playQuickTimeEvent(prompt, duration = 3000, callback) {
        console.log('⚡ Iniciando QTE');
        MiniGames.quickTimeEvent(prompt, duration, (success) => {
            UI.showScreen('game');
            if (callback) callback(success);
        });
        this.showScreen('game');
    }
    
    static playLogicPuzzle(puzzles, callback) {
        console.log('🧩 Iniciando puzzle lógico');
        MiniGames.logicPuzzle(puzzles, (success) => {
            UI.showScreen('game');
            if (callback) callback(success);
        });
        this.showScreen('game');
    }
    
    static playRelationshipChoice(character, scenario, options, callback) {
        console.log('💬 Escolha de relacionamento');
        MiniGames.relationshipChoice(character, scenario, options, (selectedOption, relationshipChange) => {
            UI.showScreen('game');
            if (callback) callback(selectedOption, relationshipChange);
        });
        this.showScreen('game');
    }
    
    /* ==================== NOTIFICAÇÕES ==================== */
    
    static showNotification(message, type = 'info') {
        console.log(`📢 Notificação (${type}): ${message}`);
        
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                ${message}
            </div>
        `;
        
        // Adicionar ao DOM
        const container = document.body;
        container.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => notification.classList.add('show'), 50);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

/* ==================== EVENT LISTENERS PARA CONFIGURAÇÕES ==================== */

// Atualizar valores dos sliders em tempo real
document.addEventListener('DOMContentLoaded', () => {
    const musicVolume = document.getElementById('music-volume');
    const sfxVolume = document.getElementById('sfx-volume');
    
    if (musicVolume) {
        musicVolume.addEventListener('input', (e) => {
            document.getElementById('music-value').textContent = `${e.target.value}%`;
        });
    }
    
    if (sfxVolume) {
        sfxVolume.addEventListener('input', (e) => {
            document.getElementById('sfx-value').textContent = `${e.target.value}%`;
        });
    }
});