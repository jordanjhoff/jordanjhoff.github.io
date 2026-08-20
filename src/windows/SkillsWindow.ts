import { BaseWindow } from '../components/BaseWindow.js';
import { WindowConfig } from '../types/index';
import { skills } from '../data/skills.js';

export class SkillsWindow extends BaseWindow {
  constructor() {
    const config: WindowConfig = {
      id: 'skills-window',
      title: 'Skills', 
      width: 500,         
      height: 400,      
      x: 300,
      y: 150,
      resizable: true,
      minimizable: true,
      maximizable: true,
      closable: true
    };

    super(config);
  }

  protected createContent(): HTMLElement {
    const content = document.createElement('div');
    content.className = 'skills-content';
    
    const rows = skills
      .map(
        (skill) => `
            <tr>
              <td>${skill.name}</td>
              <td class="proficiency">${'*'.repeat(skill.proficiency)}</td>
            </tr>`
      )
      .join('');

    content.innerHTML = `
      <div class="skills-header">
        <h2>Technical Skills</h2>
      </div>

      <div class="skills-table-container">
        <table class="skills-table">
          <thead>
            <tr>
              <th>Skill</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows}
          </tbody>
        </table>
      </div>
    `;

    return content;
  }
}