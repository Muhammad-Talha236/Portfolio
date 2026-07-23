import { forwardRef } from 'react'
import JourneyTimeline from './JourneyTimeline'

const About = forwardRef(function About(_, ref) {
  return (
    <>
      <section
        id="about"
        ref={ref}
        // lg:absolute use kiya hai taake desktop par purana design rahay, aur mobile par relative flow kare
        className="relative lg:absolute inset-0 z-10 flex flex-col justify-center px-6 py-24 lg:py-0 lg:px-10 lg:pl-72 md:pl-80 bg-background"
      >
        <span className="mb-6 inline-block w-fit rounded-full border border-ink/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-ink/70">
          Start Small, Grow Big
        </span>
        <h2
          className="font-display font-black leading-[1.05] text-ink"
          style={{ fontSize: 'clamp(32px, 5.5vw, 50px)' }}
        >
          About Me (&)
          <br></br> My Journey
        </h2>
        <p className="mt-4 max-w-md text-base text-ink/70 md:text-1xl">
          Two years ago I opened VS Code for the first time. What happened after
          that is easier to show than explain.
        </p>
      </section>
      <JourneyTimeline />
    </>
  )
})

export default About