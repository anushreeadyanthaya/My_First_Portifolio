import React, { useState } from 'react';
import { Send, CheckCircle2, Copy, ExternalLink } from 'lucide-react';
import { PROFILE } from '../data/profile';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submittedStatus, setSubmittedStatus] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required (minimum 2 characters)';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Please enter at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format (e.g. name@domain.com)';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Subject line is required';
    } else if (formData.subject.trim().length < 3) {
      errs.subject = 'Subject should be at least 3 characters';
    }

    if (!formData.message.trim()) {
      errs.message = 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Please provide at least 10 characters so Anushree can understand your inquiry';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const emailTo = PROFILE.socials.email.address;
    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const mailtoBody = encodeURIComponent(
      `Hello Anushree,\n\n${formData.message}\n\n---\nFrom: ${formData.name}\nEmail: ${formData.email}`
    );

    const mailtoUrl = `mailto:${emailTo}?subject=${mailtoSubject}&body=${mailtoBody}`;

    setSubmittedStatus({
      success: true,
      mailtoUrl
    });

    window.location.href = mailtoUrl;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.socials.email.address);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="rounded-2xl border border-light-border dark:border-dark-border/40 bg-light-surface dark:bg-dark-surface/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative glow-border">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-light-border/40 dark:border-dark-border/30">
        <h3 className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
          Send a Message
        </h3>
        <span className="font-mono text-xs text-slate-500">Contact Form</span>
      </div>

      {submittedStatus ? (
        <div className="space-y-5 py-4">
          <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 space-y-2">
            <div className="flex items-center gap-2 font-mono text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Ready in Your Mail Client</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Your message has been pre-filled into your system&apos;s email client addressed to <strong>{PROFILE.socials.email.address}</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <a
              href={submittedStatus.mailtoUrl}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold bg-electric-blue text-white hover:bg-electric-blue-hover transition-colors shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Mail Client</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold border border-cyber-violet-light/50 dark:border-cyber-violet/50 text-cyber-violet-light dark:text-cyber-violet hover:bg-cyber-violet-light/10 dark:hover:bg-cyber-violet/10 transition-colors"
            >
              {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copiedEmail ? 'Copied!' : 'Copy Email Address'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setSubmittedStatus(null);
              setFormData({ name: '', email: '', subject: '', message: '' });
            }}
            className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline pt-2 block text-center w-full"
          >
            Reset form
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contact-name"
                className="block font-mono text-xs text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-sm bg-light-elevated dark:bg-dark-base/80 border text-slate-900 dark:text-white focus:outline-none transition-colors ${
                  errors.name
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-light-border dark:border-dark-border/50 focus:border-electric-blue'
                }`}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 font-mono text-xs text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block font-mono text-xs text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@domain.com"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-sm bg-light-elevated dark:bg-dark-base/80 border text-slate-900 dark:text-white focus:outline-none transition-colors ${
                  errors.email
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-light-border dark:border-dark-border/50 focus:border-electric-blue'
                }`}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 font-mono text-xs text-red-500">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="contact-subject"
              className="block font-mono text-xs text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="contact-subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Internship Opportunity / Inquiry"
              aria-required="true"
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
              className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-sm bg-light-elevated dark:bg-dark-base/80 border text-slate-900 dark:text-white focus:outline-none transition-colors ${
                errors.subject
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-light-border dark:border-dark-border/50 focus:border-electric-blue'
              }`}
            />
            {errors.subject && (
              <p id="subject-error" className="mt-1 font-mono text-xs text-red-500">
                {errors.subject}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="contact-message"
              className="block font-mono text-xs text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Message Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              aria-required="true"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-sm bg-light-elevated dark:bg-dark-base/80 border text-slate-900 dark:text-white focus:outline-none transition-colors ${
                errors.message
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-light-border dark:border-dark-border/50 focus:border-electric-blue'
              }`}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 font-mono text-xs text-red-500">
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-semibold bg-electric-blue hover:bg-electric-blue-hover text-white shadow-neon-blue transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-electric-blue"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
