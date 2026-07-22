import { useRef, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Home, CircleUser, Briefcase, Zap, Mail, ArrowUpRight, Lightbulb, ShieldCheck, Target, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import About from '../sections/About'

gsap.registerPlugin(ScrollTrigger)

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About Me', icon: CircleUser },
  { id: 'skills', label: 'Skills', icon: Target },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'experience', label: 'Experience', icon: Zap },
  { id: 'contact', label: 'Contact', icon: Mail },
]

const TRAITS = [
  { icon: Lightbulb, label: 'Creative' },
  { icon: ShieldCheck, label: 'Reliable' },
  { icon: Target, label: 'Problem Solver' },
  { icon: Users, label: 'Team Player' },
  { icon: Zap, label: 'Fast Learner' },
]

const SKILLS = ['React', 'JavaScript', 'Node.js', 'Tailwind CSS', 'GSAP']

function HeroToAbout() {
  const sectionRef = useRef(null)
  const scrollTriggerRef = useRef(null)
  const sceneTimelineRef = useRef(null)
  const activeSectionRef = useRef('home')
  const [activeSection, setActiveSection] = useState('home')

  const bgNameRef = useRef(null)
  const navLogoRef = useRef(null)
  const navLinkRefs = useRef([])
  const resumeBtnRef = useRef(null)
  const statCardRefs = useRef([])
  const traitsCardRef = useRef(null)
  const descCardRef = useRef(null)
  const headingRef = useRef(null)
  const ctaBtnsRef = useRef(null)
  const introTextRef = useRef(null)

  const sidebarRef = useRef(null)
  const sidebarLogoRef = useRef(null)
  const sidebarTaglineRef = useRef(null)
  const sidebarLinkRefs = useRef([])
  const sidebarStatRefs = useRef([])
  const sidebarCtaRef = useRef(null)

  const aboutRef = useRef(null)

  // This is a pinned scroll scene, not two normal document sections. Using a
  // direct scroll target guarantees that Home reverses every tween back to 0.
  const handleNavigation = (event, id) => {
    if (id !== 'home' && id !== 'about') return

    event.preventDefault()
    const trigger = scrollTriggerRef.current
    const sceneTop = trigger?.start ?? sectionRef.current?.offsetTop
    if (sceneTop == null) return

    const target = id === 'home'
      ? sceneTop
      : trigger?.end ?? sceneTop + window.innerHeight * 1.65

    // Reset every animated layer before scrolling back. A timeline progress
    // reset alone can leave the intro tween's inline opacity in a stale state.
    if (id === 'home') {
      sceneTimelineRef.current?.progress(0)
      gsap.set(
        [
          bgNameRef.current,
          navLogoRef.current,
          headingRef.current,
          ctaBtnsRef.current,
          resumeBtnRef.current,
          introTextRef.current,
          traitsCardRef.current,
          descCardRef.current,
          ...statCardRefs.current,
        ],
        { x: 0, y: 0, scale: 1, opacity: 1 }
      )
      gsap.set(aboutRef.current, { yPercent: 100 })
      gsap.set(sidebarRef.current, { opacity: 0 })
      requestAnimationFrame(() => ScrollTrigger.update())
    }
    window.history.replaceState(null, '', `#${id}`)
    window.scrollTo({ top: target, behavior: 'smooth' })
  }
useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const getDelta = (fromEl, toEl) => {
        if (!fromEl || !toEl) return { x: 0, y: 0, scale: 1 }
        const from = fromEl.getBoundingClientRect()
        const to = toEl.getBoundingClientRect()
        return { x: to.left - from.left, y: to.top - from.top, scale: to.width / from.width }
      }

      // 1. CALCULATE DELTAS FIRST
      // GSAP ke kisi bhi style apply hone se pehle natural size measure karna zaroori hai!
      const nameDelta = getDelta(bgNameRef.current, sidebarLogoRef.current)
      const ctaDelta = getDelta(resumeBtnRef.current, sidebarCtaRef.current)
      const statDeltas = statCardRefs.current.map((el, i) => getDelta(el, sidebarStatRefs.current[i]))
      const linkDeltas = navLinkRefs.current.map((el, i) => getDelta(el, sidebarLinkRefs.current[i]))

      // 2. SET INITIAL STATIC STATES
      gsap.set(
        [bgNameRef.current, resumeBtnRef.current, ...statCardRefs.current],
        { transformOrigin: 'top left' }
      )
      gsap.set(aboutRef.current, { yPercent: 100 })
      gsap.set(sidebarLinkRefs.current, { opacity: 0 })
      gsap.set(sidebarRef.current, { opacity: 0 })
      gsap.set(sidebarLogoRef.current, { opacity: 0 })
      gsap.set(sidebarStatRefs.current, { opacity: 0 })
      gsap.set(sidebarCtaRef.current, { opacity: 0 })
      gsap.set(sidebarTaglineRef.current, { opacity: 0 })

      // 3. ENTRANCE ANIMATION (On Load)
      // Hum .fromTo use kar rahe hain taake start aur end values explicitly define hon.
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .fromTo(bgNameRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.9 }, 0)
        .fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 1.1)
        .fromTo(ctaBtnsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.4)
        .fromTo(statCardRefs.current, { opacity: 0, scale: 0.7, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.7)' }, 1.6)
        .fromTo([traitsCardRef.current, descCardRef.current], { opacity: 0, scale: 0.7, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.7)' }, 1.75)
        .fromTo(introTextRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 2.2)

      // 4. SCROLL-LINKED MORPH
      // immediateRender: false isliye lagaya hai taake scroll wali animation
      // page load ki intro animation ko kharab na kare.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=180%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true, // Resize hone par coordinates update karega
          onUpdate: (self) => {
            const nextSection = self.progress >= 0.72 ? 'about' : 'home'
            if (activeSectionRef.current !== nextSection) {
              activeSectionRef.current = nextSection
              setActiveSection(nextSection)
            }
          },
        },
      })

      scrollTriggerRef.current = tl.scrollTrigger
      sceneTimelineRef.current = tl

      // Giant name crossfade
      tl.fromTo(bgNameRef.current,
        { x: 0, y: 0, scale: 1 },
        { x: nameDelta.x, y: nameDelta.y, scale: nameDelta.scale, duration: 0.55, ease: 'none', immediateRender: false }, 0)
      tl.fromTo(bgNameRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.13, ease: 'none', immediateRender: false }, 0.55)
      tl.to(sidebarLogoRef.current, { opacity: 1, duration: 0.13, ease: 'none' }, 0.55)

      // Small hero-nav logo pill
      tl.fromTo(navLogoRef.current, { opacity: 1 }, { opacity: 0, duration: 0.1, ease: 'none', immediateRender: false }, 0.15)

      // Nav links morph
      navLinkRefs.current.forEach((el, i) => {
        const start = 0.05 + i * 0.03
        tl.fromTo(el, { x: 0, y: 0 }, { x: linkDeltas[i].x, y: linkDeltas[i].y, duration: 0.55, ease: 'none', immediateRender: false }, start)
      })
      tl.fromTo(navLinkRefs.current, { opacity: 1 }, { opacity: 0, duration: 0.1, ease: 'none', immediateRender: false }, 0.68)
      tl.to(sidebarLinkRefs.current, { opacity: 1, duration: 0.1, ease: 'none' }, 0.68)

      // Stat cards morph
      statCardRefs.current.forEach((el, i) => {
        tl.fromTo(el, { x: 0, y: 0, scale: 1 }, { x: statDeltas[i].x, y: statDeltas[i].y, scale: statDeltas[i].scale, duration: 0.5, ease: 'none', immediateRender: false }, 0.1 + i * 0.05)
      })
      tl.fromTo(statCardRefs.current, { opacity: 1 }, { opacity: 0, duration: 0.1, ease: 'none', immediateRender: false }, 0.6)
      tl.to(sidebarStatRefs.current, { opacity: 1, duration: 0.1, ease: 'none' }, 0.6)

      // Trait/description cards & intro text fade up
      tl.fromTo([traitsCardRef.current, descCardRef.current, introTextRef.current],
        { y: 0, opacity: 1 },
        { y: -60, opacity: 0, duration: 0.22, ease: 'none', immediateRender: false }, 0.35)

      // Heading + tagline dissolve
      tl.fromTo(headingRef.current,
        { y: 0, scale: 1, opacity: 1 },
        { y: -40, scale: 0.92, opacity: 0, duration: 0.2, ease: 'none', immediateRender: false }, 0.45)

      // Resume button morph
      tl.fromTo(resumeBtnRef.current, { x: 0, y: 0, scale: 1 }, { x: ctaDelta.x, y: ctaDelta.y, scale: ctaDelta.scale, duration: 0.4, ease: 'none', immediateRender: false }, 0.25)
      tl.fromTo(resumeBtnRef.current, { opacity: 1 }, { opacity: 0, duration: 0.1, ease: 'none', immediateRender: false }, 0.65)
      tl.to(sidebarCtaRef.current, { opacity: 1, duration: 0.1, ease: 'none' }, 0.65)

      // CTA Buttons disappear
      tl.fromTo(ctaBtnsRef.current, { opacity: 1, y: 0 }, { opacity: 0, y: 40, duration: 0.2, ease: 'none', immediateRender: false }, 0.42)

      // Sidebar backdrop & tagline fade in
      tl.to(sidebarRef.current, { opacity: 1, duration: 0.3, ease: 'none' }, 0.4)
      tl.to(sidebarTaglineRef.current, { opacity: 1, duration: 0.15, ease: 'none' }, 0.7)

      // About slides up
      tl.to(aboutRef.current, { yPercent: 0, duration: 0.55, ease: 'none' }, 0.45)

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div id="home" ref={sectionRef} className="relative h-screen overflow-hidden bg-background">
      {/* ============ HERO LAYER ============ */}
      <section className="absolute inset-0 z-20 flex flex-col items-center justify-center overflow-hidden pt-20">
        <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 md:px-10">
          <div ref={navLogoRef} className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-display text-sm font-black text-ink">
              T
            </span>
            <span className="font-display text-sm font-bold text-ink">TALHA</span>
          </div>

          <nav className="hidden items-center gap-10 md:flex">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.id}
                ref={(el) => (navLinkRefs.current[i] = el)}
                href={`#${item.id}`}
                onClick={(event) => handleNavigation(event, item.id)}
                className="relative
                text-[13px]
                font-medium
                text-neutral-700
                transition-all
                duration-300
                hover:text-black

                after:absolute
                after:left-0
                after:-bottom-2
                after:h-[2px]
                after:w-0
                after:bg-[#FFD900]
                after:transition-all
                after:duration-300

                hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          
          <a
            ref={resumeBtnRef}
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className=" flex
            items-center
            gap-1.5
            rounded-full
            bg-[#f0ff3d]
            px-5
            h-10
            text-[13px]
            font-semibold
            text-black
            transition-all
            duration-300
            hover:scale-105"
          >
            Resume <ArrowUpRight size={14} strokeWidth={3} />
          </a>
        </header>

        <div className="pointer-events-none absolute inset-x-0 top-[20%] z-10 flex justify-center">
          <h1
            ref={bgNameRef}
            aria-hidden="true"
            className="select-none font-display leading-none tracking-tight text-accent"
            style={{ fontSize: 'clamp(100px, 40vw, 300px)', fontWeight: 900 }}
          >
            TALHA
          </h1>
        </div>

        <div className="relative top-[25%] flex w-full max-w-4xl flex-col items-center px-4">
          <h2
            ref={headingRef}
            className="text-center font-display font-extrabold leading-[1.05] text-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
            style={{ fontSize: 'clamp(30px, 4.5vw, 58px)' }}
          >
            Full Stack Developer
            <br />
            Building Digital Products.
          </h2>

          <div ref={ctaBtnsRef} className="mt-6 flex gap-4">
            <a href="#contact" className="rounded-lg bg-accent px-7 py-3 font-display font-bold text-ink shadow-md">
              Hire Me
            </a>
            <a href="#projects" className="rounded-lg border-2 border-ink px-7 py-3 font-display font-bold text-ink">
              View Projects
            </a>
          </div>
        </div>

        <div
          ref={(el) => (statCardRefs.current[0] = el)}
          className="absolute top-[40%] left-[5%] z-20 hidden rounded-2xl bg-panel/70 p-4 shadow-xl backdrop-blur-md lg:block"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink">
              <Zap size={18} className="text-accent" strokeWidth={2.5} />
            </span>
            <div>
              <p className="font-display text-2xl font-black leading-none text-ink">10+</p>
              <p className="text-xs font-semibold text-ink/60">Projects Delivered</p>
            </div>
          </div>
        </div>

        <div
          ref={(el) => (statCardRefs.current[1] = el)}
          className="absolute bottom-[20%] left-[10%] z-20 hidden rounded-2xl bg-panel/70 p-4 shadow-xl backdrop-blur-md lg:block"
        >
          <p className="font-display text-5xl font-black leading-none text-accent">2+</p>
          <p className="mt-1 text-xs font-semibold text-ink/70">Years Coding</p>
        </div>

        <div
          ref={traitsCardRef}
          className="absolute top-[30%] right-[2%] z-20 hidden w-45 rounded-2xl bg-panel/70 p-4 shadow-xl backdrop-blur-md lg:block"
        >
          <div className="flex flex-col gap-2.5">
            {TRAITS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon size={16} className="text-ink" strokeWidth={2.5} />
                <span className="text-sm font-bold text-ink">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={descCardRef}
          className="absolute bottom-[3%] right-[3%] z-20 hidden w-64 rounded-2xl bg-panel/70 p-4 shadow-xl backdrop-blur-md lg:block"
        >
          <p className="text-sm leading-relaxed text-ink/80">
            I build modern digital products with clean code and premium user experiences.
          </p>
        </div>

        <p ref={introTextRef} className="absolute bottom-6 left-6 z-10 max-w-55 text-xs font-medium text-ink/70">
          Full Stack Developer — building scalable web applications with modern technologies.
        </p>
      </section>

    {/* ============ SIDEBAR LAYER (final morph target) ============ */}
      {createPortal(
        <aside
          ref={sidebarRef}
          className="fixed left-0 top-0 z-50 flex h-[100svh] w-56 flex-col justify-between overflow-y-auto overflow-x-hidden p-4 pb-6 custom-scrollbar"
        >
          {/* Top Section */}
          <div className="flex flex-col gap-2">
            
            {/* Logo & Tagline */}
            <div className="rounded-xl border border-white/35 bg-panel/80 p-3 shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div ref={sidebarLogoRef} className="w-fit rounded-md bg-accent px-2 py-1 font-display text-sm font-black tracking-tight text-ink">
                  TALHA<span className="align-super text-[10px]">®</span>
                </div>
                <div className="flex gap-1.5">
                  <a aria-label="GitHub" href="https://github.com" className="rounded-md bg-cream/70 px-1.5 py-1 text-ink transition-colors hover:bg-accent">
                    <span className="text-[10px] font-black">GH</span>
                  </a>
                  <a aria-label="LinkedIn" href="https://linkedin.com" className="rounded-md bg-cream/70 px-1.5 py-1 text-ink transition-colors hover:bg-accent">
                    <span className="text-[10px] font-black">in</span>
                  </a>
                </div>
              </div>
              <p ref={sidebarTaglineRef} className="mt-3 text-[11px] leading-relaxed text-ink/80">
                Building thoughtful, production-quality software — one project at a time.
              </p>
            </div>

            {/* Stats */}
            <div className="flex rounded-xl border border-white/35 bg-panel/80 px-2 py-2 shadow-sm backdrop-blur-sm">
              <div ref={(el) => (sidebarStatRefs.current[0] = el)} className="flex flex-1 flex-col items-center border-r border-ink/15 text-center">
                <p className="font-display text-xl font-black leading-none text-accent">10+</p>
                <p className="mt-1 text-[10px] font-bold leading-tight text-ink">Projects</p>
              </div>
              <div ref={(el) => (sidebarStatRefs.current[1] = el)} className="flex flex-1 flex-col items-center text-center">
                <p className="font-display text-xl font-black leading-none text-accent">2+</p>
                <p className="mt-1 max-w-[4rem] text-[10px] font-bold leading-tight text-ink">Years of experience</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col items-start gap-1 rounded-xl border border-white/35 bg-panel/80 p-2 shadow-sm backdrop-blur-sm">
              {NAV_ITEMS.map((item, i) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <a
                    key={item.id}
                    ref={(el) => (sidebarLinkRefs.current[i] = el)}
                    href={`#${item.id}`}
                    onClick={(event) => handleNavigation(event, item.id)}
                    className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 font-display text-[11px] font-black uppercase tracking-tight text-ink transition-colors hover:bg-accent ${isActive ? 'bg-accent' : 'bg-cream/65'}`}
                  >
                    <Icon size={14} strokeWidth={2.75} />
                    {item.label}
                  </a>
                )
              })}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="mt-4 flex flex-col gap-2">
            
            {/* Skills Marquee */}
            <div className="overflow-hidden rounded-xl border border-white/35 bg-panel/80 py-1.5 shadow-sm backdrop-blur-sm">
              <div className="sidebar-skill-track flex w-max items-center gap-1.5 px-2">
                {[...SKILLS, ...SKILLS].map((skill, index) => (
                  <span key={`${skill}-${index}`} className="rounded-md bg-cream/75 px-1.5 py-1 text-[10px] font-bold text-ink whitespace-nowrap">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Email Contact */}
            <a href="mailto:talha@example.com" className="flex items-center justify-between rounded-xl border border-white/35 bg-panel/80 px-3 py-2 text-[11px] text-ink/80 shadow-sm backdrop-blur-sm">
              talha@example.com
              <Mail size={14} strokeWidth={2.5} />
            </a>

            {/* CTA */}
            <a ref={sidebarCtaRef} href="#contact" className="rounded-xl bg-accent px-4 py-2 text-center font-display text-sm font-black text-ink transition-transform hover:scale-[1.02]">
              Let's Talk
            </a>
          </div>
        </aside>,
        document.body
      )}
      
      {/* ============ ABOUT LAYER ============ */}
      <About ref={aboutRef} />
    </div>
  )
}

export default HeroToAbout