import { Flame, Leaf, Zap, HeartHandshake } from "@/components/Icons"
import RevealWrapper from "@/components/RevealWrapper"

const reasons = [
  {
    icon: <Flame size={28} />,
    iconBg: "#3D1515",
    iconColor: "#FF6B35",
    title: "Cocinado al Momento",
    desc: "Cada box sale directo del wok a tu mano. Sin microondas, sin congelados. Sabor real en cada bocado.",
  },
  {
    icon: <Leaf size={28} />,
    iconBg: "#0D2D15",
    iconColor: "#4ADE80",
    title: "Ingredientes Frescos",
    desc: "Verduras reales, proteínas de calidad. Lo que va al wok, va directo desde el mercado.",
  },
  {
    icon: <Zap size={28} />,
    iconBg: "#2D2A08",
    iconColor: "#FBBF24",
    title: "Sin Apps de Delivery",
    desc: "Pide directo por WhatsApp. Sin comisiones, sin apps que fallen. Precios justos para ti.",
  },
  {
    icon: <HeartHandshake size={28} />,
    iconBg: "#2D0D30",
    iconColor: "#C084FC",
    title: "Trato Directo",
    desc: "Hablamos contigo, coordinamos a tu medida. Retiro o delivery — tú decides cómo y dónde.",
  },
]

export default function WhyUsSection() {
  return (
    <section className="bg-bg py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <RevealWrapper className="text-center mb-16">
          <h2 className="font-heading text-white" style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)" }}>
            ¿POR QUÉ <span className="text-primary">ELEGIRNOS?</span>
          </h2>
          <p className="text-white/40 mt-3 text-base max-w-sm mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
            No somos un restaurante. Somos algo mejor.
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r, i) => (
            <RevealWrapper key={r.title} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div className="card-hover bg-card border border-white/8 rounded-2xl p-6 h-full flex flex-col gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: r.iconBg, color: r.iconColor }}
                >
                  {r.icon}
                </div>
                <h3 className="font-heading text-xl text-white">{r.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  {r.desc}
                </p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
