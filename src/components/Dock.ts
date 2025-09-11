import { Component, DockItem, DockLink } from '../types/index';

export class Dock implements Component {
  public element: HTMLElement;
  private items: DockItem[] = [];
  private links: DockLink[] = [];
  private onItemClick?: (windowId: string) => void;

  constructor(items: DockItem[] = [], links: DockLink[] = [], clickHandler?: (windowId: string) => void) {
    this.items = items;
    this.links = links;
    this.onItemClick = clickHandler;
    this.element = this.render();
  }

  render(): HTMLElement {
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

  private createDockItem(item: DockItem): string {
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

  private createDockLink(link: DockLink): string {
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

  private setupEventListeners(dock: HTMLElement): void {
    // Setup dock items (windows)
    const dockItems = dock.querySelectorAll('.dock-item');
    dockItems.forEach(item => {
      this.setupItemEventListeners(item as HTMLElement);
    });

    // Setup dock links (external links)
    const dockLinks = dock.querySelectorAll('.dock-link');
    dockLinks.forEach(link => {
      this.setupItemEventListeners(link as HTMLElement);
    });
  }

  private addProximityEffect(target: HTMLElement, type: 'enter' | 'leave'): void {
    const allItems = Array.from(target.parentElement!.querySelectorAll('.dock-item, .dock-link'));
    const index = allItems.indexOf(target);
    
    // Apply effect to adjacent items
    for (let i = Math.max(0, index - 1); i <= Math.min(allItems.length - 1, index + 1); i++) {
      if (i !== index) {
        const adjacentItem = allItems[i] as HTMLElement;
        const distance = Math.abs(i - index);
        
        if (type === 'enter') {
          const scale = 1 + (0.15 / distance);
          const translateY = -3 / distance;
          adjacentItem.style.transform = `scale(${scale}) translateY(${translateY}px)`;
          adjacentItem.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        } else {
          adjacentItem.style.transform = 'scale(1) translateY(0)';
        }
      }
    }
  }


  public getItems(): DockItem[] {
    return this.items;
  }

  public addItem(item: DockItem): void {
    this.items.push(item);
    const container = this.element.querySelector('.dock-container');
    const separator = container?.querySelector('.dock-separator');
    
    if (container && separator) {
      const itemElement = document.createElement('div');
      itemElement.innerHTML = this.createDockItem(item);
      const newItem = itemElement.firstElementChild as HTMLElement;
      
      container.insertBefore(newItem, separator);
      this.setupItemEventListeners(newItem);
    }
  }

  public removeItem(windowId: string): void {
    this.items = this.items.filter(item => item.windowId !== windowId);
    const item = this.element.querySelector(`[data-window-id="${windowId}"]`);
    if (item) {
      item.remove();
    }
  }

  private setupItemEventListeners(element: HTMLElement): void {
    // Hover enter
    element.addEventListener('mouseenter', (e) => {
      const target = e.currentTarget as HTMLElement;
      target.style.transform = 'scale(1.3) translateY(-8px)';
      this.addProximityEffect(target, 'enter');
    });

    // Hover leave
    element.addEventListener('mouseleave', (e) => {
      const target = e.currentTarget as HTMLElement;
      target.style.transform = 'scale(1) translateY(0)';
      this.addProximityEffect(target, 'leave');
    });

    // Click handler
    element.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      
      // Handle based on element type
      if (target.classList.contains('dock-item')) {
        // Window item click
        const windowId = target.dataset.windowId;
        if (windowId && this.onItemClick) {
          this.onItemClick(windowId);
        }
      } else if (target.classList.contains('dock-link')) {
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
        } else {
          target.style.transform = 'scale(1) translateY(0)';
        }
      }, 150);
    });
  }

  destroy(): void {
    this.element.remove();
  }
}