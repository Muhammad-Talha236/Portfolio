import { useRef, useLayoutEffect, useState } from 'react'
import { Home, CircleUser, Briefcase, Zap, Mail, ArrowUpRight, Lightbulb, ShieldCheck, Target, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import About from '../sections/About'

gsap.registerPlugin(ScrollTrigger)

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About Me', icon: CircleUser },
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

    // Avoid showing a half-scrubbed Home frame while smooth scroll settles.
    if (id === 'home') sceneTimelineRef.current?.progress(0)
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

      gsap.set(
        [bgNameRef.current, resumeBtnRef.current, ...statCardRefs.current],
        { transformOrigin: 'top left' }
      )
      gsap.set(aboutRef.current, { yPercent: 100 })
      gsap.set(sidebarLinkRefs.current, { opacity: 0 })
      gsap.set(sidebarRef.current, { opacity: 0 })

      // ---------- ENTRANCE (unchanged) ----------
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .from(bgNameRef.current, { opacity: 0, y: -50, duration: 0.9 }, 0)
        .from(headingRef.current, { opacity: 0, y: 30, duration: 0.7 }, 1.1)
        .from(ctaBtnsRef.current, { opacity: 0, y: 20, duration: 0.6 }, 1.4)
        .from(statCardRefs.current, { opacity: 0, scale: 0.7, y: 20, duration: 0.5, stagger: 0.15, ease: 'back.out(1.7)' }, 1.6)
        .from([traitsCardRef.current, descCardRef.current], { opacity: 0, scale: 0.7, y: 20, duration: 0.5, stagger: 0.15, ease: 'back.out(1.7)' }, 1.75)
        .from(introTextRef.current, { opacity: 0, duration: 0.6 }, 2.2)

      // ================================================================
      // SCROLL-LINKED MORPH — rebuilt so every tween has an EXPLICIT
      // duration, and the whole timeline is normalized to run from 0 → 1.
      // This is what was broken before: unspecified durations defaulted
      // to 0.5s each, silently stretching the real timeline length and
      // desyncing every "start position" from what it visually looked like.
      // Now: position + duration together = a predictable 0–1 map, and
      // every fade-out/fade-in PAIR shares identical timing so there's
      // never a moment where both the Hero element and its Sidebar
      // counterpart are visible at once (no more ghost duplicates).
      // ================================================================
      const nameDelta = getDelta(bgNameRef.current, sidebarLogoRef.current)
      const ctaDelta = getDelta(resumeBtnRef.current, sidebarCtaRef.current)
      const statDeltas = statCardRefs.current.map((el, i) => getDelta(el, sidebarStatRefs.current[i]))
      const linkDeltas = navLinkRefs.current.map((el, i) => getDelta(el, sidebarLinkRefs.current[i]))

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=180%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
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

      // Giant name → sidebar logo: travels 0→0.55, crossfades to real logo 0.55→0.68
      tl.to(bgNameRef.current, { x: nameDelta.x, y: nameDelta.y, scale: nameDelta.scale, duration: 0.55, ease: 'none' }, 0)
      tl.to(bgNameRef.current, { opacity: 0, duration: 0.13, ease: 'none' }, 0.55)
      tl.to(sidebarLogoRef.current, { opacity: 1, duration: 0.13, ease: 'none' }, 0.55)
      // Sidebar logo starts invisible (matches crossfade above)
      gsap.set(sidebarLogoRef.current, { opacity: 0 })

      // Small hero-nav logo pill fades early (name is doing the heavy lifting by then)
      tl.to(navLogoRef.current, { opacity: 0, duration: 0.1, ease: 'none' }, 0.15)

      // Nav links: each travels individually 0.05→0.6 (staggered start), 
      // then crossfades to icon-labels 0.68→0.78
      navLinkRefs.current.forEach((el, i) => {
        const start = 0.05 + i * 0.03
        tl.to(el, { x: linkDeltas[i].x, y: linkDeltas[i].y, duration: 0.55, ease: 'none' }, start)
      })
      tl.to(navLinkRefs.current, { opacity: 0, duration: 0.1, ease: 'none' }, 0.68)
      tl.to(sidebarLinkRefs.current, { opacity: 1, duration: 0.1, ease: 'none' }, 0.68)

      // Stat cards: travel + SCALE 0.1→0.6 (explicit duration = scale is now
      // clearly visible across this window), crossfade 0.6→0.7
      statCardRefs.current.forEach((el, i) => {
        tl.to(el, {
          x: statDeltas[i].x, y: statDeltas[i].y, scale: statDeltas[i].scale,
          duration: 0.5, ease: 'none',
        }, 0.1 + i * 0.05)
      })
      tl.to(statCardRefs.current, { opacity: 0, duration: 0.1, ease: 'none' }, 0.6)
      tl.to(sidebarStatRefs.current, { opacity: 1, duration: 0.1, ease: 'none' }, 0.6)
      gsap.set(sidebarStatRefs.current, { opacity: 0 })

      // Trait/description cards: no sidebar home, drift up & fully gone by 0.4
      tl.to([traitsCardRef.current, descCardRef.current, introTextRef.current], {
        y: -60, opacity: 0, duration: 0.22, ease: 'none',
      }, 0.35)

      // Heading + tagline dissolve 0.15→0.4
      tl.to(headingRef.current, { y: -40, scale: 0.92, opacity: 0, duration: 0.2, ease: 'none' }, 0.45)

      // Resume button: travel 0.25→0.65, crossfade to sidebar CTA 0.65→0.75
      tl.to(resumeBtnRef.current, { x: ctaDelta.x, y: ctaDelta.y, scale: ctaDelta.scale, duration: 0.4, ease: 'none' }, 0.25)
      tl.to(resumeBtnRef.current, { opacity: 0, duration: 0.1, ease: 'none' }, 0.65)
      tl.to(sidebarCtaRef.current, { opacity: 1, duration: 0.1, ease: 'none' }, 0.65)
      gsap.set(sidebarCtaRef.current, { opacity: 0 })

      tl.to(ctaBtnsRef.current, { opacity: 0, y: 40, duration: 0.2, ease: 'none' }, 0.42)

      // Sidebar backdrop + tagline fade in gradually as content arrives
      tl.to(sidebarRef.current, { opacity: 1, duration: 0.3, ease: 'none' }, 0.4)
      tl.to(sidebarTaglineRef.current, { opacity: 1, duration: 0.15, ease: 'none' }, 0.7)
      gsap.set(sidebarTaglineRef.current, { opacity: 0 })

      // About slides up 0.45→1.0 — arrives exactly as Hero finishes dissolving
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
      <aside
        ref={sidebarRef}
        className="fixed left-0 top-0 z-50 flex h-[100svh] w-60 flex-col justify-between overflow-hidden p-4"
      >
        <div>
          <div className="rounded-lg border border-white/35 bg-panel/80 p-3 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div ref={sidebarLogoRef} className="w-fit rounded-md bg-accent px-2 py-1 font-display text-sm font-black tracking-tight text-ink">
            TALHA<span className="align-super text-xs">®</span>
              </div>
              <div className="flex gap-2">
                <a aria-label="GitHub" href="https://github.com" className="rounded-lg bg-cream/70 px-2 py-1.5 text-ink transition-colors hover:bg-accent">
                  <span className="text-xs font-black">GH</span>
                </a>
                <a aria-label="LinkedIn" href="https://linkedin.com" className="rounded-lg bg-cream/70 px-2 py-1.5 text-ink transition-colors hover:bg-accent">
                  <span className="text-xs font-black">in</span>
                </a>
              </div>
            </div>

            <p ref={sidebarTaglineRef} className="mt-6 text-xs leading-relaxed text-ink/80">
            Building thoughtful, production-quality software — one project at a time.
            </p>
          </div>

          <div className="mt-3 flex rounded-lg border border-white/35 bg-panel/80 px-2 py-3 shadow-sm backdrop-blur-sm">
            <div ref={(el) => (sidebarStatRefs.current[0] = el)} className="flex flex-1 flex-col items-center border-r border-ink/15 text-center">
              <p className="font-display text-2xl font-black leading-none text-accent">10+</p>
              <p className="mt-1 text-[11px] font-bold leading-tight text-ink">Projects</p>
            </div>
            <div ref={(el) => (sidebarStatRefs.current[1] = el)} className="flex flex-1 flex-col items-center text-center">
              <p className="font-display text-2xl font-black leading-none text-accent">2+</p>
              <p className="mt-1 max-w-16 text-[11px] font-bold leading-tight text-ink">Years of experience</p>
            </div>
          </div>

          <nav className="mt-3 flex flex-col items-start gap-1.5 rounded-lg border border-white/35 bg-panel/80 p-3 shadow-sm backdrop-blur-sm">
            {NAV_ITEMS.map((item, i) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.id}
                  ref={(el) => (sidebarLinkRefs.current[i] = el)}
                  href={`#${item.id}`}
                  onClick={(event) => handleNavigation(event, item.id)}
                  className={`flex items-center gap-2 rounded-lg px-2 py-1 font-display text-xs font-black uppercase tracking-tight text-ink transition-colors hover:bg-accent ${isActive ? 'bg-accent' : 'bg-cream/65'}`}
                >
                  <Icon size={14} strokeWidth={2.75} />
                  {item.label}
                </a>
              )
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-2">
          <div className="overflow-hidden rounded-lg border border-white/35 bg-panel/80 py-2 shadow-sm backdrop-blur-sm">
            <div className="sidebar-skill-track flex w-max items-center gap-2 px-2">
              {[...SKILLS, ...SKILLS].map((skill, index) => (
                <span key={`${skill}-${index}`} className="rounded-md bg-cream/75 px-2 py-1 text-[10px] font-bold text-ink whitespace-nowrap">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <a href="mailto:talha@example.com" className="flex items-center justify-between rounded-lg border border-white/35 bg-panel/80 px-3 py-2 text-xs text-ink/80 shadow-sm backdrop-blur-sm">
            talha@example.com
            <Mail size={15} strokeWidth={2.5} />
          </a>
          <a ref={sidebarCtaRef} href="#contact" className="rounded-xl bg-accent px-4 py-2.5 text-center font-display text-base font-black text-ink transition-transform hover:scale-[1.02]">
            Let's Talk
          </a>
        </div>
      </aside>

      {/* ============ ABOUT LAYER ============ */}
      <About ref={aboutRef} />
    </div>
  )
}

export default HeroToAbout
