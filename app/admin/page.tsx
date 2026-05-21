import { cookies } from "next/headers"
import Link from "next/link"
import { login, logout, toggleStore, toggleDelivery, getAdminData, getStats, setItemAvailability } from "./actions"
import StatsChart from "./StatsChart"
import { riceBox, chaumin } from "@/lib/menu-data"

export default async function AdminPage() {
  const jar = await cookies()
  const isAuth = jar.get("admin_session")?.value === "authenticated"

  if (!isAuth) {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-surface border border-white/10 rounded-2xl p-8">
          <h1 className="font-heading text-4xl text-white mb-2">ADMIN</h1>
          <p className="text-white/40 text-sm mb-8" style={{ fontFamily: "var(--font-inter)" }}>
            Arroz en Wok — Panel de control
          </p>
          <form action={login} className="space-y-4">
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              required
              className="w-full bg-card border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            />
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-pure-white font-bold py-3 rounded-xl transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
    )
  }

  const [{ isOpen, deliveryEnabled, unavailableItems }, stats] = await Promise.all([
    getAdminData(),
    getStats(),
  ])

  return (
    <main className="min-h-screen bg-bg px-4 py-12">
      <div className="max-w-lg mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-4xl text-white">ADMIN</h1>
            <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
              Arroz en Wok
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-white/40 hover:text-white text-xs sm:text-sm border border-white/10 hover:border-white/30 px-3 sm:px-4 py-2 rounded-full transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              ← Home
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="text-white/40 hover:text-white text-xs sm:text-sm border border-white/10 hover:border-white/30 px-3 sm:px-4 py-2 rounded-full transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Salir
              </button>
            </form>
          </div>
        </div>

        {/* Store status */}
        <div className="bg-surface border border-white/10 rounded-2xl p-6 space-y-4">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-inter)" }}>
              Estado del negocio
            </p>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${isOpen ? "bg-green-400" : "bg-red-500"}`} />
              <span className="font-heading text-2xl text-white">
                {isOpen ? "ABIERTO" : "CERRADO"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <form action={toggleStore.bind(null, true)}>
              <button
                type="submit"
                disabled={isOpen}
                className="w-full h-full bg-green-500/20 hover:bg-green-500/30 disabled:opacity-40 disabled:cursor-not-allowed border border-green-500/40 text-green-400 font-bold py-3 rounded-xl transition-colors text-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Abrir negocio
              </button>
            </form>

            <form action={toggleStore.bind(null, false)}>
              <button
                type="submit"
                disabled={!isOpen}
                className="w-full h-full bg-red-500/20 hover:bg-red-500/30 disabled:opacity-40 disabled:cursor-not-allowed border border-red-500/40 text-red-400 font-bold py-3 rounded-xl transition-colors text-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Cerrar negocio
              </button>
            </form>
          </div>
        </div>

        {/* Delivery toggle */}
        <div className="bg-surface border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                Delivery
              </p>
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${deliveryEnabled ? "bg-green-400" : "bg-red-500"}`} />
                <span className="font-heading text-xl text-white">
                  {deliveryEnabled ? "DISPONIBLE" : "NO DISPONIBLE"}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <form action={toggleDelivery.bind(null, true)}>
              <button
                type="submit"
                disabled={deliveryEnabled}
                className="w-full bg-green-500/20 hover:bg-green-500/30 disabled:opacity-40 disabled:cursor-not-allowed border border-green-500/40 text-green-400 font-bold py-3 rounded-xl transition-colors text-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Activar delivery
              </button>
            </form>
            <form action={toggleDelivery.bind(null, false)}>
              <button
                type="submit"
                disabled={!deliveryEnabled}
                className="w-full bg-red-500/20 hover:bg-red-500/30 disabled:opacity-40 disabled:cursor-not-allowed border border-red-500/40 text-red-400 font-bold py-3 rounded-xl transition-colors text-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Desactivar delivery
              </button>
            </form>
          </div>
        </div>

        {/* Menu availability */}
        <div className="bg-surface border border-white/10 rounded-2xl p-6 space-y-4">
          <p className="text-white/40 text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-inter)" }}>
            Disponibilidad del menú
          </p>

          {[
            { label: "Rice & Chip Box", items: riceBox },
            { label: "Chaumin Box",     items: chaumin },
          ].map(({ label, items }) => (
            <div key={label} className="space-y-2">
              <p className="text-white/25 text-[10px] uppercase tracking-widest" style={{ fontFamily: "var(--font-inter)" }}>
                {label}
              </p>
              <div className="space-y-1.5">
                {items.map((item) => {
                  const isUnavailable = unavailableItems.includes(item.name)
                  return (
                    <form
                      key={item.name}
                      action={setItemAvailability.bind(null, item.name, isUnavailable)}
                      className="flex items-center justify-between gap-3 py-2 px-3 rounded-xl bg-card border border-white/5"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${isUnavailable ? "bg-red-500" : "bg-green-400"}`} />
                        <span className="text-white/70 text-sm truncate" style={{ fontFamily: "var(--font-inter)" }}>
                          {item.name}
                        </span>
                      </div>
                      <button
                        type="submit"
                        className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                          isUnavailable
                            ? "bg-green-500/10 hover:bg-green-500/20 border-green-500/30 text-green-400"
                            : "bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-400"
                        }`}
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {isUnavailable ? "Activar" : "Agotar"}
                      </button>
                    </form>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-surface border border-white/10 rounded-2xl p-6 space-y-6">
          <p className="text-white/40 text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-inter)" }}>
            Estadísticas — últimos 7 días
          </p>

          {/* Counter cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Visitas",     value: stats.totals.page_visit,     color: "text-blue-400" },
              { label: "Pedidos web", value: stats.totals.order_sent,     color: "text-primary" },
              { label: "Abandonos",   value: stats.totals.cart_abandoned, color: "text-orange-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-card border border-white/8 rounded-xl p-3 text-center">
                <p className={`font-heading text-3xl ${color}`}>{value}</p>
                <p className="text-white/40 text-[10px] mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <StatsChart days={stats.days} />
        </div>

      </div>
    </main>
  )
}
