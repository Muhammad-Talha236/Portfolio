import { Home, CircleUser, Layers, Briefcase, Zap, GraduationCap, Mail } from 'lucide-react'

// Sidebar navigation — maps to each section's id (used for scroll-to + active state)
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About Me', icon: CircleUser },
  { id: 'skills', label: 'Skills', icon: Layers },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'experience', label: 'Experience', icon: Zap },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail },
]

// Stat cards shown in sidebar (NESH's "80+ Projects" / "7+ Years" equivalent)
// TODO: replace placeholder numbers with your real stats
export const STATS = [
  { value: '10+', label: 'Projects' },
  { value: '2+', label: 'Years Coding' },
]

export const CONTACT_EMAIL = 'talha@example.com' // TODO: replace with your real email