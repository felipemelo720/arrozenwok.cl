"use client"

import { Plus, Check } from "@/components/Icons"
import { useState } from "react"
import RevealWrapper from "@/components/RevealWrapper"
import { useCart } from "@/context/CartContext"

function parsePrice(label: string): number {
  return parseInt(label.replace(/\$|\./g, ""), 10)
}

const extras = [
  {
    name: "Arrollados Primavera",
    desc: "5 unidades crujientes — el acompañamiento perfecto",
    price: "$3.500",
    gradient: "linear-gradient(135deg, #2A1A08 0%, #140D00 100%)",
    emoji: "🥟",
  },
  {
    name: "Empanadas Pollo Mandarín",
    desc: "5 unidades — pollo en salsa mandarín",
    price: "$4.500",
    gradient: "linear-gradient(135deg, #2A1508 0%, #140A00 100%)",
    emoji: "🫔",
  },
  {
    name: "Papas Fritas",
    desc: "Porción generosa, doradas y crujientes",
    price: "$4.000",
    gradient: "linear-gradient(135deg, #2A2008 0%, #141000 100%)",
    emoji: "🍟",
  },
]

function ExtraAddButton({ item }: { item: typeof extras[number] }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    add({ id: item.name, name: item.name, priceLabel: item.price, price: parsePrice(item.price) })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleAdd}
      className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full border transition-all duration-200 ${
        added
          ? "bg-green-500/20 border-green-500/50 text-green-400"
          : "bg-white/8 hover:bg-primary text-white/50 hover:text-pure-white border-white/15 hover:border-primary"
      }`}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {added ? <><Check size={12} /> Agregado</> : <><Plus size={12} /> Agregar</>}
    </button>
  )
}

export default function ExtrasSection() {
  return (
    <section id="extras" className="bg-surface py-20 px-4 sm:px-6 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <RevealWrapper className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 text-accent text-sm font-semibold px-4 py-2 rounded-full mb-5">
            <Plus size={14} />
            AGREGADOS
          </div>
          <h2 className="font-heading text-white" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
            COMPLETA TU PEDIDO
          </h2>
          <p className="text-white/40 mt-2 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
            Suma algo más y lleva tu box al siguiente nivel.
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {extras.map((item, i) => (
            <RevealWrapper key={item.name} delay={(i + 1) as 1 | 2}>
              <div
                className="card-hover relative rounded-2xl border border-white/10 overflow-hidden flex flex-col"
                style={{ background: item.gradient }}
              >
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl leading-none">{item.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-heading text-2xl text-white leading-tight">{item.name}</h3>
                      <p className="text-white/45 text-xs mt-1 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-widest mb-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                        precio
                      </p>
                      <span className="font-heading text-3xl text-accent leading-none">{item.price}</span>
                    </div>
                    <ExtraAddButton item={item} />
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
