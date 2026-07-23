import { Zap, Lightbulb, ShieldCheck, Target, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import FloatingCard from '../ui/FloatingCard'
import portrait from './pics-cutout.png'

const TRAITS = [
  { icon: Lightbulb, label: 'Creative' },
  { icon: ShieldCheck, label: 'Reliable' },
  { icon: Target, label: 'Problem Solver' },
  { icon: Users, label: 'Team Player' },
  { icon: Zap, label: 'Fast Learner' },
]

const cardsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 1.6 } },
}
const cardPop = {
  hidden: { opacity: 0, scale: 0.7, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
}

function Hero() {
  return (
    <section
      id="home"
      // FIX: h-screen sirf lg+ par (jahan GSAP pin/morph animation isi height par depend karti hai).
      // Mobile/tablet par min-h-screen taake neeche add hone wala stacked content clip na ho.
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pb-10 pt-24 lg:h-screen lg:overflow-hidden lg:pb-0 lg:pt-20"
    >
      {/* LAYER 1 — background name */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[12%] select-none text-center font-display leading-none tracking-tight text-accent sm:top-[16%] lg:top-[20%]"
        style={{ fontSize: 'clamp(72px, 32vw, 300px)', fontWeight: 900 }}
      >
        TALHA
      </motion.h1>

      {/* Center column */}
      <div className="relative top-[8%] flex w-full max-w-4xl flex-col items-center px-4 sm:top-[14%] lg:top-[25%]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: 'easeOut' }}
          className="text-center font-display font-extrabold leading-[1.1] text-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] lg:leading-[1.05]"
          style={{ fontSize: 'clamp(28px, 7vw, 58px)' }}
        >
          Full Stack Developer
          <br />
          Building Digital Products.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-6 flex w-full flex-col gap-3 xs:w-auto xs:flex-row xs:gap-4"
        >
          <a
            href="#contact"
            className="rounded-lg bg-accent px-7 py-3 text-center font-display font-bold text-ink shadow-md transition-transform hover:scale-105"
          >
            Hire Me
          </a>
          <a
            href="#projects"
            className="rounded-lg border-2 border-ink px-7 py-3 text-center font-display font-bold text-ink transition-transform hover:scale-105"
          >
            View Projects
          </a>
        </motion.div>

        {/* MOBILE / TABLET FALLBACK — desktop ke floating cards (hidden lg:block)
            ka replacement, taake stats/traits/description mobile par bhi visible rahein */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="mt-8 grid w-full grid-cols-2 gap-3 sm:mt-10 sm:max-w-md lg:hidden"
        >
          <div className="flex items-center gap-3 rounded-2xl bg-panel/70 p-4 backdrop-blur-md">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink">
              <Zap size={18} className="text-accent" strokeWidth={2.5} />
            </span>
            <div>
              <p className="font-display text-xl font-black leading-none text-ink">10+</p>
              <p className="text-[11px] font-semibold text-ink/60">Projects Delivered</p>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-panel/70 p-4 backdrop-blur-md">
            <p className="font-display text-2xl font-black leading-none text-accent">2+</p>
            <p className="mt-1 text-[11px] font-semibold text-ink/70">Years Coding</p>
          </div>

          <div className="col-span-2 rounded-2xl bg-panel/70 p-4 backdrop-blur-md">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {TRAITS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon size={14} className="text-ink" strokeWidth={2.5} />
                  <span className="text-xs font-bold text-ink">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 rounded-2xl bg-panel/70 p-4 backdrop-blur-md">
            <p className="text-xs leading-relaxed text-ink/80 sm:text-sm">
              I build modern digital products with clean code and premium user experiences.
            </p>
          </div>
        </motion.div>
      </div>

      {/* LAYER 5 — desktop-only floating cards around the (currently commented-out) portrait.
          Sirf lg+ par render hote hain, isliye mobile/tablet par koi impact nahi. */}
      <motion.div variants={cardsContainer} initial="hidden" animate="visible" className="hidden lg:block">
        <FloatingCard position="top-[40%] left-[5%] hidden lg:block" variants={cardPop}>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink">
              <Zap size={18} className="text-accent" strokeWidth={2.5} />
            </span>
            <div>
              <p className="font-display text-2xl font-black leading-none text-ink">10+</p>
              <p className="text-xs font-semibold text-ink/60">Projects Delivered</p>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard position="bottom-[20%] left-[10%] hidden lg:block" variants={cardPop}>
          <p className="font-display text-5xl  font-black leading-none text-accent">2+</p>
          <p className="mt-1 text-xs font-semibold text-ink/70">Years Coding</p>
        </FloatingCard>

        <FloatingCard position="top-[30%] right-[2%] hidden lg:block w-45" variants={cardPop}>
          <div className="flex flex-col gap-2.5">
            {TRAITS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon size={16} className="text-ink" strokeWidth={2.5} />
                <span className="text-sm font-bold text-ink">{label}</span>
              </div>
            ))}
          </div>
        </FloatingCard>

        <FloatingCard position="bottom-[3%] right-[3%] hidden lg:block w-64" variants={cardPop}>
          <p className="text-sm leading-relaxed text-ink/80">
            I build modern digital products with clean code and premium user experiences.
          </p>
        </FloatingCard>
      </motion.div>

      {/* Bottom-left short intro — sirf lg+ par (mobile par description mobile-block mein already maujood hai) */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className="absolute bottom-6 left-6 z-10 hidden max-w-55 text-xs font-medium text-ink/70 lg:block"
      >
        Full Stack Developer — building scalable web applications with modern technologies.
      </motion.p>
    </section>
  )
}

export default Hero