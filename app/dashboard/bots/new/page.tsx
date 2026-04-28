"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewBotPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    const res = await fetch("/api/bots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        description: formData.get("description"),
        instructions: formData.get("instructions"),
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      setLoading(false)
      return
    }

    router.push(`/dashboard/bots/${data.id}`)
  }

  return (
    <div className="px-8 py-8 max-w-2xl">
      <Link href="/dashboard" className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Volver al dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold">Crear nuevo chatbot</h1>
        <p className="text-white/50 text-sm mt-1">Configura tu asistente personalizado</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label className="text-white/70">Nombre del chatbot</Label>
          <Input
            name="name"
            placeholder="Ej: Asistente de Restaurante Pepe"
            required
            className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-white/70">Descripción breve</Label>
          <Input
            name="description"
            placeholder="Ej: Asistente para responder preguntas sobre el restaurante"
            className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-white/70">Instrucciones del bot</Label>
          <p className="text-white/30 text-xs">Cuéntale a tu bot quién es y qué información tiene que manejar. Cuanto más detallado, mejor.</p>
          <textarea
            name="instructions"
            placeholder="Ej: Eres el asistente virtual del Restaurante Pepe. Abrimos de lunes a domingo de 13:00 a 16:00 y de 20:00 a 23:30. Estamos en Calle Mayor 12, Madrid. Nuestros platos estrella son la paella y el cocido madrileño..."
            rows={8}
            className="bg-white/5 border border-white/20 text-white placeholder:text-white/30 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:border-violet-500/50"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="bg-violet-600 hover:bg-violet-500 !text-white h-12"
        >
          {loading ? "Creando chatbot..." : "Crear chatbot"}
        </Button>
      </form>
    </div>
  )
}