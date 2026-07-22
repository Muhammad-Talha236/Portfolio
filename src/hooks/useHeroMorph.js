import { useLayoutEffect, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useHeroMorph(refs, changeSection, navItems) {
  useLayoutEffect(() => {
    let ctx
    let refreshTimer
    let cancelled = false 

    document.fonts.ready.then(() => {
      if (cancelled) return

      ctx = gsap.context(() => {
        const getDelta = (fromEl, toEl) => {
          if (!fromEl || !toEl) return { x: 0, y: 0, scale: 1 }
          const from = fromEl.getBoundingClientRect()
          const to = toEl.getBoundingClientRect()
          return { x: to.left - from.left, y: to.top - from.top, scale: to.width / from.width }
        }

        const nameDelta = getDelta(refs.bgName.current, refs.sidebarLogo.current)
        const ctaDelta = getDelta(refs.resumeBtn.current, refs.sidebarCta.current)
        const statDeltas = refs.statCards.current.map((el, i) => getDelta(el, refs.sidebarStats.current[i]))
        const linkDeltas = refs.navLinks.current.map((el, i) => getDelta(el, refs.sidebarLinks.current[i]))

        gsap.set([refs.bgName.current, refs.resumeBtn.current, ...refs.statCards.current], { transformOrigin: 'top left' })
        gsap.set(refs.about.current, { yPercent: 100 })
        gsap.set(refs.sidebarLinks.current, { opacity: 0 })
        gsap.set(refs.sidebar.current, { opacity: 0 })
        gsap.set(refs.sidebarLogo.current, { opacity: 0 })
        gsap.set(refs.sidebarStats.current, { opacity: 0 })
        gsap.set(refs.sidebarCta.current, { opacity: 0 })
        gsap.set(refs.sidebarTagline.current, { opacity: 0 })

        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
        intro
          .fromTo(refs.bgName.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.9 }, 0)
          .fromTo(refs.heading.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 1.1)
          .fromTo(refs.ctaBtns.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.4)
          .fromTo(refs.statCards.current, { opacity: 0, scale: 0.7, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.7)' }, 1.6)
          .fromTo([refs.traitsCard.current, refs.descCard.current], { opacity: 0, scale: 0.7, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.7)' }, 1.75)
          .fromTo(refs.introText.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 2.2)

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: refs.section.current,
            start: 'top top',
            end: '+=180%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => changeSection(self.progress >= 0.72 ? 'about' : 'home'),
          },
        })

        refs.scrollTrigger.current = tl.scrollTrigger
        refs.sceneTimeline.current = tl

        tl.fromTo(refs.bgName.current, { x: 0, y: 0, scale: 1 }, { x: nameDelta.x, y: nameDelta.y, scale: nameDelta.scale, duration: 0.55, ease: 'none', immediateRender: false }, 0)
        tl.fromTo(refs.bgName.current, { opacity: 1 }, { opacity: 0, duration: 0.13, ease: 'none', immediateRender: false }, 0.55)
        tl.to(refs.sidebarLogo.current, { opacity: 1, duration: 0.13, ease: 'none' }, 0.55)

        tl.fromTo(refs.navLogo.current, { opacity: 1 }, { opacity: 0, duration: 0.1, ease: 'none', immediateRender: false }, 0.15)

        refs.navLinks.current.forEach((el, i) => {
          const start = 0.05 + i * 0.03
          tl.fromTo(el, { x: 0, y: 0 }, { x: linkDeltas[i].x, y: linkDeltas[i].y, duration: 0.55, ease: 'none', immediateRender: false }, start)
        })
        tl.fromTo(refs.navLinks.current, { opacity: 1 }, { opacity: 0, duration: 0.1, ease: 'none', immediateRender: false }, 0.68)
        tl.to(refs.sidebarLinks.current, { opacity: 1, duration: 0.1, ease: 'none' }, 0.68)

        refs.statCards.current.forEach((el, i) => {
          tl.fromTo(el, { x: 0, y: 0, scale: 1 }, { x: statDeltas[i].x, y: statDeltas[i].y, scale: statDeltas[i].scale, duration: 0.5, ease: 'none', immediateRender: false }, 0.1 + i * 0.05)
        })
        tl.fromTo(refs.statCards.current, { opacity: 1 }, { opacity: 0, duration: 0.1, ease: 'none', immediateRender: false }, 0.6)
        tl.to(refs.sidebarStats.current, { opacity: 1, duration: 0.1, ease: 'none' }, 0.6)

        tl.fromTo([refs.traitsCard.current, refs.descCard.current, refs.introText.current], { y: 0, opacity: 1 }, { y: -60, opacity: 0, duration: 0.22, ease: 'none', immediateRender: false }, 0.35)
        tl.fromTo(refs.heading.current, { y: 0, scale: 1, opacity: 1 }, { y: -40, scale: 0.92, opacity: 0, duration: 0.2, ease: 'none', immediateRender: false }, 0.45)

        tl.fromTo(refs.resumeBtn.current, { x: 0, y: 0, scale: 1 }, { x: ctaDelta.x, y: ctaDelta.y, scale: ctaDelta.scale, duration: 0.4, ease: 'none', immediateRender: false }, 0.25)
        tl.fromTo(refs.resumeBtn.current, { opacity: 1 }, { opacity: 0, duration: 0.1, ease: 'none', immediateRender: false }, 0.65)
        tl.to(refs.sidebarCta.current, { opacity: 1, duration: 0.1, ease: 'none' }, 0.65)

        tl.fromTo(refs.ctaBtns.current, { opacity: 1, y: 0 }, { opacity: 0, y: 40, duration: 0.2, ease: 'none', immediateRender: false }, 0.42)

        tl.to(refs.sidebar.current, { opacity: 1, duration: 0.3, ease: 'none' }, 0.4)
        tl.to(refs.sidebarTagline.current, { opacity: 1, duration: 0.15, ease: 'none' }, 0.7)

        tl.to(refs.about.current, { yPercent: 0, duration: 0.55, ease: 'none' }, 0.45)
      }, refs.section.current)

      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 500)
    })

    return () => {
      cancelled = true
      ctx?.revert()
      clearTimeout(refreshTimer)
    }
  }, [refs, changeSection])

  // Track baqi sections jab unke paas se guzra jaye
  useEffect(() => {
    let cancelled = false
    let ctx

    const timeout = setTimeout(() => {
      if (cancelled) return
      ctx = gsap.context(() => {
        navItems.forEach((item) => {
          if (item.id === 'home' || item.id === 'about') return
          const element = document.getElementById(item.id)
          if (element) {
            ScrollTrigger.create({
              trigger: element,
              start: 'top 50%',
              end: 'bottom 50%',
              onEnter: () => changeSection(item.id),
              onEnterBack: () => changeSection(item.id),
            })
          }
        })
      })
    }, 100)

    return () => {
      cancelled = true
      clearTimeout(timeout)
      ctx?.revert()
    }
  }, [navItems, changeSection])
}