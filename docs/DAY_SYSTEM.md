# 📅 Sistema de Dias - Documentação Completa

## Visão Geral

O sistema de dias permite rastrear a progressão do tempo ao longo do jogo. Cada dia é incrementado manualmente através de escolhas ou pontos específicos da história, oferecendo feedback visual ao jogador.

---

## 🎮 Uso Básico

### Avançando para o Próximo Dia

```javascript
// Avanço simples (sem animação visual)
game.advanceDay();

// Avanço com transição visual e som
game.advanceDay(true);
```

### Obtendo o Dia Atual

```javascript
const currentDay = game.getCurrentDay();
console.log(`Estamos no dia ${currentDay}`);
```

---

## 📖 Integração com Story.js

### Exemplo 1: Avanço em Escolhas

```javascript
choice: true,
options: [
    {
        text: '✅ Opção A',
        next: 'proxima_cena',
        effect: (state) => {
            state.flags.algumaflag = true;
            game.advanceDay(true); // Avança com transição
        },
        sanity: -10
    },
    {
        text: '❌ Opção B',
        next: 'outra_cena',
        effect: (state) => game.advanceDay(true),
        sanity: -5
    }
]
```

### Exemplo 2: Avanço em Transição de Cenas

```javascript
proxima_cena: [
    {
        name: 'Narrador',
        text: 'Dia 2: Terça-feira. Você acorda com mensagens de Luna no seu celular.',
        hidePortrait: true,
        // A próxima ação deve ser game.advanceDay()
    }
]
```

### Exemplo 3: Minijogos com Avanço de Dia

```javascript
{
    minigame: {
        type: 'logicPuzzle',
        questions: [...],
        callback: () => {
            game.advanceDay(true);
        }
    },
    skipDialogue: true
}
```

---

## 🎨 Animações e Transições

### playDayTransition()

Quando `game.advanceDay(true)` é chamado:

1. **Animação de Slide**: O indicador de dia desliza de cima para baixo (0.6s)
2. **Efeito de Glow**: O badge brilha com a cor primária (1.5s)
3. **Som**: Toca o efeito sonoro 'click'
4. **Notificação**: Exibe "📅 Dia X iniciado!" na tela

### Customizando a Animação

```javascript
static playDayTransition() {
    const dayElement = document.getElementById('current-day');
    
    // Limpar animação anterior
    dayElement.style.animation = 'none';
    void dayElement.offsetWidth; // Forçar reflow
    
    // Aplicar novas animações
    dayElement.style.animation = 'dayBadgeSlide 0.6s ease-out, dayBadgeGlow 1.5s ease-in-out 0.3s';
    
    // Som
    AudioManager.playSFX('click');
    
    // Notificação
    this.showNotification(`📅 Dia ${game.getCurrentDay()} iniciado!`, 'neutral');
}
```

---

## 🎯 Variáveis de Estado Relacionadas

### No `game.state`

```javascript
{
    currentDay: 1,              // Dia atual (começando em 1)
    stats: {
        daysElapsed: 0,         // Dias decorridos (dia atual - 1)
        playTime: 0,            // Tempo em segundos
        choicesMade: 0,
        scenesViewed: [],
        minigamesCompleted: 0,
        correctAnswers: 0
    }
}
```

### Cálculo de Dias Decorridos

```javascript
const daysElapsed = game.state.currentDay - 1;
// Dia 1 = 0 dias decorridos
// Dia 2 = 1 dia decorrido
// Dia 3 = 2 dias decorridos
```

---

## 📊 Estatísticas Finais

Na tela de final, as seguintes estatísticas são exibidas:

- **Sanidade Final**: Estado mental do jogador
- **Escolhas Feitas**: Total de decisões tomadas
- **Dias Decorridos**: `currentDay - 1`
- **Tempo de Jogo**: Convertido para formato "Xm Ys"
- **Minijogos**: Exibidos como "corretos/total (percentual%)"

### Exemplo de Dados Finais

```javascript
{
    daysElapsed: 5,              // 5 dias passaram
    minigamesCompleted: 8,
    correctAnswers: 7,
    relationshipLevel: 'obsessivo'
}
```

---

## ♿ Acessibilidade

### Preferência de Movimento Reduzido

O sistema respeita a preferência do usuário por movimento reduzido via `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

**Resultado**: Usuários com `prefers-reduced-motion: reduce` verão mudanças instantâneas sem animações.

---

## 🎬 Boas Práticas

### ✅ Faça

```javascript
// 1. Use transições visuais para marcar pontos importantes da história
game.advanceDay(true); // Quando a história avança significativamente

// 2. Atualize o texto narrativo para refletir o dia
text: `Dia ${game.getCurrentDay()}: Um novo começo...`

// 3. Use flags para implementar variações baseadas em dias
if (game.getCurrentDay() > 3 && !state.flags.lunaBraço) {
    // Luna fica mais agressiva após dia 3
}
```

### ❌ Evite

```javascript
// Não: Avançar de dia em todo clique
this.handleClick = () => {
    game.advanceDay(); // ❌ Errado! O jogo inteiro avança rápido demais
}

// Não: Usar `daysElapsed` quando precisa de `currentDay`
if (game.state.stats.daysElapsed === 1) {
    // ❌ Isso significa dia 2, não dia 1. Use currentDay!
}

// Não: Esquecer de sincronizar com mudanças de cena
nextScene: 'new_day' // Deveria ter game.advanceDay() aqui
```

---

## 🔧 Implementação Técnica

### Método `advanceDay()`

```javascript
advanceDay(showTransition = false) {
    this.state.currentDay++;
    this.state.stats.daysElapsed = this.state.currentDay - 1;
    
    console.log(`📅 Avançado para Dia ${this.state.currentDay}`);
    
    // Atualizar display
    UI.updateDayDisplay();
    
    // Animar transição se solicitado
    if (showTransition) {
        UI.playDayTransition();
    }
    
    // Auto-save
    SaveSystem.autoSave(this.state);
}
```

### Método `updateDayDisplay()`

```javascript
static updateDayDisplay() {
    const dayElement = document.getElementById('current-day');
    if (dayElement && game) {
        dayElement.textContent = `📅 Dia ${game.getCurrentDay()}`;
    }
}
```

### Animações CSS

```css
@keyframes dayBadgeSlide {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes dayBadgeGlow {
    0%, 100% {
        box-shadow: 0 0 20px rgba(255, 0, 110, 0.5), 
                    inset 0 0 20px rgba(255, 0, 110, 0.2);
    }
    50% {
        box-shadow: 0 0 40px rgba(255, 0, 110, 0.8), 
                    inset 0 0 30px rgba(255, 0, 110, 0.4);
    }
}
```

---

## 📱 Design Responsivo

O indicador de dia (`#current-day`) é posicionado no topo direito da tela:

```css
#game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    width: calc(100% - 40px);
    z-index: 100;
}

#current-day {
    font-size: 1.5em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--color-primary);
}
```

---

## 🐛 Troubleshooting

### "O dia não está avançando"
- Verifique se `game.advanceDay()` foi chamado na escolha/cena
- Procure por `console.log` com "Avançado para Dia"

### "A animação não está funcionando"
- Verifique se `#current-day` elemento existe no HTML
- Certifique-se de que as animações CSS estão carregadas
- Verifique `prefers-reduced-motion` no navegador

### "Os dias estão sendo resetados"
- O método `newGame()` reseta `currentDay` para 1 corretamente
- Verifique se auto-save está ativado: `game.config.autoSave = true`

---

## 📈 Futuras Melhorias

- [ ] Implementar diálogos específicos por dia de semana
- [ ] Adicionar mudanças de NPC baseadas em progresso de dias
- [ ] Criar ramificações de história condicionadas ao número de dias
- [ ] Implementar sistema de "dia repeat" para certos tipos de final
- [ ] Adicionar feedback visual mais elaborado para transições entre dias

---

**Última atualização**: 2024
**Versão**: 1.0