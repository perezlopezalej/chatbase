import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Bot, Plus } from "lucide-react"
import Link from "next/link"

const prisma = new PrismaClient()

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")

  const bots = await prisma.bot.findMany({
    where: { userId: session.user?.id as string },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="px-8 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Mis chatbots</h1>
          <p className="text-white/50 text-sm mt-1">Gestiona y crea tus asistentes</p>
        </div>
        <Link href="/dashboard/bots/new">
          <Button className="bg-violet-600 hover:bg-violet-500 !text-white gap-2">
            <Plus className="w-4 h-4" />
            Nuevo chatbot
          </Button>
        </Link>
      </div>

      {/* Bots grid o empty state */}
      {bots.length === 0 ? (
        <div className="border border-white/10 border-dashed rounded-xl p-16 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Bot className="w-6 h-6 text-violet-400" />
          </div>
          <h3 className="font-semibold text-lg">Todavía no tienes chatbots</h3>
          <p className="text-white/50 text-sm max-w-sm">
            Crea tu primer asistente personalizado y añádelo a tu web en minutos.
          </p>
          <Link href="/dashboard/bots/new">
            <Button className="bg-violet-600 hover:bg-violet-500 !text-white mt-2 gap-2">
              <Plus className="w-4 h-4" />
              Crear mi primer chatbot
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bots.map((bot) => (
            <Link href={`/dashboard/bots/${bot.id}`} key={bot.id}>
              <div className="border border-white/10 bg-white/5 rounded-xl p-6 flex flex-col gap-3 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-semibold">{bot.name}</h3>
                  <p className="text-white/50 text-sm mt-1 line-clamp-2">{bot.description || "Sin descripción"}</p>
                </div>
                <p className="text-white/30 text-xs mt-auto">
                  Creado {new Date(bot.createdAt).toLocaleDateString("es-ES")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}