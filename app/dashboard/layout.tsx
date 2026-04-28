import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Bot, LayoutDashboard, Settings, LogOut } from "lucide-react"
import Link from "next/link"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect("/login")

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col fixed h-full">

        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <Link href="/" className="font-bold text-lg bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            ChatBase
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
            <LayoutDashboard className="w-4 h-4" />
            Mis chatbots
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
            <Settings className="w-4 h-4" />
            Configuración
          </Link>
        </nav>

        {/* User */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-400">
              {session.user?.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{session.user?.name || "Usuario"}</p>
              <p className="text-xs text-white/40 truncate">{session.user?.email}</p>
            </div>
            <form action={async () => {
              "use server"
              const { signOut } = await import("@/auth")
              await signOut({ redirectTo: "/" })
            }}>
              <button type="submit" className="text-white/40 hover:text-white transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64">
        {children}
      </main>

    </div>
  )
}