import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

// Sidebar contact row: mailto link + copy-to-clipboard button.
// Matches the reference design's email pill above the CTA button.
function ContactPill({ email }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — mailto link still works
    }
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-xl bg-panel/70 px-4 py-3 backdrop-blur-sm">
      <a
        href={`mailto:${email}`}
        className="truncate text-sm font-medium text-ink/80 transition-colors hover:text-ink"
      >
        {email}
      </a>
      <button
        onClick={handleCopy}
        aria-label="Copy email address"
        className="shrink-0 text-ink/60 transition-colors hover:text-ink"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  )
}

export default ContactPill