class SaveSystem {
    static init() {
        this.maxSlots = 5;
    }

    static save(slot, gameState, config) {
        const saveData = {
            state: gameState,
            config: config,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(`save_slot_${slot}`, JSON.stringify(saveData));
        console.log(`💾 Jogo salvo no slot ${slot}`);
    }

    static load(slot) {
        const data = localStorage.getItem(`save_slot_${slot}`);
        return data ? JSON.parse(data) : null;
    }

    static deleteSave(slot) {
        localStorage.removeItem(`save_slot_${slot}`);
    }

    static autoSave(gameState) {
        const autoSaveData = {
            ...gameState,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('autosave', JSON.stringify(autoSaveData));
        console.log('💾 Auto-save realizado');
    }

    static saveEnding(endingId, finalStats) {
        const endings = JSON.parse(localStorage.getItem('endings') || '{}');
        endings[endingId] = {
            ...finalStats,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('endings', JSON.stringify(endings));
        console.log(`🎬 Final salvo: ${endingId}`);
    }

    static calculatePlayTime() {
        return 0; // Placeholder
    }
}