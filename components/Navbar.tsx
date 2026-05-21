"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import StoreStatusBar from "@/components/StoreStatusBar"

const NAV_LINKS = [
  { label: "Menú",       href: "#menu" },
  { label: "Extras",     href: "#extras" },
  { label: "Cómo pedir", href: "#como-pedir" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      if (window.scrollY > 60) setMenuOpen(false)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function handleNavClick(href: string) {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}>
          <Image
            src="/logoarrrozenwok.jpg"
            alt="Arroz en Wok"
            width={44}
            height={44}
            className="rounded-full object-cover"
            priority
          />
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNavClick(l.href)}
              className="text-white/60 hover:text-white text-sm transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <StoreStatusBar />
          {/* Desktop only CTA */}
          <button
            data-theme="dark"
            onClick={() => handleNavClick("#menu")}
            className="hidden md:block bg-primary hover:bg-primary-dark text-pure-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors duration-200"
          >
            Pedir Ahora →
          </button>
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-[5px]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menú"
          >
            <span className={`block w-5 h-0.5 bg-white origin-center transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white origin-center transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${menuOpen ? "max-h-64" : "max-h-0"}`}>
        <div className="border-t border-white/10 px-4 py-2">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNavClick(l.href)}
              className="w-full text-left text-white text-base py-3.5 border-b border-white/8 last:border-0 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {l.label}
            </button>
          ))}
          <button
            data-theme="dark"
            onClick={() => handleNavClick("#menu")}
            className="w-full mt-3 mb-1 bg-primary hover:bg-primary-dark text-pure-white font-bold text-sm py-3.5 rounded-xl transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Pedir Ahora →
          </button>
        </div>
      </div>
    </nav>
  )
}
