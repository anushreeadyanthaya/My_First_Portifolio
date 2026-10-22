import React from 'react';
import { Trophy, Award, GitBranch, Check } from 'lucide-react';

export default function ProjectCard({ project }) {
  const isWinner = project.badgeType === 'winner';

  return (
    <article className="rounded-2xl border border-dark-border/50 dark:border-dark-border/50 light:border-light-border bg-dark-surface/85 dark:bg-dark-surface/85 light:bg-light-surface overflow-hidden shadow-xl transition-all duration-300 hover:border-electric-blue/60 dark:hover:border-electric-blue/60 light:hover:border-electric-blue-light/60 flex flex-col justify-between group glow-border">
      <div>
        {/* Card Header & SVG Abstract Wireframe Illustration */}
        <div className="relative h-48 sm:h-56 bg-[#06080F] dark:bg-[#06080F] light:bg-[#E2E8F0] p-4 flex items-center justify-center overflow-hidden border-b border-dark-border/30 dark:border-dark-border/30 light:border-light-border/40">
          <div className="absolute inset-0 bg-terminal-grid opacity-40"></div>

          {project.visualType === 'team-finder-matrix' ? (
            /* HackAce 2.O Team Finder & Resume Builder Visual Diagram */
            <svg
              className="w-full h-full max-w-sm text-electric-blue"
              viewBox="0 0 320 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Abstract diagram representing HackAce 2.O smart team finder and resume builder"
            >
              <circle cx="160" cy="90" r="28" fill="#101729" stroke="#9566FF" strokeWidth="2" strokeDasharray="3 3" />
              <circle cx="160" cy="90" r="14" fill="#9566FF" fillOpacity="0.25" />
              <text x="160" y="94" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="monospace" fontWeight="bold">MATCH</text>

              <line x1="80" y1="50" x2="135" y2="78" stroke="#268BFF" strokeWidth="1.5" strokeOpacity="0.7" />
              <line x1="80" y1="130" x2="135" y2="102" stroke="#268BFF" strokeWidth="1.5" strokeOpacity="0.7" />
              <line x1="240" y1="50" x2="185" y2="78" stroke="#268BFF" strokeWidth="1.5" strokeOpacity="0.7" />
              <line x1="240" y1="130" x2="185" y2="102" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.7" />

              <rect x="40" y="32" width="80" height="36" rx="6" fill="#101729" stroke="#268BFF" strokeWidth="1.2" />
              <text x="80" y="48" textAnchor="middle" fill="#F3F6FF" fontSize="9" fontFamily="monospace">Student Node</text>
              <text x="80" y="60" textAnchor="middle" fill="#268BFF" fontSize="8" fontFamily="monospace">AIML / Skill</text>

              <rect x="40" y="112" width="80" height="36" rx="6" fill="#101729" stroke="#268BFF" strokeWidth="1.2" />
              <text x="80" y="128" textAnchor="middle" fill="#F3F6FF" fontSize="9" fontFamily="monospace">Hackathon Team</text>
              <text x="80" y="140" textAnchor="middle" fill="#A6B0C5" fontSize="8" fontFamily="monospace">Open Slot</text>

              <rect x="200" y="32" width="84" height="36" rx="6" fill="#101729" stroke="#9566FF" strokeWidth="1.2" />
              <text x="242" y="48" textAnchor="middle" fill="#F3F6FF" fontSize="9" fontFamily="monospace">Resume Builder</text>
              <text x="242" y="60" textAnchor="middle" fill="#9566FF" fontSize="8" fontFamily="monospace">Dynamic ATS</text>

              <rect x="200" y="112" width="84" height="36" rx="6" fill="#101729" stroke="#00E5FF" strokeWidth="1.2" />
              <text x="242" y="128" textAnchor="middle" fill="#F3F6FF" fontSize="9" fontFamily="monospace">Smart Match</text>
              <text x="242" y="140" textAnchor="middle" fill="#00E5FF" fontSize="8" fontFamily="monospace">Optimized</text>
            </svg>
          ) : (
            /* Hacknima 2. Filter Pipeline Visual Diagram */
            <svg
              className="w-full h-full max-w-sm text-cyan-400"
              viewBox="0 0 320 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Abstract diagram representing Hacknima 2. user-friendly student filtering application"
            >
              <path d="M40 40 L120 70 L120 110 L40 140 Z" fill="#101729" stroke="#268BFF" strokeWidth="1.5" />
              <text x="75" y="93" textAnchor="middle" fill="#F3F6FF" fontSize="9" fontFamily="monospace">Input Data</text>

              <line x1="120" y1="90" x2="160" y2="90" stroke="#00E5FF" strokeWidth="2" strokeDasharray="4 2" />

              <rect x="160" y="55" width="55" height="70" rx="8" fill="#101729" stroke="#00E5FF" strokeWidth="1.5" />
              <text x="187" y="85" textAnchor="middle" fill="#00E5FF" fontSize="9" fontFamily="monospace" fontWeight="bold">FILTER</text>
              <text x="187" y="102" textAnchor="middle" fill="#A6B0C5" fontSize="8" fontFamily="monospace">Engine</text>

              <line x1="215" y1="90" x2="250" y2="90" stroke="#9566FF" strokeWidth="2" />

              <g transform="translate(250, 50)">
                <rect width="50" height="22" rx="4" fill="#101729" stroke="#10B981" strokeWidth="1" />
                <text x="25" y="14" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">Result A</text>
              </g>
              <g transform="translate(250, 78)">
                <rect width="50" height="22" rx="4" fill="#101729" stroke="#10B981" strokeWidth="1" />
                <text x="25" y="14" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">Result B</text>
              </g>
              <g transform="translate(250, 106)">
                <rect width="50" height="22" rx="4" fill="#101729" stroke="#10B981" strokeWidth="1" />
                <text x="25" y="14" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="monospace">Result C</text>
              </g>
            </svg>
          )}

          {/* Competition Distinction Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold shadow-md ${
                isWinner
                  ? 'bg-cyber-violet/20 border border-cyber-violet text-cyber-violet'
                  : 'bg-electric-blue/20 border border-electric-blue text-electric-blue'
              }`}
            >
              {isWinner ? <Trophy className="w-3.5 h-3.5 text-amber-400" /> : <Award className="w-3.5 h-3.5 text-cyan-300" />}
              <span>{project.badge}</span>
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white dark:text-white light:text-light-text-primary tracking-tight">
            {project.title}
          </h3>

          <p className="mt-1 text-sm font-mono text-electric-blue dark:text-electric-blue light:text-electric-blue-light">
            {project.tagline}
          </p>

          <p className="mt-4 text-sm text-slate-300 dark:text-slate-300 light:text-light-text-secondary leading-relaxed">
            {project.description}
          </p>

          {/* Capabilities Breakdown */}
          <div className="mt-5 space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 font-semibold">
              Project Capabilities:
            </span>
            <ul className="space-y-1.5">
              {project.capabilities.map((cap, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Footer: only verified links, or non-clickable status label */}
      <div className="p-6 pt-3 border-t border-dark-border/30 dark:border-dark-border/30 light:border-light-border/40 flex items-center justify-between bg-dark-surface/40 dark:bg-dark-surface/40 light:bg-light-surface">
        {project.status.isRepoAvailable ? (
          <a
            href={project.status.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-medium bg-electric-blue text-white hover:bg-electric-blue-hover transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>View Repository</span>
          </a>
        ) : (
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-medium border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 bg-slate-800/40 dark:bg-slate-800/40 light:bg-slate-100 text-slate-400 dark:text-slate-400 light:text-slate-600 select-none"
          >
            <GitBranch className="w-3.5 h-3.5 opacity-60" />
            <span>{project.status.repo}</span>
          </span>
        )}

        <span className="font-mono text-xs text-slate-500">
          {project.badgeType === 'winner' ? '1st Place' : 'Finalist'}
        </span>
      </div>
    </article>
  );
}
