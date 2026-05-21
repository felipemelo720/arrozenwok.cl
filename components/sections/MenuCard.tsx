"use client"

import { Flame, Star, Sparkles, Crown, Zap, UtensilsCrossed, Plus, Check } from "@/components/Icons"
import { useState, useRef } from "react"
import { useCart } from "@/context/CartContext"
import RevealWrapper from "@/components/RevealWrapper"
import type { MenuItem } from "@/lib/menu-data"

function parsePrice(label: string): number {
  return parseInt(label.replace(/\$|\./g, ""), 10)
}

const ICONS: Record<string, React.ReactNode> = {
  flame:    <Flame size={22} />,
  star:     <Star size={22} />,
  sparkles: <Sparkles size={22} />,
  crown:    <Crown size={22} />,
  zap:      <Zap size={22} />,
  utensils: <UtensilsCrossed size={22} />,
}

function AddButton({ item, unavailable }: { item: MenuItem; unavailable: boolean }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  if (unavailable) {
    return (
      <span
        className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-full border border-white/10 text-white/25 bg-white/5 cursor-not-allowed"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Agotado
      </span>
    )
  }

  function handleAdd() {
    add({ id: item.name, name: item.name, priceLabel: item.price, price: parsePrice(item.price) })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleAdd}
      className={`shrink-0 inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2.5 rounded-full border transition-all duration-200 ${
        added
          ? "bg-green-500/20 border-green-500/50 text-green-400"
          : "bg-white/8 hover:bg-primary text-white/70 hover:text-pure-white border-white/15 hover:border-primary"
      }`}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {added ? <><Check size={14} /> Agregado</> : <><Plus size={14} /> Agregar</>}
    </button>
  )
}

export function MenuCard({
  item,
  delay,
  unavailable,
}: {
  item: MenuItem
  delay: 0 | 1 | 2 | 3 | 4 | 5
  unavailable: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    el.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(8px)`
  }

  function handleMouseLeave() {
    const el = cardRef.current
    if (!el) return
    el.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0px)"
  }

  const cardBg = item.gradient
  const iconBg = item.iconBg

  return (
    <RevealWrapper delay={delay} className="h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`shimmer-card group relative h-full rounded-2xl border overflow-hidden flex flex-col transition-opacity ${
          unavailable ? "border-white/5 opacity-50" : "border-white/10"
        }`}
        style={{
          background: cardBg,
          transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
          willChange: "transform",
        }}
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        {item.badge && !unavailable && (
          <div className="absolute top-4 right-4 bg-accent text-black text-xs font-bold px-3 py-1 rounded-full tracking-wide shadow-lg">
            {item.badge}
          </div>
        )}

        {unavailable && (
          <div className="absolute top-4 right-4 bg-white/8 text-white/30 text-xs font-bold px-3 py-1 rounded-full tracking-wide">
            AGOTADO
          </div>
        )}

        <div className="p-6 flex flex-col gap-4 flex-1">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-pure-white/90 shadow-inner"
            style={{ backgroundColor: iconBg }}
          >
            {ICONS[item.iconType]}
          </div>

          <div className="flex-1">
            <h3 className="font-heading text-2xl text-white leading-tight">{item.name}</h3>
            <p className="text-white/45 text-sm leading-relaxed mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
              {item.desc}
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                precio
              </p>
              <span className={`font-heading text-3xl leading-none ${unavailable ? "text-white/20" : "text-accent"}`}>
                {item.price}
              </span>
            </div>
            <AddButton item={item} unavailable={unavailable} />
          </div>
        </div>
      </div>
    </RevealWrapper>
  )
}
