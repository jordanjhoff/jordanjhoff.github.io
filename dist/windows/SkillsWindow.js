import { BaseWindow } from '../components/BaseWindow.js';
export class SkillsWindow extends BaseWindow {
    constructor() {
        const config = {
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
    createContent() {
        const content = document.createElement('div');
        content.className = 'skills-content';
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
          <tbody>
            <tr>
              <td>Java</td>
              <td class="proficiency">***</td>
            </tr>
            <tr>
              <td>Python</td>
              <td class="proficiency">***</td>
            </tr>
            <tr>
              <td>Django</td>
              <td class="proficiency">**</td>
            </tr>
            <tr>
              <td>TypeScript / JavaScript</td>
              <td class="proficiency">**</td>
            </tr>
            <tr>
              <td>React</td>
              <td class="proficiency">**</td>
            </tr>
            <tr>
              <td>SQL</td>
              <td class="proficiency">***</td>
            </tr>
            <tr>
              <td>Linux</td>
              <td class="proficiency">**</td>
            </tr>
            <tr>
              <td>Docker / Containers</td>
              <td class="proficiency">**</td>
            </tr>
            <tr>
              <td>Git / Version Control</td>
              <td class="proficiency">***</td>
            </tr>
            <tr>
              <td>TCP/Socket Programming</td>
              <td class="proficiency">**</td>
            </tr>
            <tr>
              <td>AWS / Cloud</td>
              <td class="proficiency">*</td>
            </tr>
            <tr>
              <td>C / C++</td>
              <td class="proficiency">**</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
        return content;
    }
}
