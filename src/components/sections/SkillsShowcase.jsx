import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Braces, Code2, Database, Layers3, Sparkles, WandSparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILL_GROUPS = [
  {
    title: 'Interface',
    icon: Code2,
    description: 'Clear, responsive interfaces that feel considered at every breakpoint.',
    skills: ['React', 'JavaScript', 'Tailwind CSS'],
  },
  {
    title: 'Logic',
    icon: Database,
    description: 'Practical application architecture, APIs, and data flows that scale.',
    skills: ['Node.js', 'REST APIs', 'Databases'],
  },
  {
    title: 'Motion',
    icon: WandSparkles,
    description: 'Purposeful motion that guides attention without getting in the way.',
    skills: ['GSAP', 'Framer Motion', 'Lenis'],
  },
]

const RIBBON_ITEMS = ['React', 'JavaScript', 'Node.js', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'APIs']

function SkillsShowcase() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const titleRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useLayoutEffect(() => {
    if (!mounted) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )

      cardRefs.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 40, rotate: index === 1 ? 0 : index === 0 ? -3 : 3 },
          {
            autoAlpha: 1,
            y: 0,
            rotate: 0,
            duration: 0.65,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 84%', toggleActions: 'play none none reverse' },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [mounted])

  if (!mounted) return null

  const content = (
    <section id="skills" ref={sectionRef} className="relative overflow-hidden bg-ink py-24 text-cream lg:pl-72">
      <div className="pointer-events-none absolute -right-24 top-12 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-[35%] h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1480px] px-6 md:px-12">
        <div ref={titleRef} className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/35 px-3 py-1 text-xs font-black uppercase tracking-tight text-cream">
              <Sparkles size={13} className="text-accent" /> Skills & tools
            </span>
            <h2 className="mt-5 max-w-3xl font-display text-5xl font-black leading-[0.94] tracking-tight md:text-7xl">
              Built to feel <span className="text-accent">alive.</span>
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-cream/65">
            I pair solid engineering with an eye for the details that make a product feel effortless.
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, index) => {
            const Icon = group.icon
            return (
              <article
                key={group.title}
                ref={(element) => (cardRefs.current[index] = element)}
                className="group rounded-2xl border border-cream/15 bg-cream/7 p-6 transition-colors duration-300 hover:border-accent hover:bg-cream/10 md:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-ink">
                    <Icon size={21} strokeWidth={2.5} />
                  </span>
                  <span className="font-display text-5xl font-black text-cream/12">0{index + 1}</span>
                </div>
                <h3 className="mt-12 font-display text-2xl font-black">{group.title}</h3>
                <p className="mt-3 min-h-12 text-sm leading-relaxed text-cream/60">{group.description}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="rounded-md border border-cream/15 bg-ink px-2.5 py-1.5 text-xs font-bold text-cream/85">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-16 border-y border-cream/15 py-4">
          <div className="skills-ribbon flex w-max items-center gap-8 whitespace-nowrap font-display text-xl font-black uppercase tracking-tight text-cream/85">
            {[...RIBBON_ITEMS, ...RIBBON_ITEMS].map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-8">
                {item} <span className="text-accent">✦</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 text-sm text-cream/60">
          <span className="inline-flex items-center gap-2"><Layers3 size={16} className="text-accent" /> Always learning, always refining.</span>
          <span className="inline-flex items-center gap-2"><Braces size={16} className="text-accent" /> Clean code. Clear outcomes.</span>
        </div>
      </div>
    </section>
  )

  return createPortal(content, document.body)
}

export default SkillsShowcase
