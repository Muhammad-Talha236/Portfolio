import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = ["Home", "About", "Skills", "Projects", "Certificates", "Contact"];

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      // Safe padding for mobile, slightly larger for tablet
      className="fixed top-3 left-0 right-0 z-[100] flex justify-center px-4 sm:top-4 md:px-8 lg:hidden"
    >
      <div className="w-full max-w-[1420px] h-[60px] md:h-[68px] rounded-full border border-white/40 bg-white/35 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.08)] flex items-center justify-between px-4 md:px-6">
        
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 md:gap-3" onClick={closeMenu}>
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#181818] flex items-center justify-center shrink-0">
            <span className="text-[11px] md:text-[12px] font-bold text-[#FFD900]">T</span>
          </div>
          <span className="text-[14px] md:text-[16px] font-bold tracking-[0.25em] text-[#1A1A1A]">
            TALHA
          </span>
        </a>

        {/* Right side: Resume + Hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-[#f0ff3d] px-4 md:px-5 h-10 md:h-11 text-[13px] font-semibold text-black transition-all duration-300 hover:scale-105"
          >
            <span className="hidden sm:inline">Resume</span>
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </a>
          
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-[#181818] text-white transition-transform active:scale-95"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-4 right-4 top-[72px] md:top-[80px] z-[90] flex flex-col gap-1 rounded-3xl border border-white/40 bg-white/95 p-4 shadow-[0_20px_45px_rgba(0,0,0,0.15)] backdrop-blur-2xl md:left-8 md:right-8"
          >
            {links.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3.5 text-base md:text-lg font-semibold text-neutral-800 transition-colors hover:bg-[#f0ff3d] text-black"
              >
                {item}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;