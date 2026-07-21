import { useLenis } from './hooks/useLenis'
import HeroToAbout from './components/layout/HeroToAbout'

function App() {
  useLenis()

  return (
    <div className="bg-background font-body text-ink">
      <HeroToAbout />
    </div>
  )
}

export default App