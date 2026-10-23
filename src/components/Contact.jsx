import React, { useState } from 'react';
import { Mail, Github, Linkedin, Copy, CheckCircle2, ExternalLink, MapPin } from 'lucide-react';
import ContactForm from './ContactForm';
import { PROFILE } from '../data/profile';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.socials.email.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const directChannels = [
    {
      title: "Email",
      value: PROFILE.socials.email.address,
      href: PROFILE.socials.email.url,
      icon: Mail,
      color: "text-electric-blue-light dark:text-electric-blue"
    },
    {
      title: "GitHub",
      value: `github.com/${PROFILE.socials.github.handle}`,
      href: PROFILE.socials.github.url,
      icon: Github,
      color: "text-slate-900 dark:text-white"
    },
    {
      title: "LinkedIn",
      value: `linkedin.com/in/${PROFILE.socials.linkedin.handle}`,
      href: PROFILE.socials.linkedin.url,
      icon: Linkedin,
      color: "text-cyber-violet-light dark:text-cyber-violet"
    }
  ];

  return (
    <section id="contact" className="py-20 relative border-t border-light-border/40 dark:border-dark-border/20 bg-terminal-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3 font-mono text-xs sm:text-sm text-electric-blue-light dark:text-electric-blue">
          <span>// 06. CONTACT</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-light-text-primary dark:text-white">
              Initiate Contact &amp; Opportunities
            </h2>
            <p className="mt-2 text-light-text-secondary dark:text-slate-400 font-mono text-sm">
              Reaching out for software development &amp; AI/ML internships or technical collaborations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Verified Channels */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-light-border dark:border-dark-border/40 bg-light-surface dark:bg-dark-surface/70 p-6 shadow-xl space-y-4">
              <h3 className="font-mono text-sm font-semibold uppercase text-slate-700 dark:text-slate-300 tracking-wider">
                Direct Channels
              </h3>

              <div className="space-y-3">
                {directChannels.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      target={item.href.startsWith('mailto:') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="block p-3.5 rounded-xl border border-light-border dark:border-dark-border/30 bg-light-elevated/40 dark:bg-dark-base/50 hover:border-electric-blue-light/50 dark:hover:border-electric-blue/50 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-electric-blue-light/10 dark:bg-electric-blue/10 text-electric-blue-light dark:text-electric-blue group-hover:scale-110 transition-transform">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                              {item.title}
                            </div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-electric-blue-light dark:group-hover:text-electric-blue transition-colors">
                              {item.value}
                            </div>
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-electric-blue-light dark:group-hover:text-electric-blue transition-colors" />
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Quick Copy Action */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-mono text-xs font-medium border border-electric-blue-light/40 dark:border-electric-blue/40 text-electric-blue-light dark:text-electric-blue hover:bg-electric-blue-light/10 dark:hover:bg-electric-blue/10 transition-colors"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Email Copied!' : 'Copy Email Address'}</span>
              </button>

              <div className="pt-3 border-t border-light-border/40 dark:border-dark-border/30 flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-cyber-violet-light dark:text-cyber-violet" />
                <span>Location: {PROFILE.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
