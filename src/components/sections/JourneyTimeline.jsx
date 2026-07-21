import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, Boxes, Code2, Palette, Rocket, Sparkles, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MILESTONES = [
  {
    year: "'24",
    title: 'A curious beginning',
    text: 'The first projects taught me to turn a rough idea into something people could actually use.',
    tag: '@learning',
    detail: 'The foundation',
    icon: Code2,
    side: 'right',
  },
  {
    year: "'25",
    title: 'First freelance steps',
    text: 'Real clients brought real responsibility: listen closely, communicate clearly, and deliver on time.',
    tag: '@freelance',
    detail: 'First client work',
    icon: Rocket,
    side: 'left',
  },
  {
    year: "'25",
    title: 'Crafting better systems',
    text: 'Reusable components and cleaner structure made every build faster, calmer, and more consistent.',
    tag: '@fullstack',
    detail: 'Growing the stack',
    icon: Boxes,
    side: 'right',
  },
  {
    year: "'26",
    title: 'Design meets motion',
    text: 'I started treating movement, performance, and visual rhythm as part of the product—not decoration.',
    tag: '@creative-dev',
    detail: 'Leveling up',
    icon: Palette,
    side: 'left',
  },
  {
    year: "'26",
    title: 'Better together',
    text: 'The strongest work has come from thoughtful collaboration and shared ownership with good people.',
    tag: '@collaboration',
    detail: 'Building trust',
    icon: Users,
    side: 'right',
  },
  {
    year: 'Now',
    title: 'The journey continues',
    text: 'Still curious, still shipping, and always ready for the next ambitious digital product.',
    tag: '@talha',
    detail: 'What comes next',
    icon: Sparkles,
    side: 'left',
  },
]

function createCurve(points) {
  if (!points.length) return ''

  return points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`
    const previous = points[index - 1]
    const midpoint = (previous.y + point.y) / 2
    return `${path} C ${previous.x} ${midpoint}, ${point.x} ${midpoint}, ${point.x} ${point.y}`
  }, '')
}

function JourneyTimeline() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const pathRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [line, setLine] = useState({ width: 0, height: 0, path: '', points: [] })

  useEffect(() => setMounted(true), [])

  useLayoutEffect(() => {
    if (!mounted) return undefined

    const updateLine = () => {
      const section = sectionRef.current
      if (!section) return

      const sectionBox = section.getBoundingClientRect()
      const points = cardRefs.current.map((card, index) => {
        const box = card.getBoundingClientRect()
        const side = MILESTONES[index].side
        const x = side === 'right'
          ? box.left - sectionBox.left - 28
          : box.right - sectionBox.left + 28

        return {
          x,
          y: box.top - sectionBox.top + Math.min(200, box.height * 0.28),
        }
      })

      setLine({
        width: sectionBox.width,
        height: sectionBox.height,
        path: createCurve(points),
        points,
      })
    }

    const frame = requestAnimationFrame(updateLine)
    const observer = new ResizeObserver(updateLine)
    if (sectionRef.current) observer.observe(sectionRef.current)
    window.addEventListener('resize', updateLine)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', updateLine)
    }
  }, [mounted])

  useLayoutEffect(() => {
    if (!line.path) return undefined

    const ctx = gsap.context(() => {
      const path = pathRef.current
      const length = path?.getTotalLength()

      if (path && length) {
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 100%',
            scrub: 0.6,
          },
        })
      }

      cardRefs.current.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 42 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [line.path])

  if (!mounted) return null

  const content = (
    <section id="journey" ref={sectionRef} className="relative overflow-hidden bg-background pb-24 pt-8 lg:pl-72">
      {line.path && (
        <svg
          className="pointer-events-none absolute inset-0 hidden lg:block"
          width={line.width}
          height={line.height}
          viewBox={`0 0 ${line.width} ${line.height}`}
          aria-hidden="true"
        >
          <path ref={pathRef} d={line.path} fill="none" stroke="#1a1a1a" strokeWidth="3" />
          {line.points.map((point, index) => (
            <circle key={index} cx={point.x} cy={point.y} r="8" fill="#f0ff3d" stroke="#1a1a1a" strokeWidth="3" />
          ))}
        </svg>
      )}

      <div className="relative z-10 mx-auto max-w-[1480px] px-6 md:px-12">
        <div className="space-y-12 lg:space-y-16">
          {MILESTONES.map((milestone, index) => {
            const Icon = milestone.icon
            const placement = milestone.side === 'left'
              ? 'lg:ml-auto lg:mr-[0%]'
              : 'lg:ml-[55%]'

            return (
              <div key={milestone.title} className={`relative flex ${placement}`}>
                <article
                  ref={(element) => (cardRefs.current[index] = element)}
                  className="relative w-full max-w-[340px] rounded-2xl border border-white/45 bg-panel/90 p-4 shadow-[0_18px_40px_rgba(58,49,31,0.12)] backdrop-blur-sm md:p-5"
                >
                  <span className={`absolute top-14 hidden h-11 w-px bg-ink/40 lg:block ${milestone.side === 'right' ? '-left-6' : '-right-6'}`} />
                  <p className="font-display text-4xl font-black leading-none text-accent md:text-5xl">{milestone.year}</p>
                  <h3 className="mt-3 font-display text-lg font-black text-ink md:text-xl">{milestone.title}</h3>
                  <p className="mt-2 text-sm leading-snug text-ink/70">{milestone.text}</p>

                  <footer className="mt-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-ink">
                        <Icon size={15} strokeWidth={2.5} />
                      </span>
                      <span className="text-xs leading-tight text-ink/60">
                        <strong className="block font-semibold text-ink/70">{milestone.tag}</strong>
                        {milestone.detail}
                      </span>
                    </div>
                    <button className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-ink/10 bg-cream/80 px-2.5 py-1.5 text-[11px] font-semibold text-ink transition-colors hover:bg-accent">
                      Read more <ArrowUpRight size={15} strokeWidth={2.5} />
                    </button>
                  </footer>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )

  return createPortal(content, document.body)
}

export default JourneyTimeline
