"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bot } from "lucide-react"

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get("plan")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      setLoading(false)
      return
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      router.push("/login")
      return
    }

    if (plan === "pro") {
      const checkoutRes = await fetch("/api/checkout", { method: "POST" })
      const checkoutData = await checkoutRes.json()
      if (checkoutData.url) {
        window.location.href = checkoutData.url
        return
      }
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <div className="w-full max-w-md flex flex-col gap-8">
      {plan === "pro" && (
        <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="text-violet-400 text-sm font-semibold">⚡ Plan Pro</span>
          <span className="text-white/50 text-sm">Crea tu cuenta y activa el plan Pro en segundos.</span>
        </div>
      )}
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold">Crear cuenta</h1>
        <p className="text-white/50 text-lg">Empieza gratis, sin tarjeta de crédito.</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="text-white/70 text-base">Nombre</Label>
          <Input name="name" type="text" placeholder="Tu nombre" required className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-12 text-base" />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-white/70 text-base">Email</Label>
          <Input name="email" type="email" placeholder="nombre@gmail.com" required className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-12 text-base" />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-white/70 text-base">Contraseña</Label>
          <Input name="password" type="password" placeholder="Mínimo 8 caracteres" required minLength={8} className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-12 text-base" />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <Button type="submit" disabled={loading} className="bg-violet-600 hover:bg-violet-500 !text-white h-12 text-base mt-2">
          {loading ? "Creando cuenta..." : plan === "pro" ? "Crear cuenta y activar Pro" : "Crear cuenta gratis"}
        </Button>
      </form>
      <p className="text-center text-white/50 text-base">
        ¿Ya tienes cuenta?{" "}
        <a href="/login" className="text-violet-400 hover:text-violet-300 font-medium">Inicia sesión</a>
      </p>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex relative">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="hidden lg:flex flex-col justify-center gap-12 w-1/2 bg-violet-950/30 border-r border-white/10 p-16">
        <span className="font-bold text-2xl bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">ChatBase</span>
        <div className="flex flex-col gap-8">
          <div className="w-16 h-16 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
            <Bot className="w-8 h-8 text-violet-400" />
          </div>
          <h2 className="text-4xl font-bold leading-tight">
            Tu negocio con un{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">asistente inteligente</span>{" "}
            disponib