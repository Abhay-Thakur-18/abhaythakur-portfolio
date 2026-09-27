import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import type { ProfessionalSignal } from '../data/portfolio';

interface SignalCardProps {
  signal: ProfessionalSignal;
  index: number;
  isTouchDevice: boolean;
  prefersReducedMotion: boolean;
}

const SignalCard: React.FC<SignalCardProps> = ({
  signal,
  index,
  isTouchDevice,
  prefersReducedMotion,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice && !prefersReducedMotion) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: -100, y: -100 });
  };

  const delay = index * 0.08;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="article"
      aria-label={`${signal.index}: ${signal.value} - ${signal.label}`}
      initial={
        prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 16, filter: 'blur(4px)' }
      }
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.65,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-sm bg-[#0C0A08]/90 border border-[#8C6D4F]/25 hover:border-[#D4AF37]/60 backdrop-blur-md transition-all duration-300 min-h-[136px] sm:min-h-[148px] overflow-hidden select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] ${
        !prefersReducedMotion
          ? 'hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_14px_36px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.08)]'
          : ''
      }`}
    >
      {/* Subtle Mouse-Following Radial Spotlight (Desktop pointer only) */}
      {!isTouchDevice && !prefersReducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: isHovered
              ? `radial-gradient(140px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212,175,55,0.12), transparent 75%)`
              : 'transparent',
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Subtle Inner Highlight Border */}
      <div className="absolute inset-0 rounded-sm pointer-events-none border border-white/[0.03] group-hover:border-[#D4AF37]/15 transition-colors duration-300 z-10" />

      {/* Top Row: Index */}
      <div className="relative z-10 flex items-center justify-between w-full mb-2">
        <span
          className="text-[9.5px] sm:text-[10px] font-mono tracking-[0.24em] text-[#D4AF37]/75 group-hover:text-[#F3DBB3] transition-colors duration-300"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          {signal.index}
        </span>
      </div>

      {/* Middle: Primary Value (2–3x visual prominence of secondary label) */}
      <div className="relative z-10 my-auto py-1">
        <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
          <div
            className={`text-2xl sm:text-3xl lg:text-[1.75rem] xl:text-[2.1rem] font-bold tracking-tight uppercase leading-none whitespace-nowrap overflow-hidden text-ellipsis ${
              signal.highlight
                ? 'text-[#D4AF37] group-hover:text-[#F7E7C4]'
                : 'text-[#F4EBE2] group-hover:text-white'
            }`}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {signal.value}
          </div>
        </div>
      </div>

      {/* Bottom: Subtle Hairline Divider + Secondary Label */}
      <div className="relative z-10 pt-2 mt-auto">
        <div className="w-5 h-[1px] bg-gradient-to-r from-[#D4AF37]/45 via-[#8C6D4F]/25 to-transparent group-hover:w-8 transition-all duration-300 mb-2" />

        <span
          className="block text-[9.5px] sm:text-[10px] font-medium tracking-[0.16em] uppercase text-[#A8988B] group-hover:text-[#C4B5A5] transition-colors duration-300 leading-snug"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {signal.label}
        </span>
      </div>
    </motion.div>
  );
};

export const ProfessionalSignals: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const signals = portfolioData.about.professionalSignals;

  return (
    <div className="w-full">
      {/* Section Eyebrow Header */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center space-x-3 mb-4 sm:mb-5"
      >
        <span
          className="text-[9.5px] sm:text-[10.5px] font-mono tracking-[0.24em] uppercase text-[#D4AF37]/90"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          01 / PROFESSIONAL SIGNALS
        </span>
        <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/70 via-[#8C6D4F]/30 to-transparent" />
      </motion.div>

      {/* Grid:
          Desktop >= 1100px: 4 cards in ONE row (lg:grid-cols-4)
          Tablet 768px-1099px: 2 x 2 grid (md:grid-cols-2)
          Mobile <= 767px: 1 column stack (grid-cols-1)
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-4 xl:gap-5 w-full">
        {signals.map((signal, idx) => (
          <SignalCard
            key={signal.index}
            signal={signal}
            index={idx}
            isTouchDevice={isTouchDevice}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfessionalSignals;
