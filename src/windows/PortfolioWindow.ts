import { BaseWindow } from '../components/BaseWindow.js';
import { WindowConfig } from '../types/index';

export class PortfolioWindow extends BaseWindow {
  constructor() {
    const config: WindowConfig = {
      id: 'portfolio-window',
      title: 'About Me', 
      width: 500,         
      height: 600,      
      x: 150,
      y: 80,
      resizable: true,
      minimizable: true,
      maximizable: true,
      closable: true
    };

    super(config);
  }

  protected createContent(): HTMLElement {
    const content = document.createElement('div');
    content.className = 'portfolio-content';
    
    content.innerHTML = `
      <div class="profile-section">
        
        <div class="profile-image-container">
          <img src="../../assets/profile.jpeg" alt="Jordy Hoffman" class="profile-image">
        </div>
        <div class="info">
          <h1 class="profile-name">Jordy Hoffman</h1>
          <p class="profile-title">Full Stack Developer</p>
        </div>
      </div>

      <div class="about-section">
        <p class="about-text">I love being challenged and am still discovering new aspects of myself and my capabilities.</p>
      </div>

      <div class="code-section">
        <div class="code-container">
          <div class="code-header">
            <span class="code-language">C#</span>
            <button class="copy-button" onclick="copyCode()">Copy</button>
          </div>
          <pre class="code-snippet"><code><span class="keyword">public</span> <span class="type">Contact</span> <span class="property">Info</span> { <span class="keyword">get</span>; } = <span class="keyword">new</span> <span class="type">Contact</span> {
    <span class="property">Email</span> = <span class="string">"thejayhoffman@gmail.com"</span>
};

<span class="keyword">public</span> <span class="type">string</span>[] <span class="property">Interests</span> = {
    <span class="string">"tinkering"</span>,
    <span class="string">"cycling"</span>,
    <span class="string">"astronomy"</span>,
    <span class="string">"physics"</span>
};

<span class="keyword">public</span> <span class="type">string</span> <span class="property">Goal</span> <span class="operator">=></span> <span class="string">"Stay curious about the world around me"</span>;</code></pre>
        </div>
      </div>
    `;

    const copyButton = content.querySelector('.copy-button');
    if (copyButton) {
      copyButton.addEventListener('click', () => {
        const code = content.querySelector('#code-content')?.textContent || '';
        navigator.clipboard.writeText(code).then(() => {
          copyButton.textContent = 'Copied!';
          setTimeout(() => {
            copyButton.textContent = 'Copy';
          }, 2000);
        });
      });
    }

    return content;
  }

}