import { NAV_ITEMS, STATS, CONTACT_EMAIL } from '../../lib/constants'

// Fixed vertical sidebar — persistent across all sections.
// Contains: logo, stat cards, icon nav list, contact + CTA.
function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col justify-between p-6">
      {/* Top: Logo */}
      <div>
        <a
          href="#home"
          className="inline-block rounded-md bg-accent px-3 py-1 font-display text-xl font-black text-ink"
        >
          TALHA<span className="align-super text-xs">®</span>
        </a>

        {/* Stat cards */}
        <div className="mt-6 flex gap-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex-1 rounded-xl bg-panel/70 p-3 text-center backdrop-blur-sm"
            >
              <p className="font-display text-2xl font-black text-accent">{stat.value}</p>
              <p className="text-xs font-medium text-ink/70">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Nav list */}
        <nav className="mt-8 flex flex-col gap-1 rounded-xl bg-panel/70 p-2 backdrop-blur-sm">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink/80 transition-colors hover:bg-accent hover:text-ink"
              >
                <Icon size={16} strokeWidth={2.5} />
                {item.label}
              </a>
            )
          })}
        </nav>
      </div>

      {/* Bottom: contact + CTA */}
      <div className="flex flex-col gap-3">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="rounded-xl bg-panel/70 px-4 py-3 text-sm font-medium text-ink/80 backdrop-blur-sm transition-colors hover:text-ink"
        >
          {CONTACT_EMAIL}
        </a>
        <a
          href="#contact"
          className="rounded-xl bg-accent px-4 py-3 text-center font-display font-bold text-ink transition-transform hover:scale-[1.02]"
        >
          Let's Talk
        </a>
      </div>
    </aside>
  )
}

export default Sidebar