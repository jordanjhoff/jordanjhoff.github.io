import { MenuBar } from '../components/MenuBar.js';
import { Dock } from '../components/Dock.js';
import { PortfolioWindow } from '../windows/PortfolioWindow.js';
import { ProjectWindow } from '../windows/ProjectWindow.js';
import { SkillsWindow } from '../windows/SkillsWindow.js';
export class WindowManager {
    constructor() {
        this.windows = new Map();
        this.desktopIcons = [
            { id: 'portfolio-icon', label: 'About me', iconpath: '/assets/aboutme.png', x: 30, y: 50, windowId: 'portfolio-window' },
            { id: 'projects-icon', label: 'Projects', iconpath: '/assets/projects.png', x: 30, y: 160, windowId: 'projects-window' },
            { id: 'skills-icon', label: 'Skills', iconpath: '/assets/skills.png', x: 30, y: 270, windowId: 'skills-window' },
        ];
        this.menuBar = new MenuBar();
        const dockItems = [
            { id: 'dock-portfolio', label: 'Portfolio', iconpath: '/assets/aboutme.png', windowId: 'portfolio-window', isActive: false },
            { id: 'dock-projects', label: 'Projects', iconpath: '/assets/projects.png', windowId: 'projects-window', isActive: false },
            { id: 'dock-skills', label: 'Skills', iconpath: '/assets/skills.png', windowId: 'skills-window', isActive: false },
        ];
        const dockLinks = [
            { id: 'dock-github', label: 'GitHub', iconpath: '/assets/github.png', href: 'https://github.com/jordanjhoff' },
            { id: 'dock-linkedin', label: 'LinkedIn', iconpath: '/assets/linkedin.png', href: 'https://www.linkedin.com/in/jordan-hoffman-22b216221/' },
            { id: 'dock-email', label: 'Email', iconpath: '/assets/mail.png', href: 'mailto:thejayhoffman@email.com' },
        ];
        this.dock = new Dock(dockItems, dockLinks, this.handleDockClick.bind(this));
    }
    init() {
        this.createDesktop();
        document.body.appendChild(this.menuBar.element);
        document.body.appendChild(this.dock.element);
        this.renderDesktopIcons();
        this.setupEventListeners();
        setTimeout(() => {
            this.openWindow('projects-window');
            this.openWindow('skills-window');
            this.openWindow('portfolio-window');
        }, 500);
    }
    createDesktop() {
        let desktop = document.getElementById('desktop');
        if (!desktop) {
            desktop = document.createElement('div');
            desktop.id = 'desktop';
            desktop.className = 'desktop';
            document.body.appendChild(desktop);
        }
    }
    renderDesktopIcons() {
        const desktop = document.getElementById('desktop');
        if (!desktop) {
            console.error('Desktop element not found');
            return;
        }
        const existingIcons = desktop.querySelectorAll('.desktop-icon');
        existingIcons.forEach(icon => icon.remove());
        this.desktopIcons.forEach(icon => {
            const iconElement = document.createElement('div');
            iconElement.className = 'desktop-icon';
            iconElement.id = icon.id;
            iconElement.style.left = `${icon.x}px`;
            iconElement.style.top = `${icon.y}px`;
            iconElement.dataset.windowId = icon.windowId;
            const iconContent = icon.iconpath
                ? `<img src="${icon.iconpath}" alt="${icon.label}" class="icon-image">`
                : '<div class="folder-icon"></div>';
            iconElement.innerHTML = `
        ${iconContent}
        <div class="icon-label">${icon.label}</div>
      `;
            desktop.appendChild(iconElement);
        });
    }
    setupEventListeners() {
        // icon double click
        document.addEventListener('dblclick', (e) => {
            const target = e.target;
            const icon = target.closest('.desktop-icon');
            if (icon && icon.dataset.windowId) {
                e.preventDefault();
                e.stopPropagation();
                this.openWindow(icon.dataset.windowId);
            }
        });
        document.addEventListener('click', (e) => {
            const target = e.target;
            const icon = target.closest('.desktop-icon');
            if (icon) {
                // select clicked icon
                document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
                icon.classList.add('selected');
            }
            else if (target.id === 'desktop' || target.classList.contains('desktop')) {
                // clear all selections
                document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
            }
        });
    }
    handleDockClick(windowId) {
        const window = this.windows.get(windowId);
        if (!window) {
            // Window doesn't exist, create it
            this.openWindow(windowId);
        }
        else if (!window.isVisible()) {
            // Window is hidden, show it and focus
            window.show();
            window.focus();
        }
        else if (window.state.isActive) {
            // Window is active/focused, hide it
            window.close(); // This hides the window
        }
        else {
            // Window is visible but not active, focus it
            window.focus();
        }
    }
    openWindow(windowId) {
        if (this.windows.has(windowId)) {
            const window = this.windows.get(windowId);
            window.show();
            return window;
        }
        let window = null;
        try {
            switch (windowId) {
                case 'portfolio-window':
                    window = new PortfolioWindow();
                    break;
                case 'projects-window':
                    window = new ProjectWindow();
                    break;
                case 'skills-window':
                    window = new SkillsWindow();
                    break;
                default:
                    console.warn(`Unknown window type: ${windowId}`);
                    return null;
            }
            if (window) {
                document.body.appendChild(window.element);
                this.windows.set(windowId, window);
                window.show();
                console.log(`Window created: ${windowId}`);
            }
        }
        catch (error) {
            console.error(`Failed to create ${windowId}:`, error);
            return null;
        }
        return window;
    }
}
