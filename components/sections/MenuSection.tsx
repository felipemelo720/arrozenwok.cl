import { UtensilsCrossed } from "@/components/Icons"
import RevealWrapper from "@/components/RevealWrapper"
import { MenuCard } from "./MenuCard"
import { riceBox, chaumin } from "@/lib/menu-data"
import { supabaseServer } from "@/lib/supabase-server"

async function getUnavailableItems(): Promise<string[]> {
  const { data } = await supabaseServer
    .from("store_status")
    .select("unavailable_items")
    .eq("id", 1)
    .single()
  return (data as { unavailable_items?: string[] } | null)?.unavailable_items ?? []
}

export default async function MenuSection() {
  const unavailableItems = await getUnavailableItems()

  return (
    <section id="menu" className="bg-bg py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <RevealWrapper className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-5">
            <UtensilsCrossed size={14} />
            MENÚ COMPLETO
          </div>
          <h2 className="font-heading text-white" style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}>
            ELIGE TU BOX
          </h2>
          <p className="text-white/45 mt-2 text-base max-w-md mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
            Cada box preparado al momento en el wok. Sin recalentar, sin congelar.
          </p>
        </RevealWrapper>

        <div className="mb-14">
          <RevealWrapper>
            <h3 className="font-heading text-3xl text-white/60 mb-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/10" />
              RICE & CHIP BOX
              <span className="h-px flex-1 bg-white/10" />
            </h3>
          </RevealWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {riceBox.map((item, i) => (
              <MenuCard
                key={item.name}
                item={item}
                delay={(Math.min(i, 5)) as 0 | 1 | 2 | 3 | 4 | 5}
                unavailable={unavailableItems.includes(item.name)}
              />
            ))}
          </div>
        </div>

        <div>
          <RevealWrapper>
            <h3 className="font-heading text-3xl text-white/60 mb-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/10" />
              CHAUMIN BOX
              <span className="h-px flex-1 bg-white/10" />
            </h3>
          </RevealWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {chaumin.map((item, i) => (
              <MenuCard
                key={item.name}
                item={item}
                delay={(Math.min(i, 5)) as 0 | 1 | 2 | 3 | 4 | 5}
                unavailable={unavailableItems.includes(item.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
