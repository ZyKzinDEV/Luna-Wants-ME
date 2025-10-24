# 🎮 Luna Wants Me v2.0 - Console Commands

## Abra o Console do Navegador
**Windows/Linux**: `F12` ou `Ctrl+Shift+J`  
**Mac**: `Cmd+Option+J`  
**Depois clique na aba "Console"**

---

## 🧪 TESTES & VALIDAÇÃO

### Executar Todos os Testes
```javascript
testSuite.runAllTests()
```
✅ Valida todos os sistemas, funcionalidades e performance

### Teste Rápido (4 segundos)
```javascript
testSuite.quickTest()
```
✅ Validação rápida dos componentes principais

### Verificar Compatibilidade do Navegador
```javascript
testSuite.compatibilityTest()
```
✅ Mostra quais recursos estão disponíveis

---

## 🎮 CONTROLE DO JOGO

### Novo Jogo
```javascript
game.newGame()
```

### Carregar Cena Específica
```javascript
game.loadScene('cap1_investigation_room')
```

### Ir para Próxima Linha
```javascript
game.nextLine()
```

### Pular Minigame
```javascript
game.skipMinigame()
```

---

## 💾 SISTEMA DE SAVES

### Salvar em Slot 1
```javascript
SaveSystem.save(1, game.state, game.config)
```

### Carregar Slot 1
```javascript
const saveData = SaveSystem.load(1)
game.state = saveData.state
```

### Ver Todos os Saves
```javascript
console.table(SaveSystem.getAllSaves())
```

### Informações do Save 1
```javascript
console.table(SaveSystem.getSaveInfo(1))
```

### Obter Estatísticas Globais
```javascript
console.table(SaveSystem.getStatistics())
```

### Deletar Save (Slot 1)
```javascript
SaveSystem.deleteSave(1)
```

### Deletar TODOS os Saves ⚠️
```javascript
SaveSystem.deleteAllSaves()
```

### Exportar Saves para JSON
```javascript
SaveSystem.exportSaves()
// Um arquivo será baixado
```

### Ver Endings Alcançados
```javascript
console.table(SaveSystem.getAllEndings())
```

---

## 🎒 INVENTÁRIO

### Adicionar Item
```javascript
InventorySystem.addItem('mysterious_ring', {
    name: 'Anel Misterioso',
    description: 'Um anel que brilha no escuro',
    icon: '💍',
    rarity: 'épico',
    usable: true
})
```

### Ver Todos os Items
```javascript
console.table(InventorySystem.getAllItems())
```

### Verificar se Tem Item
```javascript
if (InventorySystem.hasItem('mysterious_ring')) {
    console.log('Tem o anel!')
}
```

### Usar Item
```javascript
InventorySystem.useItem('mysterious_ring', () => {
    console.log('Anel foi usado!')
})
```

### Remover Item
```javascript
InventorySystem.removeItem('mysterious_ring')
```

### Abrir/Fechar Inventário
```javascript
InventorySystem.toggle()
```

### Obter Quantidade de Items
```javascript
console.log(InventorySystem.getItemCount())
```

### Limpar Inventário Inteiro
```javascript
InventorySystem.clear()
```

---

## 🏆 ACHIEVEMENTS

### Desbloquear Achievement
```javascript
AchievementSystem.unlock('detective')
```

### Ver Todos os Achievements
```javascript
console.table(AchievementSystem.getAllAchievements())
```

### Total de Pontos
```javascript
console.log('Pontos totais:', AchievementSystem.getTotalPoints())
```

### Percentual de Conclusão
```javascript
console.log('Conclusão:', AchievementSystem.getCompletionPercentage() + '%')
```

### Abrir Galeria de Achievements
```javascript
AchievementSystem.showGallery()
```

### Desbloquear TODOS os Achievements
```javascript
AchievementSystem.unlockAll()
```

### Ver Achievement Específico
```javascript
console.table(AchievementSystem.getAchievementInfo('luna_lover'))
```

---

## 💕 RELACIONAMENTO & SANIDADE

### Modificar Relacionamento
```javascript
game.modifyRelationship('luna', 10)  // +10
game.modifyRelationship('luna', -5)  // -5
```

### Ver Nível de Relacionamento
```javascript
console.log(game.getRelationshipLevel('luna'))
// Retorna: 'obsessivo', 'apaixonado', 'amigavel', etc.
```

### Ver Valor Atual
```javascript
console.log(game.state.relationships.luna)
```

### Maxar Relacionamento
```javascript
game.state.relationships.luna = 100
```

### Minimizar Relacionamento
```javascript
game.state.relationships.luna = -100
```

### Modificar Sanidade
```javascript
game.changeSanity(-10)  // -10
game.changeSanity(20)   // +20
```

### Ver Sanidade Atual
```javascript
console.log(game.state.sanity)
```

### Sanidade Máxima
```javascript
game.state.sanity = 100
```

### Sanidade Mínima (Loucura)
```javascript
game.state.sanity = 0
```

---

## 🔊 ÁUDIO

### Tocar Música
```javascript
AudioManager.playMusic('normal')
AudioManager.playMusic('tense')
AudioManager.playMusic('menu')
```

### Parar Música
```javascript
AudioManager.stopMusic()
```

### Tocar Efeito Sonoro
```javascript
AudioManager.playSFX('click')
AudioManager.playSFX('error')
```

### Definir Volume da Música
```javascript
AudioManager.setMusicVolume(50)  // 0-100
```

### Definir Volume de Efeitos
```javascript
AudioManager.setSfxVolume(70)  // 0-100
```

### Mutar Áudio
```javascript
AudioManager.setMusicVolume(0)
AudioManager.setSfxVolume(0)
```

---

## 🖼️ UI & TELAS

### Abrir Menu de Pausa
```javascript
UI.togglePause()
```

### Abrir Tela de Saves
```javascript
UI.showScreen('saves')
```

### Abrir Configurações
```javascript
UI.showScreen('config')
```

### Abrir Créditos
```javascript
UI.showScreen('credits')
```

### Ir para Menu Principal
```javascript
UI.goToMenu()
```

### Voltar à Tela Anterior
```javascript
UI.goBack()
```

### Mostrar Notificação
```javascript
UI.showNotification('Você descobriu um segredo! 🔍', 'positive')
UI.showNotification('Erro ao carregar...', 'negative')
```

---

## 🎨 PERFORMANCE & EFEITOS

### Medir FPS Atual
```javascript
PerformanceOptimization.measureFPS()
```

### Ativar Lazy Loading
```javascript
PerformanceOptimization.enableLazyLoading()
```

### Limpar Cache de Imagens
```javascript
PerformanceOptimization.clearImageCache()
```

### Ver Estatísticas de Rendimento
```javascript
console.table(PerformanceOptimization.getPerformanceStats())
```

---

## 📊 ESTADO DO JOGO

### Ver Estado Completo
```javascript
console.table(game.state)
```

### Ver Configurações
```javascript
console.table(game.config)
```

### Ver Flags (Escolhas anteriores)
```javascript
console.table(game.state.flags)
```

### Ver Estatísticas
```javascript
console.table(game.state.stats)
```

### Ver Dia Atual
```javascript
console.log('Dia:', game.state.currentDay)
```

### Ver Nome do Jogador
```javascript
console.log('Nome:', game.state.playerName)
```

### Ver Cena Atual
```javascript
console.log('Cena:', game.state.currentScene)
```

---

## 🧩 EXPLORAÇÃO

### Iniciar Exploração
```javascript
ExplorationSystem.startExploration({
    name: 'Quarto',
    items: [
        { x: 50, y: 50, size: 40, item: '🔑 Chave', callback: () => console.log('Chave encontrada!') }
    ]
})
```

### Ver Hotspots Ativos
```javascript
console.table(ExplorationSystem.getActiveHotspots())
```

---

## 🐛 DEBUG & CHEATS

### Ativar Modo Debug
```javascript
localStorage.setItem('debug_mode', 'true')
```

### Desativar Modo Debug
```javascript
localStorage.removeItem('debug_mode')
```

### Ver Tudo Armazenado Localmente
```javascript
console.table(localStorage)
```

### Limpar Todo localStorage
```javascript
localStorage.clear()
```

### Maxar Tudo (Cheat Code 🎮)
```javascript
// Relacionamento máximo
game.state.relationships.luna = 100

// Sanidade máxima
game.state.sanity = 100

// Desbloquear todos achievements
AchievementSystem.unlockAll()

// Adicionar items ao inventário
InventorySystem.addItem('golden_key', { name: 'Chave Dourada', rarity: 'lendário' })
InventorySystem.addItem('luna_diary', { name: 'Diário de Luna', rarity: 'raro' })

// Marcar todas as flags
Object.keys(game.state.flags).forEach(flag => {
    game.state.flags[flag] = true
})

console.log('🎮 Cheat code ativado! Você é PODEROSO agora!')
```

### Resetar Jogo Completo
```javascript
localStorage.clear()
location.reload()
```

---

## 📱 RESPONSIVIDADE

### Simular Mobile (DevTools)
```javascript
// Abra DevTools (F12) > Device Toggle (Ctrl+Shift+M)
// Ou use:
PerformanceOptimization.measureFPS()
```

### Testar em Diferentes Resoluções
- **Desktop**: 1920x1080
- **Tablet**: 768x1024
- **Mobile**: 375x667
- **Mini**: 320x568

---

## 🎯 EXEMPLOS PRÁTICOS

### Completar Cena de Investigação
```javascript
game.loadScene('cap1_investigation_room')
// Clique em todos os hotspots para encontrar items
// Ao completar, desbloqueia achievement 'detective'
```

### Usar Item do Inventário
```javascript
// 1. Adicione um item
InventorySystem.addItem('mysterious_ring', {
    name: 'Anel Misterioso',
    icon: '💍',
    rarity: 'épico'
})

// 2. Abra o inventário
InventorySystem.toggle()

// 3. Clique no item para usar
```

### Ver Progresso Completo
```javascript
console.log('=== PROGRESSO ===')
console.log('Cena:', game.state.currentScene)
console.log('Dia:', game.state.currentDay)
console.log('Sanidade:', game.state.sanity + '%')
console.log('Relacionamento Luna:', game.state.relationships.luna)
console.log('Achievements:', AchievementSystem.getTotalPoints() + ' pontos')
console.log('Items:', InventorySystem.getItemCount() + '/20')
```

---

## ⚠️ CUIDADO COM ESTES COMANDOS

### ❌ Deletar Todos os Dados
```javascript
SaveSystem.deleteAllSaves()
localStorage.clear()
```

### ❌ Quebrar o Jogo
```javascript
game.state = null  // Não faça isto!
STORY = {}         // Não faça isto!
```

### ❌ Crash Performance
```javascript
// Criar milhares de items
for (let i = 0; i < 10000; i++) {
    InventorySystem.addItem('item_' + i, {...})
}
```

---

## 💡 DICAS ÚTEIS

1. **Salve frequentemente**: `SaveSystem.save(1, game.state, game.config)`

2. **Use console.table()** para visualizar dados estruturados

3. **Pressione Ctrl+L** para limpar console

4. **Use DevTools (F12)** para inspecionar elementos

5. **Abra Network Tab** para monitorar requests

6. **Use Application Tab** para ver localStorage

7. **Teste responsividade** com Device Toggle (Ctrl+Shift+M)

---

## 🔗 REFERÊNCIA RÁPIDA

| Comando | O Que Faz |
|---------|-----------|
| `testSuite.runAllTests()` | Valida tudo |
| `game.newGame()` | Novo jogo |
| `UI.showScreen('saves')` | Tela de saves |
| `InventorySystem.toggle()` | Abre inventário |
| `AchievementSystem.showGallery()` | Ver achievements |
| `AudioManager.playMusic('tense')` | Tocar música |
| `console.table(game.state)` | Ver estado |

---

**Última atualização**: v2.0  
**Status**: ✅ Funcional  
**Desenvolvido por**: Zencoder

Divirta-se! 🎮