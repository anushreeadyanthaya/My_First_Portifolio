import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE } from '../data/profile';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-dark-border/30 dark:border-dark-border/30 light:border-light-border/40 bg-dark-base dark:bg-dark-base light:bg-light-base py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Descriptor */}
          <div className="text-center md:text-left space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-sm font-semibold">
              <span className="text-electric-blue">{PROFILE.name}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300 dark:text-slate-300 light:text-slate-700">
                {PROFILE.title}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              AJ Institute of Engineering and Technology, Mangaluru • Class of 2028
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={PROFILE.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg border border-dark-border/30 text-slate-400 hover:text-white hover:border-electric-blue transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PROFILE.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg border border-dark-border/30 text-slate-400 hover:text-white hover:border-cyber-violet transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={PROFILE.socials.email.url}
              aria-label="Send Email"
              className="p-2 rounded-lg border border-dark-border/30 text-slate-400 hover:text-white hover:border-electric-blue transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Return to top of page"
              title="Return to top of page"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs text-slate-300 border border-dark-border/40 hover:text-electric-blue hover:border-electric-blue/50 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>top</span>
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-8 pt-6 border-t border-dark-border/20 dark:border-dark-border/20 light:border-light-border/20 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-2">
          <div>
            © {currentYear} {PROFILE.name}. All rights reserved.
          </div>
          <div>
            Built with React, Vite &amp; Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}
