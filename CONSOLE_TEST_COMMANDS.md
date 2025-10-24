# 🧪 COMANDOS PARA TESTAR NO CONSOLE DO NAVEGADOR

## Para Abrir o Console
- **Chrome/Firefox/Edge:** Pressione `F12` ou `Ctrl+Shift+I`
- **Guia:** Console

---

## 🧪 TESTE 1: Verificar Menu Stack

```javascript
// Simular abertura de pause
UI.togglePause();

// Verificar stack (deve estar ['pause'])
console.log('Stack atual:', UI.menuStack);
console.log('Pause aberto:', UI.pauseIsOpen);
```

**Esperado:**
```
Stack atual: ['pause']
Pause aberto: true
```

---

## 🧪 TESTE 2: Abrir Saves como Overlay

```javascript
// Com pause aberto
UI.showMenuOverlay('saves');

// Verificar stack (deve estar ['pause', 'saves'])
console.log('Stack:', UI.menuStack);
```

**Esperado:**
```
Stack: ['pause', 'saves']
```

---

## 🧪 TESTE 3: Voltar de Saves

```javascript
// Com saves aberto
UI.goBack();

// Verificar stack (deve voltar para ['pause'])
console.log('Stack após goBack():', UI.menuStack);
```

**Esperado:**
```
Stack após goBack(): ['pause']
```

---

## 🧪 TESTE 4: Proteção Contra Múltiplos Achievements

```javascript
// Com pause aberto
UI.showAchievementsOverlay();
console.log('Stack após 1ª abertura:', UI.menuStack);

// Tentar abrir de novo
UI.showAchievementsOverlay();
console.log('Stack após 2ª tentativa (deve ser igual):', UI.menuStack);
```

**Esperado:**
```
Stack após 1ª abertura: ['pause', 'achievements-overlay']
Stack após 2ª tentativa (deve ser igual): ['pause', 'achievements-overlay']
(NÃO deve adicionar duplicata!)
```

---

## 🧪 TESTE 5: Fechar Pause com Overlay

```javascript
// Com overlay aberto
console.log('Stack antes:', UI.menuStack);
console.log('Pause antes:', UI.pauseIsOpen);

// Fechar pause
UI.togglePause();

console.log('Stack depois:', UI.menuStack);
console.log('Pause depois:', UI.pauseIsOpen);
```

**Esperado:**
```
Stack antes: ['pause', 'saves']
Pause antes: true
Stack depois: []
Pause depois: false
```

---

## 🧪 TESTE 6: Abrir Config Depois de Saves

```javascript
// Com saves aberto: ['pause', 'saves']
UI.showMenuOverlay('config');

console.log('Stack com ambos:', UI.menuStack);

// Voltar
UI.goBack();
console.log('Após 1º goBack():', UI.menuStack);

// Voltar novamente
UI.goBack();
console.log('Após 2º goBack():', UI.menuStack);
```

**Esperado:**
```
Stack com ambos: ['pause', 'saves', 'config']
Após 1º goBack(): ['pause', 'saves']
Após 2º goBack(): ['pause']
```

---

## 🧪 TESTE 7: Inventário como Overlay

```javascript
// Com pause aberto
UI.showInventoryOverlay();
console.log('Stack com inventory:', UI.menuStack);

// Tentar abrir de novo
UI.showInventoryOverlay();
console.log('Stack após 2ª tentativa:', UI.menuStack);
```

**Esperado:**
```
Stack com inventory: ['pause', 'inventory-overlay']
Stack após 2ª tentativa: ['pause', 'inventory-overlay']
(NÃO deve duplicar!)
```

---

## 🎯 RESUMO DOS TESTES

Se todos os testes passarem, os bugs foram CORRIGIDOS:

✅ **BUG 1** - Múltiplos achievements: TESTE 4
✅ **BUG 2** - Overlays em cima do pause: TESTE 2 (visual no jogo)
✅ **BUG 3** - Back de saves indo para créditos: TESTE 3
✅ **BUG 4** - Back de config começando jogo: TESTE 6

---

## 📋 COMO FAZER O TESTE COMPLETO

1. Abra a página do jogo
2. Pressione `F12` para abrir console
3. Vá para a guia "Console"
4. Execute os testes 1-7 acima, um por um
5. Verifique que todos os "Esperado" correspondem

**Resultado:** Todos devem estar ✅ CORRETOS

---

## 💡 DICA: Se Algo Não Funcionar

Execute isso para resetar:
```javascript
UI.menuStack = [];
UI.pauseIsOpen = false;
UI.togglePause(); // Fechar pause
console.log('Resetado!');
```
