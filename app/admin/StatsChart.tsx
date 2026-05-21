import type { DayStat } from "./actions"

const SERIES = [
  { key: "page_visit",     label: "Visitas",              color: "bg-blue-400" },
  { key: "order_sent",     label: "Pedidos",              color: "bg-green-400" },
  { key: "cart_abandoned", label: "Carritos abandonados", color: "bg-orange-400" },
] as const

const CHART_H = 128

export default function StatsChart({ days }: { days: DayStat[] }) {
  const max = Math.max(
    1,
    ...days.flatMap((d) => SERIES.map((s) => d[s.key]))
  )

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-sm ${s.color}`} />
            <span className="text-white/50 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Bars */}
      <div className="flex items-end gap-2" style={{ height: CHART_H }}>
        {days.map((day) => (
          <div key={day.label} className="flex-1 flex flex-col items-stretch gap-1 h-full">
            <div className="flex-1 flex items-end justify-center gap-0.5 min-h-0">
              {SERIES.map((s) => {
                const v = day[s.key]
                const h = Math.max(v > 0 ? 2 : 0, Math.round((v / max) * CHART_H))
                return (
                  <div
                    key={s.key}
                    className={`flex-1 rounded-sm ${s.color} opacity-80`}
                    style={{ height: `${h}px` }}
                    title={`${s.label}: ${v}`}
                  />
                )
              })}
            </div>
            <span className="text-white/30 text-[10px] text-center leading-tight" style={{ fontFamily: "var(--font-inter)" }}>
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
