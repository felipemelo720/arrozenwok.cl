const items = [
  "🍜 ARROZ FRITO",
  "🔥 FIDEOS CHAUMIN",
  "🥩 CARNE MONGOLIANA",
  "🍊 POLLO A LA NARANJA",
  "🦐 CAMARONES SALTEADOS",
  "🌱 OPCIÓN VEGETARIANA",
  "🥟 ARROLLADOS PRIMAVERA",
  "🍟 PAPAS FRITAS",
]

export default function StatsBar() {
  const repeated = [...items, ...items]
  return (
    <div data-theme="dark" className="bg-primary overflow-hidden py-4 border-y border-primary-dark">
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="font-heading text-white text-lg tracking-widest mx-8 shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
