import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'pt',
  format: 'a4'
});

// A4 dimensions: 595.28 x 841.89 pt
const margin = 40;
const pageWidth = 595.28;
const contentWidth = pageWidth - margin * 2;
let y = margin + 10;

// Color Palette
const navy = [16, 23, 41];       // #101729
const blue = [38, 139, 255];     // #268BFF
const darkGrey = [51, 65, 85];    // #334155
const slate = [100, 116, 139];   // #64748B
const black = [15, 23, 42];      // #0F172A

// Helper for horizontal rule
function drawRule(yPos, color = [226, 232, 240]) {
  doc.setDrawColor(...color);
  doc.setLineWidth(0.8);
  doc.line(margin, yPos, pageWidth - margin, yPos);
}

// 1. Header: Name & Contact
doc.setFont('helvetica', 'bold');
doc.setFontSize(22);
doc.setTextColor(...navy);
doc.text('ANUSHREE', margin, y);

y += 18;
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(...blue);
doc.text('B.E. Computer Science & Engineering (AI & ML) Student', margin, y);

y += 15;
doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...slate);
const contactLine = 'Mangaluru, Karnataka, India  |  anushreeadyanthaya@gmail.com  |  linkedin.com/in/anushree-adyanthaya-78829932a  |  github.com/anushreeadyanthaya';
doc.text(contactLine, margin, y);

y += 12;
drawRule(y, blue);
y += 16;

// Helper function for Section Titles
function addSectionHeader(title) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...navy);
  doc.text(title.toUpperCase(), margin, y);
  
  const textWidth = doc.getTextWidth(title.toUpperCase());
  doc.setDrawColor(...blue);
  doc.setLineWidth(1.5);
  doc.line(margin, y + 3, margin + textWidth + 8, y + 3);

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(margin + textWidth + 12, y + 3, pageWidth - margin, y + 3);

  y += 16;
}

// 2. Professional Objective
addSectionHeader('Professional Objective');
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...darkGrey);
const objectiveText = 'Computer Science and Engineering (Artificial Intelligence and Machine Learning) student at AJ Institute of Engineering and Technology seeking software development and AI/ML internships or entry-level opportunities. Dedicated to writing clean, maintainable code, exploring machine learning models and data science, and quickly mastering emerging technologies to build purposeful solutions.';
const splitObjective = doc.splitTextToSize(objectiveText, contentWidth);
doc.text(splitObjective, margin, y);
y += splitObjective.length * 12 + 8;

// 3. Education
addSectionHeader('Education');
doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(...black);
doc.text('AJ Institute of Engineering and Technology', margin, y);

doc.setFont('helvetica', 'bold');
doc.setTextColor(...slate);
doc.text('Expected 2028', pageWidth - margin, y, { align: 'right' });

y += 13;
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...darkGrey);
doc.text('Bachelor of Engineering (B.E.) — Computer Science & Engineering (AI & ML)', margin, y);

y += 12;
doc.setFont('helvetica', 'italic');
doc.setFontSize(9);
doc.setTextColor(...slate);
doc.text('Current Academic Status: 5th Semester  |  Location: Mangaluru, Karnataka', margin, y);

y += 18;

// 4. Technical Skills
addSectionHeader('Technical Skills');

const skillGroups = [
  { label: 'Frontend Development', items: 'HTML, CSS, JavaScript, React' },
  { label: 'Programming Languages', items: 'Python, Java, C, C++' },
  { label: 'Databases & Querying', items: 'SQL' }
];

skillGroups.forEach(group => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...black);
  doc.text(`•  ${group.label}: `, margin + 5, y);
  
  const labelWidth = doc.getTextWidth(`•  ${group.label}: `);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkGrey);
  doc.text(group.items, margin + 5 + labelWidth, y);
  y += 13;
});

y += 8;

// 5. Featured Projects
addSectionHeader('Projects');

// Project 1: HackAce 2.O
doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(...black);
doc.text('HackAce 2.O', margin, y);

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...blue);
doc.text('Winner — HackACE International Hackathon 2026', pageWidth - margin, y, { align: 'right' });

y += 12;
doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...darkGrey);
const hackAceDesc = '• Smart team finder platform engineered for students and competitive hackathons.\n• Integrated resume builder module to streamline participant profiling and team matching.\n• Note: Project repository and demonstration links to be added upon public release.';
const splitHackAce = doc.splitTextToSize(hackAceDesc, contentWidth - 10);
doc.text(splitHackAce, margin + 5, y);
y += splitHackAce.length * 11 + 6;

// Project 2: Hacknima 2.
doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(...black);
doc.text('Hacknima 2.', margin, y);

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...blue);
doc.text('Finalist — Hacknima 2026', pageWidth - margin, y, { align: 'right' });

y += 12;
doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...darkGrey);
const hacknimaDesc = '• User-friendly filtering application specifically tailored for student workflows and data discovery.\n• Focused on intuitive user interface design and responsive filtering interactions.\n• Note: Project repository and demonstration links to be added upon public release.';
const splitHacknima = doc.splitTextToSize(hacknimaDesc, contentWidth - 10);
doc.text(splitHacknima, margin + 5, y);
y += splitHacknima.length * 11 + 8;

// 6. Achievements & Activities
addSectionHeader('Achievements & Activities');

const achievements = [
  { title: 'Winner — HackACE International Hackathon 2026', desc: 'Awarded first place distinction in international hackathon competition.' },
  { title: 'Finalist — Hacknima 2026', desc: 'Recognized as project finalist in competitive student technical challenge.' },
  { title: 'Hacktoberfest 2026 Participant', desc: 'Participated in the global open-source software contribution initiative.' },
  { title: 'Workshop on RC Model using Artificial Intelligence', desc: 'Hands-on practical training exploring AI model integration with remote-controlled hardware.' }
];

achievements.forEach(item => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...black);
  doc.text(`•  ${item.title}`, margin + 5, y);
  
  y += 11;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...slate);
  doc.text(`   ${item.desc}`, margin + 5, y);
  y += 12;
});

y += 6;

// 7. Core Interests
addSectionHeader('Areas of Interest');
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...darkGrey);
doc.text('Artificial Intelligence  •  Machine Learning  •  Data Science  •  Continuous Learning & New Technologies', margin + 5, y);

// Output directory
const outputDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
const outputPath = path.join(outputDir, 'resume.pdf');
const pdfBytes = doc.output('arraybuffer');
fs.writeFileSync(outputPath, Buffer.from(pdfBytes));
console.log(`Resume successfully generated at: ${outputPath}`);
