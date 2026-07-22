import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, LayoutGroup } from 'framer-motion'
import { Award, ChevronLeft, ChevronRight, ArrowUpRight, QrCode } from 'lucide-react'
import { CERTIFICATES } from './experience/experienceData'

// Card ke width/position resize (open <-> close) ke liye spring.
const LAYOUT_TRANSITION = { type: 'spring', stiffness: 300, damping: 30, mass: 0.9 }

// Card ke andar content crossfade ke liye — simple, fast, koi delay-chaining nahi
// jo "empty box" jaisi glitch create kare.
const FADE_TRANSITION = { duration: 0.2, ease: 'easeInOut' }

// FIX: pehle 540px thi jo content se zyada thi (isliye beech mein fazool khaali
// space dikh rahi thi). Ab content ke hisaab se compact rakhi hai.
const CARD_HEIGHT = 400

function CertificatesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => setMounted(true), [])

  // FIX: jab bhi active card badle, usay smoothly scroll karke view ke
  // center mein le aao — is se koi card permanently hidden nahi rehta.
  useEffect(() => {
    const activeCard = cardRefs.current[activeIndex]
    if (activeCard) {
      activeCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [activeIndex, mounted])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : CERTIFICATES.length - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev < CERTIFICATES.length - 1 ? prev + 1 : 0))
  }

  if (!mounted) return null

  const content = (
    <section
      id="credentials"
      className="relative z-20 w-full bg-[#ddd8cb] py-28 text-ink"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03),transparent_60%)] pointer-events-none" />

      <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:pl-80 lg:pr-16">

        {/* Header & Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-black/5 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-black backdrop-blur-md">
              <Award size={14} className="text-black" /> Collectible Credentials
            </span>
            <h2
              className="mt-4 font-display font-black tracking-tight text-black leading-[1.05]"
              style={{ fontSize: 'clamp(32px, 6vw, 72px)' }}
            >
              Achievement <span className="underline decoration-black/30 decoration-wavy underline-offset-8">Tickets</span>
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handlePrev}
              aria-label="Previous certificate"
              className="w-12 h-12 rounded-full border border-black/20 bg-white/40 flex items-center justify-center text-black transition-all hover:bg-black hover:text-[#f0ff3d] hover:scale-105 shadow-sm cursor-pointer"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next certificate"
              className="w-12 h-12 rounded-full border border-black/20 bg-white/40 flex items-center justify-center text-black transition-all hover:bg-black hover:text-[#f0ff3d] hover:scale-105 shadow-sm cursor-pointer"
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel View — FIX: overflow-x-hidden -> overflow-x-auto,
            justify-center -> justify-start (taake wide row clip hone ke bajaye
            scroll ho sake), aur scrollbar ko subtle rakha hai. */}
        <div
          ref={containerRef}
          className="certs-scroll relative flex items-center justify-center gap-6 overflow-x-auto overflow-y-visible scroll-smooth py-10 w-full"
        >
          <LayoutGroup id="certificates">
            {CERTIFICATES.map((cert, index) => {
              const isActive = index === activeIndex
              return (
                <motion.div
                  key={cert.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  layout
                  transition={LAYOUT_TRANSITION}
                  onClick={() => setActiveIndex((prev) => (prev === index ? null : index))}
                  whileHover={!isActive ? { y: -6 } : {}}
                  style={{ backgroundColor: cert.cardColor, color: '#1a1a1a', height: CARD_HEIGHT }}
                  className={`relative shrink-0 overflow-hidden rounded-[2rem] cursor-pointer select-none shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${
                    isActive
                      ? 'z-20 w-[620px] md:w-[660px]'
                      : 'z-10 w-[110px] md:w-[130px] border-2 border-dashed border-black/15'
                  }`}
                >
                  {/* Notches — sirf active card par, apni khud ki fade */}
                  <motion.div
                    layout
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={FADE_TRANSITION}
                    className="pointer-events-none"
                  >
                    <div className="absolute top-0 left-[72%] -translate-x-1/2 w-6 h-3 bg-[#ddd8cb] rounded-b-full z-30" />
                    <div className="absolute bottom-0 left-[72%] -translate-x-1/2 w-6 h-3 bg-[#ddd8cb] rounded-t-full z-30" />
                  </motion.div>

                  {/* ============ FULL / ACTIVE CONTENT LAYER ============
                      Hamesha mounted rehta hai — sirf opacity crossfade hoti hai,
                      isliye kabhi "empty box" wala gap nahi dikhta. */}
                  <motion.div
                    layout
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={FADE_TRANSITION}
                    style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                    className="absolute inset-0 flex items-stretch"
                  >
                    {/* FIX: justify-between hata kar footer par mt-auto diya —
                        ab content top se shuru hota hai, sirf ek gap footer se
                        pehle banta hai, beech mein fazool jagah nahi bachti. */}
                    <div className="flex-1 p-5 md:p-6 flex flex-col relative overflow-hidden">
                      <div className="flex items-center justify-between border-b border-black/10 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-black text-[#f0ff3d] flex items-center justify-center shadow-md">
                            <Award size={20} strokeWidth={2.5} />
                          </div>
                          <div>
                            <h4 className="font-display text-lg font-black tracking-wider uppercase">{cert.title}</h4>
                            <p className="text-[11px] font-semibold text-black/60">{cert.subtitle}</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold tracking-widest text-black/40">
                          {cert.certId}
                        </span>
                      </div>

                      <div className="py-4 space-y-3">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-black/50 block">Recipient</span>
                          <p className="font-display text-2xl font-black text-black">{cert.recipient}</p>
                        </div>

                        <div className="bg-black/5 rounded-xl p-3 border border-black/5">
                          <p className="text-xs md:text-sm font-medium leading-relaxed text-black/80">
                            ✦ {cert.achievement}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {cert.skills.map((skill) => (
                            <span key={skill} className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-black/10 text-black">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto flex items-end justify-between pt-3 border-t border-black/10">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-black/50 uppercase tracking-wider block">Issued By: {cert.issuer}</span>
                          <div className="flex items-center gap-2">
                            <QrCode size={26} className="text-black/80" />
                            <span className="text-xs font-mono font-bold text-black/70">{cert.date}</span>
                          </div>
                        </div>

                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#f0ff3d] px-5 py-2.5 text-xs font-black text-black shadow-md transition-transform hover:scale-105"
                        >
                          Verify <ArrowUpRight size={14} strokeWidth={3} />
                        </a>
                      </div>
                    </div>

                    {/* Perforation Line */}
                    <div className="relative w-0 flex items-center justify-center z-20">
                      <div className="absolute inset-y-4 border-r-2 border-dashed border-black/20" />
                    </div>

                    {/* Detachable Stub */}
                    <div className="w-[76px] md:w-[88px] p-4 flex flex-col items-center justify-between rounded-r-[2rem] bg-black/5 text-black relative">
                      <span className="text-[10px] font-mono font-bold text-black/40">{cert.id}</span>
                      <div className="my-auto py-4">
                        <span className="block font-display text-sm font-black tracking-[0.25em] uppercase whitespace-nowrap rotate-90 origin-center text-black/80">
                          {cert.badgeText}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-black/50 font-mono">STUB</span>
                    </div>
                  </motion.div>

                  {/* ============ COMPACT / COLLAPSED TICKET LAYER ============
                      Yeh bhi hamesha mounted rehta hai, sirf opacity crossfade hoti hai. */}
                  <motion.div
                    layout
                    animate={{ opacity: isActive ? 0 : 1 }}
                    transition={FADE_TRANSITION}
                    style={{ pointerEvents: isActive ? 'none' : 'auto' }}
                    className="absolute inset-0 flex flex-col items-center justify-between py-6"
                  >
                    <span className="text-[10px] font-mono font-bold text-black/40">{cert.id}</span>
                    <span className="flex flex-1 items-center justify-center">
                      <span className="block whitespace-nowrap rotate-90 origin-center font-display text-base font-black uppercase tracking-[0.2em] text-black/80 md:text-lg">
                        {cert.title} Ticket
                      </span>
                    </span>
                    <Award size={16} strokeWidth={2.5} className="text-black/40" />
                  </motion.div>
                </motion.div>
              )
            })}
          </LayoutGroup>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {CERTIFICATES.map((cert, index) => (
            <button
              key={cert.id}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === activeIndex ? 'w-8 bg-black' : 'w-2.5 bg-black/20 hover:bg-black/40'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Subtle scrollbar styling for the horizontal ticket scroller */}
      <style>{`
        .certs-scroll::-webkit-scrollbar { height: 6px; }
        .certs-scroll::-webkit-scrollbar-track { background: transparent; }
        .certs-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 999px; }
        .certs-scroll { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.15) transparent; }
      `}</style>
    </section>
  )

  return createPortal(content, document.body)
}

export default CertificatesShowcase