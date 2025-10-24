/* ==================== ACHIEVEMENT SYSTEM ==================== */
/* Sistema de conquistas e badges */

class AchievementSystem {
    static init() {
        console.log('🏆 Inicializando Sistema de Achievements...');
        this.achievements = new Map();
        this.unlockedAchievements = new Set();
        this.statistics = {
            timesCried: 0,
            choicesMade: 0,
            sanityReached0: false,
            perfectEnding: false,
            speedrun: false
        };

        this.initializeAchievements();
        this.loadUnlockedAchievements();
    }

    static initializeAchievements() {
        const achievements = [
            {
                id: 'first_steps',
                name: '🌟 Primeiros Passos',
                description: 'Complete o primeiro capítulo',
                icon: '👣',
                points: 10,
                rarity: 'comum',
                unlocked: false
            },
            {
                id: 'luna_lover',
                name: '❤️ Amante de Luna',
                description: 'Atinja relacionamento máximo com Luna',
                icon: '💘',
                points: 50,
                rarity: 'épico',
                unlocked: false
            },
            {
                id: 'sanity_tester',
                name: '🧠 Testador de Sanidade',
                description: 'Reduza a sanidade a 0%',
                icon: '💀',
                points: 30,
                rarity: 'raro',
                unlocked: false
            },
            {
                id: 'quick_reader',
                name: '⚡ Leitor Rápido',
                description: 'Complete o jogo em menos de 10 minutos',
                icon: '📖',
                points: 20,
                rarity: 'incomum',
                unlocked: false
            },
            {
                id: 'detective',
                name: '🔍 Detetive Amador',
                description: 'Descubra todos os segredos do capítulo 1',
                icon: '🕵️',
                points: 40,
                rarity: 'raro',
                unlocked: false
            },
            {
                id: 'choice_master',
                name: '🎯 Mestre das Escolhas',
                description: 'Faça 50 escolhas diferentes',
                icon: '🎪',
                points: 35,
                rarity: 'raro',
                unlocked: false
            },
            {
                id: 'perfect_game',
                name: '✨ Jogo Perfeito',
                description: 'Conquiste o final perfeito',
                icon: '👑',
                points: 100,
                rarity: 'lendário',
                unlocked: false
            },
            {
                id: 'minigame_master',
                name: '🎮 Mestre dos Minijogos',
                description: 'Complete todos os minijogos com sucesso',
                icon: '🏅',
                points: 60,
                rarity: 'épico',
                unlocked: false
            },
            {
                id: 'explorer',
                name: '🗺️ Explorador',
                description: 'Explore todas as cenas disponíveis',
                icon: '🧭',
                points: 45,
                rarity: 'raro',
                unlocked: false
            },
            {
                id: 'collector',
                name: '🎒 Colecionador',
                description: 'Collect 10 items no inventário',
                icon: '📦',
                points: 25,
                rarity: 'incomum',
                unlocked: false
            }
        ];

        achievements.forEach(achievement => {
            this.achievements.set(achievement.id, achievement);
        });
    }

    /**
     * Desbloqueia um achievement
     */
    static unlock(achievementId) {
        if (!this.achievements.has(achievementId)) {
            console.warn(`❌ Achievement não encontrado: ${achievementId}`);
            return false;
        }

        if (this.unlockedAchievements.has(achievementId)) {
            return false; // Já desbloqueado
        }

        const achievement = this.achievements.get(achievementId);
        this.unlockedAchievements.add(achievementId);
        achievement.unlocked = true;
        achievement.unlockedAt = Date.now();

        console.log(`🏆 Achievement desbloqueado: ${achievement.name}`);

        // Mostrar notificação
        this.showUnlockNotification(achievement);

        // Efeito sonoro
        AudioManager.playSFX('complete');

        // Salvar progresso
        this.saveUnlockedAchievements();

        // Adicionar pontos ao jogo
        game.state.stats.achievementPoints = (game.state.stats.achievementPoints || 0) + achievement.points;

        return true;
    }

    /**
     * Verifica e desbloqueia achievements automaticamente
     */
    static checkAchievements() {
        const state = game.state;

        // Primeiro capítulo
        if (state.currentScene && state.currentScene.includes('cap1')) {
            this.unlock('first_steps');
        }

        // Relacionamento com Luna
        if (state.relationships.luna >= 100) {
            this.unlock('luna_lover');
        }

        // Sanidade zerada
        if (state.sanity <= 0) {
            this.unlock('sanity_tester');
            this.statistics.sanityReached0 = true;
        }

        // Minijogos
        if (state.stats.minigamesCompleted > 0 && 
            state.stats.correctAnswers === state.stats.minigamesCompleted) {
            this.unlock('minigame_master');
        }

        // Escolhas
        if (state.stats.choicesMade >= 50) {
            this.unlock('choice_master');
        }

        // Inventário
        if (typeof InventorySystem !== 'undefined') {
            const totalItems = InventorySystem.getTotalItems();
            if (totalItems >= 10) {
                this.unlock('collector');
            }
        }
    }

    /**
     * Mostra notificação de desbloqueio
     */
    static showUnlockNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-unlock-notification';
        notification.innerHTML = `
            <div class="achievement-popup">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-text">
                    <h3>${achievement.name}</h3>
                    <p>${achievement.description}</p>
                    <span class="achievement-points">+${achievement.points} pontos</span>
                </div>
            </div>
        `;

        this.applyNotificationStyles();
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('active');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('active');
        }, 3000);

        setTimeout(() => {
            notification.remove();
        }, 3300);
    }

    /**
     * Abre galeria de achievements
     */
    static showGallery() {
        console.log('📜 Abrindo galeria de achievements...');

        // Proteção contra múltiplas aberturas
        if (document.querySelector('.achievement-gallery')) {
            console.log('⚠️ Galeria de achievements já está aberta');
            return;
        }

        const gallery = this.createGalleryUI();
        document.body.appendChild(gallery);

        setTimeout(() => {
            gallery.classList.add('active');
        }, 50);
    }

    /**
     * Abre galeria como overlay (em cima do pause menu)
     */
    static showGalleryAsOverlay() {
        console.log('📜 Abrindo galeria de achievements como overlay...');

        // Proteção contra múltiplas aberturas
        if (document.querySelector('.achievement-gallery')) {
            console.log('⚠️ Galeria de achievements já está aberta');
            return;
        }

        const gallery = this.createGalleryUI();
        gallery.classList.add('overlay-mode');
        gallery.style.zIndex = '1001';
        document.body.appendChild(gallery);

        setTimeout(() => {
            gallery.classList.add('active');
        }, 50);
    }

    static createGalleryUI() {
        const achievements = Array.from(this.achievements.values());
        const unlocked = Array.from(this.unlockedAchievements).length;
        const total = this.achievements.size;

        const gallery = document.createElement('div');
        gallery.className = 'achievement-gallery';
        gallery.innerHTML = `
            <div class="achievement-gallery-content">
                <div class="gallery-header">
                    <h2>🏆 Achievements</h2>
                    <span class="gallery-progress">${unlocked}/${total}</span>
                    <button class="gallery-close" onclick="UI.goBack(); if(!this.closest('.achievement-gallery').classList.contains('overlay-mode')) this.closest('.achievement-gallery').remove()">✕</button>
                </div>

                <div class="achievements-grid">
                    ${achievements.map(achievement => this.createAchievementCard(achievement)).join('')}
                </div>
            </div>
        `;

        this.applyGalleryStyles();
        return gallery;
    }

    static createAchievementCard(achievement) {
        const isUnlocked = this.unlockedAchievements.has(achievement.id);
        
        return `
            <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
                <div class="card-icon">${isUnlocked ? achievement.icon : '🔒'}</div>
                <div class="card-content">
                    <h4>${achievement.name}</h4>
                    <p>${achievement.description}</p>
                    <div class="card-meta">
                        <span class="rarity-badge ${achievement.rarity}">${achievement.rarity}</span>
                        <span class="points">+${achievement.points}</span>
                    </div>
                    ${isUnlocked ? `<span class="unlocked-badge">✓ Desbloqueado</span>` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Retorna total de pontos
     */
    static getTotalPoints() {
        let points = 0;
        this.unlockedAchievements.forEach(id => {
            const achievement = this.achievements.get(id);
            points += achievement.points;
        });
        return points;
    }

    /**
     * Retorna percentual de conclusão
     */
    static getCompletionPercentage() {
        const total = this.achievements.size;
        const unlocked = this.unlockedAchievements.size;
        return Math.round((unlocked / total) * 100);
    }

    /**
     * Retorna todos os achievements
     */
    static getAllAchievements() {
        return Array.from(this.achievements.values());
    }

    /**
     * Retorna achievements desbloqueados
     */
    static getUnlockedAchievements() {
        return Array.from(this.unlockedAchievements).map(id => this.achievements.get(id));
    }

    /**
     * Salva achievements desbloqueados no localStorage
     */
    static saveUnlockedAchievements() {
        const data = Array.from(this.unlockedAchievements);
        localStorage.setItem('luna_achievements_unlocked', JSON.stringify(data));
    }

    /**
     * Carrega achievements desbloqueados do localStorage
     */
    static loadUnlockedAchievements() {
        const data = localStorage.getItem('luna_achievements_unlocked');
        if (data) {
            try {
                const unlocked = JSON.parse(data);
                unlocked.forEach(id => {
                    if (this.achievements.has(id)) {
                        this.unlockedAchievements.add(id);
                        this.achievements.get(id).unlocked = true;
                    }
                });
            } catch (e) {
                console.error('❌ Erro ao carregar achievements:', e);
            }
        }
    }

    static applyNotificationStyles() {
        if (document.getElementById('achievement-notification-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'achievement-notification-styles';
        styles.innerHTML = `
            .achievement-unlock-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1500;
                opacity: 0;
                transform: translateX(400px);
                transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }

            .achievement-unlock-notification.active {
                opacity: 1;
                transform: translateX(0);
            }

            .achievement-popup {
                background: linear-gradient(135deg, rgba(243, 156, 18, 0.9), rgba(230, 126, 34, 0.9));
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                padding: 20px;
                display: flex;
                gap: 15px;
                align-items: center;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                max-width: 350px;
            }

            .achievement-icon {
                font-size: 2.5em;
                flex-shrink: 0;
            }

            .achievement-text h3 {
                margin: 0 0 5px 0;
                color: #fff;
                font-size: 1em;
            }

            .achievement-text p {
                margin: 0 0 8px 0;
                color: rgba(255, 255, 255, 0.9);
                font-size: 0.85em;
                line-height: 1.3;
            }

            .achievement-points {
                display: inline-block;
                background: rgba(255, 255, 255, 0.2);
                color: #fff;
                padding: 3px 10px;
                border-radius: 10px;
                font-size: 0.75em;
                font-weight: bold;
            }

            @media (max-width: 600px) {
                .achievement-unlock-notification {
                    top: 10px;
                    right: 10px;
                }

                .achievement-popup {
                    max-width: calc(100vw - 20px);
                    flex-direction: column;
                    text-align: center;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    static applyGalleryStyles() {
        if (document.getElementById('achievement-gallery-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'achievement-gallery-styles';
        styles.innerHTML = `
            .achievement-gallery {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(5px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 700;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }

            .achievement-gallery.active {
                opacity: 1;
                pointer-events: auto;
            }

            .achievement-gallery-content {
                background: linear-gradient(135deg, rgba(20, 20, 40, 0.95), rgba(40, 10, 35, 0.95));
                border: 2px solid rgba(243, 156, 18, 0.3);
                border-radius: 15px;
                padding: 25px;
                max-width: 800px;
                width: 90%;
                max-height: 80vh;
                display: flex;
                flex-direction: column;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
            }

            .gallery-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 2px solid rgba(243, 156, 18, 0.2);
                color: #fff;
            }

            .gallery-header h2 {
                margin: 0;
                font-size: 1.5em;
            }

            .gallery-progress {
                background: rgba(243, 156, 18, 0.2);
                padding: 5px 15px;
                border-radius: 20px;
                font-weight: bold;
            }

            .gallery-close {
                background: none;
                border: none;
                color: #fff;
                font-size: 1.5em;
                cursor: pointer;
                transition: transform 0.2s ease;
            }

            .gallery-close:hover {
                transform: scale(1.2);
            }

            .achievements-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                gap: 15px;
                overflow-y: auto;
                flex: 1;
            }

            .achievement-card {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(243, 156, 18, 0.2);
                border-radius: 8px;
                padding: 15px;
                text-align: center;
                transition: all 0.2s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }

            .achievement-card.unlocked {
                background: rgba(243, 156, 18, 0.1);
                border-color: rgba(243, 156, 18, 0.5);
            }

            .achievement-card.locked {
                opacity: 0.6;
                filter: grayscale(100%);
            }

            .achievement-card:hover {
                transform: translateY(-2px);
                background: rgba(255, 255, 255, 0.1);
            }

            .card-icon {
                font-size: 2.5em;
            }

            .card-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            .card-content h4 {
                margin: 0;
                color: #fff;
                font-size: 0.85em;
                line-height: 1.2;
            }

            .card-content p {
                margin: 0;
                color: rgba(255, 255, 255, 0.6);
                font-size: 0.75em;
                line-height: 1.2;
            }

            .card-meta {
                display: flex;
                justify-content: center;
                gap: 5px;
                flex-wrap: wrap;
            }

            .rarity-badge {
                font-size: 0.65em;
                padding: 2px 6px;
                border-radius: 3px;
                font-weight: bold;
                text-transform: capitalize;
            }

            .rarity-badge.comum {
                background: rgba(149, 165, 166, 0.3);
                color: #95a5a6;
            }

            .rarity-badge.incomum {
                background: rgba(39, 174, 96, 0.3);
                color: #27ae60;
            }

            .rarity-badge.raro {
                background: rgba(41, 128, 185, 0.3);
                color: #2980b9;
            }

            .rarity-badge.épico {
                background: rgba(142, 68, 173, 0.3);
                color: #8e44ad;
            }

            .rarity-badge.lendário {
                background: rgba(243, 156, 18, 0.3);
                color: #f39c12;
            }

            .points {
                font-size: 0.7em;
                color: rgba(76, 175, 80, 0.8);
                font-weight: bold;
            }

            .unlocked-badge {
                display: block;
                color: #4caf50;
                font-size: 0.7em;
                font-weight: bold;
            }

            @media (max-width: 600px) {
                .achievement-gallery-content {
                    max-width: 95%;
                    padding: 15px;
                }

                .achievements-grid {
                    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                }
            }
        `;

        document.head.appendChild(styles);
    }

    /**
     * Reseta achievements (para testes)
     */
    static reset() {
        this.unlockedAchievements.clear();
        localStorage.removeItem('luna_achievements_unlocked');
        console.log('🧹 Achievements resetados');
    }
}

// Inicializar ao carregar
if (typeof game !== 'undefined') {
    AchievementSystem.init();
}