import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { portfolioData, type SkillCategory } from '../data/portfolio';

// Staggered container for skill cards
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.28,
    },
  },
};

// Cinematic card reveal
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface SkillCardProps {
  category: SkillCategory;
  isLastOdd: boolean;
  shouldReduceMotion: boolean | null;
}

const SkillCard: React.FC<SkillCardProps> = ({
  category,
  isLastOdd,
  shouldReduceMotion,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    if (e.pointerType === 'mouse' || window.matchMedia('(hover: hover)').matches) {
      const rect = cardRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current?.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current?.style.setProperty('--mouse-y', `${y}px`);
      }
    }
  };

  const handlePointerLeave = () => {
    cardRef.current?.style.setProperty('--mouse-x', '-1000px');
    cardRef.current?.style.setProperty('--mouse-y', '-1000px');
  };

  return (
    <motion.div
      ref={cardRef}
      variants={shouldReduceMotion ? undefined : cardVariants}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -8,
              scale: 1.015,
              transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            }
      }
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative p-5 sm:p-7 rounded-sm border border-[#8C6D4F]/35 bg-[#0E0C0A]/95 hover:bg-[#130F0C] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-[#D4AF37]/85 hover:shadow-[0_18px_50px_rgba(0,0,0,0.55),0_12px_40px_rgba(212,175,55,0.12),0_0_30px_rgba(212,175,55,0.08)] flex flex-col justify-between group z-10 hover:z-20 ${
        isLastOdd ? 'md:col-span-2 lg:col-span-3' : ''
      }`}
    >
      {/* 1. Mouse-Following Soft Radial Spotlight (Clipped inside card) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background:
            'radial-gradient(220px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(212, 175, 55, 0.16), rgba(212, 175, 55, 0.05) 40%, transparent 72%)',
        }}
      />

      {/* 2. Card Internal Dimensional Gradient Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(212, 175, 55, 0.05), transparent 55%)',
        }}
      />

      {/* 3. Top Subtle Border Highlight on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      {/* 4. Minimal Precision Corner Markers */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#D4AF37]/40 group-hover:border-[#D4AF37] group-hover:shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-300 pointer-events-none z-10" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#D4AF37]/40 group-hover:border-[#D4AF37] group-hover:shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-300 pointer-events-none z-10" />

      {/* Card Content Top Header */}
      <div className="relative z-10">
        {/* Category Card Header with Index & Expanding Line Indicator */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-mono tracking-[0.25em] text-[#D4AF37] group-hover:text-[#F7E7C4] group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] transition-all duration-300"
              style={{ fontFamily: "'Space Mono', monospace, sans-serif" }}
            >
              // {category.number}
            </span>
            {/* Active Gold Line Extension */}
            <span className="h-[1px] w-3 group-hover:w-7 bg-[#D4AF37]/50 group-hover:bg-[#D4AF37] group-hover:shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-250 ease-out" />
          </div>

          {/* Item Count Badge */}
          <span
            className="text-[9.5px] font-mono px-2 py-0.5 border border-[#8C6D4F]/35 text-[#A8988B] bg-[#14110E] group-hover:border-[#D4AF37]/60 group-hover:text-[#F3DBB3] group-hover:bg-[#1A1510] transition-all duration-300 uppercase tracking-[0.14em]"
            style={{ fontFamily: "'Space Mono', monospace, sans-serif" }}
          >
            {category.items.length} {category.items.length === 1 ? 'ITEM' : 'ITEMS'}
          </span>
        </div>

        {/* Category Name with Subtle Right-Shift & Brightness */}
        <h3
          className="text-xl sm:text-2xl font-normal tracking-wide text-white group-hover:text-[#FFFFFF] group-hover:translate-x-[3px] group-hover:drop-shadow-[0_0_18px_rgba(212,175,55,0.18)] transition-all duration-300 uppercase mb-3"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {category.name}
        </h3>

        {/* Expanding Gold / Bronze Divider */}
        <div className="w-10 group-hover:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#C99E5D]/60 to-transparent transition-all duration-300 mb-5" />
      </div>

      {/* Skills Chips with Noticeable Individual Hover Micro-Interaction */}
      <div
        className={`flex flex-wrap gap-2 pt-1 relative z-10 ${
          isLastOdd ? 'max-w-4xl' : ''
        }`}
      >
        {category.items.map((skill) => (
          <span
            key={skill}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase rounded-sm border border-[#8C6D4F]/30 bg-[#14110E] text-[#DCD1C5] hover:border-[#D4AF37]/90 hover:bg-[#201A14] hover:text-[#FFFFFF] hover:shadow-[0_4px_18px_rgba(212,175,55,0.18)] hover:-translate-y-[3px] transition-all duration-200 cursor-default select-none relative z-10"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export const SkillsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-16 sm:pt-20 pb-20 sm:pb-28 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden flex flex-col justify-center"
    >
      {/* Ambient Atmospheric Glows */}
      <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[28rem] h-[28rem] bg-[#8C6D4F]/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Step 1: Eyebrow Header (opacity 0 → 1, y 10px → 0) */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center space-x-4 mb-6"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {portfolioData.skills.eyebrow}
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Step 2 & 3: Section Header with sequential line reveals */}
        <div className="mb-10 sm:mb-14 select-none">
          <h2
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.25rem] tracking-tight uppercase leading-[0.92] sm:leading-[0.88]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {/* Step 2: First line (delay 0.08s, y 25px → 0) */}
            <motion.span
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#7A6B5C] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            >
              {portfolioData.skills.headline.line1}
            </motion.span>

            {/* Step 3: Second line (delay 0.16s, y 25px → 0) */}
            <motion.span
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]"
            >
              {portfolioData.skills.headline.line2}
            </motion.span>
          </h2>
        </div>

        {/* Step 4: 7-Category Technical Matrix Cards Grid */}
        <motion.div
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {portfolioData.skills.categories.map((category, idx) => {
            const isLastOdd =
              idx === portfolioData.skills.categories.length - 1;

            return (
              <SkillCard
                key={category.number}
                category={category}
                isLastOdd={isLastOdd}
                shouldReduceMotion={shouldReduceMotion}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;