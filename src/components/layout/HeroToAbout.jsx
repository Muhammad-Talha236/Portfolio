import { useRef, useLayoutEffect, useState } from 'react'
import { ArrowUpRight, Copy, Check } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import About from '../sections/About'
import { useActiveSection } from '../../hooks/useActiveSection'
import { NAV_ITEMS, TRAITS, SOCIAL_LINKS, TOOLS, CONTACT_EMAIL } from '../../lib/constants'

gsap.registerPlugin(ScrollTrigger)

function HeroToAbout() {
  const sectionRef = useRef(null)

  const bgNameRef = useRef(null)
  const navLogoRef = useRef(null)
  const navLinkRefs = useRef([])
  const resumeBtnRef = useRef(null)
  const statCardRefs = useRef([])
  const traitsCardRef = useRef(null)
  const descCardRef = useRef(null)
  const headingRef = useRef(null)
  const taglineRef = useRef(null)
  const ctaBtnsRef = useRef(null)

  const sidebarRef = useRef(null)
  const sidebarLogoRef = useRef(null)
  const sidebarLinkRefs = useRef([])
  const sidebarStatRefs = useRef([])
  const sidebarCtaRef = useRef(null)

  const aboutRef = useRef(null)

  const activeId = useActiveSection(NAV_ITEMS.map((item) => item.id))
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API unavailable — mailto link still works
    }
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const getDelta = (fromEl, toEl) => {
        if (!fromEl || !toEl) return { x: 0, y: 0, scale: 1 }
        const from = fromEl.getBoundingClientRect()
        const to = toEl.getBoundingClientRect()
        return {
          x: to.left - from.left,
          y: to.top - from.top,
          scale: to.width / from.width,
        }
      }

      gsap.set(
        [bgNameRef.current, resumeBtnRef.current, ...statCardRefs.current],
        { transformOrigin: 'top left' }
      )
      gsap.set(aboutRef.current, { yPercent: 100 })

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
          pinType: 'fixed', // keeps the fixed sidebar anchored to the viewport, not the pinned wrapper
          anticipatePin: 1,
        },
      })

      tl.to(bgNameRef.current, { x: nameDelta.x, y: nameDelta.y, scale: nameDelta.scale, ease: 'none' }, 0)
      tl.to(bgNameRef.current, { opacity: 0, ease: 'none' }, 0.78)

      tl.to(navLogoRef.current, { opacity: 0, ease: 'none' }, 0.35)

      navLinkRefs.current.forEach((el, i) => {
        tl.to(el, { x: linkDeltas[i].x, y: linkDeltas[i].y, ease: 'none' }, 0.05 * i)
      })
      tl.to(sidebarLinkRefs.current, { opacity: 1, ease: 'none' }, 0.85)
      tl.to(navLinkRefs.current, { opacity: 0, ease: 'none' }, 0.85)

      tl.to(statCardRefs.current[0], {
        x: statDeltas[0].x, y: statDeltas[0].y, scale: statDeltas[0].scale, ease: 'none',
      }, 0.1)
      tl.to(statCardRefs.current[1], {
        x: statDeltas[1].x, y: statDeltas[1].y, scale: statDeltas[1].scale, ease: 'none',
      }, 0.18)

      tl.to([traitsCardRef.current, descCardRef.current], { y: -60, opacity: 0, ease: 'none' }, 0.15)
      tl.to([headingRef.current, taglineRef.current], { y: -40, scale: 0.92, opacity: 0, ease: 'none' }, 0.25)

      tl.to(resumeBtnRef.current, { x: ctaDelta.x, y: ctaDelta.y, scale: ctaDelta.scale, ease: 'none' }, 0.3)
      tl.to(resumeBtnRef.current, { opacity: 0, ease: 'none' }, 0.78)
      tl.to(ctaBtnsRef.current, { opacity: 0, y: 40, ease: 'none' }, 0.3)

      tl.to(sidebarRef.current, { opacity: 1, ease: 'none' }, 0.6)

      tl.to(aboutRef.current, { yPercent: 0, ease: 'none' }, 0.5)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="relative h-screen overflow-hidden bg-background">
      {/* ============ HERO LAYER ============ */}
      <section id="home" className="absolute inset-0 z-20 flex flex-col items-center justify-center overflow-hidden pt-20">
        <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 md:px-10">
          <div ref={navLogoRef} className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-display text-sm font-black text-ink">
              T
            </span>
            <span className="font-display text-sm font-bold text-ink">TALHA</span>
          </div>

          <nav className="hidden gap-7 md:flex">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.id}
                ref={(el) => (navLinkRefs.current[i] = el)}
                href={`#${item.id}`}
                className="text-sm font-semibold text-ink/80"
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
            className="flex items-center gap-1 rounded-full bg-accent px-4 py-2 text-sm font-bold text-ink shadow-md"
          >
            Resume <ArrowUpRight size={14} strokeWidth={3} />
          </a>
        </header>

        <div className="pointer-events-none absolute inset-x-0 top-[14%] z-10 flex justify-center">
          <h1
            ref={bgNameRef}
            aria-hidden="true"
            className="select-none font-display leading-none tracking-tight text-accent"
            style={{ fontSize: 'clamp(80px, 18vw, 260px)', fontWeight: 900 }}
          >
            TALHA
          </h1>
        </div>

        <div className="relative z-20 flex w-full max-w-3xl flex-col items-center px-4 pt-[30vh]">
          <h2
            ref={headingRef}
            className="text-center font-display font-extrabold leading-[1.05] text-ink"
            style={{ fontSize: 'clamp(32px, 5.5vw, 68px)' }}
          >
            Full Stack Developer
            <br />
            Building Digital Products.
          </h2>

          <p ref={taglineRef} className="mt-4 max-w-lg text-center text-sm font-medium text-ink/70 md:text-base">
            Computer Science student building thoughtful, production-quality software.
          </p>

          <div ref={ctaBtnsRef} className="mt-7 flex gap-4">
            <a href="#contact" className="rounded-full bg-accent px-7 py-3 font-display font-bold text-ink shadow-md">
              Hire Me
            </a>
            <a href="#projects" className="rounded-full border-2 border-ink px-7 py-3 font-display font-bold text-ink">
              View Projects
            </a>
          </div>
        </div>

        <div
          ref={(el) => (statCardRefs.current[0] = el)}
          className="absolute top-[30%] left-[6%] z-20 hidden rounded-2xl bg-panel/70 p-4 shadow-xl backdrop-blur-md lg:block"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink">
              <ArrowUpRight size={18} className="text-accent" strokeWidth={2.5} />
            </span>
            <div>
              <p className="font-display text-2xl font-black leading-none text-ink">10+</p>
              <p className="text-xs font-semibold text-ink/60">Projects Delivered</p>
            </div>
          </div>
        </div>

        <div
          ref={(el) => (statCardRefs.current[1] = el)}
          className="absolute bottom-[20%] left-[8%] z-20 hidden rounded-2xl bg-panel/70 p-4 shadow-xl backdrop-blur-md lg:block"
        >
          <p className="font-display text-4xl font-black leading-none text-accent">2+</p>
          <p className="mt-1 text-xs font-semibold text-ink/70">Years Coding</p>
        </div>

        <div
          ref={traitsCardRef}
          className="absolute top-[30%] right-[6%] z-20 hidden w-52 rounded-2xl bg-panel/70 p-4 shadow-xl backdrop-blur-md lg:block"
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
          className="absolute bottom-[20%] right-[8%] z-20 hidden w-64 rounded-2xl bg-panel/70 p-4 shadow-xl backdrop-blur-md lg:block"
        >
          <p className="text-sm leading-relaxed text-ink/80">
            I build modern digital products with clean code and premium user experiences.
          </p>
        </div>
      </section>

      {/* ============ SIDEBAR LAYER ============ */}
      <aside
        ref={sidebarRef}
        className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col justify-between p-6 opacity-0"
      >
        <div>
          {/* Logo + socials */}
          <div className="flex items-center justify-between">
            <div ref={sidebarLogoRef} className="w-fit rounded-md bg-accent px-3 py-1 font-display text-xl font-black text-ink">
              TALHA<span className="align-super text-xs">®</span>
            </div>
            <div className="flex gap-1.5">
              {SOCIAL_LINKS.map(({ id, url, icon: Icon }) => (
                <a
                  key={id}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-cream transition-transform hover:scale-105"
                >
                  <Icon size={13} strokeWidth={2.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Stat cards */}
          <div className="mt-6 flex gap-3">
            <div ref={(el) => (sidebarStatRefs.current[0] = el)} className="flex-1 rounded-xl bg-panel/70 p-3 text-center backdrop-blur-sm">
              <p className="font-display text-2xl font-black text-accent">10+</p>
              <p className="text-xs font-medium text-ink/70">Projects</p>
            </div>
            <div ref={(el) => (sidebarStatRefs.current[1] = el)} className="flex-1 rounded-xl bg-panel/70 p-3 text-center backdrop-blur-sm">
              <p className="font-display text-2xl font-black text-accent">2+</p>
              <p className="text-xs font-medium text-ink/70">Years</p>
            </div>
          </div>

          {/* Nav list — uppercase labels + active-section highlight */}
          <nav className="mt-8 flex flex-col gap-1 rounded-xl bg-panel/70 p-2 backdrop-blur-sm">
            {NAV_ITEMS.map((item, i) => {
              const Icon = item.icon
              const isActive = activeId === item.id
              return (
                <a
                  key={item.id}
                  ref={(el) => (sidebarLinkRefs.current[i] = el)}
                  href={`#${item.id}`}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-bold uppercase tracking-wide opacity-0 transition-colors ${
                    isActive ? 'bg-accent text-ink' : 'text-ink/80 hover:bg-accent hover:text-ink'
                  }`}
                >
                  <Icon size={16} strokeWidth={2.5} />
                  {item.label}
                </a>
              )
            })}
          </nav>

          {/* Tools row — stands in for "client logos" in the reference */}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {TOOLS.map((tool) => (
              <span key={tool} className="rounded-full bg-panel/70 px-2.5 py-1 text-[10px] font-semibold text-ink/70 backdrop-blur-sm">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: contact pill + CTA */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2 rounded-xl bg-panel/70 px-4 py-3 backdrop-blur-sm">
            <a href={`mailto:${CONTACT_EMAIL}`} className="truncate text-sm font-medium text-ink/80 hover:text-ink">
              {CONTACT_EMAIL}
            </a>
            <button onClick={handleCopyEmail} aria-label="Copy email" className="shrink-0 text-ink/60 hover:text-ink">
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          <a ref={sidebarCtaRef} href="#contact" className="rounded-xl bg-accent px-4 py-3 text-center font-display font-bold text-ink">
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