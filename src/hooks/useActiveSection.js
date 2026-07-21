    import { useEffect, useState } from 'react'

// Watches a list of section ids and reports which one is currently
// most "in view" — used to highlight the active sidebar nav link.
// Sections that don't exist in the DOM yet (Skills, Projects, etc. —
// not built out as real sections yet) are simply skipped.
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        )
        setActiveId(topMost.target.id)
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}