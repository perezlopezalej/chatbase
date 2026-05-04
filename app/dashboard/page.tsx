import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Bot, Plus, MessageSquare, Calendar, Zap, Code, ArrowRight, BookOpen, Globe, CheckCircle, TrendingUp } from "lucide-react"
import Link from "next/link"
import ConversationsChart from "./conversations-chart"

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ upgraded?: string }>
}) {
  const session = await auth()
  if (!session) redirect("/login")

  const { upgraded } = await searchParams

  const bots = await prisma.bot.findMany({
    where: { userId: session.user?.id as string },
    orderBy: { createdAt: "desc" },
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const conversationsToday = await prisma.conversation.count({
    where: {
      bot: { userId: session.user?.id as string },
      createdAt: { gte: today },
    },
  })

  const isNewUser = bots.length === 0
  const firstBotId = bots[0]?.id

  // Datos del gráfico — últimos 7 días
  const chartData = await Promise.all(
    Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      date.setHours(0, 0, 0, 0)
      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)

      return prisma.conversation.count({
        where: {
          bot: { userId: session.user?.id as string },
          createdAt: { gte: date, lt: nextDate },
        },
      }).then(count => ({
        date: date.toLocaleDateString("es-ES", { day: "numeric", month: "short" }),
        conversations: count,
      }))
    })
  )

  const totalThisWeek = chartData.reduce((acc, d) => acc + d.conversations, 0)

  return (
    <div className="px-4 md:px-8 py-6 md:py-8">

      {upgraded === "true" && (
        <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-green-300">¡Bienvenido a ChatBase Pro! 🎉</p>
            <p className="text-xs text-white/50 mt-0.5">Tu plan ha sido activado. Ya tienes acceso a todas las funcionalidades.</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-start justify-between gap-3 mb-8 pb-6 border-b border-white/10">
        <div className="flex flex-col justify-center">
          <h1 className="text-xl md:text-2xl font-bold">
            {isNewUser ? `¡Bienvenido a ChatBase! 👋` : "Mis chatbots"}
          </h1>
          <p className="text-white/50 text-sm mt-1">
            {isNewUser ? "Vamos a crear tu primer chatbot en 3 pasos" : "Gestiona y crea tus asistentes inteligentes"}
          </p>
        </div>
        {!isNewUser && (
          <Link href="/dashboard/bots/new">
            <Button className="bg-violet-600 hover:bg-violet-500 !text-white gap-2">
              <Plus className="w-4 h-4" />
              Nuevo chatbot
            </Button>
          </Link>
        )}
      </div>

      {isNewUser ? (
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
          <div className="flex flex-col gap-4">
            {[
              { step: "1", title: "Crea tu chatbot", desc: "Dale un nombre, descripción e instrucciones. Tu bot estará listo en segundos.", icon: Bot, cta: "Crear chatbot", href: "/dashboard/bots/new", active: true },
              { step: "2", title: "Añade base de conocimiento", desc: "Sube la información de tu negocio — horarios, servicios, precios. El bot la usará para responder.", icon: BookOpen, cta: null, href: null, active: false },
              { step: "3", title: "Instala el widget en tu web", desc: "Copia una línea de código y pégala en tu web. Compatible con cualquier plataforma.", icon: Globe, cta: null, href: null, active: false },
            ].map(({ step, title, desc, icon: Icon, active, cta, href }) => (
              <div key={step} className={`flex gap-4 p-4 md:p-5 rounded-xl border transition-all ${active ? "bg-violet-500/10 border-violet-500/30" : "bg-white/5 border-white/10 opacity-50"}`}>
                <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold border ${active ? "bg-violet-600 border-violet-500 text-white" : "bg-white/10 border-white/20 text-white/50"}`}>
                  {step}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm">{title}</p>
                      <p className="text-white/50 text-xs mt-1 leading-relaxed">{desc}</p>
                    </div>
                    {cta && href && (
                      <Link href={href} className="shrink-0">
                        <Button size="sm" className="bg-violet-600 hover:bg-violet-500 !text-white gap-1.5">
                          {cta} <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-5 md:p-6 flex flex-col gap-3">
            <p className="text-sm font-semibold text-violet-300">¿Para qué sirve ChatBase?</p>
            <p className="text-white/50 text-sm leading-relaxed">ChatBase te permite crear un asistente virtual con IA para tu negocio. Tus clientes pueden preguntar sobre horarios, servicios, precios y más — 24/7, sin que tengas que estar pendiente.</p>
            <div className="grid grid-cols-3 gap-2 md:gap-3 mt-2">
              {[
                { icon: MessageSquare, text: "Responde preguntas automáticamente" },
                { icon: Zap, text: "Listo en minutos, sin código" },
                { icon: Globe, text: "Funciona en cualquier web" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-2 text-center p-2 md:p-3 bg-white/5 rounded-lg">
                  <Icon className="w-5 h-5 text-violet-400" />
                  <p className="text-white/50 text-xs leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
            {[
              { label: "Chatbots creados", value: bots.length, icon: Bot, highlight: true },
              { label: "Conversaciones hoy", value: conversationsToday, icon: MessageSquare, highlight: false },
              { label: "Último creado", value: bots[0] ? new Date(bots[0].createdAt).toLocaleDateString("es-ES", { day: "numeric", month: "short" }) : "—", icon: Calendar, highlight: false },
            ].map(({ label, value, icon: Icon, highlight }) => (
              <div key={label} className={`rounded-xl p-4 md:p-5 flex items-center gap-4 border ${highlight ? "bg-violet-500/10 border-violet-500/40" : "bg-white/5 border-white/20"}`}>
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

          {/* Gráfico */}
          <div className="border border-white/10 rounded-xl p-4 md:p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-violet-400" />
                <h2 className="font-semibold">Conversaciones — últimos 7 días</h2>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-violet-400">{totalThisWeek}</p>
                <p className="text-white/30 text-xs">esta semana</p>
              </div>
            </div>
            <ConversationsChart data={chartData} />
          </div>

          {/* Bots grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
            {bots.map((bot) => (
              <Link href={`/dashboard/bots/${bot.id}`} key={bot.id}>
                <div className="group relative border border-white/10 bg-gradient-to-br from-white/5 to-violet-500/5 rounded-xl p-5 md:p-6 flex flex-col gap-4 hover:border-violet-500/40 transition-all cursor-pointer overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between relative">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:border-violet-500/40 transition-all">
                      <Bot className="w-5 h-5 text-violet-400" />
                    </div>
                    <span className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">Activo</span>
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
          <div className="border border-white/10 rounded-xl p-4 md:p-6">
            <h2 className="font-semibold mb-4">Acciones rápidas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: Plus, title: "Crear nuevo chatbot", desc: "Añade un nuevo asistente a tu cuenta", href: "/dashboard/bots/new" },
                ...(firstBotId ? [
                  { icon: Zap, title: "Probar el chat", desc: "Abre el preview y prueba las respuestas", href: `/dashboard/bots/${firstBotId}` },
                  { icon: Code, title: "Instalar en tu web", desc: "Copia el widget y publícalo", href: `/dashboard/bots/${firstBotId}` },
                ] : []),
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
