/* ==================== LUNA WANTS ME - GAME.JS ==================== */
/* Lógica principal do jogo */

class Game {
    constructor() {
        this.state = {
            currentScene: 'cap1_inicio',
            currentIndex: 0,
            sanity: 100,
            typing: false,
            choices: {},
            playerName: '',
            playerNameAsked: false,
            relationships: {
                luna: 0  // -100 a +100: ódio a amor obsessivo
            },
            flags: {
                respondeuBem: false,
                aceitouCarona: false,
                entrouCasa: false,
                tentouFugir: false,
                manipulou: false,
                beijouLuna: false,
                lunaAffected: false,
                questionedLuna: false
            },
            stats: {
                playTime: 0,
                choicesMade: 0,
                scenesViewed: [],
                minigamesCompleted: 0,
                correctAnswers: 0
            }
        };
        
        this.config = {
            textSpeed: 15,
            autoSave: true,
            musicVolume: 50,
            sfxVolume: 70
        };
        
        this.textInterval = null;
        this.playTimeInterval = null;
        this.previousScreen = 'menu';
        
        this.init();
    }
    
    init() {
        console.log('🎮 Inicializando Luna Wants Me...');
        
        // Carregar configurações salvas
        this.loadConfig();
        
        // Inicializar sistemas
        AudioManager.init();
        SaveSystem.init();
        UI.init();
        
        // Event listeners
        this.setupEventListeners();
        
        // Música do menu
        AudioManager.playMusic('menu');
        
        console.log('✅ Jogo inicializado!');
    }
    
    setupEventListeners() {
        // Clique para avançar diálogo
        document.addEventListener('click', (e) => {
            if (!e.target.closest('button') && 
                !e.target.closest('input') && 
                !e.target.closest('select') &&
                document.getElementById('game').classList.contains('active')) {
                this.handleClick();
            }
        });
        
        // Tecla ESC para pausar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.getElementById('game').classList.contains('active')) {
                UI.togglePause();
            }
            // Espaço para avançar
            if (e.key === ' ' && document.getElementById('game').classList.contains('active')) {
                e.preventDefault();
                this.handleClick();
            }
        });
    }
    
    /* ==================== CONTROLE DO JOGO ==================== */
    
    newGame() {
        console.log('🎬 Novo jogo iniciado');
        
        // Resetar estado
        this.state = {
            currentScene: 'intro_askName',
            currentIndex: 0,
            sanity: 100,
            typing: false,
            choices: {},
            playerName: '',
            playerNameAsked: false,
            flags: {
                respondeuBem: false,
                aceitouCarona: false,
                entrouCasa: false,
                tentouFugir: false,
                manipulou: false,
                beijouLuna: false
            },
            stats: {
                playTime: 0,
                choicesMade: 0,
                scenesViewed: []
            }
        };
        
        // Mostrar tela do jogo
        UI.showScreen('game');
        
        // Música do jogo
        AudioManager.playMusic('normal');
        
        // Iniciar contagem de tempo
        this.startPlayTime();
        
        // Carregar primeira cena
        this.loadScene(this.state.currentScene);
    }
    
    /* ==================== GERENCIAR NOME DO JOGADOR ==================== */
    
    setPlayerName(name) {
        this.state.playerName = name;
        this.state.playerNameAsked = true;
        console.log(`👤 Nome do jogador definido: ${name}`);
        SaveSystem.autoSave(this.state);
    }
    
    processDialogueText(text) {
        if (!text) return text;
        // Substituir placeholders do nome do jogador
        return text.replace(/{playerName}/g, this.state.playerName || 'Você');
    }
    
    /* ==================== SISTEMA DE RELACIONAMENTO ==================== */
    
    modifyRelationship(character, amount) {
        const current = this.state.relationships[character] || 0;
        this.state.relationships[character] = Math.max(-100, Math.min(100, current + amount));
        
        console.log(`💕 Relacionamento com ${character}: ${this.state.relationships[character]}`);
        
        // Efeito visual baseado no mudança
        if (amount > 0) {
            AudioManager.playSFX('click');
            UI.showNotification(`${character}: Relacionamento aumentou! 💚`, 'positive');
        } else if (amount < 0) {
            AudioManager.playSFX('error');
            UI.showNotification(`${character}: Relacionamento diminuiu... 💔`, 'negative');
        }
    }
    
    getRelationshipLevel(character) {
        const value = this.state.relationships[character] || 0;
        if (value > 75) return 'obsessivo';
        if (value > 50) return 'apaixonado';
        if (value > 25) return 'amigavel';
        if (value > 0) return 'neutro_positivo';
        if (value === 0) return 'neutro';
        if (value > -25) return 'neutro_negativo';
        if (value > -50) return 'desconfiado';
        if (value > -75) return 'hostil';
        return 'inimigo';
    }
    
    /* ==================== EXECUTAR MINIJOGOS ==================== */
    
    executeMinigame(minigameData) {
        const type = minigameData.type;
        
        switch(type) {
            case 'playerName':
                // Armazenar callback para quando o nome for confirmado
                this.currentMinigameCallback = minigameData.onComplete || (() => this.nextLine());
                if (minigameData.execute) {
                    minigameData.execute();
                }
                break;
                
            case 'qte':
                UI.playQuickTimeEvent(minigameData.prompt, minigameData.duration, (success) => {
                    this.state.stats.minigamesCompleted++;
                    if (success) {
                        this.state.stats.correctAnswers++;
                    }
                    setTimeout(() => this.nextLine(), 500);
                });
                break;
                
            case 'logicPuzzle':
                UI.playLogicPuzzle(minigameData.questions, (success) => {
                    this.state.stats.minigamesCompleted++;
                    if (success) {
                        this.state.stats.correctAnswers++;
                    }
                    setTimeout(() => this.nextLine(), 500);
                });
                break;
                
            case 'relationshipChoice':
                UI.playRelationshipChoice(
                    minigameData.character,
                    minigameData.scenario,
                    minigameData.options,
                    (selectedOption, relationshipChange) => {
                        this.state.stats.minigamesCompleted++;
                        setTimeout(() => this.nextLine(), 500);
                    }
                );
                break;
                
            case 'investigation':
                if (minigameData.items && minigameData.callback) {
                    UI.playMiniGameInvestigation(minigameData.items, () => {
                        this.state.stats.minigamesCompleted++;
                        this.state.stats.correctAnswers++;
                        setTimeout(() => this.nextLine(), 500);
                    });
                }
                break;
                
            case 'sequence':
                if (minigameData.sequence && minigameData.callback) {
                    UI.playMiniGameSequence(minigameData.sequence, () => {
                        this.state.stats.minigamesCompleted++;
                        this.state.stats.correctAnswers++;
                        setTimeout(() => this.nextLine(), 500);
                    });
                }
                break;
                
            case 'reflex':
                if (minigameData.targets && minigameData.callback) {
                    UI.playMiniGameReflex(minigameData.targets, (hits, total) => {
                        this.state.stats.minigamesCompleted++;
                        if (hits >= total * 0.7) {
                            this.state.stats.correctAnswers++;
                        }
                        setTimeout(() => this.nextLine(), 500);
                    });
                }
                break;
                
            case 'anagram':
                if (minigameData.word && minigameData.hint) {
                    UI.playMiniGameAnagram(minigameData.word, minigameData.hint, (success) => {
                        this.state.stats.minigamesCompleted++;
                        if (success) {
                            this.state.stats.correctAnswers++;
                        }
                        setTimeout(() => this.nextLine(), 500);
                    });
                }
                break;
                
            case 'sanityTest':
                if (minigameData.scenario && minigameData.options) {
                    UI.playMiniGameSanityTest(minigameData.scenario, minigameData.options, (sanityChange) => {
                        this.state.stats.minigamesCompleted++;
                        this.changeSanity(sanityChange);
                        setTimeout(() => this.nextLine(), 500);
                    });
                }
                break;
                
            default:
                console.warn(`⚠️ Tipo de minijogo desconhecido: ${type}`);
                setTimeout(() => this.nextLine(), 500);
        }
    }
    
    loadScene(sceneName) {
        console.log(`📖 Carregando cena: ${sceneName}`);
        
        // Verificar se cena existe
        if (!STORY[sceneName]) {
            console.error(`❌ Cena não encontrada: ${sceneName}`);
            return;
        }
        console.log(`✅ Cena encontrada. Total de linhas: ${STORY[sceneName].length}`);
        
        // Atualizar estado
        this.state.currentScene = sceneName;
        this.state.currentIndex = 0;
        
        // Adicionar às cenas visualizadas
        if (!this.state.stats.scenesViewed.includes(sceneName)) {
            this.state.stats.scenesViewed.push(sceneName);
        }
        
        // Auto-save
        if (this.config.autoSave) {
            SaveSystem.autoSave(this.state);
        }
        
        // Mostrar primeira linha
        console.log('📍 Chamando showDialogue()...');
        this.showDialogue();
    }
    
    showDialogue() {
        console.log('🎭 showDialogue() chamado');
        const scene = STORY[this.state.currentScene];
        const line = scene[this.state.currentIndex];
        
        if (!line) {
            console.error('❌ Linha não encontrada');
            return;
        }
        console.log('📄 Linha a exibir:', line);
        
        // Se for minijogo
        if (line.minigame) {
            console.log('🎮 Executando minijogo:', line.minigame.type);
            this.executeMinigame(line.minigame);
            return;
        }
        
        // Se for escolha
        if (line.choice) {
            UI.showChoices(line.options);
            UI.hideClickHint();
            return;
        }
        
        // Se for final
        if (line.ending) {
            this.showEnding(line);
            return;
        }
        
        // Se for transição para nova cena
        if (line.next) {
            this.loadScene(line.next);
            return;
        }
        
        // Aplicar efeitos antes de mostrar
        if (line.effect) {
            line.effect(this.state);
        }
        
        // Atualizar sanidade
        if (line.sanity) {
            this.changeSanity(line.sanity);
        }
        
        // Atualizar música
        if (line.music) {
            AudioManager.playMusic(line.music);
        }
        
        // Atualizar fundo
        if (line.background) {
            UI.setBackground(line.background);
        }
        
        // Atualizar personagem
        if (line.portrait) {
            UI.showPortrait(line.character || 'luna', line.portrait);
        } else if (line.hidePortrait) {
            UI.hidePortrait();
        }
        
        // Aplicar efeitos visuais
        if (line.visualEffect) {
            UI.applyVisualEffect(line.visualEffect);
        }
        
        // Traduzir nome do personagem e texto do diálogo
        const translatedName = Translations.getDialogue(line.name) || line.name;
        let translatedText = Translations.getDialogue(line.text);
        
        // Processar placeholders de nome do jogador
        translatedText = this.processDialogueText(translatedText);
        
        // Mostrar diálogo com efeito de digitação
        UI.showDialogue(translatedName, translatedText, this.config.textSpeed);
        
        // Tocar SFX
        if (line.sfx) {
            AudioManager.playSFX(line.sfx);
        }
        
        // Mostrar dica de clique
        UI.showClickHint();
    }
    
    handleClick() {
        console.log('🖱️ Clique detectado! typing:', this.state.typing);
        
        // Ignorar se estiver em menu de pausa
        if (document.getElementById('pause-menu').style.display !== 'none') {
            console.log('⚠️ Menu de pausa está aberto, ignorando clique');
            return;
        }
        
        // Se estiver digitando, completar texto
        if (this.state.typing) {
            console.log('⏸️ Completando texto...');
            UI.completeText();
            return;
        }
        
        // Avançar para próxima linha
        console.log('➡️ Avançando para próxima linha...');
        this.nextLine();
    }
    
    nextLine() {
        const scene = STORY[this.state.currentScene];
        console.log(`⏭️ nextLine() - currentIndex: ${this.state.currentIndex}, total linhas: ${scene.length}`);
        
        // Verificar se há próxima linha
        if (this.state.currentIndex < scene.length - 1) {
            this.state.currentIndex++;
            console.log(`✅ Avançado para linha ${this.state.currentIndex}`);
            this.showDialogue();
        } else {
            console.log('📍 Fim da cena');
        }
    }
    
    makeChoice(choiceIndex) {
        const scene = STORY[this.state.currentScene];
        const line = scene[this.state.currentIndex];
        
        if (!line.choice) return;
        
        const choice = line.options[choiceIndex];
        
        console.log(`✅ Escolha feita: ${choice.text}`);
        
        // Registrar escolha
        this.state.stats.choicesMade++;
        
        // Aplicar efeito da escolha
        if (choice.effect) {
            choice.effect(this.state);
        }
        
        // Alterar sanidade
        if (choice.sanity) {
            this.changeSanity(choice.sanity);
        }
        
        // Tocar SFX
        AudioManager.playSFX('click');
        
        // Ir para próxima cena
        if (choice.next) {
            this.loadScene(choice.next);
        }
    }
    
    /* ==================== SISTEMA DE SANIDADE ==================== */
    
    changeSanity(amount) {
        const oldSanity = this.state.sanity;
        this.state.sanity = Math.max(0, Math.min(100, this.state.sanity + amount));
        
        console.log(`🧠 Sanidade: ${oldSanity} → ${this.state.sanity}`);
        
        // Atualizar UI
        UI.updateSanity(this.state.sanity);
        
        // Aplicar efeitos visuais baseados na sanidade
        this.applySanityEffects();
        
        // SFX de sanidade baixa
        if (this.state.sanity < 30 && oldSanity >= 30) {
            AudioManager.playSFX('heartbeat');
        }
    }
    
    applySanityEffects() {
        const gameElement = document.getElementById('game');
        const vignette = document.getElementById('vignette');
        
        // Remover classes anteriores
        gameElement.classList.remove('sanity-low', 'sanity-critical', 'glitch-mode');
        vignette.classList.remove('active');
        
        if (this.state.sanity <= 20) {
            // Sanidade crítica
            gameElement.classList.add('sanity-critical', 'glitch-mode');
            vignette.classList.add('active');
            AudioManager.playMusic('terror');
        } else if (this.state.sanity <= 40) {
            // Sanidade baixa
            gameElement.classList.add('sanity-low');
            vignette.classList.add('active');
            AudioManager.playMusic('suspense');
        }
    }
    
    /* ==================== FINAIS ==================== */
    
    showEnding(endingData) {
        console.log(`🎬 Final alcançado: ${endingData.title}`);
        
        // Parar contador de tempo
        this.stopPlayTime();
        
        // Salvar estatísticas
        const finalStats = {
            ending: endingData.id,
            sanity: this.state.sanity,
            choicesMade: this.state.stats.choicesMade,
            playTime: this.state.stats.playTime
        };
        
        SaveSystem.saveEnding(endingData.id, finalStats);
        
        // Mostrar créditos primeiro, depois a tela final
        UI.currentEndingData = endingData;
        UI.currentGameState = this.state;
        UI.showCredits(endingData);
        
        // Música de final
        AudioManager.playMusic('final');
    }
    
    /* ==================== TEMPO DE JOGO ==================== */
    
    startPlayTime() {
        this.playTimeInterval = setInterval(() => {
            this.state.stats.playTime++;
        }, 1000);
    }
    
    stopPlayTime() {
        if (this.playTimeInterval) {
            clearInterval(this.playTimeInterval);
            this.playTimeInterval = null;
        }
    }
    
    /* ==================== CONFIGURAÇÕES ==================== */
    
    setTextSpeed(speed) {
        this.config.textSpeed = parseInt(speed);
        this.saveConfig();
        console.log(`⚙️ Velocidade do texto: ${speed}ms`);
    }
    
    loadConfig() {
        const saved = localStorage.getItem('luna_config');
        if (saved) {
            this.config = JSON.parse(saved);
            console.log('⚙️ Configurações carregadas');
        }
    }
    
    saveConfig() {
        localStorage.setItem('luna_config', JSON.stringify(this.config));
        console.log('💾 Configurações salvas');
    }
    
    /* ==================== SAVE/LOAD ==================== */
    
    saveGame(slot) {
        SaveSystem.save(slot, this.state, this.config);
        console.log(`💾 Jogo salvo no slot ${slot}`);
    }
    
    loadGame(slot) {
        const saveData = SaveSystem.load(slot);
        
        if (!saveData) {
            console.error(`❌ Save não encontrado no slot ${slot}`);
            return;
        }
        
        // Restaurar estado
        this.state = saveData.state;
        this.config = saveData.config;
        
        // Aplicar configurações
        AudioManager.setMusicVolume(this.config.musicVolume);
        AudioManager.setSfxVolume(this.config.sfxVolume);
        
        // Mostrar jogo
        UI.showScreen('game');
        
        // Carregar cena
        this.loadScene(this.state.currentScene);
        
        // Atualizar UI
        UI.updateSanity(this.state.sanity);
        
        // Iniciar tempo
        this.startPlayTime();
        
        console.log(`✅ Jogo carregado do slot ${slot}`);
    }
}

/* ==================== INICIALIZAÇÃO ==================== */

// Variável global do jogo
let game;

// Inicializar quando DOM carregar
window.addEventListener('DOMContentLoaded', () => {
    console.log('🌙 Luna Wants Me - Iniciando...');
    game = new Game();
});

// Prevenir recarga acidental
window.addEventListener('beforeunload', (e) => {
    if (game && game.state.stats.playTime > 60) {
        e.preventDefault();
        e.returnValue = '';
    }
});