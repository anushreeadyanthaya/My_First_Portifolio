import React from 'react';
import { Brain, Cpu, Database, Sparkles } from 'lucide-react';
import { PROFILE } from '../data/profile';

export default function Interests() {
  const getInterestIcon = (name) => {
    switch (name) {
      case 'Brain':
        return Brain;
      case 'Cpu':
        return Cpu;
      case 'Database':
        return Database;
      case 'Sparkles':
      default:
        return Sparkles;
    }
  };

  return (
    <section id="interests" className="py-20 relative border-t border-dark-border/20 dark:border-dark-border/20 light:border-light-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3 font-mono text-xs sm:text-sm text-electric-blue">
          <span>// 05. CORE INTERESTS</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white dark:text-white light:text-light-text-primary">
              Focus Areas &amp; Explorations
            </h2>
            <p className="mt-2 text-slate-400 dark:text-slate-400 light:text-light-text-secondary font-mono text-sm">
              Fields of computer science driving continuous study and project development
            </p>
          </div>
        </div>

        {/* Connected Node Motif Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROFILE.interests.map((interest) => {
            const Icon = getInterestIcon(interest.icon);
            return (
              <div
                key={interest.title}
                className="rounded-2xl border border-dark-border/40 dark:border-dark-border/40 light:border-light-border bg-dark-surface/75 dark:bg-dark-surface/75 light:bg-light-surface p-6 relative overflow-hidden transition-all duration-300 hover:border-electric-blue/50 dark:hover:border-electric-blue/50 light:hover:border-electric-blue-light/50 group shadow-lg"
              >
                <div className="mb-4">
                  <div className="p-3 rounded-xl bg-electric-blue/10 dark:bg-electric-blue/10 light:bg-electric-blue-light/10 text-electric-blue dark:text-electric-blue light:text-electric-blue-light group-hover:scale-110 transition-transform inline-block">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white dark:text-white light:text-light-text-primary group-hover:text-electric-blue transition-colors">
                  {interest.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-light-text-secondary leading-relaxed">
                  {interest.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
