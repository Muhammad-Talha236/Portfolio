import { useLenis } from './hooks/useLenis'
import HeroToAbout from './components/layout/HeroToAbout'
import SkillsShowcase from './components/sections/SkillsShowcase'
import ProjectsShowcase from './components/sections/ProjectsShowcase'
import CertificatesShowcase from './components/sections/CertificatesShowcase'
import NameRevealShowcase from './components/sections/NameRevealShowcase'
function App() {
  useLenis()
  return (
    <div className="bg-background font-body text-ink">
      <HeroToAbout />
      <SkillsShowcase />
      <ProjectsShowcase />
      <CertificatesShowcase />
<NameRevealShowcase/>
    </div>
  )
}

export default App