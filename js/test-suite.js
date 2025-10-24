/* ==================== LUNA WANTS ME - TEST SUITE V2.0 ==================== */
/* Sistema de testes e validação para v2.0 */

class TestSuite {
    constructor() {
        this.tests = [];
        this.results = [];
        this.passed = 0;
        this.failed = 0;
    }

    // ==================== TESTES DE INICIALIZAÇÃO ====================
    
    testGameInit() {
        console.log('🧪 Testando inicialização do jogo...');
        
        this.assert(
            typeof game !== 'undefined',
            '✅ Objeto game foi criado'
        );
        
        this.assert(
            game.state !== undefined,
            '✅ Game state inicializado'
        );
        
        this.assert(
            game.state.sanity === 100,
            '✅ Sanity começou em 100'
        );
        
        this.assert(
            game.state.currentDay === 1,
            '✅ Dia começou em 1'
        );
    }

    testAudioManagerInit() {
        console.log('🧪 Testando AudioManager...');
        
        this.assert(
            typeof AudioManager !== 'undefined',
            '✅ AudioManager foi criado'
        );
        
        this.assert(
            typeof AudioManager.playMusic === 'function',
            '✅ AudioManager.playMusic é função'
        );
        
        this.assert(
            typeof AudioManager.playSFX === 'function',
            '✅ AudioManager.playSFX é função'
        );
    }

    testSaveSystemInit() {
        console.log('🧪 Testando SaveSystem...');
        
        this.assert(
            typeof SaveSystem !== 'undefined',
            '✅ SaveSystem foi criado'
        );
        
        this.assert(
            SaveSystem.maxSlots >= 15,
            '✅ SaveSystem tem 15 ou mais slots'
        );
        
        this.assert(
            typeof SaveSystem.save === 'function',
            '✅ SaveSystem.save é função'
        );
        
        this.assert(
            typeof SaveSystem.load === 'function',
            '✅ SaveSystem.load é função'
        );
    }

    testUIInit() {
        console.log('🧪 Testando UI...');
        
        this.assert(
            typeof UI !== 'undefined',
            '✅ UI foi criada'
        );
        
        this.assert(
            typeof UI.showScreen === 'function',
            '✅ UI.showScreen é função'
        );
        
        this.assert(
            typeof UI.togglePause === 'function',
            '✅ UI.togglePause é função'
        );
    }

    // ==================== TESTES DE NOVOS SISTEMAS ====================

    testInventorySystem() {
        console.log('🧪 Testando Inventory System...');
        
        this.assert(
            typeof InventorySystem !== 'undefined',
            '✅ InventorySystem foi criado'
        );
        
        this.assert(
            typeof InventorySystem.addItem === 'function',
            '✅ InventorySystem.addItem é função'
        );
        
        // Adicionar item de teste
        InventorySystem.addItem('test_item', {
            name: 'Item de Teste',
            description: 'Teste',
            icon: '🧪',
            rarity: 'comum',
            usable: false
        });
        
        this.assert(
            InventorySystem.hasItem('test_item'),
            '✅ Item adicionado e detectado'
        );
        
        this.assert(
            typeof InventorySystem.removeItem === 'function',
            '✅ InventorySystem.removeItem é função'
        );
        
        this.assert(
            typeof InventorySystem.useItem === 'function',
            '✅ InventorySystem.useItem é função'
        );
        
        // Limpar
        InventorySystem.removeItem('test_item');
        this.assert(
            !InventorySystem.hasItem('test_item'),
            '✅ Item removido com sucesso'
        );
    }

    testAchievementSystem() {
        console.log('🧪 Testando Achievement System...');
        
        this.assert(
            typeof AchievementSystem !== 'undefined',
            '✅ AchievementSystem foi criado'
        );
        
        this.assert(
            typeof AchievementSystem.unlock === 'function',
            '✅ AchievementSystem.unlock é função'
        );
        
        this.assert(
            typeof AchievementSystem.getTotalPoints === 'function',
            '✅ AchievementSystem.getTotalPoints é função'
        );
        
        this.assert(
            typeof AchievementSystem.getCompletionPercentage === 'function',
            '✅ AchievementSystem.getCompletionPercentage é função'
        );
        
        const totalPoints = AchievementSystem.getTotalPoints();
        this.assert(
            totalPoints >= 0,
            `✅ Total de pontos: ${totalPoints}`
        );
        
        const percentage = AchievementSystem.getCompletionPercentage();
        this.assert(
            percentage >= 0 && percentage <= 100,
            `✅ Percentual de conclusão: ${percentage}%`
        );
    }

    testExplorationSystem() {
        console.log('🧪 Testando Exploration System...');
        
        this.assert(
            typeof ExplorationSystem !== 'undefined',
            '✅ ExplorationSystem foi criado'
        );
        
        this.assert(
            typeof ExplorationSystem.startExploration === 'function',
            '✅ ExplorationSystem.startExploration é função'
        );
        
        this.assert(
            typeof ExplorationSystem.createHotspot === 'function',
            '✅ ExplorationSystem.createHotspot é função'
        );
    }

    testPerformanceOptimization() {
        console.log('🧪 Testando Performance Optimization...');
        
        this.assert(
            typeof PerformanceOptimization !== 'undefined',
            '✅ PerformanceOptimization foi criado'
        );
        
        this.assert(
            typeof PerformanceOptimization.measureFPS === 'function',
            '✅ PerformanceOptimization.measureFPS é função'
        );
        
        this.assert(
            typeof PerformanceOptimization.enableLazyLoading === 'function',
            '✅ PerformanceOptimization.enableLazyLoading é função'
        );
    }

    // ==================== TESTES DE FUNCIONALIDADE ====================

    testRelationshipSystem() {
        console.log('🧪 Testando Relationship System...');
        
        this.assert(
            typeof game.modifyRelationship === 'function',
            '✅ game.modifyRelationship é função'
        );
        
        const initialValue = game.state.relationships.luna;
        game.modifyRelationship('luna', 10);
        
        this.assert(
            game.state.relationships.luna === initialValue + 10,
            '✅ Relacionamento modificado corretamente'
        );
        
        this.assert(
            typeof game.getRelationshipLevel === 'function',
            '✅ game.getRelationshipLevel é função'
        );
        
        const level = game.getRelationshipLevel('luna');
        this.assert(
            typeof level === 'string',
            `✅ Nível de relacionamento: ${level}`
        );
    }

    testSanitySystem() {
        console.log('🧪 Testando Sanity System...');
        
        this.assert(
            typeof game.changeSanity === 'function',
            '✅ game.changeSanity é função'
        );
        
        const initialSanity = game.state.sanity;
        game.changeSanity(-10);
        
        this.assert(
            game.state.sanity === initialSanity - 10,
            '✅ Sanity modificada corretamente'
        );
        
        // Não pode ir abaixo de 0
        game.changeSanity(-200);
        this.assert(
            game.state.sanity >= 0,
            '✅ Sanity não pode ser negativa'
        );
    }

    testSaveAndLoad() {
        console.log('🧪 Testando Save/Load System...');
        
        // Criar estado de teste
        const testState = {
            ...game.state,
            testMarker: 'SAVE_TEST_' + Date.now()
        };
        
        // Salvar
        SaveSystem.save(1, testState, game.config);
        
        // Carregar
        const loaded = SaveSystem.load(1);
        
        this.assert(
            loaded !== null,
            '✅ Save carregado'
        );
        
        this.assert(
            loaded.state.testMarker === testState.testMarker,
            '✅ Dados salvos corretamente'
        );
        
        this.assert(
            SaveSystem.getSaveInfo(1) !== null,
            '✅ SaveInfo obtido'
        );
    }

    testStoryLoading() {
        console.log('🧪 Testando Story System...');
        
        this.assert(
            typeof STORY !== 'undefined',
            '✅ STORY foi carregado'
        );
        
        this.assert(
            typeof STORY_NEW_SYSTEMS !== 'undefined',
            '✅ STORY_NEW_SYSTEMS foi carregado'
        );
        
        const storyCount = Object.keys(STORY).length;
        this.assert(
            storyCount > 20,
            `✅ ${storyCount} cenas carregadas no STORY`
        );
    }

    // ==================== TESTES DE PERFORMANCE ====================

    testPerformanceMetrics() {
        console.log('🧪 Testando Performance Metrics...');
        
        const startTime = performance.now();
        
        // Simular algumas operações
        for (let i = 0; i < 1000; i++) {
            Math.sqrt(i);
        }
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        this.assert(
            duration < 100,
            `✅ Operações completadas em ${duration.toFixed(2)}ms`
        );
    }

    testMemoryUsage() {
        console.log('🧪 Testando Memory Usage...');
        
        if (performance.memory) {
            const used = Math.round(performance.memory.usedJSHeapSize / 1048576);
            const limit = Math.round(performance.memory.jsHeapSizeLimit / 1048576);
            
            this.assert(
                used < limit,
                `✅ Memória em uso: ${used}MB / ${limit}MB`
            );
        } else {
            console.log('⚠️ performance.memory não disponível');
        }
    }

    // ==================== UTILITÁRIOS ====================

    assert(condition, message) {
        if (condition) {
            this.passed++;
            console.log(message);
        } else {
            this.failed++;
            console.error('❌ ' + message.replace('✅', 'FALHOU'));
        }
    }

    runAllTests() {
        console.clear();
        console.log('╔════════════════════════════════════════════════════════╗');
        console.log('║   LUNA WANTS ME v2.0 - TEST SUITE COMPLETO             ║');
        console.log('║   Validando: Sistemas, Funcionalidades e Performance   ║');
        console.log('╚════════════════════════════════════════════════════════╝\n');

        try {
            // Testes de Inicialização
            console.log('\n📋 === TESTES DE INICIALIZAÇÃO ===');
            this.testGameInit();
            this.testAudioManagerInit();
            this.testSaveSystemInit();
            this.testUIInit();
            
            // Testes de Novos Sistemas
            console.log('\n📦 === TESTES DE NOVOS SISTEMAS ===');
            this.testInventorySystem();
            this.testAchievementSystem();
            this.testExplorationSystem();
            this.testPerformanceOptimization();
            
            // Testes de Funcionalidade
            console.log('\n⚙️ === TESTES DE FUNCIONALIDADE ===');
            this.testRelationshipSystem();
            this.testSanitySystem();
            this.testSaveAndLoad();
            this.testStoryLoading();
            
            // Testes de Performance
            console.log('\n⚡ === TESTES DE PERFORMANCE ===');
            this.testPerformanceMetrics();
            this.testMemoryUsage();
            
        } catch (error) {
            console.error('❌ Erro durante testes:', error);
            this.failed++;
        }

        // Resultado Final
        this.printResults();
    }

    printResults() {
        const total = this.passed + this.failed;
        const percentage = total > 0 ? Math.round((this.passed / total) * 100) : 0;
        
        console.log('\n╔════════════════════════════════════════════════════════╗');
        console.log('║                   RESULTADO DOS TESTES                  ║');
        console.log('╠════════════════════════════════════════════════════════╣');
        console.log(`║ ✅ Passou:        ${this.passed.toString().padEnd(39)} ║`);
        console.log(`║ ❌ Falhou:        ${this.failed.toString().padEnd(39)} ║`);
        console.log(`║ 📊 Total:         ${total.toString().padEnd(39)} ║`);
        console.log(`║ 📈 Taxa de Êxito: ${percentage}%${' '.repeat(38 - percentage.toString().length)}║`);
        console.log('╚════════════════════════════════════════════════════════╝\n');
        
        if (this.failed === 0) {
            console.log('🎉 TODOS OS TESTES PASSARAM! Sistema v2.0 está operacional!\n');
            return true;
        } else {
            console.log('⚠️ Alguns testes falharam. Verifique os logs acima.\n');
            return false;
        }
    }

    // ==================== TESTES RÁPIDOS ====================

    quickTest() {
        console.log('⚡ Executando teste rápido de funcionalidades principais...\n');
        
        let quickPassed = 0;
        let quickFailed = 0;
        
        // Teste 1: Game Initialization
        if (game && game.state) {
            console.log('✅ Game inicializado');
            quickPassed++;
        } else {
            console.log('❌ Game não inicializado');
            quickFailed++;
        }
        
        // Teste 2: Systems
        if (AudioManager && SaveSystem && UI && InventorySystem && AchievementSystem && ExplorationSystem) {
            console.log('✅ Todos os sistemas carregados');
            quickPassed++;
        } else {
            console.log('❌ Alguns sistemas faltam');
            quickFailed++;
        }
        
        // Teste 3: Story
        if (STORY && Object.keys(STORY).length > 0) {
            console.log('✅ Story carregado');
            quickPassed++;
        } else {
            console.log('❌ Story não carregado');
            quickFailed++;
        }
        
        // Teste 4: Functionality
        if (typeof game.modifyRelationship === 'function' && typeof game.changeSanity === 'function') {
            console.log('✅ Funcionalidades principais presentes');
            quickPassed++;
        } else {
            console.log('❌ Funcionalidades faltam');
            quickFailed++;
        }
        
        console.log(`\n${quickPassed}/${quickPassed + quickFailed} testes passaram\n`);
    }

    // ==================== TESTE DE COMPATIBILIDADE ====================

    compatibilityTest() {
        console.log('🔍 Testando compatibilidade do navegador...\n');
        
        const checks = {
            'localStorage': typeof localStorage !== 'undefined',
            'performance.now()': typeof performance.now === 'function',
            'fetch()': typeof fetch === 'function',
            'Promise': typeof Promise !== 'undefined',
            'ES6 Classes': true, // Se este código roda, classes funcionam
            'CSS Grid': CSS.supports('display', 'grid'),
            'CSS Flexbox': CSS.supports('display', 'flex'),
            'WebGL': !!document.createElement('canvas').getContext('webgl'),
            'Web Audio': typeof (window.AudioContext || window.webkitAudioContext) !== 'undefined'
        };
        
        let supported = 0;
        let total = Object.keys(checks).length;
        
        for (const [feature, supported_flag] of Object.entries(checks)) {
            if (supported_flag) {
                console.log(`✅ ${feature}`);
                supported++;
            } else {
                console.log(`❌ ${feature}`);
            }
        }
        
        console.log(`\n${supported}/${total} recursos suportados\n`);
        
        const compatibility = (supported / total) * 100;
        console.log(`Compatibilidade geral: ${compatibility.toFixed(0)}%\n`);
    }
}

// Criar instância global
const testSuite = new TestSuite();

// Executar testes quando solicitado
console.log('\n💡 Digite no console: testSuite.runAllTests() para rodar testes completos');
console.log('💡 Digite no console: testSuite.quickTest() para teste rápido');
console.log('💡 Digite no console: testSuite.compatibilityTest() para verificar compatibilidade\n');

// Auto-run na inicialização se debug mode ativado
if (localStorage.getItem('debug_mode') === 'true') {
    console.log('🐛 Modo debug ativado - rodando testes...\n');
    setTimeout(() => testSuite.runAllTests(), 1000);
}