import React, { useState } from 'react';
import { Code, Layout, Database, CheckCircle2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/skills';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Technologies' },
    { id: 'languages', label: 'Languages' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'database', label: 'Databases' }
  ];

  const filteredCategories =
    activeTab === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === activeTab);

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'languages':
        return Code;
      case 'frontend':
        return Layout;
      case 'database':
        return Database;
      default:
        return Code;
    }
  };

  return (
    <section id="skills" className="py-20 relative border-t border-light-border/40 dark:border-dark-border/20 bg-terminal-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3 font-mono text-xs sm:text-sm text-electric-blue-light dark:text-electric-blue">
          <span>// 02. TECHNICAL SKILLS</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-light-text-primary dark:text-white">
              Technical Competencies
            </h2>
            <p className="mt-2 text-light-text-secondary dark:text-slate-400 font-mono text-sm">
              Core foundation in programming languages, web standards, and relational data
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-light-border dark:border-dark-border/40 bg-light-surface dark:bg-dark-surface/60 backdrop-blur-md shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue ${
                  activeTab === tab.id
                    ? 'bg-electric-blue text-white shadow-neon-blue'
                    : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-light-elevated dark:hover:bg-dark-elevated/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const Icon = getCategoryIcon(category.id);
            return (
              <div
                key={category.id}
                className="rounded-2xl border border-light-border dark:border-dark-border/40 bg-light-surface dark:bg-dark-surface/70 p-6 flex flex-col justify-between hover:border-electric-blue-light/50 dark:hover:border-electric-blue/50 transition-all duration-300 group shadow-lg"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-light-border/30 dark:border-dark-border/30">
                    <div className="p-2.5 rounded-lg bg-electric-blue-light/10 dark:bg-electric-blue/10 text-electric-blue-light dark:text-electric-blue group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-light-text-primary dark:text-white text-base">
                        {category.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {category.skills.length} core technologies
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-light-text-secondary dark:text-slate-400 mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Skills Badges */}
                  <div className="space-y-2.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-3 rounded-xl border border-light-border/40 dark:border-dark-border/30 bg-light-elevated/40 dark:bg-dark-base/40 hover:bg-light-elevated dark:hover:bg-dark-elevated/80 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                          <span className="font-mono text-sm font-semibold text-light-text-primary dark:text-white">
                            {skill.name}
                          </span>
                        </div>
                        <p className="text-xs text-light-text-secondary dark:text-slate-400 pl-5">
                          {skill.description}
                        </p>
                      </div>
                    ))}
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
