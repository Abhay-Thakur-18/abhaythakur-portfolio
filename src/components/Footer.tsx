import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

export const Footer: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouchDevice || shouldReduceMotion || !footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Column 02: Explore Navigation Links
  const exploreLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'CONTACT', href: '#contact' },
  ];

  // Column 03: Verified Real Skills
  const expertiseItems = [
    'AI / MACHINE LEARNING',
    'GENERATIVE AI',
    'LLMs',
    'DATA SCIENCE',
    'PYTHON',
    'DATA ANALYTICS',
  ];

  // Column 04: Connect Links with Lucide-style SVGs
  const connectChannels = [
    {
      label: 'EMAIL',
      href: `mailto:${portfolioData.contact.email}`,
      external: false,
      icon: (
        <svg
          className="w-4 h-4 shrink-0 text-[#D4AF37]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      label: 'LINKEDIN',
      href: portfolioData.contact.linkedin,
      external: true,
      icon: (
        <svg
          className="w-4 h-4 shrink-0 text-[#D4AF37]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: 'GITHUB',
      href: portfolioData.contact.github,
      external: true,
      icon: (
        <svg
          className="w-4 h-4 shrink-0 text-[#D4AF37]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      ref={footerRef}
      id="footer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: -100, y: -100 });
      }}
      className="relative w-full bg-[#050403] text-[#E8DFD8] border-t border-[#8C6D4F]/25 select-none overflow-hidden"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Top Edge Refined Accent Line */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pointer-events-none">
        <div className="absolute -top-[1px] left-4 sm:left-8 lg:left-16 flex items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.7)]" />
          <div className="w-20 sm:w-28 h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#8C6D4F]/40 to-transparent" />
        </div>
      </div>

      {/* Subtle Atmospheric Depth Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[260px] bg-[radial-gradient(ellipse_60%_35%_at_50%_0%,rgba(212,175,55,0.05),transparent_70%)]"
      />

      {/* Ambient Desktop Mouse-Following Highlight */}
      {!isTouchDevice && !shouldReduceMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
          style={{
            background: isHovered
              ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212,175,55,0.03), transparent 70%)`
              : 'transparent',
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Main Footer Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-12 sm:pt-14 lg:pt-16 pb-8 sm:pb-10">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10 sm:space-y-12"
        >
          {/* ============================================================== */}
          {/* 4-COLUMN EDITORIAL STRUCTURE (Desktop: 4 cols, Tablet: 2x2, Mobile: 1 col) */}
          {/* ============================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-8 items-start">
            {/* ---------------- COLUMN 01: BRAND / INTRO (lg: 4 cols) ---------------- */}
            <div className="lg:col-span-4 space-y-3.5 pr-0 lg:pr-6">
              <div className="space-y-1">
                <h3
                  className="text-2xl sm:text-[1.85rem] text-white font-normal uppercase tracking-wider leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {portfolioData.personal.name}
                </h3>
                <p
                  className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.22em] text-[#D4AF37] uppercase leading-relaxed pt-0.5"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {portfolioData.personal.role}
                </p>
              </div>

              {/* Tagline */}
              <p
                className="text-xs sm:text-[13px] text-[#C4B5A5] leading-relaxed font-light max-w-sm"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                "{portfolioData.personal.tagline}"
              </p>

              {/* Verified Location with MapPin Icon */}
              <div
                className="pt-1 flex items-center space-x-2 text-[10px] sm:text-[11px] font-mono tracking-[0.18em] text-[#A8988B] uppercase"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
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
                <span>BAREILLY, UTTAR PRADESH, INDIA</span>
              </div>
            </div>

            {/* Mobile Divider 1 */}
            <div className="block md:hidden w-full h-[1px] bg-[#8C6D4F]/20 my-1" />

            {/* ---------------- COLUMN 02: EXPLORE (lg: 2 cols) ---------------- */}
            <nav
              aria-label="Explore section links"
              className="lg:col-span-2 space-y-3.5"
            >
              <div
                className="text-xs font-mono tracking-[0.24em] text-[#D4AF37] font-semibold uppercase"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                // EXPLORE
              </div>

              <ul className="space-y-2">
                {exploreLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="group relative inline-flex items-center text-xs sm:text-[13px] tracking-wider text-[#D5CBC0] hover:text-[#FFF5EB] transition-colors duration-200 py-1 focus-visible:outline-none focus-visible:text-[#D4AF37]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      <span className="transform transition-transform duration-200 group-hover:translate-x-1.5 flex items-center gap-1.5">
                        <span className="text-[#8C6D4F] group-hover:text-[#D4AF37] text-[10px] transition-colors">
                          —
                        </span>
                        <span>{item.name}</span>
                        <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#D4AF37] text-[10px] transition-all duration-200">
                          ↗
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Divider 2 */}
            <div className="block md:hidden w-full h-[1px] bg-[#8C6D4F]/20 my-1" />

            {/* ---------------- COLUMN 03: EXPERTISE (lg: 3 cols) ---------------- */}
            <div
              aria-label="Core expertise areas"
              className="lg:col-span-3 space-y-3.5"
            >
              <div
                className="text-xs font-mono tracking-[0.24em] text-[#D4AF37] font-semibold uppercase"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                // EXPERTISE
              </div>

              <ul className="space-y-2">
                {expertiseItems.map((tech) => (
                  <li key={tech}>
                    <div
                      className="flex items-center space-x-2 text-[11px] sm:text-xs font-mono tracking-wider text-[#A8988B] hover:text-[#F3DBB3] transition-colors duration-200 py-0.5"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      <span className="w-1 h-1 rounded-full bg-[#8C6D4F]/80 shrink-0" />
                      <span>{tech}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Divider 3 */}
            <div className="block md:hidden w-full h-[1px] bg-[#8C6D4F]/20 my-1" />

            {/* ---------------- COLUMN 04: CONNECT (lg: 3 cols) ---------------- */}
            <div
              aria-label="Connect links"
              className="lg:col-span-3 space-y-3.5"
            >
              <div
                className="text-xs font-mono tracking-[0.24em] text-[#D4AF37] font-semibold uppercase"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                // CONNECT
              </div>

              <ul className="space-y-2.5">
                {connectChannels.map((channel) => (
                  <li key={channel.label}>
                    <a
                      href={channel.href}
                      target={channel.external ? '_blank' : undefined}
                      rel={channel.external ? 'noopener noreferrer' : undefined}
                      className="group flex items-center justify-between p-2.5 -ml-2 rounded-sm border border-transparent hover:border-[#8C6D4F]/40 hover:bg-[#0E0C0A]/80 transition-all duration-200 focus-visible:outline-none focus-visible:border-[#D4AF37]"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="group-hover:scale-105 transition-transform duration-200">
                          {channel.icon}
                        </span>
                        <span
                          className="text-xs sm:text-[13px] font-mono tracking-wider text-[#E8DFD8] group-hover:text-white transition-colors duration-200"
                          style={{ fontFamily: "'Space Mono', monospace" }}
                        >
                          {channel.label}
                        </span>
                      </div>
                      <span className="text-xs text-[#8C6D4F] group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-transform duration-200">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ============================================================== */}
          {/* BOTTOM BAR: Copyright & City Location */}
          {/* ============================================================== */}
          <div
            className="pt-6 border-t border-[#8C6D4F]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#8C6D4F]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            {/* Left: Copyright & Role */}
            <div className="space-y-0.5">
              <div className="text-[#C4B5A5] uppercase">
                © 2026 ABHAY PRATAP SINGH
              </div>
              <div className="text-[#8C6D4F] uppercase tracking-[0.18em]">
                AI ENGINEER · DATA SCIENTIST
              </div>
            </div>

            {/* Right: City Location with subtle gold dot */}
            <div className="flex items-center space-x-2 tracking-[0.22em] uppercase text-[#A8988B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70" />
              <span>BAREILLY, INDIA</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
