import { WindowManager } from './managers/WindowManager.js';


class MyPortfolio {
  private windowManager: WindowManager;

  constructor() {
    this.windowManager = new WindowManager();
  }

  public async init(): Promise<void> {
    try {
      
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }
      this.windowManager.init();
      
    } catch (error) {
      console.error('Failed to initialize:', error);
    }
  }
}

const portfolio = new MyPortfolio();
portfolio.init();