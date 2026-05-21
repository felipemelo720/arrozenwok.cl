"use client"

import { ShoppingBag } from "@/components/Icons"
import { useCart } from "@/context/CartContext"

export default function CartFAB({ onOpen }: { onOpen: () => void }) {
  const { count } = useCart()

  return (
    <button
      onClick={onOpen}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 font-bold px-5 py-3.5 rounded-full shadow-2xl transition-all duration-200 ${
        count > 0
          ? "bg-primary hover:bg-primary-dark animate-glow text-pure-white"
          : "bg-white/10 hover:bg-white/20 border border-white/20 text-white"
      }`}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <ShoppingBag size={20} />
      {count > 0 ? (
        <>
          <span>Ver Pedido</span>
          <span className="bg-pure-white text-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
            {count}
          </span>
        </>
      ) : (
        <span className="text-sm">Armar Pedido</span>
      )}
    </button>
  )
}
