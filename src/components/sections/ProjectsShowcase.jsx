import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { BriefcaseBusiness, GitFork, Play, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Replace these temporary mp4 URLs with your own project walkthroughs when ready.
const PROJECTS = [
  {
    number: '01',
    title: 'Lumio Studio',
    description: 'A vivid creative studio site designed to turn a portfolio into an immersive experience.',
    tags: ['React', 'GSAP', 'Motion'],
    device: 'laptop',
    github: 'https://github.com/',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1400&q=85',
    tone: 'violet',
  },
  {
    number: '02',
    title: 'Nexa Finance',
    description: 'A sharper financial dashboard that makes complex data feel clear and approachable.',
    tags: ['Next.js', 'API', 'Dashboard'],
    device: 'mobile',
    github: 'https://github.com/',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85',
    tone: 'steel',
  },
  {
    number: '03',
    title: 'Mysa Wellness',
    description: 'A calm, conversion-focused digital home for a modern self-care brand.',
    tags: ['CMS', 'SEO', 'Webflow'],
    device: 'laptop',
    github: 'https://github.com/',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    poster: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1400&q=85',
    tone: 'sand',
  },
  {
    number: '04',
    title: 'Northfield',
    description: 'A confident property platform built around responsive details and editorial rhythm.',
    tags: ['React', 'CMS', 'UI/UX'],
    device: 'mobile',
    github: 'https://github.com/',
    video: 'https://www.w3schools.com/html/movie.mp4',
    poster: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85',
    tone: 'forest',
  },
  {
    number: '05',
    title: 'Aster Journal',
    description: 'An editorial web experience made for thoughtful stories, subscriptions, and discovery.',
    tags: ['Editorial', 'Motion', 'CMS'],
    device: 'laptop',
    github: 'https://github.com/',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=85',
    tone: 'rose',
  },
]

function DevicePreview({ project }) {
  return (
    <div className={`project-device project-device--${project.device}`}>
      <div className="project-device__topbar">
        <span /> <span /> <span />
      </div>
      <div className="project-device__screen">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={project.poster}
          aria-label={`${project.title} project preview`}
        >
          <source src={project.video} type={project.video.endsWith('webm') ? 'video/webm' : 'video/mp4'} />
        </video>
        <div className="project-device__ui">
          <span className="project-device__brand">{project.title.split(' ')[0]}</span>
          <span className="project-device__line" />
          <span className="project-device__line project-device__line--short" />
        </div>
        <span className="project-device__play"><Play size={14} fill="currentColor" /></span>
      </div>
    </div>
  )
}
function ProjectCard({ project, index, cardRefs }) {
  return (
    <article
      ref={(element) => {
        cardRefs.current[index] = element
      }}
className={`project-card project-card--${project.tone} group relative flex h-[600px] min-h-[600px] w-[min(80vw,600px)] shrink-0 flex-col overflow-hidden rounded-[1.35rem] border border-white/10 p-5 md:p-6 lg:h-[550px] lg:min-h-0 lg:max-h-none`}

    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${project.poster})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/90" />

      {/* Top Content */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <span className="rounded-full border border-white/35 bg-black/70 px-3 py-1.5 text-sm font-medium text-white">
          {project.number}
        </span>

        <div className="flex max-w-[72%] flex-wrap justify-end gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/30 bg-black/70 px-2.5 py-1.5 text-xs font-semibold text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Device Preview */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-3 py-5">
        <DevicePreview project={project} />
      </div>

      {/* Bottom Content */}
      <div className="relative z-10 mt-auto flex items-end justify-between gap-6">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
            {project.title}
          </h3>

          <p className="mt-2 max-w-[30rem] text-sm leading-relaxed text-white/80 md:text-base">
            {project.description}
          </p>
        </div>

        {/* GitHub Button */}
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${project.title} source on GitHub`}
          className="relative z-30 inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-black text-ink transition-all duration-300 hover:-translate-y-1 hover:scale-105"
        >
          <GitFork size={17} strokeWidth={2.5} />
          <span>GitHub</span>
        </a>
      </div>
    </article>
  )
}
function ProjectsShowcase() {
  const sectionRef = useRef(null)
  const railRef = useRef(null)
  const cardRefs = useRef([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useLayoutEffect(() => {
    if (!mounted) return undefined

    const media = gsap.matchMedia()
    const ctx = gsap.context(() => {
      media.add('(min-width: 1024px)', () => {
        const rail = railRef.current
        const scrollDistance = () => Math.max(0, rail.scrollWidth - window.innerWidth + 64)

        gsap.to(rail, {
          x: () => -scrollDistance(),
          ease: 'none',
          scrollTrigger: {
            // The card rail is already laid out to fit under the heading, so
            // pinning at the section edge keeps horizontal scrolling reliable.
            trigger: sectionRef.current,
            start: 'top -200px',
            end: () => `+=${scrollDistance() + window.innerHeight * 0.55}`,
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
      })

      gsap.fromTo(cardRefs.current, { autoAlpha: 0, y: 54 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      media.revert()
    }
  }, [mounted])

  if (!mounted) return null

  return createPortal(
<section
  id="projects"
  ref={sectionRef}
  className="relative overflow-hidden bg-[#0a0a0a] py-16 text-white lg:min-h-[100svh] lg:py-8 lg:pl-60"
>   <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_20%,rgba(240,255,61,0.1),transparent_26%),linear-gradient(180deg,#080808_0%,#151515_100%)]" />
      <div className="relative flex min-h-full flex-col justify-center lg:mx-auto lg:grid lg:h-full lg:max-w-[1600px] lg:grid-rows-[180px_700px_32px] lg:py-0">
        <header className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-6 pb-8 md:px-10 lg:mx-0 lg:max-w-none lg:flex-row lg:items-end lg:justify-between lg:px-16 lg:pt-6 lg:pb-5">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-white/80"><BriefcaseBusiness size={14} className="text-accent" /> Selected work</span>
            <h2 className="mt-5 max-w-3xl font-display text-5xl font-black leading-[0.9] tracking-tight md:text-6xl">Made to perform<span className="text-accent">.</span></h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-white/62 md:text-lg">A few digital experiences built with a focus on clear thinking, visual craft, and a little motion where it matters.</p>
        </header>

        <div className="min-h-0 overflow-visible lg:overflow-hidden">
          <div ref={railRef} className="flex w-max gap-5 px-6 md:px-10 lg:h-full lg:gap-8 lg:px-16">
            {PROJECTS.map((project, index) => <ProjectCard key={project.title} project={project} index={index} cardRefs={cardRefs} />)}
            <div className="flex w-48 shrink-0 items-center justify-center text-white/40"><Sparkles size={24} className="text-accent" /></div>
          </div>
        </div>
        <p className="mt-6 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/35 md:px-10 lg:mt-5 lg:px-16">Scroll to explore <span className="ml-2 text-accent">→</span></p>
      </div>
    </section>,
    document.body
  )
}

export default ProjectsShowcase
