# ⚡ Guia Rápido - Sistema de Dias

## 🚀 30 Segundos para Começar

### Avançar de Dia
```javascript
game.advanceDay();           // Silenciosamente
game.advanceDay(true);       // Com animação + som
```

### Obter Dia Atual
```javascript
const day = game.getCurrentDay();
console.log(`Dia ${day}`);
```

### Em Story.js - Adicionar a Uma Escolha
```javascript
choice: true,
options: [
    {
        text: 'Sua opção',
        next: 'proxima_cena',
        effect: (state) => game.advanceDay(true)
    }
]
```

---

## 📊 Variáveis Importantes

| Variável | Tipo | Descrição |
|----------|------|-----------|
| `game.state.currentDay` | Number | Dia atual (começa em 1) |
| `game.state.stats.daysElapsed` | Number | Dias que passaram (currentDay - 1) |
| `game.state.stats.playTime` | Number | Segundos jogados |
| `game.state.stats.minigamesCompleted` | Number | Total de minijogos |
| `game.state.stats.correctAnswers` | Number | Respostas corretas |

---

## 🎨 Elementos CSS

```css
#current-day          /* Badge com número do dia */
#game-header          /* Container do header */
.ending-stats         /* Container de stats */
.stat-row             /* Linha de stats */
.stat-item            /* Item individual */
.stat-label           /* Rótulo do stat */
.stat-value           /* Valor do stat */
.ending-buttons       /* Container de botões finais */
```

---

## 🔊 Sons e Animações

```javascript
// Som padrão de transição
AudioManager.playSFX('click');

// Animações automáticas ao usar advanceDay(true)
// - dayBadgeSlide (0.6s)
// - dayBadgeGlow (1.5s)

// Notificação visual
UI.showNotification(`📅 Dia ${day} iniciado!`, 'neutral');
```

---

## 📱 Responsive Breakpoints

| Tamanho | Viewport | Coloca Stats |
|---------|----------|--------------|
| Desktop | > 1024px | 2-3 colunas |
| Tablet | 768-1024px | 2 colunas |
| Mobile | < 768px | 1 coluna |
| Pequeno | < 480px | 1 coluna (otimizado) |

---

## ♿ Acessibilidade

```javascript
// Automaticamente respeitado:
// Se usuário tem "prefers-reduced-motion: reduce"
// Animações ficam instantâneas (0.01ms)
```

---

## 🐛 Debug Rápido

```javascript
// Ver dia atual
console.log(`Dia: ${game.getCurrentDay()}`);

// Ver stats
console.log(game.state.stats);

// Forçar avanço
game.advanceDay(true);

// Ver se elemento existe
console.log(document.getElementById('current-day'));
```

---

## ✅ Checklist Básico

Ao integrar sistema de dias:

- [ ] Chamou `game.advanceDay()` em ponto certo
- [ ] Testou se o dia incrementa
- [ ] Testou se animação funciona (se `true`)
- [ ] Testou em mobile (responsividade)
- [ ] Testou que stats aparecem no final
- [ ] Testou que dados salvam

---

## 🔄 Ciclo Completo de Um Dia

1. **Player faz escolha** → `effect: (state) => game.advanceDay(true)`
2. **Sistema**: `currentDay++` e `daysElapsed = currentDay - 1`
3. **UI**: Badge desliza com som e notificação
4. **Save**: Estado salvo automaticamente
5. **Final**: Stats mostram dias decorridos

---

## 📋 Estrutura HTML Necessária

```html
<!-- Header com dia -->
<div id="game-header">
    <div id="sanity-bar">...</div>
    <div id="current-day">📅 Dia 1</div>
</div>

<!-- Tela de final com stats -->
<div id="ending">
    <div id="ending-title">...</div>
    <div id="ending-text">...</div>
    
    <div class="ending-stats">
        <!-- Row 1: Sanidade e Escolhas -->
        <div class="stat-row">
            <div class="stat-item">
                <div class="stat-label">Sanidade Final</div>
                <div class="stat-value" id="final-sanity">100</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Escolhas Feitas</div>
                <div class="stat-value" id="total-choices">0</div>
            </div>
        </div>
        
        <!-- Row 2: Dias e Tempo -->
        <div class="stat-row">
            <div class="stat-item">
                <div class="stat-label">Dias Decorridos</div>
                <div class="stat-value" id="total-days">0</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Tempo de Jogo</div>
                <div class="stat-value" id="play-time">0m 0s</div>
            </div>
        </div>
        
        <!-- Row 3: Minijogos (Full Width) -->
        <div class="stat-row">
            <div class="stat-item stat-full">
                <div class="stat-label">Minijogos Concluídos</div>
                <div class="stat-value" id="minigames-total">0/0 (0%)</div>
            </div>
        </div>
    </div>
    
    <!-- Botões de Ação -->
    <div class="ending-buttons">
        <button onclick="UI.goToMenu()">Menu</button>
        <button onclick="UI.replayGame()">Novo Jogo</button>
    </div>
</div>
```

---

## 🎯 Exemplos Prontos para Copiar/Colar

### Exemplo 1: Escolha Simples
```javascript
{
    text: 'Continuar',
    next: 'proxima_cena',
    effect: (state) => game.advanceDay(true),
    sanity: -5
}
```

### Exemplo 2: Minijogo
```javascript
{
    minigame: {
        type: 'logicPuzzle',
        questions: [/* ... */],
        callback: () => game.advanceDay(true)
    }
}
```

### Exemplo 3: Verificação Condicional
```javascript
if (game.getCurrentDay() > 3) {
    // Dia 4 ou mais
    luna.setPortrait('dark');
    game.modifyRelationship('luna', -10);
}
```

---

## 🔗 Links Importantes

- Documentação Completa: `docs/DAY_SYSTEM.md`
- Resumo de Implementação: `docs/IMPLEMENTATION_SUMMARY.md`
- Guia de Performance: `docs/PERFORMANCE_GUIDE.md`
- Código Principal: `js/game.js`, `js/ui.js`, `js/story.js`

---

## 💡 Dicas Úteis

1. **Visualizar o dia em tempo real** → Abra DevTools, confira `#current-day`
2. **Testar animações** → Use DevTools > Animation inspector
3. **Testar mobile** → F12 → Device toggle (Ctrl+Shift+M)
4. **Ver console logs** → Procure por emojis "📅" ou "🌅"
5. **Limpar cache** → Ctrl+Shift+Delete no Chrome

---

## ⚠️ Erros Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| Dia não incrementa | `advanceDay()` não foi chamado | Adicionar em `effect:` |
| Animação não funciona | Elemento `#current-day` não existe | Verificar HTML |
| Stats mostram 0 | `daysElapsed` não sincronizado | Já automático em `advanceDay()` |
| Sons não tocam | `AudioManager` não carregado | Verificar console |
| Layout quebrado mobile | CSS não carregou | F5 hard refresh (Ctrl+Shift+R) |

---

**Sempre consulte a documentação completa para casos avançados!**

**Última atualização**: 2024