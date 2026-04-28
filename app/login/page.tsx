"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-white/5 border-white/10 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            ChatBase
          </CardTitle>
          <CardDescription className="text-white/50">
            Inicia sesión en tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-white/70">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="tu@email.com"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-white/70">Contraseña</Label>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="bg-violet-600 hover:bg-violet-500 !text-white mt-2"
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
            <p className="text-center text-white/50 text-sm">
              ¿No tienes cuenta?{" "}
              <a href="/register" className="text-violet-400 hover:text-violet-300">
                Regístrate
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}