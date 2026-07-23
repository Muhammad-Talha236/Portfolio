import { NAV_ITEMS, STATS, CONTACT_EMAIL } from '../../lib/constants'

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 lg:w-72 flex-col justify-between p-6 lg:flex bg-panel/30 border-r border-white/20 backdrop-blur-md">
      {/* Top: Logo */}
      <div>
        <a
          href="#home"
          className="inline-block rounded-md bg-accent px-4 py-1.5 font-display text-2xl font-black text-ink shadow-sm"
        >
          TALHA<span className="align-super text-xs">&reg;</span>
        </a>
        
        {/* Stat cards */}
        <div className="mt-8 flex gap-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex-1 rounded-xl bg-panel/80 p-3 text-center shadow-sm"
            >
              <p className="font-display text-2xl xl:text-3xl font-black text-accent">{stat.value}</p>
              <p className="text-xs font-medium text-ink/70">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Nav list */}
        <nav className="mt-8 flex flex-col gap-1.5 rounded-xl bg-panel/80 p-2.5 shadow-sm">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold text-ink/80 transition-all hover:bg-accent hover:text-ink hover:pl-5"
              >
                <Icon size={18} strokeWidth={2.5} />
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
          className="rounded-xl bg-panel/80 px-4 py-3 text-sm font-semibold text-ink/80 transition-colors hover:text-ink shadow-sm"
        >
          {CONTACT_EMAIL}
        </a>
        <a
          href="#contact"
          className="rounded-xl bg-accent px-4 py-3.5 text-center font-display font-bold text-ink transition-transform hover:scale-[1.02] shadow-md"
        >
          Let's Talk
        </a>
      </div>
    </aside>
  )
}

export default Sidebar;