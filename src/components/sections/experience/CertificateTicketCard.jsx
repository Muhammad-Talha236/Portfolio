import { Award, ArrowUpRight, QrCode } from 'lucide-react'

export function CertificateTicketCard({ cert, isActive, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`relative flex items-stretch rounded-[2rem] transition-all duration-500 cursor-pointer select-none shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${
        isActive 
          ? 'scale-100 opacity-100 z-20 w-[680px] md:w-[740px]' 
          : 'scale-90 opacity-40 z-10 w-[240px] md:w-[280px] blur-[1px] hover:opacity-70'
      }`}
      style={{ backgroundColor: cert.cardColor || '#f7f5ee', color: '#1a1a1a' }}
    >
      {/* Top & Bottom Semi-Circular Cutout Notches */}
      <div className="absolute top-0 left-[72%] -translate-x-1/2 w-6 h-3 bg-[#ddd8cb] rounded-b-full z-30" />
      <div className="absolute bottom-0 left-[72%] -translate-x-1/2 w-6 h-3 bg-[#ddd8cb] rounded-t-full z-30" />

      {/* ================= MAIN CERTIFICATE BODY ================= */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-black/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black text-[#f0ff3d] flex items-center justify-center shadow-md">
              <Award size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="font-display text-lg font-black tracking-wider uppercase">{cert.title}</h4>
              <p className="text-[11px] font-semibold text-black/60">{cert.subtitle}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold tracking-widest text-black/40">
            {cert.certId}
          </span>
        </div>

        {/* Middle Content */}
        <div className="py-5 space-y-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-black/50 block">Recipient</span>
            <p className="font-display text-2xl font-black text-black">{cert.recipient}</p>
          </div>

          <div className="bg-black/5 rounded-xl p-3 border border-black/5">
            <p className="text-xs md:text-sm font-medium leading-relaxed text-black/80">
              ✦ {cert.achievement}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {cert.skills.map((skill) => (
              <span key={skill} className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-black/10 text-black">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between pt-4 border-t border-black/10">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-black/50 uppercase tracking-wider block">Issued By: {cert.issuer}</span>
            <div className="flex items-center gap-2">
              <QrCode size={28} className="text-black/80" />
              <span className="text-xs font-mono font-bold text-black/70">{cert.date}</span>
            </div>
          </div>

          {isActive && (
            <a
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#f0ff3d] px-5 py-2.5 text-xs font-black text-black shadow-md transition-transform hover:scale-105"
            >
              Verify <ArrowUpRight size={14} strokeWidth={3} />
            </a>
          )}
        </div>
      </div>

      {/* ================= VERTICAL DASHED PERFORATION LINE ================= */}
      <div className="relative w-0 flex items-center justify-center z-20">
        <div className="absolute inset-y-4 border-r-2 border-dashed border-black/20" />
      </div>

      {/* ================= DETACHABLE STUB ================= */}
      <div className="w-[84px] md:w-[96px] p-4 flex flex-col items-center justify-between rounded-r-[2rem] bg-black/5 text-black relative">
        <span className="text-[10px] font-mono font-bold text-black/40">{cert.id}</span>
        
        <div className="my-auto py-4">
          <span className="block font-display text-sm font-black tracking-[0.25em] uppercase whitespace-nowrap rotate-90 origin-center text-black/80">
            {cert.badgeText}
          </span>
        </div>

        <span className="text-[10px] font-semibold text-black/50 font-mono">STUB</span>
      </div>

    </div>
  )
}