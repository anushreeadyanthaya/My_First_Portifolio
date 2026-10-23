import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Interests from './components/Interests';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import Chatbot from './components/Chatbot';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-light-base text-light-text-primary dark:bg-dark-base dark:text-dark-text-primary transition-colors duration-300 flex flex-col font-sans selection:bg-electric-blue selection:text-white">
      {/* Navigation Header */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Landmarks */}
      <main id="main-content" className="flex-1">
        <Hero
          theme={theme}
          onOpenResume={() => setIsResumeOpen(true)}
          onToggleTheme={toggleTheme}
        />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Interests />
        <Contact />
      </main>

      {/* Footer Landmark */}
      <Footer />

      {/* In-Browser ATS Resume Preview Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* AI Chatbot Widget */}
      <Chatbot />
    </div>
  );
}
