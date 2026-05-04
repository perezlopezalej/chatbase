"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Bot, Lightbulb, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function NewBotPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [instructions, setInstructions] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/bots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, instructions }),
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
    <div className="px-4 md:px-8 py-6 md:py-8">

      <Link href="/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-6 md:mb-8 transition-colors w-fit">
        <ArrowLeft className="w-3.5 h-3.5" />
        Volver al dashboard
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 pb-6 border-b border-white/10">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
          <Bot className="w-5 h-5 md:w-6 md:h-6 text-violet-400" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Crear nuevo chatbot</h1>
          <p className="text-white/50 text-sm mt-0.5">Configura tu asistente personalizado</p>
        </div>
      </div>

      {/* Layout dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

        {/* Columna izquierda — formulario */}
        <div className="lg:col-span-2">

          {/* Preview nombre */}
          {name && (
            <div className="flex items-center gap-3 bg-violet-500/5 border border-violet-500/20 rounded-xl px-4 py-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-violet-400" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{name}</p>
                <p className="text-white/40 text-xs truncate">{description || "Sin descripción"}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Card info básica */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 flex flex-col gap-5">
              <h2 className="font-semibold text-sm text-white/70 uppercase tracking-wide">Información básica</h2>
              <div className="flex flex-col gap-2">
                <Label className="text-white/70">Nombre del chatbot</Label>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ej: Asistente de Restaurante Pepe"
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-12"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-white/70">Descripción breve</Label>
                <Input
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Ej: Asistente para responder preguntas sobre el restaurante"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-12"
                />
              </div>
            </div>

            {/* Card instrucciones */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-sm text-white/70 uppercase tracking-wide">
                  Instrucciones <span className="text-white/30 normal-case font-normal">(opcional)</span>
                </h2>
                <span className="text-white/30 text-xs">{instructions.length} caracteres</span>
              </div>
              <p className="text-white/40 text-xs">Opcional — si añades una base de conocimiento, el bot usará esa información automáticamente.</p>
              <textarea
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                rows={8}
                placeholder="Ej: Eres el asistente virtual del Restaurante Pepe. Responde siempre en español, de forma amable y concisa. Si no sabes algo, indica que contacten por teléfono..."
                className="bg-white/5 border border-white/20 text-white placeholder:text-white/30 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:border-violet-500/50"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex flex-col gap-2">
                <p className="text-red-400 text-sm font-medium">{error}</p>
                {error.includes("límite") && (
                  <a href="#" className="text-violet-400 text-xs hover:text-violet-300 transition-colors">
                    Actualizar a Pro →
                  </a>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="bg-violet-600 hover:bg-violet-500 !text-white h-12"
            >
              {loading ? "Creando chatbot..." : "Crear chatbot"}
            </Button>
          </form>
        </div>

        {/* Columna derecha — tips y preview */}
        <div className="flex flex-col gap-6">

          {/* Preview del bot */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4">
            <h3 className="font-semibold text-sm text-white/70 uppercase tracking-wide">Preview</h3>
            <div className="bg-black/30 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <div className="w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-violet-400" />
                </div>
                <div>
                  <p className="text-xs font-medium">{name || "Nombre del bot"}</p>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    En línea
                  </p>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl rounded-tl-none px-3 py-2 text-xs max-w-[90%]">
                ¡Hola! Soy {name || "tu asistente"}. ¿En qué puedo ayudarte?
              </div>
              <div className="bg-violet-600/30 border border-violet-500/20 rounded-xl rounded-tr-none px-3 py-2 text-xs max-w-[90%] self-end">
                ¿Cuál es el horario?
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-violet-400" />
              <h3 className="font-semibold text-sm">Tips para mejores respuestas</h3>
            </div>
            <div className="flex flex-col gap-3">
              {[
                "Define claramente quién es el bot y a qué negocio representa",
                "Incluye horarios, precios y servicios con datos exactos",
                "Indica el tono — amable, formal, conciso",
                "Añade qué debe hacer cuando no sabe algo",
                "Cuanto más detallado, mejores serán las respuestas",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                  <p className="text-white/50 text-xs leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ejemplo */}
          <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-5 flex flex-col gap-3">
            <h3 className="font-semibold text-sm text-violet-300">Ejemplo de instrucciones</h3>
            <p className="text-white/40 text-xs leading-relaxed">
              "Eres el asistente virtual de [Negocio]. Horario: lunes a viernes de 9:00 a 18:00. Teléfono: [número]. Responde siempre en español, de forma amable y concisa. Si no sabes algo, indica que contacten por teléfono."
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
