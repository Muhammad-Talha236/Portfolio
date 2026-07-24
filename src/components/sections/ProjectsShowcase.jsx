import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { BriefcaseBusiness, GitFork, Play, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
 {
  number: '01',
  title: 'Eventra',
  description: 'A full-stack event management platform designed to simplify event registration, scheduling, payments, and event operations.',
  tags: ['React', 'Node.js', 'Express', 'MongoDB'],
  device: 'laptop',
  github: 'https://github.com/Muhammad-Talha236/Eventra_',
  video: '/videos/eventra.mp4',
  poster: '/images/sports.jpg',
  tone: 'violet',
},
 
 {
  number: '03',
  title: 'Core Banking System',
  description: 'A secure banking platform designed to manage customer accounts, transactions, and essential banking operations.',
  tags: ['React', 'Node.js', 'Express', 'MongoDB'],
  device: 'laptop',
  github: 'https://github.com/Muhammad-Talha236/Core_Bank_System',
  video: '/videos/corebanking.mp4',
  poster: '/images/corebank.jpg',
  tone: 'blue',
},
 {
  number: '03',
  title: 'SplitNest',
  description: 'A smart expense-splitting platform designed to make shared expenses simple, transparent, and easy to manage.',
  tags: ['React', 'Node.js', 'Express', 'MongoDB'],
  device: 'laptop',
  github: 'https://github.com/Muhammad-Talha236/Split_Nest',
  video: '/videos/splitnest.mp4',
  poster: '/images/paisa.jpg',
  tone: 'blue',
},
 {
  number: '04',
  title: 'ERP System',
  description: 'A centralized enterprise platform designed to manage production, employees, materials, attendance, wages, and business operations.',
  tags: ['React', 'Node.js', 'Express', 'PostgreSQL'],
  device: 'mobile',
  github: 'https://github.com/Muhammad-Talha236/ERP',
  video: '/videos/eerp.mp4',
  poster: '/images/erp.jpg',
  tone: 'green',
},
  {
  number: '05',
  title: 'Weather App',
  description: 'A clean and responsive weather application providing real-time weather conditions and forecasts for any location.',
  tags: ['React', 'JavaScript', 'Weather API'],
  device: 'laptop',
  github: 'https://github.com/Muhammad-Talha236/weather_app',
  video: '/videos/wea.mp4',
  poster: '/images/wea.png',
  tone: 'cyan',
}
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
      // WIDTH aur HEIGHT adjust kardi gayi hain taake content bahar na jaye
      className={`project-card project-card--${project.tone} group relative flex h-[500px] sm:h-[570px] w-[min(82vw,420px)] shrink-0 flex-col overflow-hidden rounded-[1.5rem] border border-white/10 p-5 md:p-6 snap-center`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${project.poster})` }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/95" />

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
      <div className="relative z-10 mt-auto flex items-end justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-2xl sm:text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/80 line-clamp-3 md:text-base">
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
          <span className="hidden xs:inline">GitHub</span>
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
        const scrollDistance = () => Math.max(0, rail.scrollWidth - window.innerWidth)

       gsap.to(rail, {
          x: () => -scrollDistance(),
          ease: 'none',
          scrollTrigger: {
            // FIX: Trigger sirf cards wale container ko banayen
            trigger: railRef.current, 
            
            // FIX: Cards ka center jab screen ke center mein aaye tab start karo
            start: 'center center',   
            
            // FIX: Pin lekin poore section ko hi rakhein
            pin: sectionRef.current,  
            
            end: () => `+=${scrollDistance() + window.innerHeight * 0.55}`,
            scrub: 0.8,
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
      className="relative overflow-hidden bg-[#0a0a0a] py-16 text-white lg:min-h-[100svh] lg:py-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_20%,rgba(240,255,61,0.1),transparent_26%),linear-gradient(180deg,#080808_0%,#151515_100%)]" />

      {/* FIX 2: lg:h-screen aur strict grid-rows hata diye gaye hain, lg:py-16 add kiya hai taake naturally flow kare */}
      <div className="relative flex min-h-full flex-col justify-center lg:py-16">
        
        <header className="mx-auto flex w-full flex-col gap-6 px-6 pb-8 md:px-10 lg:mx-0 lg:max-w-none lg:flex-row lg:items-end lg:justify-between lg:pl-[280px] lg:pr-16 lg:pt-6 lg:pb-5">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-white/80"><BriefcaseBusiness size={14} className="text-accent" /> Selected work</span>
            <h2 className="mt-5 max-w-3xl font-display text-4xl sm:text-5xl font-black leading-[0.95] tracking-tight md:text-6xl md:leading-[0.9]">Made to perform<span className="text-accent">.</span></h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/62 md:text-base lg:text-lg">A few digital experiences built with a focus on clear thinking, visual craft, and a little motion where it matters.</p>
        </header>

        {/* mt-12 add kiya hai header aur cards ke darmiyan thora gap dene ke liye.
            Mobile/tablet: this is now a real horizontal-scroll (swipeable) list
            since the GSAP pin-scroll rail only runs at lg+. */}
        <div className="min-h-0 overflow-x-auto lg:overflow-hidden mt-4 lg:mt-12 snap-x snap-mandatory lg:snap-none [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div ref={railRef} className="flex w-max items-center gap-5 px-6 md:px-10 lg:gap-8 lg:pl-[280px] lg:pr-[10vw]">
            {PROJECTS.map((project, index) => <ProjectCard key={project.title} project={project} index={index} cardRefs={cardRefs} />)}
          {/* =========================================
                Final GitHub CTA Card (With Background Image)
                ========================================= */}
            <div className="group relative flex h-[500px] sm:h-[570px] w-[min(82vw,360px)] shrink-0 snap-center flex-col items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 p-6 sm:p-8 text-center transition-colors hover:border-white/20">
              
              {/* Background Image (Is url mein aap apni image ka link daal sakte hain) */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80')` }}
              />
              
              {/* Dark Overlay & Blur (Taake text easily parha ja sake) */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

              {/* Card Content (z-10 zaroori hai taake yeh image ke oopar rahay) */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-accent">
                  <GitFork size={32} strokeWidth={2.5} />
                </div>
                <h3 className="font-display text-2xl font-black text-white">More on GitHub</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Curious to see more? Head over to my GitHub profile to explore the rest of my work, experiments, and source code.
                </p>
                <a
                  href="https://github.com/muhammad-talha236" 
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-black text-ink transition-transform hover:scale-105"
                >
                  <GitFork size={18} strokeWidth={2.5} />
                  <span>View All Projects</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/35 md:px-10 lg:mt-8 lg:pl-[280px]">Scroll to explore <span className="ml-2 text-accent"> </span></p>
      </div>
    </section>,
    document.body
  )
}

export default ProjectsShowcase