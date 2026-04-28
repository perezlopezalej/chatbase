"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Settings } from "lucide-react"

export default function SidebarNav() {
  const pathname = usePathname()

  const links = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Mis chatbots" },
    { href: "/dashboard/settings", icon: Settings, label: "Configuración" },
  ]

  return (
    <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
      {links.map(({ href, icon: Icon, label }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
              active
                ? "bg-violet-500/10 border-violet-500/20 text-white"
                : "text-white/60 hover:text-white hover:bg-violet-500/10 hover:border-violet-500/20 border-transparent"
            }`}
          >
            <Icon className={`w-4 h-4 ${active ? "text-violet-400" : ""}`} />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}