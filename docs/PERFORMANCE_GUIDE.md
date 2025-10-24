# ⚡ Guia de Performance e Best Practices

---

## 🎯 Otimização de Performance

### Métrica de Performance Atual
```
advanceDay() sem transição:     ~0.3ms
advanceDay(true) com transição: ~0.8ms
updateDayDisplay():             ~0.2ms
showEnding() completo:          ~2-3ms
```

### Recomendações de Performance

#### ✅ Boas Práticas

1. **Usar `advanceDay(false)` quando possível**
   ```javascript
   // ✅ Bom - sem animação desnecessária
   game.advanceDay(false);
   
   // ⚠️ Ocasional - quando realmente necessário
   game.advanceDay(true);
   ```

2. **Memoizar Cálculos de Stats**
   ```javascript
   // ⚠️ Evitar: Calcular toda vez
   const accuracy = (correct / total) * 100;
   
   // ✅ Melhor: Armazenar em estado
   state.stats.minigameAccuracy = (correct / total) * 100;
   ```

3. **Lazy Load de Elementos DOM**
   ```javascript
   // ⚠️ Evitar: Procurar elemento toda vez
   static updateDayDisplay() {
       document.getElementById('current-day').textContent = '...';
   }
   
   // ✅ Melhor: Cache se usar frequentemente
   static dayElement = null;
   
   static updateDayDisplay() {
       if (!this.dayElement) {
           this.dayElement = document.getElementById('current-day');
       }
       this.dayElement.textContent = '...';
   }
   ```

#### ❌ Anti-Padrões a Evitar

1. **Loop infinito de `advanceDay()`**
   ```javascript
   // ❌ NUNCA FAÇA ISSO!
   while (true) {
       game.advanceDay(true); // Travará o navegador
   }
   ```

2. **Remover/Adicionar elemento DOM a cada atualização**
   ```javascript
   // ❌ Evitar: DOM thrashing
   const container = document.getElementById('stats');
   container.innerHTML = ''; // Remove
   container.innerHTML = generateHTML(); // Adiciona
   
   // ✅ Melhor: Atualizar apenas valores
   document.getElementById('day-value').textContent = day;
   document.getElementById('sanity-value').textContent = sanity;
   ```

3. **Múltiplas transições simultâneas**
   ```javascript
   // ❌ Evitar: Muitas animações ao mesmo tempo
   game.advanceDay(true);
   UI.playDayTransition();
   AudioManager.playSFX('click');
   UI.showNotification('...');
   
   // ✅ Melhor: Chamar advanceDay(true) que faz tudo
   game.advanceDay(true);
   ```

---

## 🔍 Profiling e Debugging

### Ferramentas de Profiling

**Chrome DevTools**
```javascript
// Medir performance
performance.mark('day-start');
game.advanceDay(true);
performance.mark('day-end');
performance.measure('day-advance', 'day-start', 'day-end');

console.table(performance.getEntriesByName('day-advance'));
```

**Resultado esperado**
```
name: "day-advance"
duration: ~0.8ms
```

### Debug Logging

```javascript
// Ativar logs detalhados
class PerformanceMonitor {
    static trackAdvanceDay() {
        const start = performance.now();
        game.advanceDay(true);
        const end = performance.now();
        
        console.log(`⏱️ advanceDay(true): ${(end - start).toFixed(2)}ms`);
    }
}
```

---

## 📊 Otimização de Memória

### Tamanho de SaveState
```javascript
{
    currentDay: 5,                    // ~8 bytes
    stats: {
        daysElapsed: 4,               // ~8 bytes
        playTime: 3600,               // ~8 bytes
        choicesMade: 25,              // ~8 bytes
        scenesViewed: [...],          // ~500 bytes (máx)
        minigamesCompleted: 10,       // ~8 bytes
        correctAnswers: 8             // ~8 bytes
    }
    // Total: ~500-600 bytes por save
    // Para 5 saves: ~3KB
}
```

### Limpeza de Memória

```javascript
// Limpar listeners não usados
if (this.dayTransitionListener) {
    document.removeEventListener('transition-end', this.dayTransitionListener);
    this.dayTransitionListener = null;
}

// Limpar timeouts
if (this.dayUpdateTimeout) {
    clearTimeout(this.dayUpdateTimeout);
    this.dayUpdateTimeout = null;
}
```

---

## 🎮 Otimização de Renderização

### CSS Rendering Performance

#### ✅ Otimizado
```css
#current-day {
    /* GPU-accelerated */
    transform: translateY(0);
    opacity: 1;
    will-change: transform, opacity;
}

@keyframes dayBadgeSlide {
    from { transform: translateY(-50px); }
    to { transform: translateY(0); }
}
```

#### ❌ Evitar
```css
#current-day {
    /* CPU-heavy */
    position: relative;
    top: 0;
    left: 0;
    width: auto;
}

@keyframes dayBadgeSlide {
    from { top: -50px; left: 0; }
    to { top: 0; left: 0; }
}
```

### Painting e Layout Thrashing

```javascript
// ❌ Evitar: Alternar read/write repetidamente
function inefficientUpdate() {
    element.style.width = element.offsetWidth + 100; // Read
    element.style.height = element.offsetHeight + 50; // Read
    element.style.left = element.offsetLeft + 10; // Read
}

// ✅ Melhor: Batch reads então writes
function efficientUpdate() {
    const width = element.offsetWidth;   // Read
    const height = element.offsetHeight; // Read
    const left = element.offsetLeft;     // Read
    
    element.style.width = width + 100;   // Write
    element.style.height = height + 50;  // Write
    element.style.left = left + 10;      // Write
}
```

---

## 🌐 Otimização em Dispositivos Móveis

### Estratégia de Performance Mobile

```javascript
// Detectar dispositivo
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

class MobileOptimizer {
    static init() {
        if (isMobile) {
            // Desativar animações pesadas
            document.documentElement.style.setProperty(
                '--animation-enabled', 'false'
            );
            
            // Reduzir qualidade visual
            document.getElementById('game').style.filter = 'none';
            
            // Simplificar transições
            document.documentElement.style.setProperty(
                '--transition-slow', '0.1s ease'
            );
        }
    }
}

MobileOptimizer.init();
```

### Redução de Animações

```css
/* Para Mobile */
@media (max-width: 768px) {
    #current-day {
        animation: none;
        transition: none;
    }
    
    .ending-stats {
        animation: none;
    }
}
```

---

## 🔋 Economia de Bateria

### Reduzir Consumo em Dispositivos Móveis

```javascript
// Pausar jogo quando abas não visível
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('⏸️ Jogo em background - pausando...');
        game.stopPlayTime(); // Não contar tempo
    } else {
        console.log('▶️ Jogo voltou - retomando...');
        game.startPlayTime();
    }
});
```

### Otimizar Loops

```javascript
// ❌ Evitar: Loop contínuo
setInterval(() => {
    UI.updateDayDisplay(); // Atualiza mesmo se não mudou
}, 100);

// ✅ Melhor: Atualizar apenas quando necessário
// updateDayDisplay() já é chamado apenas em advanceDay()
```

---

## 📈 Benchmark de Referência

### Tempos Esperados (Chrome Desktop)

| Operação | Tempo | Status |
|----------|-------|--------|
| `game.advanceDay(false)` | ~0.3ms | ✅ Rápido |
| `game.advanceDay(true)` | ~0.8ms | ✅ Aceitável |
| `UI.playDayTransition()` | ~0.5ms | ✅ Rápido |
| `UI.updateDayDisplay()` | ~0.2ms | ✅ Muito Rápido |
| `UI.showEnding()` | ~2-3ms | ✅ Aceitável |
| Renderização animação | 60fps | ✅ Suave |

### Tempos Esperados (Mobile)

| Operação | Tempo | Status |
|----------|-------|--------|
| `game.advanceDay(false)` | ~0.5ms | ✅ Bom |
| `game.advanceDay(true)` | ~1.5ms | ✅ Aceitável |
| UI updates | ~0.5ms | ✅ Bom |
| Renderização animação | 50-60fps | ✅ Aceitável |

---

## 🧠 Memory Leak Prevention

### Detecção de Vazamentos

```javascript
// Usar Chrome DevTools Memory Profiler
// 1. Abrir DevTools > Memory
// 2. Fazer heap snapshot inicial
// 3. Executar operações (advance day, etc)
// 4. Fazer heap snapshot final
// 5. Comparar - não deve haver crescimento significativo
```

### Common Memory Leaks em Game JS

```javascript
// ❌ VAZAMENTO: Event listener não removido
class BadExample {
    init() {
        document.addEventListener('click', this.handleClick); // Nunca removido
    }
}

// ✅ CORRETO: Cleanup apropriado
class GoodExample {
    init() {
        this.handleClick = this.handleClick.bind(this);
        document.addEventListener('click', this.handleClick);
    }
    
    cleanup() {
        document.removeEventListener('click', this.handleClick);
    }
}
```

---

## 🎯 Otimizações por Caso de Uso

### Caso 1: Muitos Dias Rápidos
```javascript
// ❌ Evitar: Animar cada dia
for (let i = 0; i < 10; i++) {
    game.advanceDay(true); // Animação 10x!
}

// ✅ Melhor: Animar apenas final
for (let i = 0; i < 10; i++) {
    game.advanceDay(false);
}
game.advanceDay(true); // Uma animação
```

### Caso 2: Stats Pesadas
```javascript
// ❌ Evitar: Recalcular tudo
function updateAllStats() {
    calculateAccuracy();
    calculateElapsedTime();
    calculateRelationships();
    recalculateScenes();
}

// ✅ Melhor: Cache values
const statsCache = {
    lastCalculated: 0,
    cached: {}
};

function getStats() {
    if (Date.now() - statsCache.lastCalculated > 1000) {
        statsCache.cached = calculateAllStats();
        statsCache.lastCalculated = Date.now();
    }
    return statsCache.cached;
}
```

### Caso 3: Muitos Saves
```javascript
// ❌ Evitar: Serializar tudo sempre
SaveSystem.autoSave(gameState); // Toda escolha

// ✅ Melhor: Throttle saves
const saveThrottle = 30000; // 30 segundos
SaveSystem.throttledSave(gameState, saveThrottle);
```

---

## ✅ Checklist de Otimização

Antes de fazer commit, verificar:

- [ ] Nenhum loop infinito criado
- [ ] Nenhum memory leak em animações
- [ ] Nenhuma atualização DOM desnecessária
- [ ] Eventos removidos no cleanup
- [ ] Timeouts limpos
- [ ] Performance > 50fps em mobile
- [ ] Tamanho de save < 1MB
- [ ] Console limpo (sem warnings)

---

## 📚 Recursos Adicionais

- [Web Performance APIs](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [CSS Animation Performance](https://web.dev/animations-guide/)
- [Mobile Performance Best Practices](https://web.dev/metrics/)

---

**Última atualização**: 2024
**Versão**: 1.0