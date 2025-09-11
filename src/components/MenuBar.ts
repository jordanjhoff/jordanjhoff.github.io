import { Component, MenuBarItem } from '../types/index';

export class MenuBar implements Component {
  public element: HTMLElement;
  private clockInterval: number | null = null;

  constructor(private appName: string = 'JordyOS') {
    this.element = this.render();
    this.startClock();
  }

  render(): HTMLElement {
    const menuBar = document.createElement('div');
    menuBar.className = 'menu-bar';
    
    const menuItems: MenuBarItem[] = [
      { label: ' JordyOSX ' },
      { label: 'File' },
      { label: 'Edit' },
      { label: 'View' },
      { label: 'Window' },
      { label: 'Help' }
    ];

    menuBar.innerHTML = `
      <div class="menu-left">
        <div class="menu-items">
          ${menuItems.map(item => `
            <div class="menu-item" data-item="${item.label.toLowerCase()}">
              ${item.label}
            </div>
          `).join('')}
        </div>
      </div>
      <div class="menu-right">
        <div class="menu-clock" id="menu-clock">
          ${this.getCurrentTime()}
        </div>
      </div>
    `;

    this.setupEventListeners(menuBar);
    return menuBar;
  }

  private setupEventListeners(menuBar: HTMLElement): void {
    const menuItems = menuBar.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.classList.add('hover');
      });

      item.addEventListener('mouseleave', () => {
        item.classList.remove('hover');
      });

      item.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const itemName = target.dataset.item;
        this.handleMenuClick(itemName || '');
      });
    });
  }

  private handleMenuClick(itemName: string): void {
    console.log(`Menu clicked: ${itemName}`);
    
    switch (itemName) {
      case 'file':
        break;
      case 'edit':
        break;
      case 'view':
        break;
      case 'window':
        break;
      case 'help':
        break;
    }
  }

  private startClock(): void {
    this.updateClock();
    this.clockInterval = window.setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  private updateClock(): void {
    const clockElement = document.getElementById('menu-clock');
    if (clockElement) {
      clockElement.textContent = this.getCurrentTime();
    }
  }

  private getCurrentTime(): string {
    return new Date().toLocaleString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  destroy(): void {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
      this.clockInterval = null;
    }
    this.element.remove();
  }
}