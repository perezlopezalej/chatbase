import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) redirect("/login")

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-xl bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
          ChatBase
        </span>
        <div className="flex items-center gap-4">
          <span className="text-white/50 text-sm">{session.user?.email}</span>
          <form action={async () => {
            "use server"
            const { signOut } = await import("@/auth")
            await signOut({ redirectTo: "/" })
          }}>
            <Button variant="ghost" type="submit" className="!text-white/70 hover:!text-white">
              Cerrar sesión
            </Button>
          </form>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Mis chatbots</h1>
            <p className="text-white/50 mt-1">Gestiona y crea tus asistentes</p>
          </div>
          <Button className="bg-violet-600 hover:bg-violet-500 !text-white">
            + Nuevo chatbot
          </Button>
        </div>

        {/* Empty state */}
        <div className="border border-white/10 border-dashed rounded-xl p-16 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-2xl">
            🤖
          </div>
          <h3 className="font-semibold text-lg">Todavía no tienes chatbots</h3>
          <p className="text-white/50 text-sm max-w-sm">
            Crea tu primer asistente personalizado y añádelo a tu web en minutos.
          </p>
          <Button className="bg-violet-600 hover:bg-violet-500 !text-white mt-2">
            Crear mi primer chatbot
          </Button>
        </div>
      </div>
    </main>
  )
}