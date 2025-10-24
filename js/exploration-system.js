/* ==================== EXPLORATION SYSTEM ==================== */
/* Sistema de exploração interativa de cenas */

class ExplorationSystem {
    static init() {
        console.log('🔍 Inicializando Sistema de Exploração...');
        this.activeExploration = null;
        this.discoveredItems = new Set();
        this.hotspots = new Map();
    }

    /**
     * Inicia modo exploração em uma cena
     * @param {Object} sceneData - Dados da cena a explorar
     * @param {Array} hotspots - Array com hotspots [{x, y, size, item, callback}]
     * @param {Function} onComplete - Callback quando exploração termina
     */
    static startExploration(sceneData, hotspots, onComplete) {
        console.log(`🔍 Iniciando exploração: ${sceneData.name}`);
        
        this.activeExploration = {
            scene: sceneData,
            hotspots: hotspots,
            discovered: new Set(),
            onComplete: onComplete,
            startTime: Date.now()
        };

        // Criar container de exploração
        const container = this.createExplorationUI(hotspots);
        const gameContainer = document.getElementById('game');
        gameContainer.appendChild(container);

        // Criar hotspots invisíveis
        this.setupHotspots(container, hotspots);

        // Efeito de entrada
        setTimeout(() => {
            container.classList.add('active');
        }, 100);
    }

    static createExplorationUI(hotspots) {
        const container = document.createElement('div');
        container.id = 'exploration-overlay';
        container.className = 'exploration-container';
        container.innerHTML = `
            <div class="exploration-header">
                <h3>🔍 Modo Exploração</h3>
                <span class="exploration-progress">0/${hotspots.length} itens</span>
                <button class="exploration-close" onclick="ExplorationSystem.endExploration()">Sair</button>
            </div>
            <div class="exploration-canvas">
                <div class="exploration-background"></div>
                <div class="exploration-hotspots"></div>
                <div class="exploration-feedback"></div>
            </div>
            <div class="exploration-items-found">
                <h4>Encontrados:</h4>
                <div id="items-found-list"></div>
            </div>
        `;

        // Aplicar estilos se não existirem
        this.applyExplorationStyles();
        return container;
    }

    static setupHotspots(container, hotspots) {
        const hotspotsContainer = container.querySelector('.exploration-hotspots');
        
        hotspots.forEach((hotspot, index) => {
            const hotspotEl = document.createElement('div');
            hotspotEl.className = 'exploration-hotspot';
            hotspotEl.style.left = hotspot.x + '%';
            hotspotEl.style.top = hotspot.y + '%';
            hotspotEl.style.width = hotspot.size + 'px';
            hotspotEl.style.height = hotspot.size + 'px';
            hotspotEl.dataset.index = index;
            hotspotEl.title = '🔍 Clique para investigar';
            
            hotspotEl.addEventListener('click', (e) => {
                e.stopPropagation();
                this.investigateHotspot(index, hotspot, container);
            });

            hotspotsContainer.appendChild(hotspotEl);
        });
    }

    static investigateHotspot(index, hotspot, container) {
        console.log(`🔎 Investigando hotspot: ${hotspot.item}`);
        
        // Evitar clique duplo
        if (this.activeExploration.discovered.has(index)) {
            UI.showNotification(`Você já encontrou: ${hotspot.item}`, 'info');
            return;
        }

        // Marcar como descoberto
        this.activeExploration.discovered.add(index);
        
        // Animar hotspot
        const hotspotEl = container.querySelector(`[data-index="${index}"]`);
        hotspotEl.classList.add('found');
        
        // Efeito de partícula
        this.createParticleEffect(hotspot.x, hotspot.y);
        
        // Mostrar feedback
        const feedbackEl = container.querySelector('.exploration-feedback');
        feedbackEl.innerHTML = `
            <div class="feedback-popup">
                <span class="feedback-icon">✨</span>
                <p>${hotspot.item}</p>
            </div>
        `;
        feedbackEl.classList.add('show');
        
        setTimeout(() => feedbackEl.classList.remove('show'), 1500);

        // Adicionar à lista de encontrados
        const foundList = container.querySelector('#items-found-list');
        const itemEl = document.createElement('div');
        itemEl.className = 'found-item';
        itemEl.innerHTML = `<span>✓</span> ${hotspot.item}`;
        foundList.appendChild(itemEl);

        // Atualizar progresso
        const progress = container.querySelector('.exploration-progress');
        progress.textContent = `${this.activeExploration.discovered.size}/${this.activeExploration.hotspots.length} itens`;

        // Executar callback do hotspot
        if (hotspot.callback) {
            hotspot.callback();
        }

        // Efeito sonoro
        AudioManager.playSFX('click');

        // Verificar se tudo foi descoberto
        if (this.activeExploration.discovered.size === this.activeExploration.hotspots.length) {
            this.completeExploration(container);
        }
    }

    static createParticleEffect(x, y) {
        const canvas = document.querySelector('.exploration-canvas');
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'exploration-particle';
            particle.style.left = x + '%';
            particle.style.top = y + '%';
            
            const angle = (Math.PI * 2 * i) / 5;
            const vx = Math.cos(angle) * 100;
            const vy = Math.sin(angle) * 100;
            
            particle.style.setProperty('--tx', vx + 'px');
            particle.style.setProperty('--ty', vy + 'px');
            
            canvas.appendChild(particle);
            
            setTimeout(() => particle.remove(), 600);
        }
    }

    static completeExploration(container) {
        console.log('✅ Exploração completa!');
        
        const timeSpent = Math.round((Date.now() - this.activeExploration.startTime) / 1000);
        
        const completeEl = document.createElement('div');
        completeEl.className = 'exploration-complete';
        completeEl.innerHTML = `
            <div class="complete-popup">
                <h3>🎉 Exploração Completa!</h3>
                <p>Você descobriu todos os itens em ${timeSpent}s!</p>
                <button onclick="ExplorationSystem.endExploration()">Continuar</button>
            </div>
        `;
        
        container.appendChild(completeEl);
        
        AudioManager.playSFX('complete');
        game.state.stats.minigamesCompleted++;
        game.state.stats.correctAnswers++;
    }

    static endExploration() {
        console.log('❌ Encerrando exploração');
        
        const container = document.getElementById('exploration-overlay');
        if (container) {
            container.classList.remove('active');
            setTimeout(() => {
                container.remove();
                
                if (this.activeExploration?.onComplete) {
                    this.activeExploration.onComplete();
                }
                
                this.activeExploration = null;
            }, 300);
        }
    }

    static applyExplorationStyles() {
        if (document.getElementById('exploration-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'exploration-styles';
        styles.innerHTML = `
            .exploration-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.3);
                z-index: 500;
                display: flex;
                flex-direction: column;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }

            .exploration-container.active {
                opacity: 1;
                pointer-events: auto;
            }

            .exploration-header {
                background: rgba(20, 20, 40, 0.9);
                padding: 15px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 2px solid rgba(255, 107, 157, 0.3);
                color: #fff;
            }

            .exploration-header h3 {
                margin: 0;
                font-size: 1.2em;
            }

            .exploration-progress {
                background: rgba(255, 107, 157, 0.2);
                padding: 5px 15px;
                border-radius: 20px;
                font-size: 0.9em;
            }

            .exploration-close {
                background: rgba(255, 107, 157, 0.5);
                border: none;
                color: #fff;
                padding: 8px 15px;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .exploration-close:hover {
                background: rgba(255, 107, 157, 0.8);
                transform: scale(1.05);
            }

            .exploration-canvas {
                flex: 1;
                position: relative;
                background: linear-gradient(135deg, rgba(40, 30, 60, 0.8), rgba(60, 20, 40, 0.8));
                overflow: hidden;
            }

            .exploration-background {
                position: absolute;
                width: 100%;
                height: 100%;
                background-size: cover;
                background-position: center;
                opacity: 0.3;
            }

            .exploration-hotspots {
                position: absolute;
                width: 100%;
                height: 100%;
            }

            .exploration-hotspot {
                position: absolute;
                transform: translate(-50%, -50%);
                background: radial-gradient(circle, rgba(255, 107, 157, 0.3), transparent);
                border: 2px solid rgba(255, 107, 157, 0.6);
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.2s ease;
                animation: explorationGlow 2s ease-in-out infinite;
            }

            .exploration-hotspot:hover {
                background: radial-gradient(circle, rgba(255, 107, 157, 0.6), transparent);
                box-shadow: 0 0 20px rgba(255, 107, 157, 0.8);
                transform: translate(-50%, -50%) scale(1.2);
            }

            .exploration-hotspot.found {
                background: radial-gradient(circle, rgba(76, 175, 80, 0.3), transparent);
                border-color: rgba(76, 175, 80, 0.8);
                animation: none;
                cursor: default;
            }

            .exploration-hotspot.found:hover {
                transform: translate(-50%, -50%) scale(1);
            }

            .exploration-feedback {
                position: absolute;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }

            .feedback-popup {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(76, 175, 80, 0.9);
                color: #fff;
                padding: 20px 40px;
                border-radius: 10px;
                text-align: center;
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
                transition: all 0.3s ease;
            }

            .exploration-feedback.show .feedback-popup {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }

            .feedback-icon {
                font-size: 2em;
                display: block;
                margin-bottom: 10px;
            }

            .exploration-items-found {
                background: rgba(20, 20, 40, 0.9);
                padding: 15px 20px;
                border-top: 2px solid rgba(255, 107, 157, 0.3);
                color: #fff;
                max-height: 150px;
                overflow-y: auto;
            }

            .exploration-items-found h4 {
                margin: 0 0 10px 0;
                font-size: 0.95em;
            }

            #items-found-list {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }

            .found-item {
                background: rgba(76, 175, 80, 0.2);
                border: 1px solid rgba(76, 175, 80, 0.5);
                padding: 5px 12px;
                border-radius: 15px;
                font-size: 0.85em;
                animation: slideInUp 0.3s ease;
            }

            .exploration-particle {
                position: absolute;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, rgba(255, 107, 157, 1), transparent);
                border-radius: 50%;
                pointer-events: none;
                animation: particle-float 0.6s ease-out forwards;
            }

            @keyframes particle-float {
                to {
                    transform: translate(var(--tx), var(--ty));
                    opacity: 0;
                }
            }

            @keyframes explorationGlow {
                0%, 100% {
                    box-shadow: 0 0 5px rgba(255, 107, 157, 0.5);
                }
                50% {
                    box-shadow: 0 0 15px rgba(255, 107, 157, 0.8);
                }
            }

            .exploration-complete {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
            }

            .complete-popup {
                background: linear-gradient(135deg, rgba(76, 175, 80, 0.9), rgba(56, 142, 60, 0.9));
                color: #fff;
                padding: 40px;
                border-radius: 15px;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                animation: popIn 0.4s ease;
            }

            .complete-popup h3 {
                font-size: 2em;
                margin: 0 0 10px 0;
            }

            .complete-popup p {
                margin: 0 0 20px 0;
                font-size: 1.1em;
            }

            .complete-popup button {
                background: #fff;
                color: #2e7d32;
                border: none;
                padding: 10px 30px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.2s ease;
            }

            .complete-popup button:hover {
                transform: scale(1.05);
            }

            @keyframes popIn {
                from {
                    transform: scale(0);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }

            @keyframes slideInUp {
                from {
                    transform: translateY(10px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        
        document.head.appendChild(styles);
    }
}

// Inicializar ao carregar
if (typeof game !== 'undefined') {
    ExplorationSystem.init();
}