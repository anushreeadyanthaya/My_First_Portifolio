import React from 'react';
import { Trophy, Award, GitPullRequest, Cpu, Calendar } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/achievements';

export default function Achievements() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Trophy':
        return Trophy;
      case 'Award':
        return Award;
      case 'GitPullRequest':
        return GitPullRequest;
      case 'Cpu':
        return Cpu;
      default:
        return Trophy;
    }
  };

  const primaryAchievements = ACHIEVEMENTS.filter((a) => a.prominence === 'primary');
  const secondaryAchievements = ACHIEVEMENTS.filter((a) => a.prominence === 'secondary');

  return (
    <section id="achievements" className="py-20 relative border-t border-light-border/40 dark:border-dark-border/20 bg-terminal-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3 font-mono text-xs sm:text-sm text-electric-blue-light dark:text-electric-blue">
          <span>// 04. ACHIEVEMENTS &amp; ACTIVITIES</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-light-text-primary dark:text-white">
              Honors, Competitions &amp; Activities
            </h2>
            <p className="mt-2 text-light-text-secondary dark:text-slate-400 font-mono text-sm">
              Hackathon victories, technical finalist selections, and continuous learning
            </p>
          </div>
        </div>

        {/* Primary Spotlight: Winner & Finalist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {primaryAchievements.map((item) => {
            const Icon = getIcon(item.icon);
            const isWinner = item.color === 'violet';

            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-6 sm:p-8 backdrop-blur-md relative overflow-hidden transition-all duration-300 shadow-xl ${
                  isWinner
                    ? 'border-cyber-violet-light/50 dark:border-cyber-violet/60 bg-light-surface dark:bg-dark-surface/90 shadow-neon-violet/10 dark:shadow-neon-violet/20 glow-border'
                    : 'border-electric-blue-light/50 dark:border-electric-blue/60 bg-light-surface dark:bg-dark-surface/90 shadow-neon-blue/10 dark:shadow-neon-blue/20 glow-border'
                }`}
              >
                {/* Accent top border line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 ${
                    isWinner
                      ? 'bg-gradient-to-r from-cyber-violet-light via-fuchsia-500 to-amber-500'
                      : 'bg-gradient-to-r from-electric-blue-light via-cyan-500 to-teal-500'
                  }`}
                />

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div
                    className={`p-3 rounded-xl ${
                      isWinner
                        ? 'bg-cyber-violet-light/10 dark:bg-cyber-violet/15 text-cyber-violet-light dark:text-cyber-violet'
                        : 'bg-electric-blue-light/10 dark:bg-electric-blue/15 text-electric-blue-light dark:text-electric-blue'
                    }`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 font-mono text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-dark-base border border-slate-200 dark:border-dark-border/40 text-slate-600 dark:text-slate-400">
                      <Calendar className="w-3 h-3" />
                      {item.year}
                    </span>
                    <span
                      className={`font-mono text-xs font-semibold px-2.5 py-1 rounded-md uppercase ${
                        isWinner
                          ? 'bg-amber-100 dark:bg-amber-400/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-400/40'
                          : 'bg-cyan-100 dark:bg-cyan-400/20 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-400/40'
                      }`}
                    >
                      {item.badgeLabel}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-light-text-primary dark:text-white tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-light-text-secondary dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Secondary Activities Grid: Hacktoberfest & AI Workshop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {secondaryAchievements.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={item.id}
                className="rounded-xl border border-light-border dark:border-dark-border/40 bg-light-surface dark:bg-dark-surface/60 p-5 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-electric-blue-light dark:text-electric-blue shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60">
                        {item.category}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">
                        {item.year}
                      </span>
                    </div>

                    <h4 className="text-base font-semibold text-light-text-primary dark:text-white">
                      {item.title}
                    </h4>

                    <p className="text-xs text-light-text-secondary dark:text-slate-400 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
