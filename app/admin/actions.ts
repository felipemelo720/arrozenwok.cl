"use server"

import { cookies } from "next/headers"
import { supabaseServer } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

const COOKIE = "admin_session"

export async function login(formData: FormData) {
  const password = formData.get("password") as string
  if (password === process.env.ADMIN_PASSWORD) {
    const jar = await cookies()
    jar.set(COOKIE, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
      path: "/",
    })
  }
}

export async function logout() {
  const jar = await cookies()
  jar.delete(COOKIE)
}

export async function trackEventServer(type: string, metadata: Record<string, unknown> = {}) {
  try {
    await supabaseServer.from("events").insert({ type, metadata })
  } catch { /* silent */ }
}

export async function toggleStore(isOpen: boolean) {
  await supabaseServer
    .from("store_status")
    .upsert({ id: 1, is_open: isOpen, updated_at: new Date().toISOString() })

  revalidatePath("/admin")
  revalidatePath("/")
}

export async function toggleDelivery(enabled: boolean) {
  await supabaseServer
    .from("store_status")
    .upsert({ id: 1, delivery_enabled: enabled, updated_at: new Date().toISOString() })
  revalidatePath("/admin")
  revalidatePath("/")
}

export async function setItemAvailability(itemName: string, available: boolean) {
  const sel = await supabaseServer
    .from("store_status")
    .select("unavailable_items")
    .eq("id", 1)
    .single()

  if (sel.error) {
    console.error("[setItemAvailability] select failed:", sel.error)
    throw new Error(`No se pudo leer disponibilidad: ${sel.error.message}`)
  }

  const current: string[] = (sel.data as { unavailable_items?: string[] } | null)?.unavailable_items ?? []
  const updated = available
    ? current.filter((n) => n !== itemName)
    : [...new Set([...current, itemName])]

  const up = await supabaseServer
    .from("store_status")
    .upsert({ id: 1, unavailable_items: updated, updated_at: new Date().toISOString() })

  if (up.error) {
    console.error("[setItemAvailability] upsert failed:", up.error)
    throw new Error(`No se pudo guardar disponibilidad: ${up.error.message}`)
  }

  revalidatePath("/admin")
  revalidatePath("/")
}

export async function getAdminData() {
  const { data } = await supabaseServer
    .from("store_status")
    .select("is_open, delivery_enabled, unavailable_items")
    .eq("id", 1)
    .single()

  return {
    isOpen: data?.is_open ?? false,
    deliveryEnabled: (data as { delivery_enabled?: boolean } | null)?.delivery_enabled ?? true,
    unavailableItems: (data as { unavailable_items?: string[] } | null)?.unavailable_items ?? [],
  }
}

export type DayStat = {
  label: string
  page_visit: number
  order_sent: number
  cart_abandoned: number
}

export type StatsData = {
  days: DayStat[]
  totals: {
    page_visit: number
    order_sent: number
    cart_abandoned: number
  }
}

export async function getStats(): Promise<StatsData> {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const { data: events } = await supabaseServer
    .from("events")
    .select("type, created_at")
    .gte("created_at", since)

  const days: DayStat[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000)
    return {
      label: d.toLocaleDateString("es-CL", { weekday: "short", day: "numeric" }),
      page_visit: 0,
      order_sent: 0,
      cart_abandoned: 0,
    }
  })

  const CHART_TYPES = ["page_visit", "order_sent", "cart_abandoned"] as const

  for (const ev of events ?? []) {
    const age = Math.floor((Date.now() - new Date(ev.created_at).getTime()) / (24 * 60 * 60 * 1000))
    const idx = 6 - age
    if (idx >= 0 && idx < 7 && CHART_TYPES.includes(ev.type as (typeof CHART_TYPES)[number])) {
      days[idx][ev.type as (typeof CHART_TYPES)[number]]++
    }
  }

  const count = (type: string) => events?.filter((e) => e.type === type).length ?? 0

  return {
    days,
    totals: {
      page_visit: count("page_visit"),
      order_sent: count("order_sent"),
      cart_abandoned: count("cart_abandoned"),
    },
  }
}
