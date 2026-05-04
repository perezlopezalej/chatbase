import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ArrowLeft, MessageSquare, User, Bot, Lock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function ConversationsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) redirect("/login")

  const { id } = await params

  const bot = await prisma.bot.findFirst({
    where: { id, userId: session.user?.id as string },
  })

  if (!bot) notFound()

  const user = await prisma.user.findUnique({
    where: { id: session.user?.id as string },
    select: { plan: true },
  })

  const isPro = user?.plan === "pro"

  const dateFilter = isPro ? {} : {
    createdAt: {
      gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  }

  const conversations = await prisma.conversation.findMany({
    where: { botId: id, ...dateFilter },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="px-4 md:px-8 py-6 md:py-8">

      {/* Breadcrumb */}
      <Link href={`/dashboard/bots/${id}`} className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-6 md:mb-8 transition-colors w-fit">
        <ArrowLeft className="w-3.5 h-3.5" />
        Volver al bot
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-8 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-violet-400" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Historial</h1>
            <p className="text-white/50 text-sm mt-0.5">
              {bot.name} — {conversations.length} conversaciones
              {!isPro && <span className="ml-2 text-white/30">(últimos 7 días)</span>}
            </p>
          </div>
        </div>
        {!isPro && (
          <div className="flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-lg px-3 py-2">
            <Lock className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs text-violet-300">Historial completo en Pro</span>
          </div>
        )}
      </div>

      {/* Banner upgrade para free */}
      {!isPro && (
        <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-violet-400 shrink-0" />
            <p className="text-sm text-white/60">Estás viendo solo los últimos 7 días. Actualiza a Pro para acceder al historial completo.</p>
          </div>
          <Button size="sm" className="bg-violet-600 hover:bg-violet-500 !text-white shrink-0">
            Ver Pro
          </Button>
        </div>
      )}

      {/* Lista */}
      {conversations.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-10 md:p-12 text-center">
          <MessageSquare className="w-10 h-10 text-white/20 mx-auto mb-4" />
          <p className="text-white/40">Todavía no hay conversaciones</p>
          <p className="text-white/25 text-sm mt-1">Las conversaciones aparecerán aquí cuando alguien use el chat</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {conversations.map((conv) => {
            const firstUserMsg = conv.messages.find(m => m.role === "user")
            const msgCount = conv.messages.length

            return (
              <div key={conv.id} className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{msgCount} mensajes</span>
                    <span>·</span>
                    <span>{new Date(conv.createdAt).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </div>

                {firstUserMsg && (
                  <p className="text-white/60 text-sm italic">"{firstUserMsg.content}"</p>
                )}

                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                  {conv.messages.map((msg) => (
                    <div key={msg.id} className={`flex items-start gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role === "assistant" && (
                        <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-3 h-3 text-violet-400" />
                        </div>
                      )}
                      <div className={`px-3 py-2 rounded-lg text-xs max-w-[85%] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-violet-600/20 border border-violet-500/20 text-white/80"
                          : "bg-white/8 text-white/70"
                      }`}>
                        {msg.content}
                      </div>
                      {msg.role === "user" && (
                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <User className="w-3 h-3 text-white/50" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
