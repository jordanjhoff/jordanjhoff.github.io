export class Dock {
    constructor(items = [], links = [], clickHandler) {
        this.items = [];
        this.links = [];
        this.items = items;
        this.links = links;
        this.onItemClick = clickHandler;
        this.element = this.render();
    }
    render() {
        const dock = document.createElement('div');
        dock.className = 'dock';
        const dockItems = this.items.map(item => this.createDockItem(item)).join('');
        const dockLinks = this.links.map(link => this.createDockLink(link)).join('');
        dock.innerHTML = `
      <div class="dock-container">
        ${dockItems}
        <div class="dock-separator"></div>
        ${dockLinks}
      </div>
    `;
        this.setupEventListeners(dock);
        return dock;
    }
    createDockItem(item) {
        return `
      <div class="dock-item ${item.isActive ? 'active' : ''}" 
          data-window-id="${item.windowId}" 
          title="${item.label}">
        <div class="dock-icon">
          <img src="${item.iconpath}" alt="${item.label}" />
        </div>
        ${item.isActive ? '<div class="dock-indicator"></div>' : ''}
      </div>
    `;
    }
    createDockLink(link) {
        return `
      <div class="dock-link" 
          data-href="${link.href}" 
          title="${link.label}">
        <div class="dock-icon">
          <img src="${link.iconpath}" alt="${link.label}" />
        </div>
      </div>
    `;
    }
    setupEventListeners(dock) {
        // Setup dock items (windows)
        const dockItems = dock.querySelectorAll('.dock-item');
        dockItems.forEach(item => {
            this.setupItemEventListeners(item);
        });
        // Setup dock links (external links)
        const dockLinks = dock.querySelectorAll('.dock-link');
        dockLinks.forEach(link => {
            this.setupItemEventListeners(link);
        });
    }
    addProximityEffect(target, type) {
        const allItems = Array.from(target.parentElement.querySelectorAll('.dock-item, .dock-link'));
        const index = allItems.indexOf(target);
        // Apply effect to adjacent items
        for (let i = Math.max(0, index - 1); i <= Math.min(allItems.length - 1, index + 1); i++) {
            if (i !== index) {
                const adjacentItem = allItems[i];
                const distance = Math.abs(i - index);
                if (type === 'enter') {
                    const scale = 1 + (0.15 / distance);
                    const translateY = -3 / distance;
                    adjacentItem.style.transform = `scale(${scale}) translateY(${translateY}px)`;
                    adjacentItem.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }
                else {
                    adjacentItem.style.transform = 'scale(1) translateY(0)';
                }
            }
        }
    }
    getItems() {
        return this.items;
    }
    addItem(item) {
        this.items.push(item);
        const container = this.element.querySelector('.dock-container');
        const separator = container?.querySelector('.dock-separator');
        if (container && separator) {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = this.createDockItem(item);
            const newItem = itemElement.firstElementChild;
            container.insertBefore(newItem, separator);
            this.setupItemEventListeners(newItem);
        }
    }
    removeItem(windowId) {
        this.items = this.items.filter(item => item.windowId !== windowId);
        const item = this.element.querySelector(`[data-window-id="${windowId}"]`);
        if (item) {
            item.remove();
        }
    }
    setupItemEventListeners(element) {
        // Hover enter
        element.addEventListener('mouseenter', (e) => {
            const target = e.currentTarget;
            target.style.transform = 'scale(1.3) translateY(-8px)';
            this.addProximityEffect(target, 'enter');
        });
        // Hover leave
        element.addEventListener('mouseleave', (e) => {
            const target = e.currentTarget;
            target.style.transform = 'scale(1) translateY(0)';
            this.addProximityEffect(target, 'leave');
        });
        // Click handler
        element.addEventListener('click', (e) => {
            const target = e.currentTarget;
            // Handle based on element type
            if (target.classList.contains('dock-item')) {
                // Window item click
                const windowId = target.dataset.windowId;
                if (windowId && this.onItemClick) {
                    this.onItemClick(windowId);
                }
            }
            else if (target.classList.contains('dock-link')) {
                // External link click
                const href = target.dataset.href;
                if (href) {
                    window.open(href, '_blank', 'noopener,noreferrer');
                }
            }
            // Click animation for both types
            target.style.transform = 'scale(1.1) translateY(-4px)';
            setTimeout(() => {
                if (target.matches(':hover')) {
                    target.style.transform = 'scale(1.3) translateY(-8px)';
                }
                else {
                    target.style.transform = 'scale(1) translateY(0)';
                }
            }, 150);
        });
    }
    destroy() {
        this.element.remove();
    }
}
