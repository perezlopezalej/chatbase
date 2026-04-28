"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bot, Zap, Shield } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Email o contraseña incorrectos")
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4">

      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative w-full max-w-lg">

        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="font-bold text-2xl bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            ChatBase
          </a>
        </div>

        {/* Tarjeta */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col gap-8 backdrop-blur-sm">

          {/* Header */}
          <div className="flex flex-col gap-2 text-center">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-2">
              <Bot className="w-7 h-7 text-violet-400" />
            </div>
            <h1 className="text-3xl font-bold">Bienvenido de nuevo</h1>
            <p className="text-white/50">Inicia sesión para gestionar tus chatbots</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-white/70">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="nombre@gmail.com"
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-12"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-white/70">Contraseña</Label>
              <Input
                name="password"
                type="password"
                placeholder="Tu contraseña"
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-12"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="bg-violet-600 hover:bg-violet-500 !text-white h-12 mt-2"
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>

          <p className="text-center text-white/50 text-sm">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-violet-400 hover:text-violet-300 font-medium">
              Regístrate gratis
            </a>
          </p>
        </div>

        {/* Features debajo */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { icon: Bot, text: "IA personalizada" },
            { icon: Zap, text: "Listo en minutos" },
            { icon: Shield, text: "100% seguro" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex flex-col items-center gap-2 text-center p-4 rounded-xl border border-white/10 bg-white/5">
              <Icon className="w-5 h-5 text-violet-400" />
              <span className="text-white/70 text-xs font-medium">{text}</span>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}