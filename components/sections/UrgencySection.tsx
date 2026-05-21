import React from "react"
import { MessageCircle, AlertCircle } from "@/components/Icons"
import RevealWrapper from "@/components/RevealWrapper"

const WA = "https://wa.me/56931358884?text=Hola%2C%20quiero%20hacer%20un%20pedido%20%F0%9F%8D%9C"

const days = [
  { day: "JUEVES", short: "JUE" },
  { day: "VIERNES", short: "VIE" },
  { day: "SÁBADO", short: "SÁB" },
]

export default function UrgencySection() {
  return (
    <section className="bg-bg py-28 px-4 sm:px-6 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, rgba(227,30,36,0.10) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">

        {/* Badge */}
        <RevealWrapper>
          <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 text-primary text-xs font-bold px-4 py-2 rounded-full mb-10 tracking-widest uppercase" style={{ fontFamily: "var(--font-inter)" }}>
            <AlertCircle size={12} />
            DISPONIBILIDAD LIMITADA
          </div>
        </RevealWrapper>

        {/* Headline */}
        <RevealWrapper delay={1}>
          <h2
            className="font-heading text-white leading-none mb-10"
            style={{ fontSize: "clamp(4.5rem, 16vw, 11rem)" }}
          >
            SOLO<br />
            <span className="text-primary">3 DÍAS</span><br />
            A LA SEMANA
          </h2>
        </RevealWrapper>

        {/* Days */}
        <RevealWrapper delay={2}>
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
            {days.map((d, i) => (
              <React.Fragment key={d.day}>
                <div className="flex flex-col items-center justify-center bg-card border border-white/10 rounded-2xl px-5 sm:px-8 py-4 sm:py-5 min-w-[80px] sm:min-w-[100px]">
                  <span className="font-heading text-3xl sm:text-4xl text-white leading-none">{d.short}</span>
                  <span className="text-white/35 text-[10px] sm:text-xs mt-1 tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
                    {d.day}
                  </span>
                </div>
                {i < days.length - 1 && (
                  <span className="text-white/15 font-heading text-3xl select-none">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </RevealWrapper>

        {/* Time */}
        <RevealWrapper delay={3}>
          <div className="inline-block border-t border-b border-white/10 py-4 mb-8 w-full max-w-xs mx-auto">
            <p className="font-heading text-4xl sm:text-5xl text-white/70 tracking-wide">
              17:30 — 21:30
            </p>
            <p className="text-white/25 text-xs tracking-[0.2em] mt-1" style={{ fontFamily: "var(--font-inter)" }}>
              HORAS DE ATENCIÓN
            </p>
          </div>
        </RevealWrapper>

        {/* Subtext + CTA */}
        <RevealWrapper delay={4}>
          <p className="text-white/40 text-sm mb-8 max-w-xs mx-auto leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            Los cupos son limitados. No te quedes sin tu box esta semana.
          </p>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-glow inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-pure-white font-bold text-lg px-10 py-4 rounded-full transition-colors duration-200"
          >
            <MessageCircle size={20} />
            Asegurar mi Box Ahora
          </a>
        </RevealWrapper>

      </div>
    </section>
  )
}
