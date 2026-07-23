import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ChevronLeft, ChevronRight, ArrowUpRight, QrCode } from 'lucide-react'
import { CERTIFICATES } from './experience/experienceData'

const CARD_HEIGHT = 400

function CertificatesShowcase() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef(null)
  const cardRefs = useRef([])

  // Mouse Drag / Pan States
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // The expanded/collapsed card widths were hardcoded px values (640/120) tuned
  // for desktop. On phones that overflows the viewport, so we recompute them
  // against the current window width and keep them in sync on resize/rotate.
  const [cardWidths, setCardWidths] = useState({ active: 640, collapsed: 120 })

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const computeWidths = () => {
      const vw = window.innerWidth
      const active = Math.min(640, vw - (vw < 640 ? 48 : 96))
      const collapsed = vw < 480 ? 72 : vw < 768 ? 96 : 120
      setCardWidths({ active, collapsed })
    }
    computeWidths()
    window.addEventListener('resize', computeWidths)
    return () => window.removeEventListener('resize', computeWidths)
  }, [])

  const scrollToCard = (index) => {
    setActiveIndex(index)
    const activeCard = cardRefs.current[index]
    if (activeCard && containerRef.current) {
      activeCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }

  const handlePrev = () => {
    const nextIdx = activeIndex !== null && activeIndex > 0 ? activeIndex - 1 : CERTIFICATES.length - 1
    scrollToCard(nextIdx)
  }

  const handleNext = () => {
    const nextIdx = activeIndex !== null && activeIndex < CERTIFICATES.length - 1 ? activeIndex + 1 : 0
    scrollToCard(nextIdx)
  }

  const handleCardClick = (index) => {
    if (isDragging) return
    if (activeIndex === index) {
      setActiveIndex(null)
    } else {
      scrollToCard(index)
    }
  }

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  if (!mounted) return null

  const content = (
    <section id="credentials" className="relative z-20 w-full bg-[#ddd8cb] py-20 text-ink sm:py-24 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03),transparent_60%)] pointer-events-none" />
      
      {/* FIX: lg:pl-96 se hata kar lg:pl-72 kar diya hai taake sidebar ke sath gap kam ho jaye aur content left shift ho kar adjust ho jaye */}
      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-12 lg:pl-72 lg:pr-16">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-black/5 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-black backdrop-blur-md">
              <Award size={14} className="text-black" /> Collectible Credentials
            </span>
            <h2 className="mt-4 font-display font-black tracking-tight text-black leading-[1.05]" style={{ fontSize: 'clamp(28px, 6vw, 72px)' }}>
              Achievements <span className="underline decoration-black/30 decoration-wavy underline-offset-8"></span>
            </h2>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handlePrev}
              aria-label="Previous certificate"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-black/20 bg-white/40 flex items-center justify-center text-black transition-all hover:bg-black hover:text-[#f0ff3d] hover:scale-105 shadow-sm cursor-pointer"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next certificate"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-black/20 bg-white/40 flex items-center justify-center text-black transition-all hover:bg-black hover:text-[#f0ff3d] hover:scale-105 shadow-sm cursor-pointer"
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel View */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`certs-scroll relative flex items-center justify-start gap-4 sm:gap-6 overflow-x-auto overflow-y-visible scroll-smooth py-10 pl-2 md:pl-4 w-full ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ touchAction: 'pan-x' }}
        >
          {CERTIFICATES.map((cert, index) => {
            const isActive = index === activeIndex
            return (
              <motion.div
                key={cert.id}
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => handleCardClick(index)}
                animate={{
                  width: isActive ? cardWidths.active : cardWidths.collapsed,
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                whileHover={!isActive ? { y: -6 } : {}}
                style={{ backgroundColor: cert.cardColor, color: '#1a1a1a', height: CARD_HEIGHT }}
                className={`relative shrink-0 overflow-hidden rounded-[2rem] select-none shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${
                  !isActive ? 'border-2 border-dashed border-black/15' : 'z-20'
                }`}
              >
                {isActive && (
                  <div className="pointer-events-none">
                    <div className="absolute top-0 left-[72%] -translate-x-1/2 w-6 h-3 bg-[#ddd8cb] rounded-b-full z-30" />
                    <div className="absolute bottom-0 left-[72%] -translate-x-1/2 w-6 h-3 bg-[#ddd8cb] rounded-t-full z-30" />
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div
                      key="active"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 flex items-stretch"
                    >
                      <div className="flex-1 min-w-0 p-4 sm:p-5 md:p-6 flex flex-col justify-between relative overflow-hidden">
                        <div className="flex items-center justify-between border-b border-black/10 pb-3 gap-2">
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-black text-[#f0ff3d] flex items-center justify-center shadow-md">
                              <Award size={18} strokeWidth={2.5} />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-display text-sm sm:text-lg font-black tracking-wider uppercase truncate">{cert.title}</h4>
                              <p className="text-[10px] sm:text-[11px] font-semibold text-black/60 truncate">{cert.subtitle}</p>
                            </div>
                          </div>
                          <span className="hidden sm:inline text-xs font-mono font-bold tracking-widest text-black/40 shrink-0">{cert.certId}</span>
                        </div>
                        
                        <div className="py-2 space-y-2">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-black/50 block">By Coursera</span>
                            <p className="font-display text-lg sm:text-xl font-black text-black">{cert.recipient}</p>
                          </div>
                          <div className="bg-black/5 rounded-xl p-3 border border-black/5">
                            <p className="text-xs md:text-sm font-medium leading-relaxed text-black/80">{cert.achievement}</p>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {cert.skills.map((skill) => (
                              <span key={skill} className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-black/10 text-black">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-end justify-between pt-3 border-t border-black/10 gap-2">
                          <div className="space-y-1 min-w-0">
                            <span className="text-[10px] font-bold text-black/50 uppercase tracking-wider block truncate">Issued By: {cert.issuer}</span>
                            <div className="flex items-center gap-2">
                              <QrCode size={22} className="text-black/80 shrink-0" />
                              <span className="text-[11px] sm:text-xs font-mono font-bold text-black/70">{cert.date}</span>
                            </div>
                          </div>
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#f0ff3d] px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-black text-black shadow-md transition-transform hover:scale-105"
                          >
                            Verify <ArrowUpRight size={14} strokeWidth={3} />
                          </a>
                        </div>
                      </div>

                      <div className="relative w-0 flex items-center justify-center z-20">
                        <div className="absolute inset-y-4 border-r-2 border-dashed border-black/20" />
                      </div>

                      <div className="w-[64px] sm:w-[80px] md:w-[88px] shrink-0 p-3 sm:p-4 flex flex-col items-center justify-between rounded-r-[2rem] bg-black/5 text-black relative">
                        <span className="text-[10px] font-mono font-bold text-black/40">{cert.id}</span>
                        <div className="my-auto py-4">
                          <span className="block font-display text-xs sm:text-sm font-black tracking-[0.2em] sm:tracking-[0.25em] uppercase whitespace-nowrap rotate-90 origin-center text-black/80">
                            {cert.badgeText}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-black/50 font-mono">STUB</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 flex flex-col items-center justify-between py-6"
                    >
                      <span className="text-[10px] font-mono font-bold text-black/40">{cert.id}</span>
                      <span className="flex flex-1 items-center justify-center">
                        <span className="block whitespace-nowrap rotate-90 origin-center font-display text-xs sm:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-black/80">
                          {cert.title}
                        </span>
                      </span>
                      <Award size={16} strokeWidth={2.5} className="text-black/40" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {CERTIFICATES.map((cert, index) => (
            <button
              key={cert.id}
              onClick={() => scrollToCard(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === activeIndex ? 'w-8 bg-black' : 'w-2.5 bg-black/20 hover:bg-black/40'
              }`}
            />
          ))}
        </div>
      </div>
      
      <style>{`
        .certs-scroll::-webkit-scrollbar { display: none; }
        .certs-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )

  return createPortal(content, document.body)
}

export default CertificatesShowcase