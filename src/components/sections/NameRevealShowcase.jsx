import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const IMAGES = [
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80',
]

function NameRevealShowcase() {
  const [hoveredLetter, setHoveredLetter] = useState(null)
  const [mounted, setMounted] = useState(false) // <-- Add mounted state
  const letters = ['T', 'A', 'L', 'H', 'A']

  // <-- Wait for component to mount taake DOM order baqi components jesa rahay
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseEnter = (index) => {
    // Har letter ke hover par images ka set rotate karein taake multiple unique pics dikhein
    setHoveredLetter(index)
  }

  // <-- Render rokein jab tak mount na ho jaye
  if (!mounted) return null

  const content = (
    <section
       id="name-reveal"
      className="relative z-20 w-full bg-[#ddd8cb] py-36 overflow-hidden flex flex-col items-center justify-center lg:pl-72"
    >
      <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-12 flex flex-col items-center select-none">
                 
        {/* Subtitle / Badge */}
        <span className="mb-8 inline-block rounded-full border border-black/20 bg-black/5 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-black backdrop-blur-md">
          Interactive Signature
        </span>
        
        {/* Huge Name Letters & Logo Container */}
        <div 
           className="relative flex items-end justify-center gap-2 md:gap-6 flex-wrap"
          onMouseLeave={() => setHoveredLetter(null)}
        >
          {letters.map((letter, index) => {
            const isHovered = hoveredLetter === index
            const bgImage = IMAGES[index % IMAGES.length]
            return (
              <div
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                className="relative font-display font-black leading-none tracking-tighter cursor-pointer transition-all duration-300"
                style={{ fontSize: 'clamp(100px, 18vw, 260px)' }}
              >
                <span
                  className="relative z-10 transition-all duration-300 inline-block"
                  style={
                    isHovered
                      ? {
                          backgroundImage: `url(${bgImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }
                      : {
                          color: '#f0ff3d',
                          WebkitTextFillColor: '#f0ff3d',
                        }
                  }
                >
                  {letter}
                </span>
              </div>
            )
          })}
          
          {/* Trademark Logo at the end with its own hover mask */}
          <div 
             onMouseEnter={() => handleMouseEnter(5)}
            className="relative font-display font-black mb-6 md:mb-12 ml-1 text-3xl md:text-6xl cursor-pointer transition-all duration-300 inline-block"
            style={
              hoveredLetter === 5
                ? {
                    backgroundImage: `url(${IMAGES[3]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }
                : {
                    color: '#f0ff3d',
                    WebkitTextFillColor: '#f0ff3d',
                  }
            }
          >
            &reg;
          </div>
        </div>
        <p className="mt-12 text-xs font-mono font-bold uppercase tracking-[0.3em] text-black/50 text-center">
          Hover directly over each letter to reveal its unique image mask
        </p>
      </div>
    </section>
  )

  return createPortal(content, document.body)
}

export default NameRevealShowcase