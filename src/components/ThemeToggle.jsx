import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="p-2 rounded-lg border border-light-border dark:border-dark-border/40 bg-light-surface dark:bg-dark-surface/80 text-electric-blue-light dark:text-electric-blue hover:bg-light-elevated dark:hover:bg-electric-blue/20 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 animate-pulse-subtle" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700" />
      )}
    </button>
  );
}
