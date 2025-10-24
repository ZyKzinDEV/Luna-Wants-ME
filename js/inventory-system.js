/* ==================== INVENTORY SYSTEM ==================== */
/* Sistema de inventário e itens */

class InventorySystem {
    static init() {
        console.log('🎒 Inicializando Sistema de Inventário...');
        this.items = new Map();
        this.maxCapacity = 20;
        this.ui = null;
        this.isOpen = false;
    }

    /**
     * Adiciona item ao inventário
     * @param {string} itemId - ID do item
     * @param {Object} itemData - {name, description, icon, rarity, usable}
     * @param {number} quantity - Quantidade
     */
    static addItem(itemId, itemData, quantity = 1) {
        if (this.getTotalItems() >= this.maxCapacity && !this.items.has(itemId)) {
            UI.showNotification('❌ Inventário cheio!', 'error');
            console.log('🚫 Inventário cheio!');
            return false;
        }

        if (this.items.has(itemId)) {
            const item = this.items.get(itemId);
            item.quantity += quantity;
        } else {
            this.items.set(itemId, {
                ...itemData,
                id: itemId,
                quantity: quantity,
                addedAt: Date.now()
            });
        }

        console.log(`✅ Item adicionado: ${itemData.name} (${quantity}x)`);
        AudioManager.playSFX('item');
        UI.showNotification(`📦 Encontrado: ${itemData.name}!`, 'success');
        
        game.state.stats.minigamesCompleted++;
        
        return true;
    }

    /**
     * Remove item do inventário
     */
    static removeItem(itemId, quantity = 1) {
        if (!this.items.has(itemId)) return false;

        const item = this.items.get(itemId);
        item.quantity -= quantity;

        if (item.quantity <= 0) {
            this.items.delete(itemId);
        }

        console.log(`🗑️ Item removido: ${itemId}`);
        AudioManager.playSFX('pop');
        return true;
    }

    /**
     * Usa um item do inventário
     */
    static useItem(itemId, callback) {
        if (!this.items.has(itemId)) {
            UI.showNotification('❌ Item não encontrado!', 'error');
            return false;
        }

        const item = this.items.get(itemId);
        
        if (!item.usable) {
            UI.showNotification('❌ Este item não pode ser usado!', 'error');
            return false;
        }

        console.log(`🔧 Usando item: ${item.name}`);
        
        // Animar uso
        const effect = document.createElement('div');
        effect.className = 'item-use-effect';
        effect.innerHTML = `<div class="effect-popup">Usando: ${item.name}</div>`;
        document.body.appendChild(effect);

        AudioManager.playSFX('click');
        
        setTimeout(() => {
            effect.classList.add('active');
        }, 50);

        setTimeout(() => {
            this.removeItem(itemId, 1);
            if (callback) callback();
            effect.remove();
            this.updateUI();
        }, 500);

        return true;
    }

    /**
     * Obtém item do inventário
     */
    static getItem(itemId) {
        return this.items.get(itemId);
    }

    /**
     * Verifica se tem item
     */
    static hasItem(itemId, quantity = 1) {
        const item = this.items.get(itemId);
        return item && item.quantity >= quantity;
    }

    /**
     * Retorna total de itens
     */
    static getTotalItems() {
        let total = 0;
        this.items.forEach(item => {
            total += item.quantity;
        });
        return total;
    }

    /**
     * Retorna todos os itens
     */
    static getAllItems() {
        return Array.from(this.items.values());
    }

    /**
     * Abre/fecha o inventário
     */
    static toggle() {
        if (this.isOpen) {
            this.closeInventory();
        } else {
            this.openInventory();
        }
    }

    static openInventory() {
        console.log('📂 Abrindo inventário...');
        
        // Proteção contra múltiplas aberturas
        if (this.isOpen && document.getElementById('inventory-panel')) {
            console.log('⚠️ Inventário já está aberto');
            return;
        }
        
        this.isOpen = true;
        this.createInventoryUI();
        
        const inventory = document.getElementById('inventory-panel');
        if (inventory) {
            inventory.classList.add('active');
            AudioManager.playSFX('click');
        }
    }

    static openInventoryAsOverlay() {
        console.log('📂 Abrindo inventário como overlay...');
        
        // Proteção contra múltiplas aberturas
        if (document.getElementById('inventory-panel')) {
            console.log('⚠️ Inventário já está aberto');
            return;
        }
        
        this.isOpen = true;
        this.createInventoryUI();
        
        const inventory = document.getElementById('inventory-panel');
        if (inventory) {
            inventory.classList.add('overlay-mode');
            inventory.style.zIndex = '1001';
            inventory.classList.add('active');
            AudioManager.playSFX('click');
        }
    }

    static closeInventory() {
        console.log('📂 Fechando inventário...');
        this.isOpen = false;
        
        const inventory = document.getElementById('inventory-panel');
        if (inventory) {
            inventory.classList.remove('active');
            setTimeout(() => {
                inventory?.remove?.();
            }, 300);
        }
    }

    static createInventoryUI() {
        if (document.getElementById('inventory-panel')) {
            return;
        }

        const items = this.getAllItems();
        const totalItems = this.getTotalItems();

        const panel = document.createElement('div');
        panel.id = 'inventory-panel';
        panel.className = 'inventory-panel';
        panel.innerHTML = `
            <div class="inventory-content">
                <div class="inventory-header">
                    <h2>🎒 Inventário</h2>
                    <span class="inventory-capacity">${totalItems}/${this.maxCapacity}</span>
                    <button class="inventory-close" onclick="if(document.getElementById('pause-menu').classList.contains('active')) UI.goBack(); else InventorySystem.closeInventory()">✕</button>
                </div>

                <div class="inventory-search">
                    <input type="text" id="inventory-search" placeholder="🔍 Procurar..." 
                           oninput="InventorySystem.filterItems(this.value)">
                </div>

                <div class="inventory-grid" id="inventory-grid">
                    ${this.generateItemsHTML(items)}
                </div>

                ${items.length === 0 ? '<div class="inventory-empty">Seu inventário está vazio...</div>' : ''}
            </div>
        `;

        // Aplicar estilos
        this.applyInventoryStyles();

        document.body.appendChild(panel);
        
        setTimeout(() => {
            panel.classList.add('active');
        }, 50);
    }

    static generateItemsHTML(items) {
        return items.map(item => `
            <div class="inventory-item" data-item-id="${item.id}">
                <div class="item-icon" style="background-color: ${this.getRarityColor(item.rarity)}">
                    ${item.icon || '📦'}
                </div>
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <span class="item-quantity">x${item.quantity}</span>
                </div>
                <div class="item-actions">
                    ${item.usable ? `<button class="item-btn use-btn" onclick="InventorySystem.useItem('${item.id}')">Usar</button>` : ''}
                    <button class="item-btn drop-btn" onclick="InventorySystem.dropItem('${item.id}')">Soltar</button>
                </div>
            </div>
        `).join('');
    }

    static filterItems(query) {
        const items = this.getAllItems().filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );

        const grid = document.getElementById('inventory-grid');
        if (grid) {
            grid.innerHTML = items.length > 0 
                ? this.generateItemsHTML(items)
                : '<div class="inventory-empty">Nenhum item encontrado...</div>';
        }
    }

    static dropItem(itemId) {
        this.removeItem(itemId, 1);
        const item = this.getItem(itemId);
        
        if (!item || item.quantity <= 0) {
            const element = document.querySelector(`[data-item-id="${itemId}"]`);
            if (element) {
                element.style.animation = 'itemDrop 0.3s ease forwards';
                setTimeout(() => element.remove(), 300);
            }
        }

        UI.showNotification('📭 Item solto', 'info');
        this.updateUI();
    }

    static updateUI() {
        const panel = document.getElementById('inventory-panel');
        if (!panel) return;

        const items = this.getAllItems();
        const grid = panel.querySelector('.inventory-grid');
        const capacity = panel.querySelector('.inventory-capacity');

        if (capacity) {
            capacity.textContent = `${this.getTotalItems()}/${this.maxCapacity}`;
        }

        if (grid) {
            grid.innerHTML = items.length > 0
                ? this.generateItemsHTML(items)
                : '<div class="inventory-empty">Seu inventário está vazio...</div>';
        }
    }

    static getRarityColor(rarity) {
        const colors = {
            'comum': '#95a5a6',
            'incomum': '#27ae60',
            'raro': '#2980b9',
            'épico': '#8e44ad',
            'lendário': '#f39c12'
        };
        return colors[rarity] || '#95a5a6';
    }

    static applyInventoryStyles() {
        if (document.getElementById('inventory-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'inventory-styles';
        styles.innerHTML = `
            .inventory-panel {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(5px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 600;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }

            .inventory-panel.active {
                opacity: 1;
                pointer-events: auto;
            }

            .inventory-content {
                background: linear-gradient(135deg, rgba(20, 20, 40, 0.95), rgba(40, 10, 35, 0.95));
                border: 2px solid rgba(255, 107, 157, 0.3);
                border-radius: 15px;
                padding: 25px;
                max-width: 700px;
                width: 90%;
                max-height: 80vh;
                display: flex;
                flex-direction: column;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
                animation: slideUp 0.3s ease;
            }

            .inventory-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 2px solid rgba(255, 107, 157, 0.2);
                color: #fff;
            }

            .inventory-header h2 {
                margin: 0;
                font-size: 1.5em;
            }

            .inventory-capacity {
                background: rgba(255, 107, 157, 0.2);
                padding: 5px 15px;
                border-radius: 20px;
                font-size: 0.9em;
                font-weight: bold;
            }

            .inventory-close {
                background: none;
                border: none;
                color: #fff;
                font-size: 1.5em;
                cursor: pointer;
                transition: transform 0.2s ease;
            }

            .inventory-close:hover {
                transform: scale(1.2);
            }

            .inventory-search {
                margin-bottom: 15px;
            }

            .inventory-search input {
                width: 100%;
                padding: 10px 15px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 107, 157, 0.3);
                border-radius: 5px;
                color: #fff;
                font-size: 1em;
                transition: all 0.2s ease;
            }

            .inventory-search input:focus {
                outline: none;
                background: rgba(255, 255, 255, 0.15);
                border-color: rgba(255, 107, 157, 0.6);
            }

            .inventory-search input::placeholder {
                color: rgba(255, 255, 255, 0.5);
            }

            .inventory-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 15px;
                overflow-y: auto;
                padding-right: 10px;
                flex: 1;
            }

            .inventory-item {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 107, 157, 0.2);
                border-radius: 8px;
                padding: 12px;
                display: flex;
                flex-direction: column;
                gap: 8px;
                transition: all 0.2s ease;
                animation: slideInUp 0.3s ease;
            }

            .inventory-item:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 107, 157, 0.5);
                transform: translateY(-2px);
            }

            .item-icon {
                width: 50px;
                height: 50px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.8em;
                background-size: cover;
                background-position: center;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            }

            .item-info h4 {
                margin: 0 0 5px 0;
                color: #fff;
                font-size: 0.95em;
            }

            .item-info p {
                margin: 0;
                color: rgba(255, 255, 255, 0.7);
                font-size: 0.8em;
                line-height: 1.4;
                flex: 1;
            }

            .item-quantity {
                display: inline-block;
                background: rgba(76, 175, 80, 0.3);
                color: #4caf50;
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 0.75em;
                font-weight: bold;
                width: fit-content;
            }

            .item-actions {
                display: flex;
                gap: 8px;
            }

            .item-btn {
                flex: 1;
                padding: 6px 10px;
                border: 1px solid rgba(255, 107, 157, 0.3);
                border-radius: 5px;
                background: rgba(255, 107, 157, 0.1);
                color: rgba(255, 107, 157, 0.8);
                cursor: pointer;
                font-size: 0.75em;
                transition: all 0.2s ease;
                font-weight: bold;
            }

            .item-btn:hover {
                background: rgba(255, 107, 157, 0.3);
                border-color: rgba(255, 107, 157, 0.6);
                transform: scale(1.05);
            }

            .use-btn {
                background: rgba(76, 175, 80, 0.1);
                border-color: rgba(76, 175, 80, 0.3);
                color: rgba(76, 175, 80, 0.8);
            }

            .use-btn:hover {
                background: rgba(76, 175, 80, 0.3);
                border-color: rgba(76, 175, 80, 0.6);
            }

            .inventory-empty {
                text-align: center;
                color: rgba(255, 255, 255, 0.5);
                padding: 40px 20px;
                font-size: 1.1em;
            }

            .item-use-effect {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 1001;
            }

            .effect-popup {
                background: rgba(76, 175, 80, 0.9);
                color: #fff;
                padding: 20px 40px;
                border-radius: 10px;
                font-weight: bold;
                opacity: 0;
                transform: scale(0.5);
                transition: all 0.3s ease;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            }

            .item-use-effect.active .effect-popup {
                opacity: 1;
                transform: scale(1);
            }

            @keyframes itemDrop {
                to {
                    opacity: 0;
                    transform: translateY(20px) scale(0.8);
                }
            }

            @keyframes slideUp {
                from {
                    transform: translateY(30px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
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

            @media (max-width: 600px) {
                .inventory-content {
                    max-width: 95%;
                    padding: 15px;
                }

                .inventory-grid {
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                }
            }
        `;

        document.head.appendChild(styles);
    }

    /**
     * Limpa o inventário
     */
    static clear() {
        this.items.clear();
        console.log('🧹 Inventário limpo');
    }
}

// Inicializar ao carregar
if (typeof game !== 'undefined') {
    InventorySystem.init();
}