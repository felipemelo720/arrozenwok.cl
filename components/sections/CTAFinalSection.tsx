
function IgIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}
import RevealWrapper from "@/components/RevealWrapper"

const IG = "https://www.instagram.com/arrozenwok"

export default function CTAFinalSection() {
  return (
    <section className="relative overflow-hidden py-28 px-4 sm:px-6 bg-bg" data-theme="dark">
      {/* Big red glow bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, rgba(227,30,36,0.25) 0%, transparent 65%)" }}
        />
      </div>

      {/* Diagonal stripe pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 20px)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <RevealWrapper>
          <p className="font-heading text-primary/70 text-2xl tracking-widest mb-2">
            — EL WOK MÁS RICO DE PAINE —
          </p>
        </RevealWrapper>

        <RevealWrapper delay={1}>
          <h2
            className="font-heading text-white leading-none mb-6"
            style={{ fontSize: "clamp(4rem, 13vw, 10rem)" }}
          >
            ¿LISTO<br />
            <span className="text-primary">PARA</span><br />
            PEDIR?
          </h2>
        </RevealWrapper>

        <RevealWrapper delay={2}>
          <p className="text-white/50 text-lg mb-10 max-w-sm mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
            Escríbenos y en minutos tienes tu box confirmado.
          </p>
        </RevealWrapper>

        <RevealWrapper delay={3} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={IG}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-white/20 hover:border-white/50 text-white/70 hover:text-white font-semibold text-lg px-8 py-5 rounded-full transition-all duration-200"
          >
            <IgIcon />
            @arrozenwok
          </a>
        </RevealWrapper>
      </div>
    </section>
  )
}
