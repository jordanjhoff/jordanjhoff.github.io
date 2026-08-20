import { BaseWindow } from '../components/BaseWindow.js';
import { WindowConfig, Project } from '../types/index';
import { projects } from '../data/projects.js';

const GITHUB_ICON_SVG = `
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>`;

export class ProjectWindow extends BaseWindow {
  constructor() {
    const config: WindowConfig = {
      id: 'project-window',
      title: 'Projects', 
      width: 1000,         
      height: 600,      
      x: 190,
      y: 120,
      resizable: true,
      minimizable: true,
      maximizable: true,
      closable: true
    };

    super(config);
  }

  protected createContent(): HTMLElement {
    const content = document.createElement('div');
    content.className = 'project-content';
    
    content.innerHTML = `
      <div class="projects-header">
        <h1>Jordy's Projects</h1>
      </div>

      <!-- Fullscreen Image Overlay -->
      <div class="image-overlay" style="display: none;">
        <button class="close-overlay">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <img src="" alt="" class="overlay-image">
        <div class="overlay-thumbnails"></div>
      </div>

      <div class="projects-container">
        ${projects.map((project) => this.renderProjectCard(project)).join('')}
      </div>
    `;

    // Add image gallery functionality
    this.setupImageGallery(content);

    return content;
  }

  private renderProjectCard(project: Project): string {
    const thumbnailsHtml = project.thumbnails.length
      ? `
            <div class="thumbnail-row">
              ${project.thumbnails
                .map(
                  (src, index) =>
                    `<img src="${src}" alt="${project.title} Thumbnail ${index + 1}" class="thumbnail">`
                )
                .join('')}
            </div>`
      : '';

    const linksHtml = project.githubUrl
      ? `
            <div class="project-links">
              <a href="${project.githubUrl}" target="_blank" class="project-link">
                ${GITHUB_ICON_SVG}
                GitHub
              </a>
            </div>`
      : '';

    return `
        <div class="project-card">
          <div class="project-images">
            <div class="main-image">
              <img src="${project.mainImage}" alt="${project.title} Main">
            </div>${thumbnailsHtml}
          </div>
          <div class="project-info">
            <h3 class="project-title">${project.title}</h3>
            <ul class="project-description">
              ${project.description.map((line) => `<li>${line}</li>`).join('')}
            </ul>
            <div class="project-tech">
              ${project.tech.map((tag) => `<span class="tech-tag">${tag}</span>`).join('')}
            </div>${linksHtml}
          </div>
        </div>`;
  }

  private setupImageGallery(content: HTMLElement): void {
    const projectCards = content.querySelectorAll('.project-card');
    const overlay = content.querySelector('.image-overlay') as HTMLElement;
    const overlayImage = overlay.querySelector('.overlay-image') as HTMLImageElement;
    const overlayThumbnails = overlay.querySelector('.overlay-thumbnails') as HTMLElement;
    const closeButton = overlay.querySelector('.close-overlay') as HTMLElement;
    
    projectCards.forEach(card => {
      const mainImage = card.querySelector('.main-image img') as HTMLImageElement;
      const thumbnails = card.querySelectorAll('.thumbnail');
      const projectTitle = card.querySelector('.project-title')?.textContent || 'Project Image';
      
      // Make main image clickable
      mainImage.style.cursor = 'pointer';
      mainImage.addEventListener('click', () => {
        // Get all images from this project
        const allImages = this.getAllImagesFromCard(card);
        
        // Show overlay with clicked image
        overlayImage.src = mainImage.src;
        overlayImage.alt = projectTitle;
        
        // Create thumbnail row for this project
        overlayThumbnails.innerHTML = '';
        allImages.forEach((imgSrc, index) => {
          const thumb = document.createElement('img');
          thumb.src = imgSrc;
          thumb.className = 'overlay-thumb';
          if (imgSrc === mainImage.src) thumb.classList.add('active');
          
          thumb.addEventListener('click', () => {
            overlayImage.src = imgSrc;
            // Update active state
            overlayThumbnails.querySelectorAll('.overlay-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
          });
          
          overlayThumbnails.appendChild(thumb);
        });
        
        overlay.style.display = 'flex';
      });
      
      // Original thumbnail swap functionality
      thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
          const currentMainSrc = mainImage.src;
          mainImage.src = (thumb as HTMLImageElement).src;
          (thumb as HTMLImageElement).src = currentMainSrc;
        });
      });
    });
    
    // Close overlay handlers
    const closeOverlay = () => {
      overlay.style.display = 'none';
      content.style.overflow = 'auto';
    };

    closeButton.addEventListener('click', closeOverlay);
    
    // Close on overlay background click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeOverlay();
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.style.display === 'flex') {
        closeOverlay();
      }
    });
  }

  private getAllImagesFromCard(card: Element): string[] {
    const images: string[] = [];
    const mainImage = card.querySelector('.main-image img') as HTMLImageElement;
    if (mainImage) images.push(mainImage.src);
    
    const thumbnails = card.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
      images.push((thumb as HTMLImageElement).src);
    });
    
    return images;
  }
}