class SaveSystem {
    static init() {
        this.maxSlots = 15; // Aumentado de 5 para 15 slots
        this.storageKey = 'luna_saves';
        this.autoSaveInterval = 120000; // Auto-save a cada 2 minutos
        this.startAutoSave();
    }

    static save(slot, gameState, config) {
        if (slot > this.maxSlots) {
            console.error(`❌ Slot ${slot} inválido. Máximo: ${this.maxSlots}`);
            return false;
        }
        
        const saveData = {
            slot: slot,
            state: gameState,
            config: config,
            timestamp: new Date().toISOString(),
            playtime: gameState.stats?.playTime || 0,
            sceneName: gameState.currentScene,
            dayNumber: gameState.currentDay,
            sanityLevel: gameState.sanity,
            relationshipLevel: gameState.relationships?.luna || 0,
            achievements: JSON.parse(localStorage.getItem('achievements') || '[]'),
            inventory: JSON.parse(localStorage.getItem('inventory') || '[]')
        };
        localStorage.setItem(`save_slot_${slot}`, JSON.stringify(saveData));
        console.log(`💾 Jogo salvo no slot ${slot} - ${gameState.currentScene}`);
        return true;
    }

    static load(slot) {
        const data = localStorage.getItem(`save_slot_${slot}`);
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch (e) {
            console.error(`❌ Erro ao carregar slot ${slot}:`, e);
            return null;
        }
    }

    static getAllSaves() {
        const saves = [];
        for (let i = 1; i <= this.maxSlots; i++) {
            const save = this.load(i);
            if (save) saves.push(save);
        }
        return saves;
    }

    static getSaveInfo(slot) {
        const save = this.load(slot);
        if (!save) return null;
        return {
            slot: slot,
            scene: save.sceneName,
            day: save.dayNumber,
            sanity: save.sanityLevel,
            relationship: save.relationshipLevel,
            playtime: this.formatPlayTime(save.playtime),
            date: new Date(save.timestamp).toLocaleString(),
            achievements: save.achievements?.length || 0
        };
    }

    static formatPlayTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        if (hours > 0) return `${hours}h ${minutes % 60}m`;
        if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
        return `${seconds}s`;
    }

    static deleteSave(slot) {
        localStorage.removeItem(`save_slot_${slot}`);
        console.log(`🗑️ Slot ${slot} deletado`);
        return true;
    }

    static deleteAllSaves() {
        for (let i = 1; i <= this.maxSlots; i++) {
            this.deleteSave(i);
        }
        console.log('🗑️ Todos os saves deletados');
    }

    static autoSave(gameState) {
        const autoSaveData = {
            slot: 'autosave',
            state: gameState,
            timestamp: new Date().toISOString(),
            playtime: gameState.stats?.playTime || 0,
            sceneName: gameState.currentScene,
            dayNumber: gameState.currentDay
        };
        localStorage.setItem('autosave', JSON.stringify(autoSaveData));
        console.log('💾 Auto-save realizado');
    }

    static loadAutoSave() {
        const data = localStorage.getItem('autosave');
        return data ? JSON.parse(data) : null;
    }

    static startAutoSave() {
        if (typeof game !== 'undefined' && game) {
            setInterval(() => {
                if (game && game.state && document.getElementById('game')?.classList.contains('active')) {
                    this.autoSave(game.state);
                }
            }, this.autoSaveInterval);
        }
    }

    static saveEnding(endingId, finalStats) {
        const endings = JSON.parse(localStorage.getItem('endings') || '{}');
        endings[endingId] = {
            ...finalStats,
            timestamp: new Date().toISOString(),
            playtime: finalStats.playtime || 0,
            choices: finalStats.choicesMade || 0,
            achievements: finalStats.achievementsUnlocked || 0
        };
        localStorage.setItem('endings', JSON.stringify(endings));
        console.log(`🎬 Final salvo: ${endingId}`);
    }

    static getAllEndings() {
        return JSON.parse(localStorage.getItem('endings') || '{}');
    }

    static getStatistics() {
        const saves = this.getAllSaves();
        const endings = this.getAllEndings();
        
        return {
            totalSaves: saves.length,
            totalPlaytime: saves.reduce((sum, s) => sum + (s.playtime || 0), 0),
            averageSanity: saves.length > 0 ? Math.round(saves.reduce((sum, s) => sum + s.sanityLevel, 0) / saves.length) : 100,
            maxRelationship: saves.length > 0 ? Math.max(...saves.map(s => s.relationshipLevel)) : 0,
            endingsReached: Object.keys(endings).length,
            totalChoicesMade: saves.reduce((sum, s) => sum + (s.state?.stats?.choicesMade || 0), 0)
        };
    }

    static calculatePlayTime() {
        const saves = this.getAllSaves();
        return saves.reduce((sum, s) => sum + (s.playtime || 0), 0);
    }

    static exportSaves() {
        const allData = {
            saves: this.getAllSaves(),
            endings: this.getAllEndings(),
            achievements: JSON.parse(localStorage.getItem('achievements') || '[]'),
            exportDate: new Date().toISOString()
        };
        const dataStr = JSON.stringify(allData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `luna_saves_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        console.log('📥 Saves exportados');
    }

    static importSaves(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            if (data.saves && Array.isArray(data.saves)) {
                data.saves.forEach(save => {
                    if (save.slot) {
                        localStorage.setItem(`save_slot_${save.slot}`, JSON.stringify(save));
                    }
                });
                console.log('📤 Saves importados com sucesso');
                return true;
            }
        } catch (e) {
            console.error('❌ Erro ao importar saves:', e);
            return false;
        }
    }
}