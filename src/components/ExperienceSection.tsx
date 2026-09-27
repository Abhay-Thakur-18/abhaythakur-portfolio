import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { portfolioData, type CertificationItem, type ExperienceItem } from '../data/portfolio';
import { CertificateModal } from './CertificateModal';

const certsGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const certCardVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const milestoneVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: 'blur(5px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const MilestoneCard: React.FC<{
  stop: ExperienceItem;
  idx: number;
  shouldReduceMotion: boolean | null;
}> = ({ stop, idx, shouldReduceMotion }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, {
    margin: '-20% 0px -25% 0px',
    once: false,
  });

  const isCurrent = stop.status === 'CURRENT' || stop.type === 'experience';
  const isAchievement = stop.type === 'achievement';
  const isEducation = stop.type === 'education';

  return (
    <div ref={itemRef} className="relative flex items-start group">
      {/* ================= DESKTOP DATE & STATUS (LEFT COLUMN: 160px) ================= */}
      <div className="hidden md:flex flex-col items-end w-[160px] shrink-0 pr-8 pt-1 text-right space-y-2">
        {stop.year ? (
          <span
            className={`text-[10px] font-mono tracking-[0.2em] uppercase transition-colors duration-300 ${
              isInView || isCurrent
                ? 'text-[#D4AF37]'
                : 'text-[#8C6D4F] group-hover:text-[#C2AA90]'
            }`}
          >
            {stop.year}
          </span>
        ) : (
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F]/60">
            MILESTONE // 0{idx + 1}
          </span>
        )}

        {stop.status && (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[8.5px] font-mono tracking-widest uppercase transition-all duration-300 ${
              isCurrent
                ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/60 text-[#F7E7C4] shadow-[0_0_10px_rgba(212,175,55,0.25)]'
                : isAchievement
                ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37]'
                : isEducation
                ? 'bg-[#181410] border border-[#8C6D4F]/40 text-[#C2AA90]'
                : 'bg-[#14100D] border border-[#8C6D4F]/30 text-[#8C6D4F] group-hover:border-[#8C6D4F]/60'
            }`}
          >
            {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />}
            {isAchievement && <span>★</span>}
            {isEducation && <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D4F]" />}
            {stop.status}
          </span>
        )}
      </div>

      {/* ================= TIMELINE INTERACTIVE NODE ================= */}
      <div className="absolute left-[16px] md:left-[160px] top-3.5 -translate-x-1/2 flex items-center justify-center z-10">
        {/* Outer Halo */}
        <div
          className={`absolute w-7 h-7 rounded-full border transition-all duration-500 pointer-events-none ${
            isInView || isCurrent
              ? 'border-[#D4AF37]/60 scale-125 shadow-[0_0_15px_rgba(212,175,55,0.45)]'
              : 'border-[#D4AF37]/0 group-hover:border-[#D4AF37]/40 group-hover:scale-125'
          }`}
        />
        {/* Core Node */}
        <div
          className={`w-3 h-3 rounded-full border transition-all duration-300 ${
            isCurrent
              ? 'bg-[#D4AF37] border-[#D4AF37] shadow-[0_0_12px_#D4AF37]'
              : isAchievement
              ? 'bg-[#D4AF37] border-[#D4AF37] shadow-[0_0_10px_#D4AF37]'
              : isInView
              ? 'bg-[#D4AF37] border-[#D4AF37] shadow-[0_0_8px_#D4AF37]'
              : 'bg-[#120F0C] border-[#8C6D4F] group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37]'
          }`}
        />
      </div>

      {/* ================= CARD CONTENT (RIGHT COLUMN) ================= */}
      <div className="ml-9 md:ml-10 flex-1 pl-1 sm:pl-2 pb-8 sm:pb-10">
        <motion.div
          variants={shouldReduceMotion ? undefined : milestoneVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className={`relative p-4 sm:p-6 rounded-sm border transition-all duration-400 group-hover:-translate-y-1 ${
            isCurrent
              ? 'bg-[#13100D]/95 border-[#D4AF37]/50 hover:border-[#D4AF37] shadow-[0_12px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_14px_45px_rgba(212,175,55,0.14)]'
              : isAchievement
              ? 'bg-[#100D0B]/90 border-[#D4AF37]/35 hover:border-[#D4AF37]/70 shadow-[0_8px_30px_rgba(0,0,0,0.75)]'
              : 'bg-[#0E0C0A]/90 border-[#8C6D4F]/30 hover:border-[#D4AF37]/60 hover:bg-[#13100D] shadow-[0_8px_25px_rgba(0,0,0,0.7)]'
          }`}
        >
          {/* Top Gold Gradient Flare for Current Role */}
          {isCurrent && (
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent pointer-events-none" />
          )}

          {/* Subtle corner crosshairs on hover */}
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#D4AF37]/35 group-hover:border-[#D4AF37] transition-colors pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#D4AF37]/35 group-hover:border-[#D4AF37] transition-colors pointer-events-none" />

          {/* Mobile Header (Date + Status Badge) */}
          <div className="md:hidden flex flex-wrap items-center justify-between gap-2 mb-2.5">
            {stop.year ? (
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#D4AF37]">
                {stop.year}
              </span>
            ) : (
              <span className="text-[9.5px] font-mono tracking-widest uppercase text-[#8C6D4F]">
                MILESTONE // 0{idx + 1}
              </span>
            )}
            {stop.status && (
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[8.5px] font-mono tracking-widest uppercase ${
                  isCurrent
                    ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/60 text-[#F7E7C4]'
                    : isAchievement
                    ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37]'
                    : isEducation
                    ? 'bg-[#181410] border border-[#8C6D4F]/40 text-[#C2AA90]'
                    : 'bg-[#14100D] border border-[#8C6D4F]/30 text-[#8C6D4F]'
                }`}
              >
                {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />}
                {isAchievement && <span>★</span>}
                {isEducation && <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D4F]" />}
                {stop.status}
              </span>
            )}
          </div>

          {/* Title */}
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3
              className={`text-xl sm:text-3xl lg:text-[2.1rem] tracking-wide uppercase leading-tight transition-colors duration-300 ${
                isInView || isCurrent
                  ? 'text-white'
                  : 'text-[#E8DFD8] group-hover:text-[#F7E7C4]'
              }`}
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {stop.title}
            </h3>

            {isAchievement && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[9.5px] font-mono tracking-widest uppercase text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-xs border border-[#D4AF37]/30">
                <span>★</span>
                <span>PODIUM FINISH</span>
              </span>
            )}
          </div>

          {/* Organization & Meta */}
          <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
            <span className="text-[11px] sm:text-xs font-mono tracking-wider text-[#D4AF37] uppercase">
              {stop.organization}
            </span>
            {stop.location && (
              <>
                <span className="text-[9px] text-[#8C6D4F]/60">•</span>
                <span className="text-[10.5px] font-mono tracking-wider text-[#8C6D4F] uppercase">
                  {stop.location}
                </span>
              </>
            )}
          </div>

          {/* Description (if present) */}
          {stop.description && (
            <p
              className="text-xs sm:text-[13px] font-light text-[#A8988B] leading-relaxed pt-1 max-w-xl group-hover:text-[#C5B8AC] transition-colors"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {stop.description}
            </p>
          )}

          {/* Subtle bottom detail bar */}
          <div className="flex items-center justify-between pt-3 border-t border-[#8C6D4F]/15 mt-3 text-[9px] font-mono text-[#8C6D4F]">
            <span className="uppercase tracking-widest">
              ENTRY 0{idx + 1} // {stop.type.toUpperCase()}
            </span>
            <span className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity tracking-wider">
              {isCurrent
                ? 'ACTIVE PROFESSIONAL ROLE'
                : isEducation
                ? 'ACADEMIC PATHWAY'
                : isAchievement
                ? 'HACKATHON WINNER'
                : 'APPLIED AI/ML INTERNSHIP'}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleCertificateClick = (cert: CertificationItem) => {
    setSelectedCert(cert);
  };

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 85%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-6 sm:pt-8 pb-16 sm:pb-28 px-4 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#D4AF37]/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-7"
        >
          <div className="flex items-center space-x-4">
            <span
              className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {portfolioData.experience.eyebrow}
            </span>
            <div className="w-16 sm:w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8C6D4F]/30 bg-[#0E0C0A]/80 text-[9px] sm:text-[9.5px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#D4AF37]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            CAREER JOURNEY // 2023 — PRESENT
          </div>
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-16"
        >
          <h2
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.92] sm:leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {portfolioData.experience.headline.line1}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              {portfolioData.experience.headline.line2}
            </span>
          </h2>
        </motion.div>

        {/* ================= CINEMATIC CAREER TIMELINE ================= */}
        <div ref={timelineRef} className="relative w-full mb-16 sm:mb-20">
          {/* Background Track */}
          <div className="absolute left-[16px] md:left-[160px] top-4 bottom-8 w-[1px] bg-[#8C6D4F]/20" />

          {/* Animated Gold Track */}
          <motion.div
            style={{ height: shouldReduceMotion ? '100%' : lineHeight }}
            className="absolute left-[16px] md:left-[160px] top-4 w-[2px] bg-gradient-to-b from-[#D4AF37] via-[#C99E5D] to-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.7)] origin-top z-[5]"
          />

          <div className="space-y-4">
            {portfolioData.experience.timeline.map((stop, idx) => (
              <MilestoneCard
                key={stop.id}
                stop={stop}
                idx={idx}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>

        {/* ================= VERIFIED CERTIFICATIONS GRID ================= */}
        <div className="pt-12 sm:pt-14 border-t border-[#8C6D4F]/25">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between mb-7"
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-[10.5px] font-mono tracking-[0.25em] uppercase text-[#D4AF37]">
                // VERIFIED CERTIFICATIONS ({portfolioData.experience.certifications.length})
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#8C6D4F] uppercase tracking-wider hidden sm:inline">
              INDUSTRY ACCREDITATION
            </span>
          </motion.div>

          <motion.div
            variants={certsGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4"
          >
            {portfolioData.experience.certifications.map((cert) => (
              <motion.div
                key={cert.name}
                variants={certCardVariants}
                role="button"
                tabIndex={0}
                onClick={() => handleCertificateClick(cert)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCertificateClick(cert);
                  }
                }}
                aria-label={`View certificate for ${cert.name}`}
                className="group relative p-4 sm:p-5 border border-[#8C6D4F]/30 bg-[#0F0C0A]/90 hover:bg-[#15110E] hover:border-[#D4AF37]/75 rounded-xs transition-all duration-250 cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.85),0_0_20px_rgba(212,175,55,0.08)] outline-none focus-visible:border-[#D4AF37] focus-visible:ring-1 focus-visible:ring-[#D4AF37]/50 flex flex-col justify-between overflow-hidden min-h-[148px]"
              >
                {/* Subtle corner crosshairs on hover */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-colors pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-colors pointer-events-none" />

                <div>
                  {/* Top Row: ISSUER (left) & VERIFIED (right) */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[9.5px] sm:text-[10px] font-mono tracking-widest text-[#8C6D4F] uppercase truncate">
                      {cert.issuer}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[8px] sm:text-[8.5px] font-mono tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-xs shrink-0 border border-[#D4AF37]/25">
                      <span>✓</span>
                      <span>VERIFIED</span>
                    </span>
                  </div>

                  {/* 2. CERTIFICATE NAME - Primary Visual Text */}
                  <h4
                    className="text-[14px] sm:text-[15.5px] text-white font-semibold group-hover:text-[#FBE8B5] transition-colors leading-snug line-clamp-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {cert.name}
                  </h4>

                  {/* 4. DATE - Smaller, muted, letter-spaced */}
                  {cert.date && (
                    <p className="text-[9.5px] sm:text-[10px] font-mono tracking-wider text-[#8C6D4F]/85 uppercase mt-1.5 truncate">
                      {cert.date}
                    </p>
                  )}
                </div>

                {/* 6. VIEW ACTION - At bottom */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#8C6D4F]/15">
                  <span className="text-[9px] font-mono text-[#8C6D4F]/60 uppercase tracking-widest">
                    CREDENTIAL
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[9.5px] sm:text-[10.5px] font-mono tracking-widest text-[#D4AF37] group-hover:text-white uppercase transition-colors font-medium">
                    <span>VIEW CERTIFICATE</span>
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};

export default ExperienceSection;