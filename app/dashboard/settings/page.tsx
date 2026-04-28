import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Shield } from "lucide-react"

export default async function SettingsPage() {
  const session = await auth()
  if (!session) redirect("/login")

  return (
    <div className="px-8 py-8 max-w-2xl">

      {/* Header */}
      <div className="mb-8 pb-6 border-b border-white/10">
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-white/50 text-sm mt-1">Gestiona tu cuenta y preferencias</p>
      </div>

      {/* Perfil */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center gap-3">
          <User className="w-4 h-4 text-violet-400" />
          <h2 className="font-semibold">Perfil</h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-2xl font-bold text-violet-400">
              {(session.user?.name?.[0] || session.user?.email?.[0] || "U").toUpperCase()}
            </div>
            <div>
              <p className="font-semibold">{session.user?.name || "Usuario"}</p>
              <p className="text-white/50 text-sm">{session.user?.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-white/70">Nombre</Label>
            <Input
              defaultValue={session.user?.name || ""}
              disabled
              className="bg-white/5 border-white/20 text-white/50 h-12"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-white/70">Email</Label>
            <Input
              defaultValue={session.user?.email || ""}
              disabled
              className="bg-white/5 border-white/20 text-white/50 h-12"
            />
          </div>

          <p className="text-white/30 text-xs">La edición del perfil estará disponible próximamente.</p>
        </div>
      </div>

      {/* Cuenta */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-violet-400" />
          <h2 className="font-semibold">Plan actual</h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="font-semibold">Plan Gratis</p>
            <p className="text-white/50 text-sm mt-0.5">1 chatbot · 100 conversaciones/mes</p>
          </div>
          <Button className="bg-violet-600 hover:bg-violet-500 !text-white">
            Actualizar a Pro
          </Button>
        </div>
      </div>

      {/* Seguridad */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Shield className="w-4 h-4 text-violet-400" />
          <h2 className="font-semibold">Seguridad</h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Contraseña</p>
              <p className="text-white/40 text-xs mt-0.5">Cambia tu contraseña de acceso</p>
            </div>
            <Button variant="outline" className="border-white/20 !text-white bg-transparent hover:bg-white/10" disabled>
              Cambiar
            </Button>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div>
              <p className="text-sm font-medium text-red-400">Eliminar cuenta</p>
              <p className="text-white/40 text-xs mt-0.5">Esta acción no se puede deshacer</p>
            </div>
            <Button variant="outline" className="border-red-500/30 !text-red-400 bg-transparent hover:bg-red-500/10" disabled>
              Eliminar
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}