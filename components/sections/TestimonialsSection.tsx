import { Star } from "@/components/Icons"
import RevealWrapper from "@/components/RevealWrapper"

const reviews = [
  {
    name: "María J.",
    location: "Paine",
    text: "La carne mongoliana es increíble. Llevo semanas pidiendo lo mismo cada sábado — no me canso. El arroz frito queda perfecto.",
    initial: "M",
    color: "#E31E24",
  },
  {
    name: "Diego V.",
    location: "Paine",
    text: "El Mix Rice con mongoliana y camarones es una combinación que no tiene competencia. Vale cada peso. Llegó caliente y bien presentado.",
    initial: "D",
    color: "#7C3AED",
  },
  {
    name: "Valentina M.",
    location: "Villa Las Américas",
    text: "El Shrimp Chaumin quedó delicioso. Los camarones frescos hacen toda la diferencia. La coordinación por WhatsApp es súper rápida.",
    initial: "V",
    color: "#0891B2",
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="fill-accent text-accent" />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="bg-bg py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <RevealWrapper className="text-center mb-14">
          <h2 className="font-heading text-white" style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)" }}>
            LO QUE DICEN <span className="text-primary">NUESTROS CLIENTES</span>
          </h2>
          <p className="text-white/40 mt-2 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
            +1.125 personas ya lo saben.
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <RevealWrapper key={r.name} delay={(i + 1) as 1 | 2 | 3}>
              <div className="card-hover bg-card border border-white/8 rounded-2xl p-6 flex flex-col gap-4 h-full">
                <Stars />
                <p
                  className="text-white/70 text-sm leading-relaxed flex-1"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/8">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0"
                    style={{ backgroundColor: r.color }}
                  >
                    {r.initial}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{r.name}</p>
                    <p className="text-white/35 text-xs">{r.location}</p>
                  </div>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
