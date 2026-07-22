import { useLenis } from './hooks/useLenis'
import HeroToAbout from './components/layout/HeroToAbout'
import SkillsShowcase from './components/sections/SkillsShowcase'
import ProjectsShowcase from './components/sections/ProjectsShowcase'

function App() {
  useLenis()

  return (
    <div className="bg-background font-body text-ink">
      <HeroToAbout />
      <SkillsShowcase />
      <ProjectsShowcase />
    </div>
  )
}

export default App
