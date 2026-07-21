import { useState } from 'react'

// Right-side "journey" card for the About section — a small data-driven
// carousel matching the reference's testimonial-style card + dot indicator,
// instead of one hardcoded static block.
function JourneyCard({ entries, position = '' }) {
  const [index, setIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const entry = entries[index]

  const goTo = (i) => {
    setIndex(i)
    setExpanded(false)
  }

  return (
    <div className={`absolute ${position} z-20 hidden w-72 flex-col items-end gap-4 lg:flex`}>
      <div className="relative w-full overflow-hidden rounded-2xl bg-panel/70 p-6 shadow-xl backdrop-blur-md">
        <span className="pointer-events-none absolute inset-x-6 -top-px h-[3px] rounded-full bg-accent blur-[3px]" />
        <span className="pointer-events-none absolute inset-x-6 -top-px h-px rounded-full bg-accent" />

        <p className="font-display text-5xl font-black leading-none text-accent">{entry.year}</p>
        <h3 className="mt-4 text-lg font-bold text-ink">{entry.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          {expanded ? entry.fullBlurb : entry.blurb}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-ink/10 pt-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-accent">
              {entry.person.initials}
            </span>
            <div>
              <p className="text-xs font-bold text-ink">{entry.person.handle}</p>
              <p className="text-[11px] text-ink/50">{entry.person.timeAgo}</p>
            </div>
          </div>

          {entry.fullBlurb && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="shrink-0 rounded-full bg-panel px-3 py-1.5 text-xs font-semibold text-ink transition-transform hover:scale-105"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {entries.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Show journey entry ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? 'bg-ink' : 'bg-ink/25'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default JourneyCard