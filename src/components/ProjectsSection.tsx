import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData, type ProjectItem } from '../data/portfolio';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

interface ProjectCardProps {
  project: ProjectItem;
  displayNumber: string;
  onSelect: (p: ProjectItem) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  displayNumber,
  onSelect,
}) => (
  <div
    role="button"
    tabIndex={0}
    onClick={() => onSelect(project)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(project);
      }
    }}
    className="relative w-full min-h-[380px] rounded-2xl border border-[#8C6D4F]/45 bg-[#0E0C0A]/98 backdrop-blur-xl p-5 sm:p-7 lg:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.98)] group transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_25px_70px_rgba(212,175,55,0.14)] cursor-pointer outline-none overflow-hidden"
  >
    {/* Top gold flare */}
    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent transition-opacity duration-300 group-hover:via-[#D4AF37]" />

    {/* Corner brackets */}
    <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors pointer-events-none" />
    <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors pointer-events-none" />

    {/* Watermark number */}
    <span
      className="absolute -bottom-6 -right-3 text-7xl sm:text-8xl md:text-9xl font-bold text-[#EAD8C7]/5 select-none pointer-events-none leading-none group-hover:text-[#D4AF37]/10 transition-colors"
      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
    >
      {displayNumber}
    </span>

    {/* Content grid */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start relative z-10">
      {/* Left: title + description + tech */}
      <div className="lg:col-span-7 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-2 sm:mb-3">
            <span className="text-xs font-mono font-bold text-[#D4AF37] shrink-0">
              {displayNumber} //
            </span>
            {project.teamProject && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-sm border border-[#D4AF37]/45 bg-[#D4AF37]/10 text-[8px] sm:text-[8.5px] font-mono tracking-[0.14em] uppercase text-[#F7E7C4] shrink-0">
                <span className="w-1 h-1 rounded-full bg-[#D4AF37] animate-pulse" />
                <span>TEAM PROJECT</span>
              </span>
            )}
            <span className="text-[10px] sm:text-[10.5px] font-mono tracking-[0.2em] uppercase text-[#A8988B] truncate">
              {project.category}
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-2 sm:mb-2.5">
            <h3
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white group-hover:text-[#F7E7C4] transition-colors uppercase leading-[0.92]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {project.title}
            </h3>
            <span className="text-[10px] sm:text-[10.5px] text-[#D4AF37] font-mono opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
              VIEW DETAILS ↗
            </span>
          </div>

          {project.subtitle && (
            <p className="text-[11px] font-mono tracking-wider text-[#D4AF37]/90 -mt-0.5 mb-2 uppercase">
              // {project.subtitle}
            </p>
          )}

          <p
            className="text-xs sm:text-[13px] md:text-[13.5px] font-light text-[#BDB0A4] leading-[1.7] sm:leading-[1.75] tracking-wide mb-4 max-w-2xl"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {project.description}
          </p>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#8C6D4F]/25">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 sm:px-2.5 py-0.5 text-[8.5px] sm:text-[9.5px] font-medium tracking-[0.1em] uppercase rounded-sm border border-[#8C6D4F]/40 bg-[#16120E] text-[#E8D7C5] group-hover:border-[#D4AF37]/50 transition-all duration-300"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Right: metrics + actions */}
      <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-3 sm:space-y-4 lg:pl-6 lg:border-l lg:border-[#8C6D4F]/25">
        <div className="space-y-2">
          <span className="text-[9px] sm:text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#8C6D4F] block mb-1">
            // ARCHITECTURE METRICS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="p-2 sm:p-2.5 rounded-sm border border-[#8C6D4F]/25 bg-[#050403] flex items-center justify-between group-hover:border-[#8C6D4F]/40 transition-colors"
              >
                <span className="text-[9px] sm:text-[9.5px] font-mono text-[#A8988B]">{m.label}</span>
                <span className="text-[10px] sm:text-[10.5px] font-mono font-medium text-[#F7E7C4]">{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-2 sm:py-2.5 border border-[#8C6D4F] bg-[#16120E] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#EAD8C7] hover:text-black text-[9px] sm:text-[10px] font-medium tracking-[0.16em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>{project.githubLabel || 'VIEW ON GITHUB'}</span>
            <span className="text-[10px]">↗</span>
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-2 sm:py-2.5 border border-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#F7E7C4] hover:text-black text-[9px] sm:text-[10px] font-medium tracking-[0.16em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <span>{project.liveLabel || 'VIEW LIVE'}</span>
              <span className="text-[10px]">↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const projects = portfolioData.projects.items;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black"
      style={{ paddingBottom: 'clamp(60px, 10vh, 120px)' }}
    >
      <span id="work" className="absolute -top-10 left-0" />
      <div className="pointer-events-none absolute top-1/4 left-1/3 w-[36rem] h-[36rem] bg-[#D4AF37]/5 rounded-full blur-[180px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#8C6D4F]/5 rounded-full blur-[170px]" />

      {/* Section header */}
      <div className="max-w-7xl mx-auto w-full relative z-10 pt-14 sm:pt-20 px-3.5 sm:px-8 lg:px-20">
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="flex items-center space-x-4 mb-4"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {portfolioData.projects.eyebrow}
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.2rem] tracking-tight uppercase leading-[0.92] sm:leading-[0.85] select-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                {portfolioData.projects.headline.line1}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
                {portfolioData.projects.headline.line2}
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.1 }}
            className="max-w-md"
          >
            <p
              className="text-xs sm:text-[13px] font-light text-[#A8988B] leading-relaxed"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {portfolioData.projects.subtitle}
            </p>
            <div className="mt-3 flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1 rounded-sm border border-[#D4AF37]/35 bg-[#120F0C] shadow-[0_0_15px_rgba(212,175,55,0.08)]">
                <span className="text-sm font-mono font-bold text-[#F7E7C4]">
                  {projects.length.toString().padStart(2, '0')}
                </span>
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#D4AF37]">
                  ENGINEERED BUILDS
                </span>
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#8C6D4F]/30 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Unified Cinematic ScrollStack */}
        <ScrollStack
          itemDistance={60}
          stackPosition="10%"
          useWindowScroll={true}
        >
          {projects.map((project, idx) => {
            const displayNumber = String(idx + 1).padStart(2, '0');
            return (
              <ScrollStackItem key={project.title}>
                <ProjectCard
                  project={project}
                  displayNumber={displayNumber}
                  onSelect={setSelectedProject}
                />
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>

      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;