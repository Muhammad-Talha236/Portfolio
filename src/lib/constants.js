// ✅ correct
import {
  Home, CircleUser, Layers, Briefcase, Zap, GraduationCap, Mail,
  Lightbulb, ShieldCheck, Target, Users, Github, Linkedin,
} from 'lucide-react'

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

// Stat cards shown in sidebar / hero
// TODO: replace placeholder numbers with your real stats
export const STATS = [
  { value: '10+', label: 'Projects' },
  { value: '2+', label: 'Years Coding' },
]

// Trait badges shown in Hero's floating card
export const TRAITS = [
  { icon: Lightbulb, label: 'Creative' },
  { icon: ShieldCheck, label: 'Reliable' },
  { icon: Target, label: 'Problem Solver' },
  { icon: Users, label: 'Team Player' },
]

export const CONTACT_EMAIL = 'talha@example.com' // TODO: replace with your real email

// Social links shown next to the sidebar logo
// TODO: replace with your real profile URLs
export const SOCIAL_LINKS = [
  { id: 'github', url: 'https://github.com/yourhandle', icon: Github },
  { id: 'linkedin', url: 'https://linkedin.com/in/yourhandle', icon: Linkedin },
]

// Tools/stack row — stands in for the "client logos" strip in the reference design,
// since a student portfolio has a tech stack, not clients
// TODO: adjust to whatever you actually use
export const TOOLS = ['React', 'Tailwind', 'GSAP', 'Framer Motion', 'Node.js', 'Git']

// Journey/timeline entries — powers the right-side card on the About section.
// Each entry can carry a longer `fullBlurb` for the "Read more" expansion.
// TODO: replace with your real milestones
export const JOURNEY_ENTRIES = [
  {
    year: "'24",
    title: 'Where it started',
    blurb: 'Wrote my first "Hello World" and got hooked immediately. Been building ever since.',
    fullBlurb:
      'Wrote my first "Hello World" and got hooked immediately. Spent the next few months glued to tutorials, breaking things, and slowly figuring out how the pieces fit together. Been building ever since.',
    person: { initials: 'TA', handle: '@talha', timeAgo: '2 years ago' },
  },
  {
    year: "'25",
    title: 'First real project',
    blurb: 'Shipped my first full-stack app and realized how much I still had to learn.',
    fullBlurb:
      'Shipped my first full-stack app — a small tool nobody asked for, but it taught me more than any course did. That was the moment building stopped feeling like homework and started feeling like a craft.',
    person: { initials: 'TA', handle: '@talha', timeAgo: '1 year ago' },
  },
  {
    year: "'26",
    title: 'Going deeper',
    blurb: 'Started focusing on polish — animation, performance, and real design systems.',
    fullBlurb:
      'Started focusing on the details that separate a working project from a great one — motion design, performance budgets, accessibility, and building things with a real design system instead of one-off styles.',
    person: { initials: 'TA', handle: '@talha', timeAgo: 'Present' },
  },
]