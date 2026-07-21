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
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* LAYER 1 — background name */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[20%] select-none text-center font-display leading-none tracking-tight text-accent"
        style={{ fontSize: 'clamp(100px, 40vw, 300px)', fontWeight: 900 }}
      >
        TALHA
      </motion.h1>

      {/* Center column */}
      <div className="relative top-[25%] flex w-full max-w-4xl flex-col items-center px-4">
        {/* <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex h-[52vh] w-75 items-center justify-center overflow-hidden rounded-t-[3rem] bg-ink/10 md:h-[56vh] md:w-90"
        >
          <img src={portrait} alt="Talha's portrait" className="absolute inset-0 h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-ink/80 to-transparent" />
        </motion.div> */}

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: 'easeOut' }}
          className="top-[20%] bottom-[20%] text-center font-display font-extrabold leading-[1.05] text-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
          style={{ fontSize: 'clamp(30px, 4.5vw, 58px)' }}
        >
          Full Stack Developer
          <br />
          Building Digital Products.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-6 flex gap-4"
        >
          <a
            href="#contact"
            className="rounded-lg bg-accent px-7 py-3 font-display font-bold text-ink shadow-md transition-transform hover:scale-105"
          >
            Hire Me
          </a>
          <a
            href="#projects"
            className="rounded-lg border-2 border-ink px-7 py-3 font-display font-bold text-ink transition-transform hover:scale-105"
          >
            View Projects
          </a>
        </motion.div>
      </div>

      {/* LAYER 5 — cards now pulled in close to the photo's left/right edges,
          matching the reference where cards tuck right against the portrait */}
      <motion.div variants={cardsContainer} initial="hidden" animate="visible">
        {/* Top-left: sits just left of photo, upper area */}
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

        {/* Bottom-left: just left of photo, lower area, near where heading starts */}
        <FloatingCard position="bottom-[20%] left-[10%] hidden lg:block" variants={cardPop}>
          <p className="font-display text-5xl  font-black leading-none text-accent">2+</p>
          <p className="mt-1 text-xs font-semibold text-ink/70">Years Coding</p>
        </FloatingCard>

        {/* Top-right: just right of photo, upper area */}
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

        {/* Bottom-right: just right of photo, lower area */}
        <FloatingCard position="bottom-[3%] right-[3%] hidden lg:block w-64" variants={cardPop}>
          <p className="text-sm leading-relaxed text-ink/80">
            I build modern digital products with clean code and premium user experiences.
          </p>
        </FloatingCard>
      </motion.div>

      {/* Bottom-left short intro */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className="absolute bottom-6 left-6 z-10 max-w-55 text-xs font-medium text-ink/70"
      >
        Full Stack Developer — building scalable web applications with modern technologies.
      </motion.p>
    </section>
  )
}

export default Hero