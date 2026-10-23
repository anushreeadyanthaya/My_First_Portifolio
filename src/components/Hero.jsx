import React from 'react';
import { ArrowDown, Send, FileText, Compass } from 'lucide-react';
import Scene3D from './Scene3D';
import TerminalConsole from './TerminalConsole';
import { PROFILE } from '../data/profile';

export default function Hero({ theme, onOpenResume, onToggleTheme }) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-terminal-grid">
      {/* 3D Geometric Scene Background */}
      <Scene3D theme={theme} />

      {/* Hero Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-electric-blue-light/5 dark:bg-electric-blue/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-cyber-violet-light/5 dark:bg-cyber-violet/15 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Introductions & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-xs font-medium text-emerald-500 dark:text-emerald-400">
                {PROFILE.statusPill}
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <div className="font-mono text-xs text-electric-blue-light dark:text-electric-blue tracking-wide">
                anushree@portfolio:~$
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-light-text-primary dark:text-white">
                Hello, world! <br />
                I&apos;m{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue-light dark:from-electric-blue via-cyan-500 dark:via-cyan-400 to-cyber-violet-light dark:to-cyber-violet">
                  {PROFILE.name}
                </span>
                .
              </h1>

              <p className="font-mono text-sm sm:text-base text-electric-blue-light dark:text-electric-blue font-medium">
                {PROFILE.title}
              </p>
            </div>

            {/* Concise Mission / Bio */}
            <p className="text-light-text-secondary dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              5th-semester engineering student at{' '}
              <span className="text-light-text-primary dark:text-white font-medium">
                {PROFILE.institution}
              </span>
              . Building purposeful software, exploring AI/ML and data science, and continuously mastering new technologies through competitive hackathons.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-sm font-semibold bg-electric-blue hover:bg-electric-blue-hover text-white shadow-neon-blue transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-electric-blue"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Projects</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-sm font-semibold border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface/60 text-light-text-primary dark:text-slate-200 hover:border-electric-blue hover:text-electric-blue transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Contact Me</span>
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-sm font-medium border border-cyber-violet-light/50 dark:border-cyber-violet/50 text-cyber-violet-light dark:text-cyber-violet hover:bg-cyber-violet-light/10 dark:hover:bg-cyber-violet/10 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-violet"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </button>
            </div>
          </div>

          {/* Right Column: Terminal Panel */}
          <div className="lg:col-span-6 w-full">
            <TerminalConsole onOpenResume={onOpenResume} onToggleTheme={onToggleTheme} />
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-mono">
        <span className="hidden sm:inline">Scroll to explore</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-electric-blue-light dark:text-electric-blue" />
      </div>
    </section>
  );
}
