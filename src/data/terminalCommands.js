import { PROFILE } from './profile';
import { SKILL_CATEGORIES } from './skills';
import { PROJECTS } from './projects';
import { ACHIEVEMENTS } from './achievements';

export const INITIAL_TERMINAL_HISTORY = [
  {
    type: 'system',
    text: 'Terminal ready. Type "help" to view available commands.'
  },
  {
    type: 'input',
    command: 'whoami'
  },
  {
    type: 'output',
    text: `Anushree — ${PROFILE.title}\n${PROFILE.institution}\nStatus: ${PROFILE.currentStatus} (Expected Grad: ${PROFILE.expectedGraduation})\nFocus: Software Development & AI/ML`
  }
];

export function executeCommand(rawCommand, callbacks = {}) {
  const trimmed = rawCommand.trim();
  const [cmd] = trimmed.split(' ');
  const lowerCmd = cmd.toLowerCase();

  switch (lowerCmd) {
    case 'help':
      return {
        output: [
          'Commands:',
          '  whoami       - Professional profile summary',
          '  about        - Academic background and education',
          '  skills       - Programming languages and frontend skills',
          '  projects     - Hackathon projects (HackAce 2.O, Hacknima 2.)',
          '  achievements - Verified competition awards and distinctions',
          '  links        - Verified GitHub, LinkedIn, and email channels',
          '  contact      - Contact channels & email details',
          '  resume       - Open the ATS resume viewer and download',
          '  theme        - Toggle dark and light themes',
          '  clear        - Clear the terminal screen'
        ].join('\n')
      };

    case 'whoami':
      return {
        output: `${PROFILE.name}\n${PROFILE.degree}\n${PROFILE.institution}\nStatus: ${PROFILE.currentStatus} | Expected: ${PROFILE.expectedGraduation}\nLocation: ${PROFILE.location}\nGoal: ${PROFILE.professionalGoal}`
      };

    case 'about':
      return {
        output: `${PROFILE.name} is a 5th-semester B.E. student in Computer Science & Engineering (Artificial Intelligence and Machine Learning) at AJ Institute of Engineering and Technology, Mangaluru.\n\nExpected graduation: 2028.\nSeeking software development and AI/ML internships or entry-level opportunities.`
      };

    case 'skills':
      return {
        output: SKILL_CATEGORIES.map(category => {
          const list = category.skills.map(s => s.name).join(', ');
          return `[${category.name}]\n  ${list}`;
        }).join('\n\n')
      };

    case 'projects':
      return {
        output: PROJECTS.map(p => {
          return `● ${p.title} (${p.badge})\n  ${p.capabilities.join('; ')}\n  Status: ${p.status.repo}`;
        }).join('\n\n')
      };

    case 'achievements':
      return {
        output: ACHIEVEMENTS.map(a => `[${a.year}] ${a.title}`).join('\n')
      };

    case 'links':
    case 'link':
    case 'socials':
    case 'social':
    case 'contact':
      return {
        output: `Email:    ${PROFILE.socials.email.address}\nGitHub:   ${PROFILE.socials.github.url}\nLinkedIn: ${PROFILE.socials.linkedin.url}`
      };

    case 'github':
      return {
        output: `GitHub: ${PROFILE.socials.github.url}`
      };

    case 'linkedin':
      return {
        output: `LinkedIn: ${PROFILE.socials.linkedin.url}`
      };

    case 'email':
      return {
        output: `Email: ${PROFILE.socials.email.address}`
      };

    case 'resume':
      if (callbacks.openResume) callbacks.openResume();
      return {
        output: 'Opening resume viewer... Standalone PDF available at /resume.pdf'
      };

    case 'theme':
      if (callbacks.toggleTheme) callbacks.toggleTheme();
      return {
        output: 'Theme toggled.'
      };

    case 'clear':
      return { clear: true };

    case '':
      return { output: '' };

    default:
      return {
        output: `Command not recognized: "${cmd}". Type "help" for a list of available commands.`
      };
  }
}
