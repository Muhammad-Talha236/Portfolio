import { forwardRef } from 'react'
import JourneyTimeline from './JourneyTimeline'

const About = forwardRef(function About(_, ref) {
  return (
    <>
      <section
        id="about"
        ref={ref}
        // lg:absolute use kiya hai taake desktop par purana design rahay, aur mobile par relative flow kare
        className="relative lg:absolute inset-0 z-10 flex flex-col justify-center px-6 py-20 sm:py-24 lg:py-0 lg:px-10 lg:pl-72 bg-background"
      >
        <span className="mb-6 inline-block w-fit rounded-full border border-ink/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-ink/70">
          Start Small, Grow Big
        </span>
        <h2
          className="font-display font-black leading-[1.05] text-ink"
          style={{ fontSize: 'clamp(30px, 7vw, 50px)' }}
        >
          About Me (&)
          <br></br> My Journey
        </h2>
        <p className="mt-4 max-w-md text-sm text-ink/70 sm:text-base md:text-1xl">
          Three years ago I opened VS Code for the first time. What happened after
          that is easier to show than explain.
        </p>
      </section>
      <JourneyTimeline />
    </>
  )
})

export default About