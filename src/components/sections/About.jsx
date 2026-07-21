import { forwardRef } from 'react'

// About section — now an absolutely-positioned full-screen layer that stacks
// directly behind the Hero (not below it in normal document flow). This lets
// it slide up into view from underneath as Hero dissolves, instead of being
// a whole screen-height away and only "jumping" into view at the very end.
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

      <div className="absolute bottom-16 right-10 hidden w-72 rounded-2xl bg-panel/70 p-6 shadow-xl backdrop-blur-md lg:block">
        <p className="font-display text-5xl font-black leading-none text-accent">'24</p>
        <h3 className="mt-4 text-lg font-bold text-ink">Where it started</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          Wrote my first "Hello World" and got hooked immediately. Been building ever since.
        </p>
      </div>
    </section>
  )
})

export default About