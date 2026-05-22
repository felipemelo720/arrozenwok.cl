import { Plus } from "@/components/Icons"
import RevealWrapper from "@/components/RevealWrapper"
import { extras } from "@/lib/menu-data"
import { supabaseServer } from "@/lib/supabase-server"
import ExtraCard from "./ExtraCard"

async function getUnavailableItems(): Promise<string[]> {
  const { data } = await supabaseServer
    .from("store_status")
    .select("unavailable_items")
    .eq("id", 1)
    .single()
  return (data as { unavailable_items?: string[] } | null)?.unavailable_items ?? []
}

export default async function ExtrasSection() {
  const unavailableItems = await getUnavailableItems()

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
              <ExtraCard item={item} unavailable={unavailableItems.includes(item.name)} />
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
