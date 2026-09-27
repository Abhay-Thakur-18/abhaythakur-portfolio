import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { portfolioData } from '../data/portfolio';

export const ContactSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim() || '';
  const isFormConfigured = Boolean(
    formId &&
      formId !== 'your_form_id_here' &&
      formId !== 'YOUR_REAL_FORMSPREE_FORM_ID' &&
      formId !== 'YOUR_FORMSPREE_FORM_ID'
  );

  // Fallback key prevents @formspree/react from throwing during initial render when VITE_FORMSPREE_FORM_ID is empty
  const [state, handleFormspreeSubmit, resetFormspree] = useForm(isFormConfigured ? formId : 'contact');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  // Development-only diagnostic logging for Formspree errors
  useEffect(() => {
    if (state.errors) {
      if (import.meta.env.DEV) {
        console.error('Formspree Server Error:', {
          formErrors: state.errors.getFormErrors?.(),
          allFieldErrors: state.errors.getAllFieldErrors?.(),
        });
      }
    }
  }, [state.errors]);

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Please enter a subject.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please enter your message.';
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      return;
    }

    setClientErrors({});

    // If Formspree ID is not yet provided in .env, display clear guidance
    if (!isFormConfigured) {
      setClientErrors({
        general:
          'Formspree Form ID is not yet configured. Please set VITE_FORMSPREE_FORM_ID in your .env file to enable live message delivery.',
      });
      return;
    }

    handleFormspreeSubmit(e);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setClientErrors({});
    if (resetFormspree) {
      resetFormspree();
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-16 sm:pt-20 pb-20 sm:pb-24 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Ambient Atmospheric Glows */}
      <div className="absolute top-1/3 left-1/4 w-[32rem] h-[32rem] bg-[#D4AF37]/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[28rem] h-[28rem] bg-[#8C6D4F]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Responsive Grid: Left info & Right form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* ================= LEFT COLUMN ================= */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between space-y-7"
          >
            <div>
              {/* Eyebrow Header */}
              <div className="flex items-center space-x-4 mb-5">
                <span
                  className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {portfolioData.contact.eyebrow}
                </span>
                <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
              </div>

              {/* Editorial Headline */}
              <div className="mb-6 select-none">
                <h2
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] tracking-tight uppercase leading-[0.9] sm:leading-[0.86]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#706456] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                    {portfolioData.contact.headline.line1}
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#706456] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                    {portfolioData.contact.headline.line2}
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
                    {portfolioData.contact.headline.line3}
                  </span>
                </h2>
              </div>

              {/* Supporting Copy */}
              <p
                className="text-xs sm:text-[13.5px] font-light text-[#A8988B] leading-relaxed max-w-md mb-8"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {portfolioData.contact.description}
              </p>

              {/* Compact Contact Actions */}
              <div className="space-y-4 pt-2">
                {/* Email Action */}
                <div>
                  <span className="text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] block mb-1.5">
                    DIRECT EMAIL
                  </span>
                  <a
                    href={`mailto:${portfolioData.contact.email}`}
                    className="group inline-flex items-center space-x-2 text-xs sm:text-sm font-mono text-[#F4EBE2] hover:text-[#D4AF37] transition-colors py-1"
                  >
                    <span>{portfolioData.contact.email}</span>
                    <span className="text-xs text-[#D4AF37] transform transition-transform group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </a>
                </div>

                {/* Professional Links */}
                <div className="pt-2">
                  <span className="text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] block mb-2">
                    ONLINE PROFILES
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href={portfolioData.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3.5 py-2 border border-[#8C6D4F]/35 bg-[#0E0C0A]/85 hover:border-[#D4AF37] hover:bg-[#16120E] text-[#E8DFD8] hover:text-[#F7E7C4] text-[10px] font-mono tracking-[0.16em] uppercase transition-all duration-300 rounded-sm shadow-[0_0_12px_rgba(212,175,55,0.06)]"
                    >
                      <span>LINKEDIN</span>
                      <span className="text-xs text-[#D4AF37]">↗</span>
                    </a>
                    <a
                      href={portfolioData.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3.5 py-2 border border-[#8C6D4F]/35 bg-[#0E0C0A]/85 hover:border-[#D4AF37] hover:bg-[#16120E] text-[#E8DFD8] hover:text-[#F7E7C4] text-[10px] font-mono tracking-[0.16em] uppercase transition-all duration-300 rounded-sm shadow-[0_0_12px_rgba(212,175,55,0.06)]"
                    >
                      <span>GITHUB</span>
                      <span className="text-xs text-[#D4AF37]">↗</span>
                    </a>
                  </div>
                </div>

                {/* Location Metadata */}
                <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.16em] uppercase text-[#A8988B] pt-4 border-t border-[#8C6D4F]/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#D4AF37] shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{portfolioData.contact.location}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: FORMSPREE MESSAGE FORM ================= */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative w-full rounded-sm border border-[#8C6D4F]/40 bg-[#0E0C0A]/95 p-5 sm:p-8 lg:p-10 shadow-[0_20px_55px_rgba(0,0,0,0.9)] backdrop-blur-xl overflow-hidden"
          >
            {/* Top Gold Horizon Edge Accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

            {/* Precision Corner Markers */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/50" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]/50" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]/50" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/50" />

            {state.succeeded ? (
              /* Success State */
              <div
                className="py-12 sm:py-16 text-center space-y-4"
                role="status"
                aria-live="polite"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#D4AF37] text-[#D4AF37] text-lg shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                  ✓
                </div>
                <h3
                  className="text-3xl sm:text-4xl text-white font-normal uppercase"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  MESSAGE SENT
                </h3>
                <div
                  className="text-xs sm:text-sm text-[#A8988B] font-light max-w-md mx-auto leading-relaxed space-y-1"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <p>Thanks for reaching out.</p>
                  <p>Your message has been received successfully.</p>
                  <p className="text-[#C2AA90] pt-1">You can expect a response soon.</p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-6 inline-flex items-center space-x-2 px-6 py-2.5 border border-[#8C6D4F]/50 text-xs text-[#F7E7C4] font-mono tracking-widest uppercase hover:border-[#D4AF37] hover:bg-[#16120E] transition-all rounded-sm cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.08)]"
                >
                  <span>SEND ANOTHER MESSAGE</span>
                  <span>↺</span>
                </button>
              </div>
            ) : (
              /* Message Submission Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Anti-spam honeypot field (hidden from humans, trapped bots) */}
                <input
                  type="text"
                  name="_gotcha"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Explicit Subject header configuration for Formspree email */}
                <input
                  type="hidden"
                  name="_subject"
                  value={formData.subject ? `[Portfolio] ${formData.subject}` : 'New Portfolio Contact Message'}
                />

                {/* Configuration notification if VITE_FORMSPREE_FORM_ID is missing */}
                {clientErrors.general && (
                  <div
                    className="p-4 border border-[#D4AF37]/50 bg-[#1A140F]/95 text-[#F7E7C4] text-xs leading-relaxed font-mono rounded-sm space-y-1.5"
                    role="alert"
                  >
                    <div className="flex items-center space-x-2 text-[#D4AF37] font-semibold tracking-wider uppercase">
                      <span>ℹ</span>
                      <span>FORMSPREE SETUP REQUIRED</span>
                    </div>
                    <p className="text-[#E8DFD8]/90">
                      {clientErrors.general}
                    </p>
                  </div>
                )}

                {/* Submission Error Banner */}
                {state.errors && (
                  <div
                    className="p-4 border border-[#E57373]/60 bg-[#1F1212]/95 text-[#FFCDD2] rounded-sm space-y-2"
                    role="alert"
                  >
                    <div className="flex items-center space-x-2 text-[#E57373] font-semibold text-xs tracking-wider uppercase font-mono">
                      <span>✕</span>
                      <span>MESSAGE COULD NOT BE SENT</span>
                    </div>
                    <p className="text-xs font-mono text-[#FFCDD2]/90 leading-relaxed">
                      Something went wrong while sending your message. Please try again.
                    </p>
                    {state.errors.getFormErrors?.()?.length > 0 && (
                      <div className="text-[11px] font-mono text-[#FF8A80] bg-black/50 p-2 rounded border border-[#E57373]/30 space-y-1">
                        {state.errors.getFormErrors().map((err, idx) => (
                          <div key={idx}>
                            {err.code ? <strong className="text-white">[{err.code}] </strong> : ''}
                            {err.message}
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (resetFormspree) resetFormspree();
                        setClientErrors({});
                      }}
                      className="mt-1 inline-flex items-center space-x-1.5 px-3 py-1.5 border border-[#E57373]/60 text-[10px] font-mono text-white tracking-widest uppercase hover:bg-[#E57373]/20 transition-colors rounded-sm cursor-pointer"
                    >
                      <span>TRY AGAIN</span>
                      <span>↺</span>
                    </button>
                  </div>
                )}

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-1.5"
                    >
                      YOUR NAME *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (clientErrors.name) {
                          setClientErrors({ ...clientErrors, name: '' });
                        }
                      }}
                      placeholder="e.g. Elena Rostova"
                      className={`w-full bg-[#14100E] border text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-all focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 ${
                        clientErrors.name ? 'border-[#E57373]' : 'border-[#8C6D4F]/35'
                      }`}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                      aria-invalid={!!clientErrors.name}
                      aria-describedby={clientErrors.name ? 'name-error' : undefined}
                    />
                    {clientErrors.name && (
                      <span
                        id="name-error"
                        className="block mt-1 text-[10px] font-mono text-[#E57373]"
                      >
                        {clientErrors.name}
                      </span>
                    )}
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-1.5"
                    >
                      YOUR EMAIL *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (clientErrors.email) {
                          setClientErrors({ ...clientErrors, email: '' });
                        }
                      }}
                      placeholder="your@email.com"
                      className={`w-full bg-[#14100E] border text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-all focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 ${
                        clientErrors.email ? 'border-[#E57373]' : 'border-[#8C6D4F]/35'
                      }`}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                      aria-invalid={!!clientErrors.email}
                      aria-describedby={clientErrors.email ? 'email-error' : undefined}
                    />
                    {clientErrors.email && (
                      <span
                        id="email-error"
                        className="block mt-1 text-[10px] font-mono text-[#E57373]"
                      >
                        {clientErrors.email}
                      </span>
                    )}
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-1.5"
                  >
                    SUBJECT *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (clientErrors.subject) {
                        setClientErrors({ ...clientErrors, subject: '' });
                      }
                    }}
                    placeholder="What would you like to discuss?"
                    className={`w-full bg-[#14100E] border text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-all focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 ${
                      clientErrors.subject ? 'border-[#E57373]' : 'border-[#8C6D4F]/35'
                    }`}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    aria-invalid={!!clientErrors.subject}
                    aria-describedby={clientErrors.subject ? 'subject-error' : undefined}
                  />
                  {clientErrors.subject && (
                    <span
                      id="subject-error"
                      className="block mt-1 text-[10px] font-mono text-[#E57373]"
                    >
                      {clientErrors.subject}
                    </span>
                  )}
                  <ValidationError prefix="Subject" field="subject" errors={state.errors} />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-1.5"
                  >
                    MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (clientErrors.message) {
                        setClientErrors({ ...clientErrors, message: '' });
                      }
                    }}
                    placeholder="Write your message..."
                    className={`w-full bg-[#14100E] border text-xs text-white placeholder-[#8C6D4F]/50 p-4 outline-none rounded-sm transition-all focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/40 resize-none ${
                      clientErrors.message ? 'border-[#E57373]' : 'border-[#8C6D4F]/35'
                    }`}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    aria-invalid={!!clientErrors.message}
                    aria-describedby={clientErrors.message ? 'message-error' : undefined}
                  />
                  {clientErrors.message && (
                    <span
                      id="message-error"
                      className="block mt-1 text-[10px] font-mono text-[#E57373]"
                    >
                      {clientErrors.message}
                    </span>
                  )}
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full py-3.5 border border-[#8C6D4F]/60 bg-[#16120E] hover:border-[#D4AF37] hover:bg-[#1D1712] text-[#E8DFD8] hover:text-[#FFFFFF] disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.08)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.18)] cursor-pointer flex items-center justify-center space-x-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span>{state.submitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}</span>
                  <span>{state.submitting ? '●' : '↗'}</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;