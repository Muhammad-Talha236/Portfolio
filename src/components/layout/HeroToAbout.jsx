import { useRef, useLayoutEffect } from 'react'
import { Home, CircleUser, Layers, Briefcase, Zap, Mail, ArrowUpRight, Lightbulb, ShieldCheck, Target, Users } from 'lucide-react'
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
]

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

      // FIX: anchor every morphing element's transform-origin to top-left,
      // matching how getDelta measures (top-left corners). Without this,
      // scale + translate combine incorrectly and elements drift off-target.
      gsap.set(
        [bgNameRef.current, resumeBtnRef.current, ...statCardRefs.current],
        { transformOrigin: 'top left' }
      )
      // About starts fully below the viewport (invisible), same-size overlay
      // stacked directly behind Hero — not a screen-height away in document flow.
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
          anticipatePin: 1,
        },
      })

      // 1) Giant name: travel + scale (via transform, NOT font-size — cheaper
      //    and keeps the FLIP math accurate since scale/translate now share
      //    the same top-left origin used in getDelta)
      tl.to(bgNameRef.current, { x: nameDelta.x, y: nameDelta.y, scale: nameDelta.scale, ease: 'none' }, 0)
      // Hands off to the real sidebar logo — fades out right as sidebar fades in
      tl.to(bgNameRef.current, { opacity: 0, ease: 'none' }, 0.78)

      tl.to(navLogoRef.current, { opacity: 0, ease: 'none' }, 0.35)

      navLinkRefs.current.forEach((el, i) => {
        tl.to(el, { x: linkDeltas[i].x, y: linkDeltas[i].y, ease: 'none' }, 0.05 * i)
      })
      tl.to(sidebarLinkRefs.current, { opacity: 1, ease: 'none' }, 0.85)
      tl.to(navLinkRefs.current, { opacity: 0, ease: 'none' }, 0.85)

      // Stat cards — slightly offset start times so their crossing paths
      // don't visually collide mid-transit
      tl.to(statCardRefs.current[0], {
        x: statDeltas[0].x, y: statDeltas[0].y, scale: statDeltas[0].scale, ease: 'none',
      }, 0.1)
      tl.to(statCardRefs.current[1], {
        x: statDeltas[1].x, y: statDeltas[1].y, scale: statDeltas[1].scale, ease: 'none',
      }, 0.18)

      tl.to([traitsCardRef.current, descCardRef.current], { y: -60, opacity: 0, ease: 'none' }, 0.15)
      tl.to([headingRef.current, taglineRef.current], { y: -40, scale: 0.92, opacity: 0, ease: 'none' }, 0.25)

      // Resume button: travel into sidebar CTA slot, then hand off (fade out)
      // right as the real sidebar CTA fades in — no more double-render glitch
      tl.to(resumeBtnRef.current, { x: ctaDelta.x, y: ctaDelta.y, scale: ctaDelta.scale, ease: 'none' }, 0.3)
      tl.to(resumeBtnRef.current, { opacity: 0, ease: 'none' }, 0.78)
      tl.to(ctaBtnsRef.current, { opacity: 0, y: 40, ease: 'none' }, 0.3)

      // Sidebar fades in earlier (0.6) so there's a proper crossfade window
      // with the outgoing name/resume button, instead of a hard cut
      tl.to(sidebarRef.current, { opacity: 1, ease: 'none' }, 0.6)

      // About slides up from directly beneath Hero — arrives as Hero dissolves,
      // never a blank gap in between
      tl.to(aboutRef.current, { yPercent: 0, ease: 'none' }, 0.5)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    // FIX: fixed h-screen container (not variable document-flow height) —
    // Hero and About now stack as overlapping layers inside it, instead of
    // About sitting a full screen-height below where it couldn't be reached.
    <div ref={sectionRef} className="relative h-screen overflow-hidden bg-background">
      {/* ============ HERO LAYER ============ */}
      <section className="absolute inset-0 z-20 flex flex-col items-center justify-center overflow-hidden pt-20">
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

        {/* FIX: name wrapped in a flex-centering parent so the h1 itself is
            content-width (tight bounding box), not the full viewport width.
            This is what makes the travel-to-sidebar math land correctly. */}
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
          <div ref={sidebarLogoRef} className="w-fit rounded-md bg-accent px-3 py-1 font-display text-xl font-black text-ink">
            TALHA<span className="align-super text-xs">®</span>
          </div>

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

          <nav className="mt-8 flex flex-col gap-1 rounded-xl bg-panel/70 p-2 backdrop-blur-sm">
            {NAV_ITEMS.map((item, i) => {
              const Icon = item.icon
              return (
                <a
                  key={item.id}
                  ref={(el) => (sidebarLinkRefs.current[i] = el)}
                  href={`#${item.id}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink/80 opacity-0 transition-colors hover:bg-accent hover:text-ink"
                >
                  <Icon size={16} strokeWidth={2.5} />
                  {item.label}
                </a>
              )
            })}
          </nav>
        </div>

        <a ref={sidebarCtaRef} href="#contact" className="rounded-xl bg-accent px-4 py-3 text-center font-display font-bold text-ink">
          Let's Talk
        </a>
      </aside>

      {/* ============ ABOUT LAYER ============ */}
      <About ref={aboutRef} />
    </div>
  )
}

export default HeroToAbout