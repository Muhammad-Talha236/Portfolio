import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

function Navbar() {
  const links = [
    "Home",
    "About",
    "Projects",
    "Experience",
    "Services",
    "Contact",
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-4 left-15 right-15 z-50 flex justify-center px-5"
    >
      <div
        className="
          w-full
          max-w-[1420px]
          h-[64px]
          rounded-full
          border border-white/40
          bg-white/35
          backdrop-blur-2xl
          shadow-[0_10px_35px_rgba(0,0,0,0.08)]
          flex
          items-center
          justify-between
          px-5
        "
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#181818] flex items-center justify-center">
            <span className="text-[11px] font-bold text-[#FFD900]">T</span>
          </div>

          <span className="text-[15px] font-bold tracking-[0.35em] text-[#1A1A1A]">
            TALHA
          </span>
        </a>

        {/* Center */}
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="
                relative
                text-[13px]
                font-medium
                text-neutral-700
                transition-all
                duration-300
                hover:text-black

                after:absolute
                after:left-0
                after:-bottom-2
                after:h-[2px]
                after:w-0
                after:bg-[#FFD900]
                after:transition-all
                after:duration-300

                hover:after:w-full
              "
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Resume */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="
            flex
            items-center
            gap-1.5
            rounded-full
            bg-[#f0ff3d]
            px-5
            h-10
            text-[13px]
            font-semibold
            text-black
            transition-all
            duration-300
            hover:scale-105
          "
        >
          Resume
          <ArrowUpRight size={15} strokeWidth={2.5} />
        </a>
      </div>
    </motion.header>
  );
}

export default Navbar;