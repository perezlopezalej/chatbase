import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Shield, Zap, Bot, MessageSquare, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import UpgradeButton from "./upgrade-button"

export default async function SettingsPage() {
  const session = await auth()
  if (!session) redirect("/login")

  const initial = (session.user?.name?.[0] || session.user?.email?.[0] || "U").toUpperCase()

  const user = await prisma.user.findUnique({
    where: { id: session.user?.id as string },
    select: {
      plan: true,
      _count: { select: { bots: true } },
    },
  })

  const isPro = user?.plan === "pro"
  const botCount = user?._count.bots ?? 0

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const conversationsThisMonth = await prisma.conversation.count({
    where: {
      bot: { userId: session.user?.id as string },
      createdAt: { gte: startOfMonth },
    },
  })

  const totalConversations = await prisma.conversation.count({
    where: { bot: { userId: session.user?.id as string } },
  })

  return (
    <div className="px-4 md:px-8 py-6 md:py-8">

      <div className="mb-8 pb-6 border-b border-white/10">
        <h1 className="text-xl md:text-2xl font-bold">Configuración</h1>
        <p className="text-white/50 text-sm mt-1">Gestiona tu cuenta y preferencias</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Perfil */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-violet-400" />
              <h2 className="font-semibold">Perfil</h2>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xl md:text-2xl font-bold text-violet-400 shrink-0">
                  {initial}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-base md:text-lg truncate">{session.user?.name || "Usuario"}</p>
                  <p className="text-white/50 text-sm truncate">{session.user?.email}</p>
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-white/70">Nombre</Label>
                  <Input defaultValue={session.user?.name || ""} disabled className="bg-white/5 border-white/20 text-white/50 h-12" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-white/70">Email</Label>
                  <Input defaultValue={session.user?.email || ""} disabled className="bg-white/5 border-white/20 text-white/50 h-12" />
                </div>
              </div>
              <p className="text-white/30 text-xs">La edición del perfil estará disponible próximamente.</p>
            </div>
          </div>

          {/* Plan */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-violet-400" />
              <h2 className="font-semibold">Plan actual</h2>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 flex flex-col gap-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-semibold text-base md:text-lg">{isPro ? "Plan Pro" : "Plan Gratis"}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${isPro ? "text-green-400 bg-green-400/10 border-green-400/20" : "text-violet-400 bg-violet-500/10 border-violet-500/20"}`}>
                      Activo
                    </span>
                  </div>
                  <p className="text-white/50 text-sm">
                    {isPro ? "Bots ilimitados · Conversaciones ilimitadas" : "1 chatbot · 100 conversaciones/mes"}
                  </p>
                </div>
                {!isPro && <UpgradeButton />}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>Chatbots usados</span>
                  <span>{botCount} / {isPro ? "∞" : "1"}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${!isPro && botCount >= 1 ? "bg-orange-400 w-full" : "bg-violet-500 w-1/4"}`} />
                </div>
              </div>

              {!isPro && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-white/40">
                    <span>Conversaciones este mes</span>
                    <span>{conversationsThisMonth} / 100</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-500 rounded-full"
                      style={{ width: `${Math.min((conversationsThisMonth / 100) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Seguridad */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-violet-400" />
              <h2 className="font-semibold">Seguridad</h2>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">Contraseña</p>
                  <p className="text-white/40 text-xs mt-0.5">Cambia tu contraseña de acceso</p>
                </div>
                <Button variant="outline" className="border-white/20 !text-white bg-transparent hover:bg-white/10 shrink-0" disabled>Cambiar</Button>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-red-400">Eliminar cuenta</p>
                  <p className="text-white/40 text-xs mt-0.5">Esta acción no se puede deshacer</p>
                </div>
                <Button variant="outline" className="border-red-500/30 !text-red-400 bg-transparent hover:bg-red-500/10 shrink-0" disabled>Eliminar</Button>
              </div>
            </div>
          </div>

        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-6">

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4">
            <h3 className="font-semibold text-sm text-white/70 uppercase tracking-wide">Resumen</h3>
            <div className="flex flex-col gap-3">
              {[
                { icon: Bot, label: "Chatbots creados", value: botCount.toString() },
                { icon: MessageSquare, label: "Conversaciones totales", value: totalConversations.toString() },
                { icon: Zap, label: "Plan", value: isPro ? "Pro" : "Gratis" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-violet-400" />
                    <span className="text-white/50 text-sm">{label}</span>
                  </div>
                  <span className="text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card Pro para usuarios free */}
          {!isPro && (
            <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-violet-400" />
                <h3 className="font-semibold text-sm text-violet-300">Actualiza a Pro</h3>
              </div>
              <div className="flex flex-col gap-2">
                {["Chatbots ilimitados", "Conversaciones ilimitadas", "Base de conocimiento", "Captura de leads", "Personalización del widget"].map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                    <p className="text-white/60 text-xs">{f}</p>
                  </div>
                ))}
              </div>
              <UpgradeButton />
            </div>
          )}

          {/* Banner Pro activo */}
          {isPro && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <h3 className="font-semibold text-sm text-green-300">Plan Pro activo</h3>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">Tienes acceso completo a todas las funcionalidades de ChatBase.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
