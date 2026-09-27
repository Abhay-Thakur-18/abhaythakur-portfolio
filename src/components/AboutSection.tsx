import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import type { Variants } from 'framer-motion';
import abhayPortrait from '../assets/abhay-portrait.png';
import { portfolioData } from '../data/portfolio';
import { ProfessionalSignals } from './ProfessionalSignals';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.12,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const AboutSection: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  React.useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // 1. Motion Values for 3D card tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionValue(200);
  const spotlightY = useMotionValue(200);

  // 2. Springs for 3D Physics
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    damping: 20,
    stiffness: 240,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    damping: 20,
    stiffness: 240,
  });

  // 3. Top-Level Unconditional Transform for Spotlight Background
  const spotlightBg = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) =>
      `radial-gradient(circle 240px at ${x}px ${y}px, rgba(255,255,255,0.22), rgba(212,175,55,0.12), transparent 75%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsCardHovered(true);
  };

  const handleMouseLeave = () => {
    setIsCardHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };


  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black py-16 sm:py-20 lg:py-28 px-4 sm:px-12 lg:px-20 overflow-hidden flex items-center"
    >
      {/* Ambient Background Glows */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/6 w-[32rem] h-[32rem] bg-[#D4AF37] rounded-full blur-[160px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.15, 1, 1.15], opacity: [0.04, 0.1, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/6 right-1/4 w-[28rem] h-[28rem] bg-[#8C6D4F] rounded-full blur-[170px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center space-x-4 mb-8"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {portfolioData.about.eyebrow}
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Main Grid: Content + Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ================= LEFT CONTENT (7 COLS) ================= */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Cinematic Headline */}
            <motion.div variants={fadeUpVariants} className="relative mb-6 select-none">
              <h2
                className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.4rem] tracking-tight uppercase leading-[0.92] sm:leading-[0.88] break-words"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#706456] drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]">
                  {portfolioData.about.headline.line1}
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.3)]">
                  {portfolioData.about.headline.line2}
                </span>
              </h2>
            </motion.div>

            {/* Structured Bio Paragraphs with Real Verified Profile Information */}
            <motion.div
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[14px] font-light text-[#B3A497] leading-[1.85] tracking-wide mb-8 max-w-xl space-y-3.5"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <p>
                I am{' '}
                <span className="text-[#F3DBB3] font-medium">{portfolioData.personal.name}</span>,
                an{' '}
                <span className="text-[#D4AF37] font-medium">{portfolioData.personal.role}</span>{' '}
                based in {portfolioData.personal.location}, passionate about building intelligent,
                scalable, and real-world AI solutions.
              </p>

              <p>
                My core expertise spans{' '}
                <span className="text-[#EAD8C7]">
                  Python, SQL, Machine Learning, AI/ML, Data Analytics, FastAPI, MongoDB,
                  Generative AI, and Large Language Models (LLMs)
                </span>
                . I specialize in building end-to-end backend pipelines and full-stack AI
                solutions that transform complex data into impactful technology.
              </p>

              <p className="text-[#A8988B]">
                I enjoy transforming raw data into actionable insights, developing AI-powered
                applications, solving real business problems, continuous learning, and writing clean,
                scalable code that creates genuine practical value.
              </p>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT PORTRAIT FRAME ================= */}
          <div className="lg:col-span-5 flex items-center justify-center relative perspective-[1400px]">
            {/* Ambient Animated Gold Glow Ring Behind Frame */}
            <motion.div
              animate={{
                scale: isCardHovered ? 1.1 : 1,
                opacity: isCardHovered ? 0.3 : 0.12,
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute -inset-4 bg-[conic-gradient(from_0deg,#D4AF37_0%,#8C6D4F_30%,transparent_60%,#D4AF37_100%)] blur-2xl rounded-2xl pointer-events-none"
            />

            {/* 3D Holographic Main Card Container */}
            <motion.div
              ref={cardRef}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.94, y: 25 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-3 sm:p-4 border border-[#8C6D4F]/45 rounded-sm bg-[#120F0C]/90 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] cursor-pointer group transition-colors duration-500 hover:border-[#D4AF37]/90 max-w-sm sm:max-w-md w-full"
            >
              {/* Dynamic Laser Border Pulse on Card Perimeter */}
              <div className="absolute inset-0 rounded-sm pointer-events-none overflow-hidden">
                <motion.div
                  animate={{ x: isCardHovered ? ['-100%', '200%'] : '-100%' }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent skew-x-12"
                />
              </div>

              {/* Locked Corner Gold Accent Brackets */}
              <div className="pointer-events-none">
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37] transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#D4AF37] transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
              </div>

              {/* Real Portrait Image Canvas */}
              <div className="relative overflow-hidden w-full aspect-[4/5] bg-black rounded-sm">
                {/* Abhay's Real Photo with sharp natural rendering */}
                <img
                  src={abhayPortrait}
                  alt={`${portfolioData.personal.name} - AI Engineer & Data Scientist`}
                  className="w-full h-full object-cover object-[center_15%] filter brightness-[0.98] contrast-[1.04] group-hover:brightness-105 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                />

                {/* Mouse-Tracked Holographic Glass Spotlight Sweep */}
                <motion.div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
                  style={{
                    background: spotlightBg,
                    opacity: isCardHovered ? 1 : 0,
                  }}
                />

                {/* Bottom Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

                {/* Portrait Script Name in Ruwudu */}
                <div className="absolute bottom-3.5 right-4 z-20 select-none pointer-events-none">
                  <span
                    aria-label={portfolioData.personal.name}
                    className="text-base sm:text-lg lg:text-[1.25rem] font-medium text-[#F7E7C4] tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] drop-shadow-[0_0_8px_rgba(212,175,55,0.3)] transition-colors duration-300 group-hover:text-white"
                    style={{
                      fontFamily: "'Ruwudu', serif",
                      fontWeight: 500,
                    }}
                  >
                    {portfolioData.personal.signature}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================= 3. PROFESSIONAL SIGNALS STRIP ================= */}
        <div className="mt-14 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-[#8C6D4F]/25">
          <ProfessionalSignals />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;