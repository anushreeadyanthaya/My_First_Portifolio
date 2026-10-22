import React, { useEffect } from 'react';
import { X, Download, Printer, FileText, ExternalLink, CheckCircle } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { SKILL_CATEGORIES } from '../data/skills';
import { PROJECTS } from '../data/projects';
import { ACHIEVEMENTS } from '../data/achievements';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-slate-900 border border-dark-border/60 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Action Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-dark-border/40 select-none">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyber-violet" />
            <h2 id="resume-title" className="font-mono text-sm font-semibold text-white">
              Anushree_Resume_2026.pdf [ATS-Optimized Preview]
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-medium border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
              title="Print or export to PDF via system dialog"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <a
              href="/resume.pdf"
              download="Anushree_Resume.pdf"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold bg-electric-blue text-white hover:bg-electric-blue-hover transition-colors shadow-neon-blue"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable ATS Resume Document View */}
        <div className="overflow-y-auto p-4 sm:p-8 bg-slate-950/60 flex justify-center">
          {/* Printable White Resume Canvas */}
          <div className="w-full max-w-2xl bg-white text-slate-900 p-8 sm:p-10 shadow-2xl rounded-sm font-sans text-left print:p-0 print:shadow-none print:max-w-none">
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-3 mb-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-950">
                {PROFILE.name}
              </h1>
              <div className="text-xs sm:text-sm font-bold text-blue-700 mt-0.5">
                {PROFILE.degree}
              </div>
              <div className="text-[11px] text-slate-600 mt-1 flex flex-wrap gap-x-2 gap-y-0.5">
                <span>{PROFILE.location}</span>
                <span>•</span>
                <span>{PROFILE.socials.email.address}</span>
                <span>•</span>
                <a href={PROFILE.socials.linkedin.url} className="text-blue-700 underline">
                  linkedin.com/in/{PROFILE.socials.linkedin.handle}
                </a>
                <span>•</span>
                <a href={PROFILE.socials.github.url} className="text-blue-700 underline">
                  github.com/{PROFILE.socials.github.handle}
                </a>
              </div>
            </div>

            {/* Objective */}
            <div className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-1.5">
                Professional Objective
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                Computer Science and Engineering (Artificial Intelligence and Machine Learning) student at AJ Institute of Engineering and Technology seeking software development and AI/ML internships or entry-level opportunities. Dedicated to writing clean, maintainable code, exploring machine learning models and data science, and quickly mastering emerging technologies to build purposeful solutions.
              </p>
            </div>

            {/* Education */}
            <div className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-1.5">
                Education
              </h2>
              <div className="flex justify-between items-baseline text-xs">
                <span className="font-bold text-slate-900">{PROFILE.institution}</span>
                <span className="font-semibold text-slate-600">Expected: {PROFILE.expectedGraduation}</span>
              </div>
              <div className="text-xs text-slate-800">
                {PROFILE.degree}
              </div>
              <div className="text-[11px] text-slate-600 italic">
                Current Standing: {PROFILE.currentStatus} | Location: {PROFILE.location}
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-1.5">
                Technical Skills
              </h2>
              <div className="space-y-1 text-xs">
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.id}>
                    <span className="font-bold text-slate-900">• {cat.name}: </span>
                    <span className="text-slate-700">
                      {cat.skills.map((s) => s.name).join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-1.5">
                Featured Projects
              </h2>

              <div className="space-y-3">
                {PROJECTS.map((proj) => (
                  <div key={proj.id} className="text-xs">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900">{proj.title}</span>
                      <span className="font-bold text-blue-800">{proj.badge}</span>
                    </div>
                    <ul className="list-disc list-inside text-slate-700 mt-1 space-y-0.5">
                      {proj.capabilities.map((cap, i) => (
                        <li key={i}>{cap}</li>
                      ))}
                    </ul>
                    <div className="text-[10px] text-slate-500 italic mt-0.5">
                      Note: {proj.status.repo}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements & Activities */}
            <div className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-1.5">
                Achievements &amp; Activities
              </h2>
              <ul className="space-y-1 text-xs text-slate-800">
                {ACHIEVEMENTS.map((ach) => (
                  <li key={ach.id} className="flex items-start gap-1.5">
                    <span className="font-bold text-slate-900">• {ach.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interests */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-1">
                Areas of Interest
              </h2>
              <p className="text-xs text-slate-700">
                {PROFILE.interests.map((i) => i.title).join('  •  ')}
              </p>
            </div>
          </div>
        </div>

        {/* Footer info note */}
        <div className="px-5 py-2.5 bg-slate-950 border-t border-dark-border/40 text-center text-xs font-mono text-slate-400">
          Source document aligned with verified profile facts • Zero synthetic metrics or placeholder experience
        </div>
      </div>
    </div>
  );
}
