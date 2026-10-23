import React from 'react';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../data/projects';

export default function Projects() {
  return (
    <section id="projects" className="py-20 relative border-t border-light-border/40 dark:border-dark-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3 font-mono text-xs sm:text-sm text-electric-blue-light dark:text-electric-blue">
          <span>// 03. FEATURED PROJECTS</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-light-text-primary dark:text-white">
              Featured Engineering Projects
            </h2>
            <p className="mt-2 text-light-text-secondary dark:text-slate-400 font-mono text-sm">
              Practical applications validated in competitive hackathons
            </p>
          </div>
        </div>

        {/* Projects 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
