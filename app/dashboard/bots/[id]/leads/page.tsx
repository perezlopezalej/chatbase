import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ArrowLeft, Users, Mail, User } from "lucide-react"
import Link from "next/link"

export default async function LeadsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) redirect("/login")

  const { id } = await params

  const bot = await prisma.bot.findFirst({
    where: { id, userId: session.user?.id as string },
  })

  if (!bot) notFound()

  const leads = await prisma.lead.findMany({
    where: { botId: id },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="px-8 py-8">

      <Link href={`/dashboard/bots/${id}`} className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors w-fit">
        <ArrowLeft className="w-3.5 h-3.5" />
        Volver al bot
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Users className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Leads capturados</h1>
            <p className="text-white/50 text-sm mt-0.5">{bot.name} — {leads.length} contactos</p>
          </div>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <Users className="w-10 h-10 text-white/20 mx-auto mb-4" />
          <p className="text-white/40">Todavía no hay leads</p>
          <p className="text-white/25 text-sm mt-1">Activa la captura de leads en la configuración del bot</p>
          <Link href={`/dashboard/bots/${id}/edit`} className="inline-block mt-4 text-violet-400 text-sm hover:text-violet-300 transition-colors">
            Ir a configuración →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">{lead.name || "Sin nombre"}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Mail className="w-3 h-3 text-white/40" />
                    <p className="text-xs text-white/40">{lead.email}</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-white/30 shrink-0">
                {new Date(lead.createdAt).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}