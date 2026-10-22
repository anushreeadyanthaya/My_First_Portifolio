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
      className="p-2 rounded-lg border border-dark-border/40 dark:border-dark-border/40 light:border-light-border bg-dark-surface/60 dark:bg-dark-surface/80 light:bg-light-surface text-electric-blue hover:text-white dark:hover:text-white light:hover:text-electric-blue-light hover:bg-electric-blue/20 dark:hover:bg-electric-blue/20 light:hover:bg-light-elevated transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 animate-pulse-subtle" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700" />
      )}
    </button>
  );
}
