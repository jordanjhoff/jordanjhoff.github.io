import { BaseWindow } from '../components/BaseWindow.js';
export class ProjectWindow extends BaseWindow {
    constructor() {
        const config = {
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
    createContent() {
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
        <!-- Project 1 -->
        <div class="project-card">
          <div class="project-images">
            <div class="main-image">
              <img src="/assets/projects/project1/main.jpg" alt="Project 1 Main">
            </div>
            <div class="thumbnail-row">
              <img src="/assets/projects/project1/1.jpg" alt="Project 1 Thumbnail 1" class="thumbnail">
              <img src="/assets/projects/project1/2.jpg" alt="Project 1 Thumbnail 2" class="thumbnail">
            </div>
          </div>
          <div class="project-info">
            <h3 class="project-title">PoolHouse</h3>

              <ul class="project-description">
                <li>Built and deployed a full-stack NextJS 14 application serving 15+ active players in a local competitive pool league, processing 400+ matches monthly with automated ELO calculations and real-time leaderboards.</li>
                <li>Developed custom Glicko rating algorithm with adjustments based on player consistency and match importance.</li>
                <li>Engineered match reversion system with cascading rating recalculations, allowing undo matches while automatically updating all affected player ratings in correct chronological order.</li>
                <li>Implemented PostgreSQL with optimized queries for historical rating calculations, achieving high response times for complex rating timelines.</li>
                <li>Self-hosted on personal homelab server (Debian/Docker) with automated backup strategies.</li>
                <li>Configured GitHub Actions CI/CD pipeline for zero-downtime deployments with automated testing and database migrations.</li>
              </ul>
          
 
            <div class="project-tech">
              <span class="tech-tag">React 19</span>
              <span class="tech-tag">PostgreSQL</span>
              <span class="tech-tag">TailwindCSS</span>
              <span class="tech-tag">CD (continuous deployment)</span>
            </div>
            <div class="project-links">
              <a href="https://github.com/jordanjhoff/poolhouse" target="_blank" class="project-link">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>

        <!-- Project 2 -->
        <div class="project-card">
          <div class="project-images">
            <div class="main-image">
              <img src="/assets/projects/project2/main.jpg" alt="Project 2 Main">
            </div>
            <div class="thumbnail-row">
              <img src="/assets/projects/project2/1.jpg" alt="Project 2 Thumbnail 1" class="thumbnail">
              <img src="/assets/projects/project2/2.jpg" alt="Project 2 Thumbnail 2" class="thumbnail">
            </div>
          </div>
          <div class="project-info">
            <h3 class="project-title">Bazaar</h3>
            <ul class="project-description">
                <li>Implemented a high-performance distributed game server in Java 21 in my CS4500 Software Development class, supporting real-time multiplayer trading and resource management.</li>
                <li>Implemented non-blocking I/O using Java NIO channels to handle 10+ concurrent TCP connections per game lobby without thread-per-client overhead.</li>
                <li>Designed and implemented GameState managers according to given specifications.</li> 
                <li>Designed asynchronous message processing pipeline using CompletableFutures, enabling parallel handling of player moves while maintaining game state consistency.</li>
                <li>Engineered parallel processing system to evaluate game strategies across 500+ test scenarios, reducing total execution time from 15 minutes to 20 seconds using ForkJoinPool.</li>
                <li>Created pluggable strategy interface allowing hot-swapping of AI player implementations during bulk testing runs.</li>
                <li>Built event sourcing and listener system to record all game actions, enabling replay functionality and post-game analysis of strategy performance.</li>
              </ul>
            <div class="project-tech">
              <span class="tech-tag">Java 21</span>
              <span class="tech-tag">TCP/Socket Programming</span>
              <span class="tech-tag">Multithreading/Concurrency</span>
              <span class="tech-tag">Asynchronous Programming</span>
            </div>
            <div class="project-links">
              <a href="https://github.com/jordanjhoff/Bazaar-Game" target="_blank" class="project-link">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      
        <!-- Project 3 -->
        <div class="project-card">
          <div class="project-images">
            <div class="main-image">
              <img src="/assets/projects/project3/main.jpg" alt="PhotoBooth Main">
            </div>
            <div class="thumbnail-row">
              <img src="/assets/projects/project3/1.jpg" alt="PhotoBooth Thumbnail 1" class="thumbnail">
              <img src="/assets/projects/project3/2.jpg" alt="PhotoBooth Thumbnail 2" class="thumbnail">
            </div>
          </div>
          <div class="project-info">
            <h3 class="project-title">PhotoBooth</h3>
            <ul class="project-description">
              <li>Engineered complete photo booth enclosure and system on Raspberry Pi 3, processing 500+ photos at events with instant thermal printing capabilities.</li>
              <li>Developed robust Python state machine managing capture, preview, print, and idle states with graceful error handling and recovery.</li>
              <li>Built touch-responsive PyQt5 interface with custom widgets, animations, and countdown timers optimized for touchscreen display.</li>
              <li>Configured CUPS print server with custom thermal printer drivers, achieving consistent high-quality 4x6 prints in under 15 seconds.</li>
              <li>Implemented automatic photo processing pipeline with PIL/Pillow for borders, overlays, and event branding customization.</li>
              <li>Implemented qr-code based Stripe API payment integration, allowing users to pay for single use operation.</li>
              <li>Generated $500+ in revenue in 2025.</li>
            </ul>
            <div class="project-tech">
              <span class="tech-tag">Python</span>
              <span class="tech-tag">PyQt5</span>
              <span class="tech-tag">Raspberry Pi</span>
              <span class="tech-tag">CUPS</span>
            </div>
            <div class="project-links">
              <a href="https://github.com/jordanjhoff/pbprint" target="_blank" class="project-link">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>

        <!-- Project 4 -->
        <div class="project-card">
          <div class="project-images">
            <div class="main-image">
              <img src="/assets/projects/project4/main.jpg" alt="Homelab Main">
            </div>
            <div class="thumbnail-row">
              <img src="/assets/projects/project4/1.jpg" alt="Homelab Thumbnail 1" class="thumbnail">
            </div>
          </div>
          <div class="project-info">
            <h3 class="project-title">Homelab System Administration</h3>
            <ul class="project-description">
              <li>Built production Linux server infrastructure on HPE ProLiant DL360p Gen8 hardware, serving 15+ daily users with 99.9% uptime over 2 years.</li>
              <li>Orchestrated 10+ containerized services using Docker Compose, including Nginx reverse proxy, Jellyfin media server, NextCloud, PostgreSQL databases, and most of my custom web applications.</li>
              <li>Built monitoring stack with Prometheus, Grafana, and custom alerting rules for proactive issue detection and resolution.</li>
              <li>Automated deployment pipelines using GitHub webhooks and bash scripts, enabling git-push deployments for multiple projects.</li>
            </ul>
            <div class="project-tech">
              <span class="tech-tag">Linux (Debian/OMV)</span>
              <span class="tech-tag">Docker/Docker Compose</span>
              <span class="tech-tag">Nginx</span>
              <span class="tech-tag">Prometheus/Grafana</span>
            </div>
          </div>
        </div>

        <!-- Project 5 -->
        <div class="project-card">
          <div class="project-images">
            <div class="main-image">
              <img src="/assets/projects/project5/main.jpg" alt="Portfolio Main">
            </div>
          </div>
          <div class="project-info">
            <h3 class="project-title">Mac OS X Portfolio</h3>
            <ul class="project-description">
              <li>Designed and built portfolio website (you're currently on it). Can you tell I love Mac OS X?</li>
            </ul>
            <div class="project-tech">
              <span class="tech-tag">TypeScript</span>
              <span class="tech-tag">CSS3</span>
              <span class="tech-tag">HTML5</span>
            </div>
            <div class="project-links">
              <a href="https://github.com/jordanjhoff/jordanjhoff.github.io" target="_blank" class="project-link">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
        // Add image gallery functionality
        this.setupImageGallery(content);
        return content;
    }
    setupImageGallery(content) {
        const projectCards = content.querySelectorAll('.project-card');
        const overlay = content.querySelector('.image-overlay');
        const overlayImage = overlay.querySelector('.overlay-image');
        const overlayThumbnails = overlay.querySelector('.overlay-thumbnails');
        const closeButton = overlay.querySelector('.close-overlay');
        projectCards.forEach(card => {
            const mainImage = card.querySelector('.main-image img');
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
                    if (imgSrc === mainImage.src)
                        thumb.classList.add('active');
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
                    mainImage.src = thumb.src;
                    thumb.src = currentMainSrc;
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
    getAllImagesFromCard(card) {
        const images = [];
        const mainImage = card.querySelector('.main-image img');
        if (mainImage)
            images.push(mainImage.src);
        const thumbnails = card.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumb => {
            images.push(thumb.src);
        });
        return images;
    }
}
