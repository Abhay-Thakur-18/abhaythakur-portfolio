import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import watermarkImg from '../assets/watermark.png';
import portraitImg from '../assets/abhay-portrait.png';
import { portfolioData } from '../data/portfolio';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const HeroSection: React.FC = () => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback gracefully if browser blocks autoplay
      });
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black cursor-default md:cursor-none flex flex-col justify-between pt-20 sm:pt-24 lg:pt-28">
      {/* ================= 1. MINIMAL CUSTOM CURSOR (DESKTOP FINE POINTER ONLY) ================= */}
      {!isTouchDevice && cursorPos.x >= 0 && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-[#D4AF37]/50 hidden md:flex items-center justify-center backdrop-blur-[2px]"
          animate={{
            x: cursorPos.x - (isHovered ? 24 : 5),
            y: cursorPos.y - (isHovered ? 24 : 5),
            width: isHovered ? 48 : 10,
            height: isHovered ? 48 : 10,
            backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.12)' : 'rgba(235, 215, 195, 0.95)',
          }}
          transition={{ type: 'spring', damping: 32, stiffness: 400, mass: 0.4 }}
        />
      )}

      {/* ================= 2. CINEMATIC VIDEO & PHOTO LAYER ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black flex items-center justify-end">
        {/* Right-Half Portrait / Video Composition */}
        <div className="relative h-full w-full sm:w-[90%] md:w-[68%] lg:w-[62%] xl:w-[58%] flex items-center justify-center overflow-hidden pr-0 sm:pr-4 md:pr-8 lg:pr-12">
          {!videoError ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/abhay-portrait.png"
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setVideoError(true)}
              className={`h-full w-full object-cover object-[62%_center] md:object-[64%_center] lg:object-[65%_center] transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-85' : 'opacity-40'
              }`}
              aria-hidden="true"
            >
              <source src="/videos/abhay.mp4" type="video/mp4" />
            </video>
          ) : (
            <img
              src={portraitImg}
              alt={portfolioData.personal.name}
              className="h-full w-full object-cover object-[62%_center] md:object-[64%_center] lg:object-[65%_center] opacity-80 filter brightness-95 contrast-105"
            />
          )}

          {/* Seamless Soft Left Edge Blend for Desktop Text Legibility */}
          <div className="absolute inset-y-0 left-0 w-1/3 md:w-2/5 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />

          {/* Subtle Right Soft Margin Blend */}
          <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-black/60 to-transparent pointer-events-none" />
        </div>

        {/* Global Desktop Left Text Area Gradient Protection */}
        <div className="absolute inset-y-0 left-0 w-full md:w-1/2 lg:w-[55%] bg-gradient-to-r from-black via-black/90 to-transparent pointer-events-none" />

        {/* Mobile Dark Overlay to Guarantee 100% Contrast */}
        <div className="absolute inset-0 bg-black/65 md:hidden pointer-events-none" />

        {/* Ambient Top & Bottom Vignettes */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black via-black/70 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none" />

        {/* Subtle Ambient Gold Radial Glow */}
        <div className="absolute right-1/4 top-1/3 w-[30rem] h-[30rem] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Insignia Emblem Watermark */}
        <div className="absolute bottom-8 right-6 lg:bottom-12 lg:right-12 pointer-events-none hidden sm:flex items-center justify-center z-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-32 h-32 bg-black/80 rounded-full blur-xl" />

            <motion.div
              animate={{
                y: [-3, 3, -3],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative flex items-center justify-center"
            >
              <img
                src={watermarkImg}
                alt="AI Developer Insignia Emblem"
                className="w-20 h-20 lg:w-24 lg:h-24 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.25)] opacity-80"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ================= 3. HERO CONTENT LAYER ================= */}
      <div className="relative z-10 flex flex-col justify-between flex-1 w-full px-4 sm:px-8 lg:px-16 pt-4 pb-4 pointer-events-none max-w-7xl mx-auto">
        {/* Main Content Row */}
        <div className="relative flex flex-col lg:flex-row items-start lg:items-end justify-between w-full my-auto gap-8 pt-4 pb-6">
          {/* LEFT: Headline, Role, Technologies & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl lg:max-w-2xl xl:max-w-[42rem] pointer-events-auto z-20"
          >
            {/* 1. Professional Role & Location Metadata */}
            <motion.div variants={fadeUpVariants} className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Refined Role Line with bullet separators */}
              <div className="inline-flex items-center px-3 py-1.5 border border-[#D4AF37]/45 bg-[#14100D]/90 shadow-[0_0_15px_rgba(212,175,55,0.12)]">
                <span
                  className="text-[9.5px] sm:text-[10.5px] font-mono tracking-[0.18em] sm:tracking-[0.24em] uppercase text-[#F7E7C4]"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {portfolioData.personal.role}
                </span>
              </div>

              {/* Location with Lucide-style MapPin SVG icon */}
              <div
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 text-[9.5px] sm:text-[10px] font-mono tracking-[0.16em] uppercase text-[#C4B5A5] border border-[#8C6D4F]/30 bg-[#0E0C0A]/70"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
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
                <span>{portfolioData.personal.location}</span>
              </div>
            </motion.div>

            {/* 2. Massive Editorial Headline */}
            <motion.div variants={fadeUpVariants} className="relative mb-3.5 select-none">
              <h1
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[6.8rem] xl:text-[7.4rem] tracking-tight uppercase leading-[0.88] sm:leading-[0.85]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {/* Line 1 */}
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#706456] drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  {portfolioData.personal.heroHeadline.line1}
                </span>

                {/* Line 2 */}
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
                  {portfolioData.personal.heroHeadline.line2}
                </span>

                {/* Line 3 */}
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#DFBE8A] via-[#9B7640] to-[#342410] drop-shadow-[0_10px_30px_rgba(155,118,64,0.4)]">
                  {portfolioData.personal.heroHeadline.line3}
                </span>
              </h1>
            </motion.div>

            {/* 3. Technology Line */}
            <motion.div variants={fadeUpVariants} className="mb-4">
              <p
                className="text-[9.5px] sm:text-[10.5px] md:text-xs font-medium tracking-[0.18em] sm:tracking-[0.24em] uppercase text-[#C4B29E] flex flex-wrap items-center gap-y-1.5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {portfolioData.personal.coreTechnologies.map((tech, idx) => (
                  <React.Fragment key={tech}>
                    <span>{tech}</span>
                    {idx < portfolioData.personal.coreTechnologies.length - 1 && (
                      <span className="text-[#8C6D4F] mx-2 text-[10px]">•</span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </motion.div>

            {/* 4. Professional Introduction */}
            <motion.div
              variants={fadeUpVariants}
              className="text-xs sm:text-[13px] md:text-[13.5px] font-light text-[#A8988B] leading-[1.75] tracking-wide max-w-xl mb-6 space-y-1.5"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <p className="text-[#EAD8C7] font-medium tracking-normal">
                {portfolioData.personal.tagline}
              </p>
              <p>{portfolioData.personal.heroDescription}</p>
            </motion.div>

            {/* 5. CTA Buttons & Subtle Social Links */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {/* Primary: View Projects */}
              <motion.a
                href="#projects"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex items-center justify-center space-x-2.5 px-6 sm:px-7 py-3 border border-[#8C6D4F] bg-[#120F0C] hover:border-[#D4AF37] hover:bg-[#1D1712] text-[#EAD8C7] hover:text-[#FFF5EB] text-[10px] sm:text-[11px] font-medium tracking-[0.2em] sm:tracking-[0.22em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.14)] group"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E8D7C5]/40 to-transparent pointer-events-none" />
                <span>VIEW PROJECTS</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs text-[#D4AF37]">
                  ↗
                </span>
              </motion.a>

              {/* Secondary: Download Resume */}
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex items-center justify-center space-x-2 px-6 sm:px-7 py-3 border border-[#8C6D4F]/45 hover:border-[#D4AF37] bg-[#0C0A08]/80 hover:bg-[#16120E] text-[#C4B5A5] hover:text-[#EAD8C7] text-[10px] sm:text-[11px] font-medium tracking-[0.2em] sm:tracking-[0.22em] uppercase transition-all duration-300 group"
              >
                <span>DOWNLOAD RESUME</span>
                <span className="transform transition-transform duration-300 group-hover:translate-y-0.5 text-xs text-[#D4AF37]">
                  ↓
                </span>
              </motion.a>

              {/* Subtle Social Links (LinkedIn & GitHub) */}
              <div className="flex items-center space-x-2 sm:ml-1">
                <a
                  href={portfolioData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abhay Pratap Singh LinkedIn Profile"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-10 h-10 inline-flex items-center justify-center border border-[#8C6D4F]/40 bg-[#0E0C0A]/80 hover:border-[#D4AF37] hover:bg-[#1A140E] text-[#C4B5A5] hover:text-[#F7E7C4] transition-all duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href={portfolioData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abhay Pratap Singh GitHub Profile"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-10 h-10 inline-flex items-center justify-center border border-[#8C6D4F]/40 bg-[#0E0C0A]/80 hover:border-[#D4AF37] hover:bg-[#1A140E] text-[#C4B5A5] hover:text-[#F7E7C4] transition-all duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Minimal Signature Plaque */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col items-start pointer-events-auto z-20 select-none bg-[#0A0806]/65 backdrop-blur-md px-4 py-3 sm:px-4.5 sm:py-3.5 rounded-sm border border-[#8C6D4F]/30 shadow-[0_10px_25px_rgba(0,0,0,0.85)] max-w-[250px] xl:max-w-[270px] group hover:border-[#D4AF37]/55 transition-all duration-300 relative mb-2 lg:mb-4 mr-2 lg:mr-6 xl:mr-12"
          >
            {/* Subtle Eyebrow Label */}
            <div className="flex items-center space-x-1.5 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] inline-block" />
              <span className="text-[8.5px] font-mono tracking-[0.22em] text-[#D4AF37] uppercase">
                ENGINEERING ETHOS
              </span>
            </div>

            {/* Statement Lines */}
            <div
              className="text-[9.5px] font-medium tracking-[0.2em] uppercase text-[#EAD8C7] space-y-0.5 mb-1.5 leading-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <p>{portfolioData.personal.heroStatement.line1}</p>
              <p className="text-[#C99E5D]">{portfolioData.personal.heroStatement.line2}</p>
            </div>

            {/* Gold Hairline Divider */}
            <div className="w-12 h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#C99E5D]/40 to-transparent mb-1" />

            {/* Personal Name Signature in Ruwudu font */}
            <div
              className="text-[1.35rem] lg:text-[1.5rem] text-[#F7E7C4] font-medium leading-tight tracking-wide drop-shadow-[0_0_10px_rgba(212,175,55,0.25)] pt-1"
              style={{
                fontFamily: "'Ruwudu', serif",
                fontWeight: 500,
              }}
            >
              {portfolioData.personal.signature}
            </div>
          </motion.div>
        </div>

        {/* 6. Bottom Availability / Status Line */}
        <div className="relative flex items-center justify-between w-full pt-4 pb-2 border-t border-[#8C6D4F]/20 pointer-events-auto">
          <div className="flex items-center space-x-2.5 sm:space-x-3 text-[8.5px] sm:text-[10px] font-mono tracking-[0.14em] sm:tracking-[0.22em] text-[#C4B29E] uppercase truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            <span className="truncate">{portfolioData.personal.availabilityStatus}</span>
          </div>

          <a
            href="#about"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="hidden sm:flex items-center space-x-2 text-[9px] sm:text-[10px] font-mono tracking-[0.24em] text-[#A8988B] hover:text-[#D4AF37] uppercase transition-colors shrink-0"
          >
            <span>SCROLL TO DISCOVER</span>
            <span className="animate-bounce text-xs">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;