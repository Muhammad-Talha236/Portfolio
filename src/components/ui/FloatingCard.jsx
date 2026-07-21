import { motion } from 'framer-motion'

// Reusable glass card with signature top-edge glow line.
// Now a motion.div — accepts standard framer-motion props (variants, initial, etc.)
// via `motionProps`, so Hero.jsx controls WHEN each card animates in.
function FloatingCard({ position = '', className = '', children, ...motionProps }) {
  return (
    <div className={`absolute ${position} z-20 ${className}`}>
      <motion.div
        {...motionProps}
        className="relative overflow-hidden rounded-2xl bg-panel/70 p-4 shadow-xl backdrop-blur-md"
      >
        <span className="pointer-events-none absolute inset-x-6 -top-px h-[3px] rounded-full bg-accent blur-[3px]" />
        <span className="pointer-events-none absolute inset-x-6 -top-px h-px rounded-full bg-accent" />
        {children}
      </motion.div>
    </div>
  )
}

export default FloatingCard