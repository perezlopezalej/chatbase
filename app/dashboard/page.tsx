import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Bot, Plus, MessageSquare, Calendar, Zap, Code, ArrowRight } from "lucide-react"
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
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold">Mis chatbots</h1>
          <p className="text-white/50 text-sm mt-1">Gestiona y crea tus asistentes inteligentes</p>
        </div>
        <Link href="/dashboard/bots/new" className="mr-1">
          <Button className="bg-violet-600 hover:bg-violet-500 !text-white gap-2">
            <Plus className="w-4 h-4" />
            Nuevo chatbot
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Chatbots creados", value: bots.length, icon: Bot, highlight: true },
          { label: "Conversaciones hoy", value: "—", icon: MessageSquare, highlight: false },
          { label: "Último creado", value: bots[0] ? new Date(bots[0].createdAt).toLocaleDateString("es-ES", { day: "numeric", month: "short" }) : "—", icon: Calendar, highlight: false },
        ].map(({ label, value, icon: Icon, highlight }) => (
          <div key={label} className={`rounded-xl p-5 flex items-center gap-4 border ${highlight ? "bg-violet-500/10 border-violet-500/40" : "bg-white/5 border-white/20"}`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${highlight ? "bg-violet-500/20 border-violet-500/40" : "bg-violet-500/10 border-violet-500/20"}`}>
              <Icon className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-white/50 text-xs mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bots grid o empty state */}
      {bots.length === 0 ? (
        <div className="border border-white/10 border-dashed rounded-xl p-16 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Bot className="w-7 h-7 text-violet-400" />
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {bots.map((bot) => (
              <Link href={`/dashboard/bots/${bot.id}`} key={bot.id}>
                <div className="group relative border border-white/10 bg-gradient-to-br from-white/5 to-violet-500/5 rounded-xl p-6 flex flex-col gap-4 hover:border-violet-500/40 transition-all cursor-pointer overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between relative">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:border-violet-500/40 transition-all">
                      <Bot className="w-5 h-5 text-violet-400" />
                    </div>
                    <span className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">
                      Activo
                    </span>
                  </div>
                  <div className="relative">
                    <h3 className="font-semibold">{bot.name}</h3>
                    <p className="text-white/50 text-sm mt-1 line-clamp-2">{bot.description || "Sin descripción"}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 pb-1 border-t border-white/5 relative">
                    <p className="text-white/30 text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(bot.createdAt).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                    <span className="text-violet-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Ver bot <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Acciones rápidas */}
          <div className="border border-white/10 rounded-xl p-6">
            <h2 className="font-semibold mb-4">Acciones rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { icon: Plus, title: "Crear nuevo chatbot", desc: "Añade un nuevo asistente a tu cuenta", href: "/dashboard/bots/new" },
                { icon: Zap, title: "Probar el chat", desc: "Abre el preview y prueba las respuestas", href: `/dashboard/bots/${bots[0]?.id}` },
                { icon: Code, title: "Instalar en tu web", desc: "Copia el widget y publícalo", href: `/dashboard/bots/${bots[0]?.id}` },
              ].map(({ icon: Icon, title, desc, href }) => (
                <Link href={href} key={title}>
                  <div className="flex items-center gap-3 p-4 rounded-lg border border-white/5 bg-white/3 hover:bg-white/5 hover:border-violet-500/20 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{title}</p>
                      <p className="text-white/40 text-xs mt-0.5">{desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}