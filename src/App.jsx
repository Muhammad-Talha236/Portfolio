import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'

function App() {
  return (
    <div className="bg-background font-body text-ink">
      <Navbar />
      <main>
        <Hero />
        {/* Next: About section */}
      </main>
    </div>
  )
}

export default App