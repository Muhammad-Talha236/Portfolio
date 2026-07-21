import { forwardRef } from 'react'
import JourneyCard from '../ui/JourneyCard'
import { JOURNEY_ENTRIES } from '../../lib/constants'

// About section — absolutely-positioned full-screen layer stacked behind
// Hero, slides up into view via the GSAP timeline in HeroToAbout.
const About = forwardRef(function About(_, ref) {
  return (
    <section
      id="about"
      ref={ref}
      className="absolute inset-0 z-10 flex flex-col justify-center px-10 pl-72 md:pl-80"
    >
      <span className="mb-6 inline-block w-fit rounded-full border border-ink/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-ink/70">
        Start Small, Grow Big
      </span>

      <h2
        className="font-display font-black leading-[1.05] text-ink"
        style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}
      >
        About Me (&)
        <br />
        My Journey
      </h2>

      <p className="mt-6 max-w-md text-base text-ink/70 md:text-lg">
        Two years ago I opened VS Code for the first time. What happened after
        that is easier to show than explain.
      </p>

      <JourneyCard entries={JOURNEY_ENTRIES} position="bottom-16 right-10" />
    </section>
  )
})

export default About