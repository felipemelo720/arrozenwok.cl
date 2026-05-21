import { MessageCircle, Clock, MapPin } from "@/components/Icons"

function IgIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

const WA = "https://wa.me/56931358884?text=Hola%2C%20quiero%20hacer%20un%20pedido%20%F0%9F%8D%9C"
const IG = "https://www.instagram.com/arrozenwok"

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-10 border-b border-white/8">
          {/* Brand */}
          <div>
            <span className="font-heading text-3xl text-white block mb-2">
              ARROZ <span className="text-primary">EN</span> WOK
            </span>
            <p className="text-white/40 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
              Sabores irresistibles del wok, directo a tu mesa.
            </p>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-white/50 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
              <Clock size={14} className="text-primary shrink-0" />
              Jue – Sáb · 17:30 a 21:30 hrs
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
              <MapPin size={14} className="text-primary shrink-0" />
              Delivery en Paine
            </div>
            <div className="flex items-center gap-2 text-white/50 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
              <MapPin size={14} className="text-primary shrink-0" />
              Retiro Villa Las Américas
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <MessageCircle size={14} className="text-primary" />
              +56 9 3135 8884
            </a>
            <a
              href={IG}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span className="text-primary"><IgIcon /></span>
              @arrozenwok
            </a>
          </div>
        </div>

        <p className="text-center text-white/20 text-xs mt-6" style={{ fontFamily: "var(--font-inter)" }}>
          © {new Date().getFullYear()} Arroz en Wok — Paine, Chile
        </p>
      </div>
    </footer>
  )
}
