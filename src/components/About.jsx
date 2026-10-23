import React from 'react';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import { PROFILE } from '../data/profile';

export default function About() {
  const highlights = [
    {
      icon: GraduationCap,
      label: "Degree & Specialization",
      value: "B.E. in CSE-AIML",
      detail: PROFILE.institution
    },
    {
      icon: Calendar,
      label: "Academic Progression",
      value: "5th Semester",
      detail: "Graduation Expected: 2028"
    },
    {
      icon: MapPin,
      label: "Current Location",
      value: "Mangaluru, Karnataka",
      detail: "India"
    },
    {
      icon: Award,
      label: "Practical Validation",
      value: "HackACE '26 Winner",
      detail: "Hacknima '26 Finalist"
    }
  ];

  return (
    <section id="about" className="py-20 relative border-t border-light-border/40 dark:border-dark-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3 font-mono text-xs sm:text-sm text-electric-blue-light dark:text-electric-blue">
          <span>// 01. ABOUT</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-light-text-primary dark:text-white">
              Engineering Curiosity &amp; Academic Focus
            </h2>
            <p className="mt-2 text-light-text-secondary dark:text-slate-400 font-mono text-sm">
              Foundational rigor, AI/ML exploration, and practical application
            </p>
          </div>
        </div>

        {/* About Grid: Card and Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Dossier Card */}
          <div className="lg:col-span-7 rounded-2xl border border-light-border dark:border-dark-border/40 bg-light-surface dark:bg-dark-surface/80 p-6 sm:p-8 backdrop-blur-md shadow-xl relative overflow-hidden glow-border">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-light-border/30 dark:border-dark-border/30">
              <span className="font-mono text-xs text-cyber-violet-light dark:text-cyber-violet uppercase tracking-wider font-semibold">
                Academic Background — AJIET Mangaluru
              </span>
              <span className="font-mono text-xs text-slate-500">CSE-AIML</span>
            </div>

            <div className="space-y-4 text-light-text-secondary dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              <p>
                I am an undergraduate student pursuing a{' '}
                <strong className="text-light-text-primary dark:text-white font-semibold">
                  Bachelor of Engineering in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning (CSE-AIML)
                </strong>{' '}
                at{' '}
                <span className="text-electric-blue-light dark:text-electric-blue font-medium">
                  AJ Institute of Engineering and Technology, Mangaluru
                </span>
                . I am currently in my 5th semester and slated to graduate in 2028.
              </p>

              <p>
                My technical interests center on{' '}
                <strong className="text-light-text-primary dark:text-white font-semibold">
                  Artificial Intelligence, Machine Learning, and Data Science
                </strong>
                . Rather than treating theory in isolation, I thrive on hands-on software development and the fast-paced iterative cycle of competitive hackathons.
              </p>

              <p>
                This practical drive is reflected in my project work: creating{' '}
                <span className="text-light-text-primary dark:text-white font-medium">HackAce 2.O</span> (which achieved{' '}
                <span className="text-cyber-violet-light dark:text-cyber-violet font-semibold">1st Place Winner distinction at HackACE International Hackathon 2026</span>) and{' '}
                <span className="text-electric-blue-light dark:text-cyan-400 font-semibold">Hacknima 2.</span> (named a{' '}
                <span className="text-electric-blue-light dark:text-cyan-400 font-semibold">Finalist at Hacknima 2026</span>).
              </p>

              <p>
                I am actively seeking{' '}
                <strong className="text-light-text-primary dark:text-white font-semibold">
                  software development and AI/ML internships or entry-level opportunities
                </strong>{' '}
                where I can contribute clean code, embrace new frameworks, and solve real engineering challenges in a collaborative team environment.
              </p>
            </div>
          </div>

          {/* Right Highlights Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-light-border dark:border-dark-border/40 bg-light-surface dark:bg-dark-surface/60 p-5 hover:border-electric-blue-light/50 dark:hover:border-electric-blue/50 transition-all duration-200 group shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-electric-blue-light/10 dark:bg-electric-blue/10 text-electric-blue-light dark:text-electric-blue group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
                        {item.label}
                      </div>
                      <div className="text-base font-semibold text-light-text-primary dark:text-white mt-0.5">
                        {item.value}
                      </div>
                      <div className="text-xs text-light-text-secondary dark:text-slate-400 mt-0.5">
                        {item.detail}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
