import { UtensilsCrossed, ChevronDown, MapPin, Clock, Star } from "@/components/Icons"
import Image from "next/image"

const pills = [
  { icon: <MapPin size={14} />, text: "Delivery en Paine" },
  { icon: <MapPin size={14} />, text: "Retiro Villa Las Américas" },
  { icon: <Clock size={14} />, text: "17:30 – 21:30 hrs" },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="animate-drift absolute top-[-10%] left-1/4 w-[900px] h-[600px] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(ellipse, rgba(227,30,36,0.22) 0%, transparent 70%)" }}
        />
        <div
          className="animate-drift2 absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, rgba(227,30,36,0.12) 0%, transparent 70%)" }}
        />
        <div
          className="animate-drift absolute top-1/2 left-[-10%] w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 70%)", animationDelay: "-6s" }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Red edge accent */}
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-primary via-primary/30 to-transparent" />

      {/* Grid layout: text left, image right */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 lg:pt-32 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">

        {/* LEFT — copy */}
        <div className="text-center lg:text-left">

          {/* Schedule badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/5 border border-primary/30 text-white/90 text-sm font-semibold px-5 py-2.5 rounded-full mb-8 animate-float">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            JUE · VIE · SÁB &nbsp;—&nbsp; 17:30 a 21:30 HRS
          </div>

          {/* Headline */}
          <h1 className="font-heading leading-none text-white mb-4">
            <span className="block" style={{ fontSize: "clamp(4rem, 13vw, 10rem)" }}>SABOR</span>
            <span className="block text-gradient-animate" style={{ fontSize: "clamp(4rem, 13vw, 10rem)" }}>WOK</span>
            <span className="block text-white/65" style={{ fontSize: "clamp(1.6rem, 5vw, 3.8rem)" }}>
              EN TU PUERTA · PAINE
            </span>
          </h1>

          {/* Desc */}
          <p
            className="text-white/55 text-lg sm:text-xl max-w-lg mx-auto lg:mx-0 mt-4 mb-6 leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Arroz frito y fideos chaumin preparados al momento en el wok.
            Sin apps de delivery — solo WhatsApp, precio directo.
          </p>

          {/* Social proof */}
          <div className="flex items-center gap-2.5 justify-center lg:justify-start mb-8">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={15} className="text-accent fill-accent" />
              ))}
            </div>
            <span
              className="text-white/50 text-sm"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              +200 pedidos en Paine
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 justify-center lg:justify-start items-center lg:items-start">
            {/* Primary row */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                data-theme="dark"
                href="#menu"
                className="animate-glow group relative inline-flex items-center gap-3 bg-primary text-pure-white font-bold text-base px-7 py-4 rounded-2xl transition-all duration-200 w-full sm:w-auto justify-center overflow-hidden shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <UtensilsCrossed size={20} />
                <span>Armar mi Pedido</span>
                <span className="text-pure-white/60 font-normal text-sm">· desde $7.000</span>
              </a>
              <a
                href="#como-pedir"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white/70 hover:text-white font-semibold text-base px-7 py-4 rounded-2xl transition-all duration-200 w-full sm:w-auto justify-center"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                ¿Cómo pedir?
                <ChevronDown size={16} className="opacity-60" />
              </a>
            </div>
          </div>

          {/* Location + hours pills */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-10">
            {pills.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/55 text-sm px-4 py-2 rounded-full"
              >
                <span className="text-primary">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — food photo */}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-[440px]" data-theme="dark">
            {/* Glow behind image */}
            <div
              className="absolute inset-0 rounded-3xl blur-3xl scale-90 opacity-70"
              style={{ background: "radial-gradient(ellipse, rgba(227,30,36,0.40) 0%, transparent 65%)" }}
            />

            {/* Photo */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/5]">
              <Image
                src="/ftocomida.webp"
                alt="Box de arroz frito Arroz en Wok"
                fill
                className="object-cover"
                priority
              />
              {/* Gradient overlay bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              {/* Info overlay at bottom of photo */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between">
                <div>
                  <p
                    className="text-white/50 text-xs mb-0.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Desde
                  </p>
                  <p className="font-heading text-3xl text-white leading-none">$7.000</p>
                </div>
                <div className="h-8 w-px bg-white/15" />
                <div className="text-right">
                  <p
                    className="text-white/50 text-xs mb-0.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Disponible
                  </p>
                  <p className="font-heading text-lg text-white leading-none">JUE · VIE · SÁB</p>
                </div>
              </div>
            </div>

            {/* Floating freshness tag */}
            <div className="absolute -top-3 -right-2 lg:-right-5 bg-accent text-black font-bold text-xs sm:text-sm px-4 py-2 rounded-full shadow-xl rotate-3 whitespace-nowrap">
              🔥 FRESCO · AL MOMENTO
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
        <ChevronDown size={26} />
      </div>
    </section>
  )
}
