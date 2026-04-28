import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { Bot, Code } from "lucide-react"
import ChatPreview from "./chat-preview"
import CopyButton from "./copy-button"

const prisma = new PrismaClient()

export default async function BotPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) redirect("/login")

  const { id } = await params

  const bot = await prisma.bot.findFirst({
    where: { id, userId: session.user?.id as string },
  })

  if (!bot) notFound()

  const widgetCode = `<script src="https://chatbase.vercel.app/widget.js" data-bot-id="${bot.id}"></script>`

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Bot className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{bot.name}</h1>
            <p className="text-white/50 text-sm mt-0.5">{bot.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Chat preview */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Preview del chat</h2>
          <ChatPreview botId={bot.id} botName={bot.name} />
        </div>

        {/* Widget code */}
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Instalar en tu web</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 text-violet-400" />
              <p className="text-sm text-white/70">Copia este código y pégalo en tu web antes del cierre de la etiqueta <code className="text-violet-400">&lt;/body&gt;</code></p>
            </div>
            <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-violet-300 break-all">
              {widgetCode}
            </div>
            <CopyButton code={widgetCode} />
          </div>
        </div>

      </div>
    </div>
  )
}