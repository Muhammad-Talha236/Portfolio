import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])
}