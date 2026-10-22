# Anushree — Terminal-Inspired Developer Portfolio

A production-grade, accessible, high-performance personal portfolio website built for **Anushree**, a 5th-semester B.E. student specializing in Computer Science and Engineering — Artificial Intelligence and Machine Learning (CSE-AIML) at AJ Institute of Engineering and Technology, Mangaluru (graduating class of 2028).

---

## 🌟 Visual Identity & Key Highlights

- **Terminal-Inspired Aesthetic:** Deep obsidian navy backgrounds (`#080B14`), elevated surfaces (`#101729`), electric-blue accents (`#268BFF`), and cyber-violet highlights (`#9566FF`), with clean and uncluttered developer section indicators.
- **Interactive Terminal Console:** A live in-browser terminal widget supporting commands (`help`, `whoami`, `about`, `skills`, `projects`, `achievements`, `links`, `contact`, `resume`, `theme`, `clear`).
- **Hardware-Accelerated 3D Visuals:** Interactive 3D particle mesh and wireframe geometry that responds to pointer parallax on desktop, with automatic fallbacks for mobile and `prefers-reduced-motion` environments.
- **Truthful Engineering Integrity:** Strictly zero fabricated claims. Clean project status badge (`Repository link to be added`) without dummy link buttons or unnecessary pseudo-command banners.
- **Dual-Theme Support:** Real dark and light themes with deliberate contrast optimization meeting WCAG AA accessibility standards.
- **Dual Resume Delivery:** Interactive in-browser ATS-friendly printable resume viewer (`ResumeModal`) plus physical downloadable vector PDF (`/resume.pdf`).
- **Client-Side Validated Contact:** Accessible form validation with transparent mailto launch and direct 1-click email copy action.

---

## 🚀 Quick Start & Development

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation
```bash
# Navigate to the project directory
cd anushree-portfolio

# Install project dependencies
npm install
```

### Run Locally (Dev Server)
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Build for Production
```bash
npm run build
```
The optimized bundle will be emitted to the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Regenerate Resume PDF
```bash
npm run generate-resume
```
This updates `public/resume.pdf` with the authoritative profile data.

---

## 📁 Project Architecture

```
anushree-portfolio/
├── implementation.md          # Comprehensive implementation plan & architectural specification
├── README.md                  # Project documentation & operational guide
├── index.html                 # HTML5 template with SEO, OpenGraph tags, and skip links
├── package.json               # Dependencies and build scripts
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Custom theme tokens (electric blue, violet, surfaces)
├── postcss.config.js          # PostCSS plugins
├── public/
│   ├── favicon.svg            # Custom terminal prompt SVG favicon
│   ├── resume.pdf             # Real ATS-compliant generated PDF
│   └── robots.txt             # Search engine crawler permissions
├── scripts/
│   └── generate-pdf.js        # Authoritative vector PDF generator (jsPDF)
└── src/
    ├── main.jsx               # Application entry point
    ├── App.jsx                # Layout coordinator & landmark orchestration
    ├── index.css              # Tailwind base, terminal scanlines, glow effects, print CSS
    ├── data/
    │   ├── profile.js         # Authoritative profile information
    │   ├── skills.js          # Categorized technical competencies
    │   ├── projects.js        # HackAce 2.O & Hacknima 2. data
    │   ├── achievements.js    # HackACE Winner, Hacknima Finalist, Hacktoberfest
    │   └── terminalCommands.js# Interactive command registry & parser
    ├── hooks/
    │   ├── useTheme.js        # Dark/light theme state & persistence
    │   └── useReducedMotion.js# prefers-reduced-motion media query listener
    └── components/
        ├── Navbar.jsx         # Sticky header with terminal prompt wordmark & mobile drawer
        ├── ThemeToggle.jsx    # Accessible theme toggle button
        ├── Hero.jsx           # Hero viewport, status pill, CTAs, 3D canvas
        ├── TerminalConsole.jsx# Interactive terminal emulator with command history
        ├── Scene3D.jsx        # 3D geometric matrix canvas with pointer parallax
        ├── About.jsx          # Education at AJIET Mangaluru, graduation 2028
        ├── Skills.jsx         # Grouped skill cards (Frontend, Languages, Databases)
        ├── Projects.jsx       # Featured hackathon projects section
        ├── ProjectCard.jsx    # Visual SVG wireframe diagrams & status badges
        ├── Achievements.jsx   # Spotlight for HackACE Winner & Hacknima Finalist
        ├── Interests.jsx      # Connected node matrix for AI/ML/Data Science
        ├── Contact.jsx        # Verified channels & contact form wrapper
        ├── ContactForm.jsx    # Form validation & mailto fallback
        ├── ResumeModal.jsx    # ATS printable view with direct download
        └── Footer.jsx         # Programmatic current year, return-to-top button
```

---

## 📋 Verified Facts Inventory

| Item | Status | Verified Value |
| :--- | :--- | :--- |
| **Name** | Verified | Anushree |
| **Degree** | Verified | B.E. in CSE-AIML |
| **Institution** | Verified | AJ Institute of Engineering and Technology, Mangaluru |
| **Semester** | Verified | 5th Semester |
| **Expected Graduation** | Verified | 2028 |
| **Location** | Verified | Mangaluru, Karnataka, India |
| **Target Roles** | Verified | Software development and AI/ML internships or entry-level opportunities |
| **Skills** | Verified | HTML, CSS, JavaScript, React, Python, Java, C, C++, SQL |
| **Project 1** | Verified | **HackAce 2.O** — Smart team finder for students & hackathons; resume builder |
| **Project 2** | Verified | **Hacknima 2.** — User-friendly filtering application for students |
| **Achievement 1** | Verified | **Winner** — HackACE International Hackathon 2026 |
| **Achievement 2** | Verified | **Finalist** — Hacknima 2026 |
| **Achievement 3** | Verified | Participated in Hacktoberfest 2026 |
| **Achievement 4** | Verified | Attended workshop on RC model using AI |
| **GitHub** | Verified | `https://github.com/anushreeadyanthaya` |
| **LinkedIn** | Verified | `https://www.linkedin.com/in/anushree-adyanthaya-78829932a/` |
| **Email** | Verified | `anushreeadyanthaya@gmail.com` |

---

## 🛠️ Instructions for Updating Placeholders (For Anushree)

1. **Adding Project GitHub Links & Demos:**
   - Open `src/data/projects.js`.
   - Update `status.repo` with the valid GitHub URL and set `status.isRepoAvailable: true`.
   - Update `status.demo` with your live deployment link and set `status.isDemoAvailable: true`.
   - Add verified technology names in `technologies` array.
2. **Adding New Skills:**
   - Open `src/data/skills.js`.
   - Append new technologies to the corresponding category (`languages`, `frontend`, or `database`).
3. **Updating Academic Status / CGPA:**
   - When semester grades or CGPA are available, update `src/data/profile.js` and re-run `npm run generate-resume`.
4. **Deploying to Vercel / Netlify / GitHub Pages:**
   - Push this repository to GitHub.
   - Connect the repository to Vercel or Netlify.
   - Build Command: `npm run build`
   - Output Directory: `dist`
