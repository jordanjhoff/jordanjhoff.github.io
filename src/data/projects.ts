import { Project } from '../types/index';

export const projects: Project[] = [
  {
    title: 'PoolHouse',
    mainImage: '/assets/projects/project1/main.jpg',
    thumbnails: [
      '/assets/projects/project1/1.jpg',
      '/assets/projects/project1/2.jpg',
    ],
    description: [
      'Built and deployed a full-stack NextJS 14 application serving 15+ active players in a local competitive pool league, processing 400+ matches monthly with automated ELO calculations and real-time leaderboards.',
      'Developed custom Glicko rating algorithm with adjustments based on player consistency and match importance.',
      'Engineered match reversion system with cascading rating recalculations, allowing undo matches while automatically updating all affected player ratings in correct chronological order.',
      'Implemented PostgreSQL with optimized queries for historical rating calculations, achieving high response times for complex rating timelines.',
      'Self-hosted on personal homelab server (Debian/Docker) with automated backup strategies.',
      'Configured GitHub Actions CI/CD pipeline for zero-downtime deployments with automated testing and database migrations.',
    ],
    tech: ['React 19', 'PostgreSQL', 'TailwindCSS', 'CD (continuous deployment)'],
    githubUrl: 'https://github.com/jordanjhoff/poolhouse',
  },
  {
    title: 'Bazaar',
    mainImage: '/assets/projects/project2/main.jpg',
    thumbnails: [
      '/assets/projects/project2/1.jpg',
      '/assets/projects/project2/2.jpg',
    ],
    description: [
      'Implemented a high-performance distributed game server in Java 21 in my CS4500 Software Development class, supporting real-time multiplayer trading and resource management.',
      'Implemented non-blocking I/O using Java NIO channels to handle 10+ concurrent TCP connections per game lobby without thread-per-client overhead.',
      'Designed and implemented GameState managers according to given specifications.',
      'Designed asynchronous message processing pipeline using CompletableFutures, enabling parallel handling of player moves while maintaining game state consistency.',
      'Engineered parallel processing system to evaluate game strategies across 500+ test scenarios, reducing total execution time from 15 minutes to 20 seconds using ForkJoinPool.',
      'Created pluggable strategy interface allowing hot-swapping of AI player implementations during bulk testing runs.',
      'Built event sourcing and listener system to record all game actions, enabling replay functionality and post-game analysis of strategy performance.',
    ],
    tech: ['Java 21', 'TCP/Socket Programming', 'Multithreading/Concurrency', 'Asynchronous Programming'],
    githubUrl: 'https://github.com/jordanjhoff/Bazaar-Game',
  },
  {
    title: 'PhotoBooth',
    mainImage: '/assets/projects/project3/main.jpg',
    thumbnails: [
      '/assets/projects/project3/1.jpg',
      '/assets/projects/project3/2.jpg',
    ],
    description: [
      'Engineered complete photo booth enclosure and system on Raspberry Pi 3, processing 500+ photos at events with instant thermal printing capabilities.',
      'Developed robust Python state machine managing capture, preview, print, and idle states with graceful error handling and recovery.',
      'Built touch-responsive PyQt5 interface with custom widgets, animations, and countdown timers optimized for touchscreen display.',
      'Configured CUPS print server with custom thermal printer drivers, achieving consistent high-quality 4x6 prints in under 15 seconds.',
      'Implemented automatic photo processing pipeline with PIL/Pillow for borders, overlays, and event branding customization.',
      'Implemented qr-code based Stripe API payment integration, allowing users to pay for single use operation.',
      'Generated $500+ in revenue in 2025.',
    ],
    tech: ['Python', 'PyQt5', 'Raspberry Pi', 'CUPS'],
    githubUrl: 'https://github.com/jordanjhoff/pbprint',
  },
  {
    title: 'Homelab System Administration',
    mainImage: '/assets/projects/project4/main.jpg',
    thumbnails: ['/assets/projects/project4/1.jpg'],
    description: [
      'Built production Linux server infrastructure on HPE ProLiant DL360p Gen8 hardware, serving 15+ daily users with 99.9% uptime over 2 years.',
      'Orchestrated 10+ containerized services using Docker Compose, including Nginx reverse proxy, Jellyfin media server, NextCloud, PostgreSQL databases, and most of my custom web applications.',
      'Built monitoring stack with Prometheus, Grafana, and custom alerting rules for proactive issue detection and resolution.',
      'Automated deployment pipelines using GitHub webhooks and bash scripts, enabling git-push deployments for multiple projects.',
    ],
    tech: ['Linux (Debian/OMV)', 'Docker/Docker Compose', 'Nginx', 'Prometheus/Grafana'],
  },
  {
    title: 'Mac OS X Portfolio',
    mainImage: '/assets/projects/project5/main.jpg',
    thumbnails: [],
    description: [
      "Designed and built portfolio website (you're currently on it). Can you tell I love Mac OS X?",
    ],
    tech: ['TypeScript', 'CSS3', 'HTML5'],
    githubUrl: 'https://github.com/jordanjhoff/jordanjhoff.github.io',
  },
];
