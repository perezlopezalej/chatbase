"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Settings, MessageSquare, Users, BookOpen } from "lucide-react"
import { useEffect, useState } from "react"

export default function SidebarNav() {
  const pathname = usePathname()
  const [firstBotId, setFirstBotId] = useState<string | null>(null)

  // Obtener el primer bot para los links dinámicos
  useEffect(() => {
    fetch("/api/bots")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setFirstBotId(data[0].id)
        }
      })
      .catch(() => {})
  }, [])

  const staticLinks = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Mis chatbots" },
    { href: "/dashboard/settings", icon: Settings, label: "Configuración" },
  ]

  const dynamicLinks = firstBotId ? [
    { href: `/dashboard/bots/${firstBotId}/conversations`, icon: MessageSquare, label: "Conversaciones" },
    { href: `/dashboard/bots/${firstBotId}/leads`, icon: Users, label: "Leads" },
    { href: `/dashboard/bots/${firstBotId}/knowledge`, icon: BookOpen, label: "Conocimiento" },
  ] : []

  const allLinks = [...staticLinks, ...dynamicLinks]

  return (
    <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
      {staticLinks.map(({ href, icon: Icon, label }) => {
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
            <Icon className={`w-4 h-4 shrink-0 ${active ? "text-violet-400" : ""}`} />
            {label}
          </Link>
        )
      })}

      {dynamicLinks.length > 0 && (
        <>
          <div className="h-px bg-white/10 my-2" />
          <p className="text-white/20 text-xs font-medium px-3 py-1 uppercase tracking-wider">Bot activo</p>
          {dynamicLinks.map(({ href, icon: Icon, label }) => {
            const active = pathname.startsWith(href)
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
                <Icon className={`w-4 h-4 shrink-0 ${active ? "text-violet-400" : ""}`} />
                {label}
              </Link>
            )
          })}
        </>
      )}
    </nav>
  )
}
