import { useLenis } from './hooks/useLenis'
import HeroToAbout from './components/layout/HeroToAbout'
import SkillsShowcase from './components/sections/SkillsShowcase'
import ProjectsShowcase from './components/sections/ProjectsShowcase'
import CertificatesShowcase from './components/sections/CertificatesShowcase'

function App() {
  useLenis()

  return (
    <div className="bg-background font-body text-ink">
      <HeroToAbout />
      <SkillsShowcase />
      <ProjectsShowcase />
      <CertificatesShowcase />
    </div>
  )
}

export default App