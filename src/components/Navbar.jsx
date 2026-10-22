import React, { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ theme, toggleTheme, onOpenResume }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Interests', href: '#interests' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-base/90 dark:bg-dark-base/90 light:bg-light-base/90 backdrop-blur-md border-b border-dark-border/30 dark:border-dark-border/30 light:border-light-border/40 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 font-mono text-sm sm:text-base font-semibold tracking-tight text-white dark:text-white light:text-light-text-primary group focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue rounded-md px-1"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-electric-blue dark:text-electric-blue light:text-electric-blue-light">
              anushree
            </span>
            <span className="text-slate-400">@</span>
            <span className="text-cyber-violet dark:text-cyber-violet light:text-cyber-violet-light">
              portfolio
            </span>
            <span className="text-slate-500">:~$</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs lg:text-sm text-slate-300 dark:text-slate-300 light:text-light-text-secondary hover:text-electric-blue dark:hover:text-electric-blue light:hover:text-electric-blue-light transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue rounded px-1 py-0.5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons: Resume & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenResume}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs font-medium border border-cyber-violet/50 dark:border-cyber-violet/50 light:border-cyber-violet-light/40 text-cyber-violet dark:text-cyber-violet light:text-cyber-violet-light hover:bg-cyber-violet/15 dark:hover:bg-cyber-violet/15 light:hover:bg-cyber-violet-light/10 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-violet"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-lg border border-dark-border/40 dark:border-dark-border/40 light:border-light-border text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-dark-border/40 dark:border-dark-border/40 light:border-light-border bg-dark-base/98 dark:bg-dark-base/98 light:bg-light-surface/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm py-2 px-3 rounded-md text-slate-200 dark:text-slate-200 light:text-slate-800 hover:bg-electric-blue/15 dark:hover:bg-electric-blue/15 light:hover:bg-light-elevated hover:text-electric-blue transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-dark-border/20 dark:border-dark-border/20 light:border-light-border/20">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-mono text-sm font-medium border border-cyber-violet text-cyber-violet hover:bg-cyber-violet/15 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>View &amp; Download Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
