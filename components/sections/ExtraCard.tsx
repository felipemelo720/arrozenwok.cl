"use client"

import { Plus, Check } from "@/components/Icons"
import { useState } from "react"
import { useCart } from "@/context/CartContext"
import type { ExtraItem } from "@/lib/menu-data"

function parsePrice(label: string): number {
  return parseInt(label.replace(/\$|\./g, ""), 10)
}

function ExtraAddButton({ item }: { item: ExtraItem }) {
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

export default function ExtraCard({ item, unavailable }: { item: ExtraItem; unavailable: boolean }) {
  return (
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
          {unavailable ? (
            <span
              className="inline-flex items-center text-xs font-bold px-4 py-2 rounded-full border bg-red-500/10 border-red-500/30 text-red-400"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Agotado
            </span>
          ) : (
            <ExtraAddButton item={item} />
          )}
        </div>
      </div>
    </div>
  )
}
