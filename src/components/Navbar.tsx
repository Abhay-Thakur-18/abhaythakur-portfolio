import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll state and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 24);

      const scrollPosition = scrollY + 240;
      const sections = ['about', 'projects', 'skills', 'experience', 'contact'];
      let current = '';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = sectionId;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0908]/90 backdrop-blur-xl border-b border-[#8C6D4F]/30 shadow-[0_10px_35px_rgba(0,0,0,0.85)] py-3 sm:py-3.5'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-[2px] border-b border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between w-full">
          {/* Brand Name */}
          <a
            href="#"
            className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.22em] sm:tracking-[0.3em] uppercase text-[#EAD8C7] hover:text-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded-sm py-1"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            aria-label="Portfolio Home - Abhay Pratap Singh"
          >
            {portfolioData.personal.name}
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center space-x-7 xl:space-x-9 text-[11px] tracking-[0.26em] font-light uppercase text-[#C4B5A5] bg-black/40 px-6 py-2.5 rounded-full border border-[#8C6D4F]/35 backdrop-blur-md"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            aria-label="Primary Navigation"
          >
            {portfolioData.navigation.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative group py-1 transition-colors duration-200 focus-visible:outline-none focus-visible:text-white ${
                    isActive ? 'text-white font-medium' : 'hover:text-[#FFF5EB]'
                  }`}
                >
                  <span>{item.name}</span>
                  {/* Subtle Gold Active / Hover Underline */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#D4AF37] transition-all duration-300 ${
                      isActive ? 'w-5 shadow-[0_0_8px_rgba(212,175,55,0.6)]' : 'w-0 group-hover:w-4'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center space-x-3">
            {/* LET'S TALK Button */}
            <a
              href="#contact"
              className="group hidden sm:inline-flex items-center space-x-2 text-[10.5px] tracking-[0.22em] font-medium uppercase py-2 px-4 md:px-5 border border-[#8C6D4F]/50 hover:border-[#D4AF37] bg-[#120F0C]/85 hover:bg-[#1A140E] text-[#EAD8C7] hover:text-white transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.08)] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <span>LET&apos;S TALK</span>
              <span className="transform transition-transform duration-300 group-hover:translate-x-1 text-xs text-[#D4AF37]">
                ↗
              </span>
            </a>

            {/* Mobile / Tablet Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col items-center justify-center w-10 h-10 border border-[#8C6D4F]/60 text-[#EAD8C7] bg-[#120F0C]/90 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`block w-4 h-[1.5px] bg-[#D4AF37] transition-transform duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[3px]' : '-translate-y-1'
                }`}
              />
              <span
                className={`block w-4 h-[1.5px] bg-[#D4AF37] transition-transform duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[2px]' : 'translate-y-1'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Navigation Modal & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobileMenu}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Menu Panel Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg mx-auto mt-16 px-6 py-8 bg-[#0E0C0A] border-y border-[#8C6D4F]/40 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#8C6D4F]/25">
                <span
                  className="text-xs font-mono tracking-[0.25em] text-[#D4AF37] uppercase"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  // NAVIGATION
                </span>
                <button
                  onClick={closeMobileMenu}
                  className="text-xs font-mono text-[#A8988B] hover:text-white uppercase tracking-wider px-2 py-1 border border-[#8C6D4F]/30"
                  aria-label="Close navigation menu"
                >
                  [CLOSE ✕]
                </button>
              </div>

              <nav className="flex flex-col space-y-4 text-xs font-mono tracking-[0.25em] uppercase">
                {portfolioData.navigation.map((item) => {
                  const sectionId = item.href.replace('#', '');
                  const isActive = activeSection === sectionId;

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`py-2 px-3 border-l-2 transition-all flex items-center justify-between ${
                        isActive
                          ? 'border-[#D4AF37] text-white bg-[#D4AF37]/5'
                          : 'border-transparent text-[#C4B5A5] hover:text-[#D4AF37] hover:border-[#8C6D4F]/50'
                      }`}
                    >
                      <span>{item.name}</span>
                      {isActive && <span className="text-[10px] text-[#D4AF37]">● ACTIVE</span>}
                    </a>
                  );
                })}

                <div className="pt-4 border-t border-[#8C6D4F]/25">
                  <a
                    href="#contact"
                    onClick={closeMobileMenu}
                    className="w-full py-3 px-4 bg-[#14100D] border border-[#D4AF37]/50 text-[#F7E7C4] hover:bg-[#D4AF37] hover:text-black flex items-center justify-between transition-colors tracking-[0.2em]"
                  >
                    <span>LET&apos;S TALK</span>
                    <span>↗</span>
                  </a>
                </div>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
