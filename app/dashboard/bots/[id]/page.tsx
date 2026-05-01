import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Bot, ArrowLeft, Pencil, BookOpen, MessageSquare, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import ChatPreview from "./chat-preview"
import CopyButton from "./copy-button"
import Link from "next/link"

export default async function BotPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) redirect("/login")

  const { id } = await params

  const bot = await prisma.bot.findFirst({
    where: { id, userId: session.user?.id as string },
  })

  if (!bot) notFound()

  const widgetCode = `<script src="https://chatbase-theta.vercel.app/widget.js" data-bot-id="${bot.id}"></script>`

  const conversationCount = await prisma.conversation.count({
    where: { botId: bot.id },
  })

  const messageCount = await prisma.message.count({
    where: { conversation: { botId: bot.id } },
  })

  const leadCount = await prisma.lead.count({
    where: { botId: bot.id },
  })

  return (
    <div className="px-8 py-8">

      {/* Breadcrumb + Header */}
      <div className="mb-8">
        <Link href="/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-4 transition-colors w-fit">
          <ArrowLeft className="w-3.5 h-3.5" />
          Mis chatbots
        </Link>
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{bot.name}</h1>
                <span className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">Activo</span>
                <Link href={`/dashboard/bots/${bot.id}/edit`}>
                  <Button variant="outline" size="sm" className="border-white/20 !text-white/70 bg-transparent hover:bg-white/10 gap-1.5 text-xs">
                    <Pencil className="w-3 h-3" />
                    Editar
                  </Button>
                </Link>
                <Link href={`/dashboard/bots/${bot.id}/knowledge`}>
                  <Button variant="outline" size="sm" className="border-white/20 !text-white/70 bg-transparent hover:bg-white/10 gap-1.5 text-xs">
                    <BookOpen className="w-3 h-3" />
                    Conocimiento
                  </Button>
                </Link>
                <Link href={`/dashboard/bots/${bot.id}/conversations`}>
                  <Button variant="outline" size="sm" className="border-white/20 !text-white/70 bg-transparent hover:bg-white/10 gap-1.5 text-xs">
                    <MessageSquare className="w-3 h-3" />
                    Conversaciones
                  </Button>
                </Link>
                <Link href={`/dashboard/bots/${bot.id}/leads`}>
                  <Button variant="outline" size="sm" className="border-white/20 !text-white/70 bg-transparent hover:bg-white/10 gap-1.5 text-xs">
                    <Users className="w-3 h-3" />
                    Leads
                  </Button>
                </Link>
              </div>
              <p className="text-white/50 text-sm mt-0.5">{bot.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Conversaciones totales", value: conversationCount.toString() },
          { label: "Mensajes enviados", value: messageCount.toString() },
          { label: "Leads capturados", value: leadCount.toString() },
          { label: "Creado el", value: new Date(bot.createdAt).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" }) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-xl font-bold text-white">{value}</p>
            <p className="text-white/40 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Chat preview */}
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="font-semibold text-lg">Preview del chat</h2>
            <p className="text-white/40 text-sm mt-0.5">Prueba cómo responde tu asistente</p>
          </div>
          <ChatPreview botId={bot.id} botName={bot.name} />
        </div>

        {/* Instalación */}
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="font-semibold text-lg">Instalar en tu web</h2>
            <p className="text-white/40 text-sm mt-0.5">Añade el chat a tu web en minutos</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4">

            {[
              { step: "1", title: "Copia el código", desc: "Haz click en el botón para copiar el script de instalación" },
              { step: "2", title: "Pégalo en tu web", desc: "Añádelo justo antes del cierre de la etiqueta </body> en tu HTML" },
              { step: "3", title: "¡Listo!", desc: "El chat aparecerá automáticamente en la esquina de tu web" },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-400 shrink-0 mt-0.5">
                  {step}
                </div>
                <div>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-white/40 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-2">
              <p className="text-xs text-white/40 font-medium uppercase tracking-wide">Código de instalación</p>
              <div className="bg-black/50 border border-white/10 rounded-lg p-4 font-mono text-xs text-violet-300 break-all">
                {widgetCode}
              </div>
              <CopyButton code={widgetCode} />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs text-white/40 font-medium uppercase tracking-wide">Compatible con</p>
              <div className="flex gap-2 flex-wrap">
                {["HTML", "WordPress", "Shopify", "Webflow", "Wix"].map(p => (
                  <span key={p} className="text-xs text-white/50 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                    {p}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}