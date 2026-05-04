import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { LogOut } from "lucide-react"
import Link from "next/link"
import SidebarNav from "./sidebar-nav"
import MobileSidebar from "./mobile-sidebar"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect("/login")

  const userInitial = (session.user?.name?.[0] || session.user?.email?.[0] || "U").toUpperCase()
  const userName = session.user?.name || "Usuario"
  const userEmail = session.user?.email || ""

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">

      {/* Sidebar desktop */}
      <aside className="w-64 border-r border-white/10 fixed h-full bg-[#0a0a0a] hidden lg:flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-800/20 via-violet-900/5 to-transparent pointer-events-none z-0" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="px-6 py-5 border-b border-white/10">
            <Link href="/" className="font-bold text-lg bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              ChatBase
            </Link>
          </div>
          <SidebarNav />
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all">
              <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-400">
                {userInitial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userName}</p>
                <p className="text-xs text-white/40 truncate">{userEmail}</p>
              </div>
              <form action={async () => {
                "use server"
                const { signOut } = await import("@/auth")
                await signOut({ redirectTo: "/" })
              }}>
                <button type="submit" className="text-white/40 hover:text-red-400 transition-colors p-1 rounded">
                  <LogOut className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar móvil */}
      <MobileSidebar
        userInitial={userInitial}
        userName={userName}
        userEmail={userEmail}
      />

      {/* Main */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  )
}