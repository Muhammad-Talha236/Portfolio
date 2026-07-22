import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Code2, Database, WandSparkles, Sparkles, Cpu } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EXPERTISE_CARDS = [
  {
    id: '01',
    title: 'Frontend Architecture',
    subtitle: 'Interface & Interaction',
    icon: Code2,
    desc: 'Crafting responsive, high-performance web applications with clean component lifecycles and modern UI frameworks.',
    tags: ['React.js', 'Vite', 'Tailwind CSS', 'JavaScript'],
  },
  {
    id: '02',
    title: 'Backend & APIs',
    subtitle: 'Server & Logic',
    icon: Database,
    desc: 'Building reliable server-side infrastructure, secure endpoints, and efficient database architectures.',
    tags: ['Node.js', 'Express.js', 'REST APIs', 'SQL / Firebase'],
  },
  {
    id: '03',
    title: 'Motion & Animations',
    subtitle: 'Visual Dynamics',
    icon: WandSparkles,
    desc: 'Implementing fluid scroll physics, high-end transitions, and engaging micro-interactions.',
    tags: ['GSAP', 'Framer Motion', 'Lenis', 'CSS 3D'],
  },
  {
    id: '04',
    title: 'Optimization & Code',
    subtitle: 'Quality Assurance',
    icon: Cpu,
    desc: 'Ensuring pristine code quality, performance optimization, and robust version-controlled deployment pipelines.',
    tags: ['Clean Code', 'Debugging', 'Git & GitHub', 'Lighthouse'],
  },
]

function SkillsShowcase() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useLayoutEffect(() => {
    if (!mounted) return undefined

    const ctx = gsap.context(() => {
      const cards = cardRefs.current
      if (!cards.length) return

      cards.forEach((card, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            // Har card ke liye scroll distance barha di hai taake smooth scrubbing ho
            start: `top+=${i * 300} top`,
            end: `top+=${(i + 1) * 300} top`,
            scrub: true, // Direct mouse scroll control
            invalidateOnRefresh: true,
          }
        })

        if (i === 0) {
          // Pehla card center se start hoga aur scroll par top-left nikal jayega
          tl.to(card, { x: -400, y: -250, opacity: 0, scale: 0.8, ease: 'none' })
        } else {
          // Baqi cards bottom-right se aayenge
          tl.fromTo(card, 
            { x: 400, y: 250, opacity: 0, scale: 0.8 }, 
            { x: 0, y: 0, opacity: 1, scale: 1, ease: 'none' }
          )

          // Agar akhri card nahi hai, toh yeh bhi top-left nikal jayega
          if (i < cards.length - 1) {
            tl.to(card, { x: -400, y: -250, opacity: 0, scale: 0.8, ease: 'none' }, '+=0.1')
          }
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [mounted])

  if (!mounted) return null

  const content = (
    <section 
      id="skills" 
      ref={sectionRef} 
      // Section ki length ko cards ke hisaab se set kiya hai
      className="relative h-[300vh] bg-[#0a0a0a] text-white lg:pl-64"
    >
      {/* Sticky Container taake section screen par pin rahay */}
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[140px] pointer-events-none" />

        {/* TOP CENTER FIXED HEADER (Overlap fix karne ke liye margin/spacing de di hai) */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-[11px] font-black uppercase tracking-widest text-accent backdrop-blur-md">
            <Sparkles size={12} className="text-accent" /> Expertise Flow
          </span>
          <h2 className="mt-2 font-display text-3xl font-black tracking-tight md:text-4xl">
            Core <span className="text-accent">Capabilities</span>
          </h2>
        </div>

        {/* CARDS CONTAINER (Compact size taake heading se distance maintain rahay) */}
        <div className="relative w-full max-w-[440px] h-[380px] flex items-center justify-center mt-16">
          {EXPERTISE_CARDS.map((card, index) => {
            const Icon = card.icon
            return (
              <div
                key={card.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className="absolute inset-0 rounded-3xl border border-white/15 bg-neutral-900/90 p-6 md:p-7 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-black shadow-md shadow-accent/20">
                      <Icon size={20} strokeWidth={2.5} />
                    </span>
                    <span className="font-display text-2xl font-black text-white/20">
                      {card.id}
                    </span>
                  </div>

                  <span className="font-display text-[10px] font-bold uppercase tracking-widest text-accent">
                    {card.subtitle}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-black text-white mt-0.5">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-xs md:text-sm leading-relaxed text-white/70 line-clamp-3">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )

  return createPortal(content, document.body)
}

export default SkillsShowcase