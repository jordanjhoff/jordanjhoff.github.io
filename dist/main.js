import { WindowManager } from './managers/WindowManager.js';
class MyPortfolio {
    constructor() {
        this.windowManager = new WindowManager();
    }
    async init() {
        try {
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }
            this.windowManager.init();
        }
        catch (error) {
            console.error('Failed to initialize:', error);
        }
    }
}
const portfolio = new MyPortfolio();
portfolio.init();
