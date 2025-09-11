import { Component, TrafficLightAction } from '../types/index';

export class WindowTitleBar implements Component {
  public element: HTMLElement;
  private onTrafficLightClick?: (action: TrafficLightAction) => void;

  constructor(
    private title: string,
    private isActive: boolean = false,
    trafficLightHandler?: (action: TrafficLightAction) => void
  ) {
    this.onTrafficLightClick = trafficLightHandler;
    this.element = this.render();
  }

  render(): HTMLElement {
    const titleBar = document.createElement('div');
    titleBar.className = `title-bar ${this.isActive ? 'active' : 'inactive'}`;

    titleBar.innerHTML = `
      <div class="traffic-lights">
        <div class="traffic-light close" data-action="close" title="Close">
          <div class="traffic-light-inner"></div>
        </div>
        <div class="traffic-light minimize" data-action="minimize" title="Minimize">
          <div class="traffic-light-inner"></div>
        </div>
        <div class="traffic-light maximize" data-action="maximize" title="Maximize">
          <div class="traffic-light-inner"></div>
        </div>
      </div>
      <div class="window-title">
        ${this.title}
      </div>
      <div class="title-bar-spacer"></div>
    `;

    this.setupEventListeners(titleBar);
    return titleBar;
  }

  private setupEventListeners(titleBar: HTMLElement): void {
    const trafficLights = titleBar.querySelectorAll('.traffic-light');
    
    trafficLights.forEach(light => {
      // Hover effects
      light.addEventListener('mouseenter', () => {
        light.classList.add('hover');
        this.showTrafficLightSymbol(light as HTMLElement);
      });

      light.addEventListener('mouseleave', () => {
        light.classList.remove('hover');
        this.hideTrafficLightSymbol(light as HTMLElement);
      });

      // Click handling
      light.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent window drag
        const action = (e.currentTarget as HTMLElement).dataset.action as TrafficLightAction;
        if (this.onTrafficLightClick) {
          this.onTrafficLightClick(action);
        }
      });
    });

    // Make title bar draggable (except traffic lights)
    titleBar.addEventListener('mousedown', (e) => {
      // Only allow dragging on title bar, not traffic lights
      if (!(e.target as HTMLElement).closest('.traffic-lights')) {
        this.startWindowDrag(e);
      }
    });
  }

  private showTrafficLightSymbol(light: HTMLElement): void {
    const inner = light.querySelector('.traffic-light-inner') as HTMLElement;
    if (!inner) return;

    const action = light.dataset.action;
    switch (action) {
      case 'close':
        inner.innerHTML = '✕';
        break;
      case 'minimize':
        inner.innerHTML = '−';
        break;
      case 'maximize':
        inner.innerHTML = '+';
        break;
    }
    inner.style.opacity = '1';
  }

  private hideTrafficLightSymbol(light: HTMLElement): void {
    const inner = light.querySelector('.traffic-light-inner') as HTMLElement;
    if (!inner) return;

    inner.innerHTML = '';
    inner.style.opacity = '0';
  }

  private startWindowDrag(e: MouseEvent): void {
    const windowElement = this.element.closest('.window') as HTMLElement;
    if (!windowElement) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = windowElement.offsetLeft;
    const startTop = windowElement.offsetTop;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      windowElement.style.left = `${startLeft + deltaX}px`;
      windowElement.style.top = `${Math.max(24, startTop + deltaY)}px`; // 24px for menu bar
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';

    e.preventDefault();
  }

  setActive(active: boolean): void {
    this.isActive = active;
    this.element.className = `title-bar ${active ? 'active' : 'inactive'}`;
  }

  setTitle(title: string): void {
    this.title = title;
    const titleElement = this.element.querySelector('.window-title');
    if (titleElement) {
      titleElement.textContent = title;
    }
  }

  destroy(): void {
    this.element.remove();
  }
}