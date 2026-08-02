import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Lenis takes scrolling over from the native browser scrollbar. GSAP's
// default pin mechanism (pinType: "fixed") uses `position: fixed`, which
// needs a synchronous layout read every single tick to stay correctly
// placed against a non-native scroller — that's exactly the forced-reflow
// chain Chrome's Performance panel flagged (gsap.js _tick -> ScrollTrigger
// -> lenis.js setScroll -> _getComputedProperty), costing over a second of
// pure layout recalculation in a 37s recording. Switching every pin to
// transform-based positioning (GPU-composited, no layout read needed) is
// GSAP's own documented fix for this exact Lenis + ScrollTrigger combo.
//
// This must run at module load, NOT inside a useEffect/component — sections
// create their own ScrollTriggers in useLayoutEffect, which can run before
// this hook's effect does, so setting the default here (evaluated once when
// this file is first imported, before any component renders) guarantees
// every pin created anywhere in the app picks it up.
ScrollTrigger.defaults({ pinType: 'transform' })

// Sets up buttery smooth scroll (Lenis) and keeps GSAP's ScrollTrigger
// perfectly in sync with it. Without this sync, pinned/scrubbed animations
// would feel laggy or desynced from the actual scroll position.
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // higher = slower/more "floaty" momentum
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth deceleration
    })

    // Every Lenis scroll tick, tell ScrollTrigger to recalculate
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's own ticker (avoids double rAF loops)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Every section (Hero, Skills, Projects, JourneyTimeline, ...) creates
    // its ScrollTriggers as soon as it mounts — but the "Inter Tight" /
    // "Inter" webfonts, video poster images, and unsplash background images
    // are all still loading at that point. If the custom font swaps in
    // after ScrollTrigger has already measured pinned-section heights using
    // the browser's fallback font metrics, every start/end position it
    // recorded is now slightly wrong until something refreshes it — which
    // is exactly why the very first visit through a section can feel janky
    // while every visit after (fonts already cached) is smooth. Refreshing
    // once fonts + the full page (images included) have settled fixes the
    // *first*-load case specifically, on top of the section-level fixes.
    let refreshTimer
    const scheduleRefresh = () => {
      clearTimeout(refreshTimer)
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150)
    }

    document.fonts?.ready?.then(scheduleRefresh)
    window.addEventListener('load', scheduleRefresh)
    // Fallback in case fonts.ready or the load event already fired before
    // this effect ran (e.g. fast connections) — still worth one refresh.
    scheduleRefresh()

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
      clearTimeout(refreshTimer)
      window.removeEventListener('load', scheduleRefresh)
    }
  }, [])
}