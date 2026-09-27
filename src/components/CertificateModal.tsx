import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { CertificationItem } from '../data/portfolio';

interface CertificateModalProps {
  certificate: CertificationItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset zoom when certificate changes or closes
  useEffect(() => {
    setIsZoomed(false);
  }, [certificate]);

  // Keyboard accessibility (ESC) and robust background scroll lock
  useEffect(() => {
    if (!certificate) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Save and lock body scroll
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Auto-focus close button
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 60);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      clearTimeout(timer);
    };
  }, [certificate, onClose]);

  const isPdf = certificate?.certificateUrl.toLowerCase().endsWith('.pdf') ?? false;

  return (
    <AnimatePresence>
      {certificate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
        >
          {/* Backdrop: Fullscreen Dark Glass Stage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.28, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/88 backdrop-blur-md cursor-pointer z-0"
            aria-hidden="true"
          >
            {/* Subtle Ambient Gold Stage Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(212,175,55,0.07),transparent_70%)] pointer-events-none" />
          </motion.div>

          {/* Centered Modal Window Container */}
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, scale: 0.97, y: 12 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.98, y: 8 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[94vw] max-w-[1100px] h-[92vh] sm:h-[94vh] max-h-[900px] bg-[#0C0A08] border border-[#8C6D4F]/35 rounded-xl shadow-[0_25px_80px_rgba(0,0,0,0.98),0_0_40px_rgba(212,175,55,0.06)] overflow-hidden z-10 flex flex-col my-auto select-none"
          >
            {/* Top Accent Hairline */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent pointer-events-none z-20" />

            {/* Modal Header */}
            <div className="flex items-start sm:items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#8C6D4F]/25 bg-[#120F0C]/90 gap-3 shrink-0">
              <div className="flex-1 min-w-0 pr-2">
                {/* Small uppercase editorial label */}
                <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
                  CERTIFICATE
                </span>

                {/* Certificate Name (Prominent & Unabbreviated) */}
                <h3
                  id="cert-modal-title"
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-semibold tracking-wide leading-snug"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {certificate.name}
                </h3>

                {/* Metadata: Issuer · Date · Verified */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1.5 text-[10px] sm:text-[11px] font-mono">
                  <span className="text-[#C4B5A5] font-medium uppercase tracking-wider">
                    {certificate.issuer}
                  </span>

                  {certificate.date && (
                    <>
                      <span className="text-[#8C6D4F]/60">•</span>
                      <span className="text-[#8C6D4F] uppercase tracking-wider">
                        {certificate.date}
                      </span>
                    </>
                  )}

                  <span className="inline-flex items-center gap-1 text-[8.5px] sm:text-[9.5px] font-mono tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30 shrink-0">
                    <span>✓</span>
                    <span>VERIFIED</span>
                  </span>
                </div>
              </div>

              {/* Top Close Button (44px min clickable area) */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close certificate viewer"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg border border-[#8C6D4F]/30 hover:border-[#D4AF37]/80 bg-[#16120E]/80 hover:bg-[#201A13] text-[#A8988B] hover:text-[#FFF5EB] flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Middle: Certificate Image Presentation Canvas */}
            <div className="relative p-3 sm:p-5 md:p-6 bg-[#060504] flex items-center justify-center flex-1 min-h-0 overflow-auto">
              {!isPdf ? (
                <div
                  className={`relative rounded-lg border border-[#8C6D4F]/20 p-2 sm:p-3 bg-[#090807] shadow-inner transition-all duration-300 max-h-full max-w-full flex items-center justify-center ${
                    isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                  title={isZoomed ? 'Click to fit view' : 'Click to zoom in'}
                >
                  <img
                    src={certificate.certificateUrl}
                    alt={`${certificate.name} - Issued by ${certificate.issuer}`}
                    className={`object-contain rounded transition-all duration-300 ${
                      isZoomed
                        ? 'max-h-none max-w-none scale-125 my-8 sm:my-12'
                        : 'max-h-[60vh] sm:max-h-[62vh] w-auto max-w-full'
                    }`}
                  />
                </div>
              ) : (
                /* PDF Presentation Fallback */
                <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center space-y-4 max-w-md bg-[#0C0A08] border border-[#8C6D4F]/30 rounded-lg">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                    <svg
                      className="w-8 h-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base text-white font-medium">
                      Official PDF Document Credential
                    </h4>
                    <p className="text-xs font-mono text-[#A8988B] pt-1">
                      {certificate.issuer} {certificate.date ? `• ${certificate.date}` : ''}
                    </p>
                  </div>
                  <a
                    href={certificate.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-[#D4AF37] bg-[#D4AF37]/10 text-[#F7E7C4] hover:bg-[#D4AF37] hover:text-black font-mono text-xs tracking-wider uppercase transition-colors"
                  >
                    <span>OPEN PDF</span>
                    <span>↗</span>
                  </a>
                </div>
              )}
            </div>

            {/* Bottom: Action Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-3.5 border-t border-[#8C6D4F]/25 bg-[#120F0C]/90 text-[10px] sm:text-[11px] font-mono shrink-0">
              {/* Left: Zoom Toggle (for images) */}
              <div>
                {!isPdf && (
                  <button
                    type="button"
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#8C6D4F]/30 hover:border-[#D4AF37] bg-[#16120E] text-[#C4B5A5] hover:text-[#FFF5EB] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-[#D4AF37]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {isZoomed ? (
                        <>
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </>
                      ) : (
                        <>
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </>
                      )}
                    </svg>
                    <span>{isZoomed ? 'FIT VIEW' : 'ZOOM'}</span>
                  </button>
                )}
              </div>

              {/* Right: Primary and Secondary Action Buttons */}
              <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-end ml-auto">
                {/* Primary: Open Certificate in New Tab */}
                <a
                  href={certificate.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded border border-[#D4AF37]/80 bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#F7E7C4] hover:text-black font-semibold uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                >
                  <span>OPEN CERTIFICATE</span>
                  <span>↗</span>
                </a>

                {/* Secondary: Close */}
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded border border-[#8C6D4F]/30 hover:border-[#8C6D4F] bg-[#16120E] hover:bg-[#1E1812] text-[#A8988B] hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;
