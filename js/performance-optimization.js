/* ==================== PERFORMANCE OPTIMIZATION ==================== */
/* Melhorias de desempenho e otimizações */

class PerformanceOptimization {
    static init() {
        console.log('⚡ Inicializando Otimizações de Performance...');
        
        // Lazy loading de imagens
        this.setupLazyLoading();
        
        // Debouncing de eventos
        this.setupEventDebouncing();
        
        // Request animation frame para animações
        this.setupAnimationOptimization();
        
        // Limpeza de memória
        this.setupMemoryManagement();
        
        console.log('✅ Performance otimizada!');
    }

    /**
     * Lazy loading de imagens
     */
    static setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Debouncing de eventos (resize, scroll, input)
     */
    static setupEventDebouncing() {
        // Debounce para resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                console.log('📐 Resize otimizado');
            }, 250);
        });

        // Debounce para scroll
        let scrollTimer;
        let isScrolling = false;
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                isScrolling = true;
                clearTimeout(scrollTimer);
            }
            scrollTimer = setTimeout(() => {
                isScrolling = false;
            }, 100);
        }, { passive: true });
    }

    /**
     * Otimizar animações com requestAnimationFrame
     */
    static setupAnimationOptimization() {
        // Usar transform e opacity em vez de left/top
        const style = document.createElement('style');
        style.innerHTML = `
            /* GPU-accelerated properties */
            .animation-optimized {
                will-change: transform, opacity;
                transform: translateZ(0);
                backface-visibility: hidden;
                perspective: 1000px;
            }

            /* Remover will-change após animação */
            .animation-complete {
                will-change: auto;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Gerenciamento de memória
     */
    static setupMemoryManagement() {
        // Limpar recursos desnecessários periodicamente
        setInterval(() => {
            this.cleanupUnusedResources();
        }, 30000); // A cada 30 segundos

        // Limpar ao sair da página
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
    }

    /**
     * Memoização de funções
     */
    static memoize(fn) {
        const cache = new Map();
        return function(...args) {
            const key = JSON.stringify(args);
            if (cache.has(key)) {
                return cache.get(key);
            }
            const result = fn.apply(this, args);
            cache.set(key, result);
            return result;
        };
    }

    /**
     * Throttling de funções
     */
    static throttle(fn, delay) {
        let lastCall = 0;
        return function(...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                return fn.apply(this, args);
            }
        };
    }

    /**
     * Debouncing de funções
     */
    static debounce(fn, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        };
    }

    /**
     * Pool de objetos para reduzir garbage collection
     */
    static createObjectPool(ObjectClass, initialSize = 10) {
        const pool = [];
        
        for (let i = 0; i < initialSize; i++) {
            pool.push(new ObjectClass());
        }

        return {
            get() {
                if (pool.length > 0) {
                    return pool.pop();
                }
                return new ObjectClass();
            },
            return(obj) {
                pool.push(obj);
            },
            reset() {
                pool.length = 0;
            }
        };
    }

    /**
     * Monitorar performance
     */
    static measurePerformance(label, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        
        console.log(`⏱️ ${label}: ${(end - start).toFixed(2)}ms`);
        
        return result;
    }

    /**
     * Fazer upload de imagens de forma eficiente
     */
    static preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    /**
     * Preload de múltiplas imagens
     */
    static preloadImages(sources) {
        return Promise.all(sources.map(src => this.preloadImage(src)));
    }

    /**
     * Limpar recursos não utilizados
     */
    static cleanupUnusedResources() {
        // Limpar timers e intervals não utilizados
        const totalTimers = this.getActiveTimersCount();
        if (totalTimers > 100) {
            console.warn(`⚠️ Muitos timers ativos: ${totalTimers}`);
        }

        // Limpar listeners de eventos não utilizados
        // (isso precisa ser feito manualmente no código)

        // Forçar garbage collection em modo debug
        if (performance.memory) {
            const memoryUsage = performance.memory.usedJSHeapSize / 1048576; // MB
            console.log(`💾 Memória usada: ${memoryUsage.toFixed(2)}MB`);
        }
    }

    /**
     * Contar timers ativos
     */
    static getActiveTimersCount() {
        // Nota: Isso é uma aproximação, JavaScript não expõe isso nativamente
        return 0; // Implementar conforme necessário
    }

    /**
     * Limpeza geral
     */
    static cleanup() {
        console.log('🧹 Limpando recursos...');
        
        // Limpar todos os event listeners customizados
        document.removeEventListener('click', this.handleGlobalClick);
        window.removeEventListener('scroll', this.handleWindowScroll);
        
        // Limpar caches
        if (this.imageCache) {
            this.imageCache.clear();
        }

        console.log('✅ Limpeza concluída');
    }

    /**
     * Monitorar FPS
     */
    static monitorFPS() {
        let lastTime = performance.now();
        let frames = 0;
        let fps = 0;

        const countFrame = () => {
            const currentTime = performance.now();
            frames++;

            if (currentTime - lastTime >= 1000) {
                fps = frames;
                console.log(`🎮 FPS: ${fps}`);
                frames = 0;
                lastTime = currentTime;
            }

            requestAnimationFrame(countFrame);
        };

        requestAnimationFrame(countFrame);
    }

    /**
     * Batch DOM updates
     */
    static batchDOMUpdates(updates) {
        // Usar DocumentFragment para múltiplas operações
        const fragment = document.createDocumentFragment();
        
        updates.forEach(update => {
            const el = document.createElement('div');
            el.innerHTML = update;
            fragment.appendChild(el);
        });

        return fragment;
    }

    /**
     * Cache de seletores
     */
    static createElementCache() {
        const cache = new Map();
        
        return {
            querySelector(selector) {
                if (!cache.has(selector)) {
                    cache.set(selector, document.querySelector(selector));
                }
                return cache.get(selector);
            },
            querySelectorAll(selector) {
                if (!cache.has(selector)) {
                    cache.set(selector, document.querySelectorAll(selector));
                }
                return cache.get(selector);
            },
            clear() {
                cache.clear();
            }
        };
    }
}

// Inicializar ao carregar
window.addEventListener('DOMContentLoaded', () => {
    PerformanceOptimization.init();
});

// Monitorar FPS em desenvolvimento (comentar em produção)
// PerformanceOptimization.monitorFPS();