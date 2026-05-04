"use client"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function LandingMobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Botón hamburguesa — solo móvil */}
      <button
        className="md:hidden text-white/60 hover:text-white transition-colors"
        onClick={() => setOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col md:hidden transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="font-bold text-lg bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">ChatBase</span>
          <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex flex-col p-4 gap-1">
          {[
            { label: "Inicio", href: "#inicio" },
            { label: "Cómo funciona", href: "#como-funciona" },
            { label: "Features", href: "#features" },
            { label: "Precios", href: "#precios" },
            { label: "FAQ", href: "#faq" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-all text-sm font-medium"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
