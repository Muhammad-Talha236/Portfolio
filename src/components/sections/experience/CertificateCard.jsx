    import { Award, ArrowUpRight } from 'lucide-react'

export function CertificateCard({ cert }) {
  return (
    <div className="group relative flex h-[400px] w-[350px] md:w-[400px] shrink-0 flex-col justify-between rounded-3xl border border-white/15 bg-neutral-900/90 p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-accent/50 hover:-translate-y-2">
      <div>
        {/* Top Header: Icon & Date */}
        <div className="flex items-center justify-between mb-6">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-black shadow-lg shadow-accent/20">
            <Award size={22} strokeWidth={2.5} />
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-accent">
            {cert.date}
          </span>
        </div>

        {/* Title & Issuer */}
        <span className="font-display text-xs font-bold uppercase tracking-widest text-white/50">
          {cert.issuer}
        </span>
        <h3 className="font-display text-2xl font-black text-white mt-1">
          {cert.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-xs md:text-sm leading-relaxed text-white/70 line-clamp-3">
          {cert.description}
        </p>
      </div>

      {/* Footer: Skills tags & View Link */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5 overflow-hidden">
          {cert.skills.map((skill) => (
            <span 
              key={skill}
              className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/80"
            >
              {skill}
            </span>
          ))}
        </div>

        <a 
          href={cert.link}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${cert.title} certificate`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-black transition-transform hover:scale-110"
        >
          <ArrowUpRight size={18} strokeWidth={2.5} />
        </a>
      </div>
    </div>
  )
}