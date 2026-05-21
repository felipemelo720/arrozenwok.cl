"use client"

import { useState } from "react"
import {
  X, Plus, Minus, MessageCircle, Trash2, ChevronRight,
  MapPin, Package, Banknote, CreditCard, ArrowLeft,
} from "@/components/Icons"
import { useCart, CartItem } from "@/context/CartContext"

const WA_NUMBER = "56931358884"

const EXTRAS = [
  { id: "extra-papas",       name: "Papas Fritas",          desc: "Porción grande",   emoji: "🍟", price: 4000, priceLabel: "$4.000" },
  { id: "extra-pollo",       name: "Pollo Crispy",           desc: "Porción",          emoji: "🍗", price: 4500, priceLabel: "$4.500" },
  { id: "extra-arrollados",  name: "Arrollados Primavera",   desc: "x3 unidades",      emoji: "🥟", price: 3500, priceLabel: "$3.500" },
]

const EXTRA_IDS = new Set(EXTRAS.map((e) => e.id))

type Step = "cart" | "extras" | "checkout"
type DeliveryType = "retiro" | "delivery" | null
type Payment = "efectivo" | "transferencia" | null

function formatCLP(n: number) {
  return "$" + n.toLocaleString("es-CL")
}

function buildWAMessage(
  items: CartItem[],
  total: number,
  name: string,
  delivery: DeliveryType,
  address: string,
  payment: Payment,
): string {
  const lines = items.map((i) => `• ${i.qty}x ${i.name}`).join("\n")
  const entrega = delivery === "delivery" ? `Delivery — ${address}` : "Retiro en Villa Las Américas"
  const pago = payment === "efectivo" ? "Efectivo" : "Transferencia"
  return [
    "Hola, quiero hacer un pedido:",
    "",
    lines,
    "",
    `Total: ${formatCLP(total)}`,
    `Nombre: ${name}`,
    `Entrega: ${entrega}`,
    `Pago: ${pago}`,
  ].join("\n")
}

function StepBar({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "cart",     label: "Pedido"  },
    { key: "extras",   label: "Extras"  },
    { key: "checkout", label: "Datos"   },
  ]
  const idx = steps.findIndex((s) => s.key === step)

  return (
    <div className="flex items-center justify-center gap-0 py-3.5 border-b border-white/10 shrink-0 px-6">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i < idx
                  ? "bg-primary/20 text-primary"
                  : i === idx
                  ? "bg-primary text-pure-white shadow-[0_0_14px_rgba(227,30,36,0.45)]"
                  : "bg-white/8 text-white/25"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {i < idx ? "✓" : i + 1}
            </div>
            <span
              className={`text-[10px] leading-none transition-colors duration-300 ${
                i === idx ? "text-white/70" : "text-white/25"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-10 h-px mb-5 mx-1.5 transition-all duration-300 ${
                i < idx ? "bg-primary/35" : "bg-white/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function QtyControl({
  qty,
  onInc,
  onDec,
}: {
  qty: number
  onInc: () => void
  onDec: () => void
}) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <button
        onClick={onDec}
        className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
      >
        <Minus size={14} />
      </button>
      <span className="font-heading text-xl text-white w-5 text-center">{qty}</span>
      <button
        onClick={onInc}
        className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary border border-primary/30 hover:border-primary flex items-center justify-center text-primary hover:text-pure-white transition-all"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}

export default function CartDrawer({
  open,
  onClose,
  deliveryEnabled = true,
}: {
  open: boolean
  onClose: () => void
  deliveryEnabled?: boolean
}) {
  const { items, add, increment, decrement, clear, total, count } = useCart()

  const [step, setStep]         = useState<Step>("cart")
  const [name, setName]         = useState("")
  const [delivery, setDelivery] = useState<DeliveryType>(null)
  const [address, setAddress]   = useState("")
  const [payment, setPayment]   = useState<Payment>(null)

  const menuItems  = items.filter((i) => !EXTRA_IDS.has(i.id))
  const extraItems = items.filter((i) =>  EXTRA_IDS.has(i.id))

  const [prevDeliveryEnabled, setPrevDeliveryEnabled] = useState(deliveryEnabled)
  if (deliveryEnabled !== prevDeliveryEnabled) {
    setPrevDeliveryEnabled(deliveryEnabled)
    if (!deliveryEnabled && delivery === "delivery") {
      setDelivery(null)
    }
  }

  const checkoutValid =
    name.trim().length > 0 &&
    delivery !== null &&
    payment !== null &&
    (delivery === "retiro" || address.trim().length > 0)

  function fireAbandon() {
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "cart_abandoned" }),
    })
  }

  function handleClose() {
    if (items.length > 0 && (step === "extras" || step === "checkout")) {
      fireAbandon()
    }
    onClose()
    setTimeout(() => setStep("cart"), 300)
  }

  function goBack() {
    setStep(step === "checkout" ? "extras" : "cart")
  }

  function handleSend() {
    const msg = buildWAMessage(items, total, name.trim(), delivery, address.trim(), payment)
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "order_sent" }),
    })
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank")
    clear()
    onClose()
    setTimeout(() => setStep("cart"), 300)
  }

  const headerMeta: Record<Step, { title: string; sub: string }> = {
    cart:     { title: "TU PEDIDO",  sub: `${count} ${count === 1 ? "item" : "items"}`  },
    extras:   { title: "¿ALGO MÁS?", sub: "Agrega extras a tu pedido"                   },
    checkout: { title: "TUS DATOS",  sub: "Último paso"                                 },
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        data-theme="dark"
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-surface border-l border-white/10 flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 shrink-0">
          <div className="flex items-center gap-1.5">
            {step !== "cart" && (
              <button
                onClick={goBack}
                className="text-white/40 hover:text-white transition-colors p-1.5 -ml-1 rounded-lg hover:bg-white/5"
                aria-label="Volver"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <div>
              <h2 className="font-heading text-2xl text-white leading-none">
                {headerMeta[step].title}
              </h2>
              <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                {headerMeta[step].sub}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {step === "cart" && menuItems.length > 0 && (
              <button
                onClick={clear}
                className="text-white/30 hover:text-red-400/70 transition-colors p-2 rounded-lg hover:bg-white/5"
                aria-label="Vaciar carrito"
              >
                <Trash2 size={16} />
              </button>
            )}
            <button
              onClick={handleClose}
              className="text-white/50 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Progress */}
        <StepBar step={step} />

        {/* ── STEP 1: Cart ── */}
        {step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {menuItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <span className="text-5xl">🍜</span>
                  <p className="text-white/40 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    Tu carrito está vacío.<br />Agrega algo del menú.
                  </p>
                </div>
              ) : (
                menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 bg-card border border-white/8 rounded-xl p-4"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-white text-lg leading-tight truncate">{item.name}</p>
                      <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                        {item.priceLabel} c/u
                      </p>
                    </div>
                    <QtyControl
                      qty={item.qty}
                      onInc={() => increment(item.id)}
                      onDec={() => decrement(item.id)}
                    />
                  </div>
                ))
              )}
            </div>

            {menuItems.length > 0 && (
              <div className="p-5 border-t border-white/10 space-y-4 shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm" style={{ fontFamily: "var(--font-inter)" }}>Subtotal</span>
                  <span className="font-heading text-3xl text-accent">{formatCLP(total)}</span>
                </div>
                <button
                  onClick={() => setStep("extras")}
                  className="w-full inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-pure-white font-bold text-base px-6 py-4 rounded-2xl transition-colors duration-200 animate-glow"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Continuar
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}

        {/* ── STEP 2: Extras ── */}
        {step === "extras" && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <p className="text-white/35 text-xs pb-1" style={{ fontFamily: "var(--font-inter)" }}>
                Opcional — puedes saltar este paso
              </p>
              {EXTRAS.map((ex) => {
                const cartItem = extraItems.find((i) => i.id === ex.id)
                const qty = cartItem?.qty ?? 0
                return (
                  <div
                    key={ex.id}
                    className={`flex items-center justify-between gap-3 rounded-xl p-4 border transition-all duration-200 ${
                      qty > 0 ? "bg-primary/10 border-primary/30" : "bg-card border-white/8"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-3xl leading-none">{ex.emoji}</span>
                      <div>
                        <p className="font-heading text-white text-base leading-tight">{ex.name}</p>
                        <p className="text-white/40 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                          {ex.desc} · {ex.priceLabel}
                        </p>
                      </div>
                    </div>
                    {qty > 0 ? (
                      <QtyControl
                        qty={qty}
                        onInc={() => increment(ex.id)}
                        onDec={() => decrement(ex.id)}
                      />
                    ) : (
                      <button
                        onClick={() =>
                          add({ id: ex.id, name: ex.name, price: ex.price, priceLabel: ex.priceLabel })
                        }
                        className="flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-white border border-white/15 hover:border-primary/50 hover:bg-primary/10 rounded-xl px-3 py-2 transition-all"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        <Plus size={12} />
                        Agregar
                      </button>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="p-5 border-t border-white/10 space-y-4 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-white/50 text-sm" style={{ fontFamily: "var(--font-inter)" }}>Total</span>
                <span className="font-heading text-3xl text-accent">{formatCLP(total)}</span>
              </div>
              <button
                onClick={() => setStep("checkout")}
                className="w-full inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-pure-white font-bold text-base px-6 py-4 rounded-2xl transition-colors duration-200 animate-glow"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Confirmar Pedido
                <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}

        {/* ── STEP 3: Checkout ── */}
        {step === "checkout" && (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-6">

              {/* Name */}
              <div>
                <label
                  className="text-white/50 text-xs uppercase tracking-widest block mb-2"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Tu nombre
                </label>
                <input
                  type="text"
                  placeholder="Ej: María González"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-card border border-white/10 focus:border-primary text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>

              {/* Delivery type */}
              <div>
                <label
                  className="text-white/50 text-xs uppercase tracking-widest block mb-2"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  ¿Retiro o delivery?
                </label>
                <div className={`grid gap-3 ${deliveryEnabled ? "grid-cols-2" : "grid-cols-1"}`}>
                  <button
                    onClick={() => setDelivery("retiro")}
                    className={`flex flex-col items-center gap-2 py-4 rounded-xl border transition-all text-sm font-semibold ${
                      delivery === "retiro"
                        ? "bg-primary/20 border-primary text-white"
                        : "bg-card border-white/10 text-white/50 hover:border-white/30"
                    }`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <Package size={20} />
                    Retiro
                    <span className="text-xs font-normal opacity-60">Villa Las Américas</span>
                  </button>
                  {deliveryEnabled && (
                    <button
                      onClick={() => setDelivery("delivery")}
                      className={`flex flex-col items-center gap-2 py-4 rounded-xl border transition-all text-sm font-semibold ${
                        delivery === "delivery"
                          ? "bg-primary/20 border-primary text-white"
                          : "bg-card border-white/10 text-white/50 hover:border-white/30"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <MapPin size={20} />
                      Delivery
                      <span className="text-xs font-normal opacity-60">Paine</span>
                    </button>
                  )}
                </div>
                {!deliveryEnabled && (
                  <p className="text-orange-400/70 text-xs mt-2" style={{ fontFamily: "var(--font-inter)" }}>
                    Delivery no disponible hoy. Solo retiro en Villa Las Américas.
                  </p>
                )}
              </div>

              {/* Address */}
              {delivery === "delivery" && (
                <div>
                  <label
                    className="text-white/50 text-xs uppercase tracking-widest block mb-2"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Dirección de entrega
                  </label>
                  <input
                    type="text"
                    placeholder="Calle, número, villa o sector"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-card border border-white/10 focus:border-primary text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                </div>
              )}

              {/* Payment */}
              <div>
                <label
                  className="text-white/50 text-xs uppercase tracking-widest block mb-2"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Forma de pago
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPayment("efectivo")}
                    className={`flex flex-col items-center gap-2 py-4 rounded-xl border transition-all text-sm font-semibold ${
                      payment === "efectivo"
                        ? "bg-primary/20 border-primary text-white"
                        : "bg-card border-white/10 text-white/50 hover:border-white/30"
                    }`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <Banknote size={20} />
                    Efectivo
                  </button>
                  <button
                    onClick={() => setPayment("transferencia")}
                    className={`flex flex-col items-center gap-2 py-4 rounded-xl border transition-all text-sm font-semibold ${
                      payment === "transferencia"
                        ? "bg-primary/20 border-primary text-white"
                        : "bg-card border-white/10 text-white/50 hover:border-white/30"
                    }`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <CreditCard size={20} />
                    Transferencia
                  </button>
                </div>
              </div>

              {/* Order summary */}
              <div className="bg-card border border-white/8 rounded-xl p-4 space-y-2">
                <p
                  className="text-white/40 text-xs uppercase tracking-widest mb-3"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Resumen
                </p>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <span className="text-white/60">{item.qty}x {item.name}</span>
                    <span className="text-white/80">{formatCLP(item.price * item.qty)}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-white/10 flex justify-between">
                  <span className="text-white/50 text-sm" style={{ fontFamily: "var(--font-inter)" }}>Total</span>
                  <span className="font-heading text-xl text-accent">{formatCLP(total)}</span>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-white/10 shrink-0">
              <button
                onClick={handleSend}
                disabled={!checkoutValid}
                className="w-full inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed text-pure-white font-bold text-base px-6 py-4 rounded-2xl transition-all duration-200 animate-glow"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <MessageCircle size={20} />
                Enviar Pedido por WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
