import { WindowConfig, WindowState, Component, TrafficLightAction } from '../types/index';
import { WindowTitleBar } from './WindowTitleBar.js';

export abstract class BaseWindow implements Component {
  public element: HTMLElement;
  public config: WindowConfig;
  public state: WindowState;
  protected titleBar: WindowTitleBar;
  protected contentElement: HTMLElement;

  constructor(config: WindowConfig) {
    this.config = config;
    this.state = {
      isMinimized: false,
      isMaximized: false,
      isActive: false
    };

    this.element = this.render();
    this.titleBar = new WindowTitleBar(
      config.title,
      false,
      this.handleTrafficLightClick.bind(this)
    );
    this.contentElement = this.createContent();
    this.setupWindow();
  }

  render(): HTMLElement {
    const window = document.createElement('div');
    window.className = 'window';
    window.id = this.config.id;
    
    // Set initial position and size
    window.style.cssText = `
      position: absolute;
      left: ${this.config.x}px;
      top: ${this.config.y}px;
      width: ${this.config.width}px;
      height: ${this.config.height}px;
      z-index: 100;
    `;

    return window;
  }

  private setupWindow(): void {
    this.element.appendChild(this.titleBar.element);
    

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'window-content';
    contentWrapper.appendChild(this.contentElement);
    this.element.appendChild(contentWrapper);

    this.element.addEventListener('mousedown', () => {
      this.focus();
    });
  }

  protected abstract createContent(): HTMLElement;

  protected handleTrafficLightClick(action: TrafficLightAction): void {
    switch (action) {
      case 'close':
      case 'minimize':
        this.close();
        break;
      case 'maximize':
        this.toggleMaximize();
        break;
    }
  }

  public show(): void {
    this.element.style.display = 'block';
    this.state.isMinimized = false;
    this.focus();
  }

  public close(): void {
    this.element.style.display = 'none';
    this.state.isMinimized = true;
  }

  public toggleMaximize(): void {
    if (this.state.isMaximized) {
      this.restore();
    } else {
      this.maximize();
    }
  }

  public maximize(): void {
    if (!this.state.originalBounds) {
      this.state.originalBounds = {
        width: this.element.offsetWidth,
        height: this.element.offsetHeight,
        x: this.element.offsetLeft,
        y: this.element.offsetTop
      };
    }

    this.element.style.cssText += `
      left: 0px;
      top: 24px;
      width: 100vw;
      height: calc(100vh - 88px);
    `;

    this.state.isMaximized = true;
    this.dispatchEvent('maximize');
  }

  public restore(): void {
    if (this.state.originalBounds) {
      this.element.style.cssText = `
        position: absolute;
        left: ${this.state.originalBounds.x}px;
        top: ${this.state.originalBounds.y}px;
        width: ${this.state.originalBounds.width}px;
        height: ${this.state.originalBounds.height}px;
        z-index: ${this.element.style.zIndex || 100};
        display: block;
      `;
    }

    this.state.isMaximized = false;
    this.dispatchEvent('restore');
  }

  public focus(): void {
    this.state.isActive = true;
    this.element.classList.add('active');
    this.titleBar.setActive(true);
    this.bringToFront();
    this.dispatchEvent('focus');
  }

  public bringToFront(): void {
    // Get highest z-index
    const windows = document.querySelectorAll('.window');
    let highestZ = 100;
    
    windows.forEach(window => {
      const z = parseInt((window as HTMLElement).style.zIndex || '100');
      if (z > highestZ) {
        highestZ = z;
      }
    });

    this.element.style.zIndex = (highestZ + 1).toString();
  }

  public isVisible(): boolean {
    return this.element.style.display !== 'none' && !this.state.isMinimized;
  }

  protected dispatchEvent(type: string): void {
    const event = new CustomEvent(`window-${type}`, {
      detail: { windowId: this.config.id, window: this }
    });
    document.dispatchEvent(event);
  }

  public destroy(): void {
    this.titleBar.destroy();
    this.element.remove();
  }
}