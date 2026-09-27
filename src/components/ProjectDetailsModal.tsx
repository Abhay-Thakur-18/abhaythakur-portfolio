import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectItem } from '../data/portfolio';

interface ProjectDetailsModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Keyboard accessibility: ESC key close & lock body scroll
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 md:p-8 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          >
            {/* Ambient Gold Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-[#D4AF37]/10 rounded-full blur-[160px] pointer-events-none" />
          </motion.div>

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl lg:max-w-3xl max-h-[92vh] sm:max-h-[88vh] bg-[#0E0C0A] border border-[#8C6D4F]/50 rounded-xl p-4 sm:p-8 md:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.98)] overflow-y-auto z-10 custom-scrollbar group"
          >
            {/* Top Gold Horizon Edge */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            {/* Corner Minimal L-Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/70 pointer-events-none" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/70 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/70 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/70 pointer-events-none" />

            {/* Header: Badges, Category & Close Button */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#8C6D4F]/25 mb-4 sm:mb-6">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 truncate mr-2">
                <span className="text-xs font-mono font-bold text-[#D4AF37] shrink-0">
                  {project.number} //
                </span>
                {project.teamProject && (
                  <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-sm border border-[#D4AF37]/45 bg-[#D4AF37]/10 text-[9px] sm:text-[9.5px] font-mono tracking-[0.14em] uppercase text-[#F7E7C4] shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                    <span>TEAM PROJECT</span>
                  </span>
                )}
                <span className="text-[9.5px] sm:text-[10.5px] font-mono tracking-[0.18em] sm:tracking-[0.22em] uppercase text-[#C4B5A5] truncate">
                  {project.category}
                </span>
              </div>

              {/* Close Button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details modal"
                className="inline-flex items-center justify-center w-8 h-8 rounded-sm border border-[#8C6D4F]/40 bg-[#16120E] text-[#C4B5A5] hover:text-[#FFF5EB] hover:border-[#D4AF37] hover:bg-[#201A14] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#D4AF37] shrink-0"
              >
                <span className="text-lg leading-none">✕</span>
              </button>
            </div>

            {/* Project Title & Subtitle */}
            <div className="mb-4 sm:mb-6">
              <h2
                id="project-modal-title"
                className="text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white uppercase leading-[0.94] sm:leading-[0.92]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F7E7C4] to-[#C99E5D]">
                  {project.title}
                </span>
              </h2>
              {project.subtitle && (
                <p className="text-xs sm:text-sm font-mono tracking-widest text-[#D4AF37] mt-1 uppercase">
                  // {project.subtitle}
                </p>
              )}
            </div>

            {/* Verified Team / Contribution Callout */}
            {project.teamProject && (
              <div className="mb-6 p-3 sm:p-4 rounded-sm border border-[#D4AF37]/30 bg-[#120F0C] flex items-start space-x-3">
                <span className="text-xs text-[#D4AF37] mt-0.5">◈</span>
                <div className="text-xs sm:text-[13px] font-light text-[#D5CBC0] leading-relaxed">
                  <span className="font-mono font-medium text-[#F7E7C4] uppercase mr-2 tracking-wider">
                    COLLABORATIVE PROJECT:
                  </span>
                  <span>{project.contribution || 'Collaborative project developed with a team.'}</span>
                </div>
              </div>
            )}

            {/* About the Project */}
            <div className="mb-6">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4AF37] block mb-2.5">
                // ABOUT THE PROJECT
              </span>
              <p
                className="text-xs sm:text-sm md:text-[14px] font-light text-[#D5CBC0] leading-[1.85] tracking-wide"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {project.overview || project.description}
              </p>
            </div>

            {/* Key Capabilities (if verified) */}
            {project.capabilities && project.capabilities.length > 0 && (
              <div className="mb-6">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4AF37] block mb-2.5">
                  // VERIFIED KEY CAPABILITIES
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-[13px] text-[#C4B5A5] font-light">
                  {project.capabilities.map((cap, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-[#D4AF37] font-mono text-[11px] mt-0.5">▸</span>
                      <span className="leading-snug">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* System Architecture / Workflow (if verified) */}
            {project.architecture && (
              <div className="mb-6">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#8C6D4F] block mb-2">
                  // SYSTEM ARCHITECTURE & WORKFLOW
                </span>
                <div className="p-3 rounded-sm border border-[#8C6D4F]/30 bg-[#070605] text-[11px] sm:text-xs font-mono text-[#E8D7C5] leading-relaxed">
                  {project.architecture}
                </div>
              </div>
            )}

            {/* Verified Architecture Metrics (if any) */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="mb-6">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#8C6D4F] block mb-3">
                  // ARCHITECTURE & PLATFORM METRICS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-3 rounded-sm border border-[#8C6D4F]/30 bg-[#070605] flex flex-col justify-center"
                    >
                      <span className="text-[9px] font-mono text-[#8C6D4F] tracking-wider uppercase mb-1">
                        {m.label}
                      </span>
                      <span className="text-xs font-mono font-medium text-[#F7E7C4]">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Stack */}
            <div className="mb-7">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4AF37] block mb-3">
                // TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 sm:px-3 py-1 text-[9.5px] sm:text-[10.5px] font-medium tracking-[0.14em] uppercase rounded-sm border border-[#8C6D4F]/40 bg-[#16120E] text-[#E8D7C5] hover:border-[#D4AF37]/60 transition-colors"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Links / Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-[#8C6D4F]/25">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3 border border-[#8C6D4F] bg-[#16120E] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#EAD8C7] hover:text-black text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span>{project.githubLabel || 'VIEW ON GITHUB'}</span>
                <span className="text-xs">↗</span>
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3 border border-[#D4AF37] bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#F7E7C4] hover:text-black text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span>{project.liveLabel || 'VIEW LIVE'}</span>
                  <span className="text-xs">↗</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
