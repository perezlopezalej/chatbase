"use client"
import { useState } from "react"
import { Menu, X, LogOut } from "lucide-react"
import Link from "next/link"
import SidebarNav from "./sidebar-nav"

interface Props {
  userInitial: string
  userName: string
  userEmail: string
}

export default function MobileSidebar({ userInitial, userName, userEmail }: Props) {
  const [open, setOpen] = useState(false)

  async function handleSignOut() {
    // Llamar al endpoint de signout de NextAuth v5
    await fetch("/api/auth/signout", { method: "POST" })
    window.location.href = "/"
  }

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
          ChatBase
        </Link>
        <button onClick={() => setOpen(true)} className="text-white/60 hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-50" onClick={() => setOpen(false)} />
      )}

      <div className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-[#0a0a0a] border-r border-white/10 z-50 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-violet-800/20 via-violet-900/5 to-transparent pointer-events-none z-0" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              ChatBase
            </Link>
            <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div onClick={() => setOpen(false)}>
            <SidebarNav />
          </div>
          <div className="border-t border-white/10 p-4 mt-auto">
            <div className="flex items-center gap-3 p-2 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-400 shrink-0">
                {userInitial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userName}</p>
                <p className="text-xs text-white/40 truncate">{userEmail}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="text-white/40 hover:text-red-400 transition-colors p-1 rounded"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
