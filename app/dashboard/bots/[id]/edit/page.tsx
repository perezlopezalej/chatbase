"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Trash2, Bot, Lightbulb, CheckCircle, Palette } from "lucide-react"
import Link from "next/link"
import { use } from "react"

export default function EditBotPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState("")
  const [fetching, setFetching] = useState(true)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [instructions, setInstructions] = useState("")
  const [widgetColor, setWidgetColor] = useState("#7c3aed")
  const [welcomeMessage, setWelcomeMessage] = useState("")

  useEffect(() => {
    fetch(`/api/bots/${id}`)
      .then(res => res.json())
      .then(data => {
        setName(data.name || "")
        setDescription(data.description || "")
        setInstructions(data.instructions || "")
        setWidgetColor(data.widgetColor || "#7c3aed")
        setWelcomeMessage(data.welcomeMessage || "")
        setFetching(false)
      })
  }, [id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch(`/api/bots/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, instructions, widgetColor, welcomeMessage }),
    })

    if (!res.ok) {
      setError("Error al guardar los cambios")
      setLoading(false)
      return
    }

    router.push(`/dashboard/bots/${id}`)
  }

  async function handleDelete() {
    if (!confirm("¿Seguro que quieres eliminar este chatbot? Esta acción no se puede deshacer.")) return
    setDeleting(true)

    const res = await fetch(`/api/bots/${id}`, { method: "DELETE" })

    if (res.ok) {
      router.push("/dashboard")
    } else {
      setDeleting(false)
      setError("Error al eliminar el chatbot")
    }
  }

  if (fetching) {
    return (
      <div className="px-8 py-8 flex items-center justify-center h-64">
        <p className="text-white/40">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="px-8 py-8">

      <Link href={`/dashboard/bots/${id}`} className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors w-fit">
        <ArrowLeft className="w-3.5 h-3.5" />
        Volver al bot
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
        <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
          <Bot className="w-6 h-6 text-violet-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Editar chatbot</h1>
          <p className="text-white/50 text-sm mt-0.5">Modifica la configuración de tu asistente</p>
        </div>
      </div>

      {/* Layout dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Columna izquierda — formulario */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Preview nombre */}
          {name && (
            <div className="flex items-center gap-3 bg-violet-500/5 border border-violet-500/20 rounded-xl px-4 py-3">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-violet-400" />
              </div>
              <div>
                <p className="text-sm font-medium">{name}</p>
                <p className="text-white/40 text-xs">{description || "Sin descripción"}</p>
              </div>
              <span className="ml-auto text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">
                Activo
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Card info básica */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-5">
              <h2 className="font-semibold text-sm text-white/70 uppercase tracking-wide">Información básica</h2>
              <div className="flex flex-col gap-2">
                <Label className="text-white/70">Nombre del chatbot</Label>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
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
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-sm text-white/70 uppercase tracking-wide">
                  Instrucciones <span className="text-white/30 normal-case font-normal">(opcional)</span>
                </h2>
                <span className="text-white/30 text-xs">{instructions.length} caracteres</span>
              </div>
              <p className="text-white/40 text-xs">Cuéntale a tu bot quién es, qué información maneja y cómo debe responder.</p>
              <textarea
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                rows={10}
                placeholder="Ej: Eres el asistente virtual del Restaurante Pepe..."
                className="bg-white/5 border border-white/20 text-white placeholder:text-white/30 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:border-violet-500/50"
              />
            </div>

            {/* Card personalización widget */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-violet-400" />
                <h2 className="font-semibold text-sm text-white/70 uppercase tracking-wide">Personalización del widget</h2>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-white/70">Mensaje de bienvenida</Label>
                <Input
                  value={welcomeMessage}
                  onChange={e => setWelcomeMessage(e.target.value)}
                  placeholder="¡Hola! ¿En qué puedo ayudarte?"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-12"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-white/70">Color del widget</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={widgetColor}
                    onChange={e => setWidgetColor(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border border-white/20 bg-transparent"
                  />
                  <Input
                    value={widgetColor}
                    onChange={e => setWidgetColor(e.target.value)}
                    placeholder="#7c3aed"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-12 font-mono"
                  />
                  <div
                    className="w-12 h-12 rounded-full shrink-0 border border-white/20"
                    style={{ background: widgetColor }}
                  />
                </div>
                <div className="flex gap-2 mt-1">
                  {["#7c3aed", "#2563eb", "#16a34a", "#dc2626", "#d97706", "#0891b2"].map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setWidgetColor(color)}
                      className="w-7 h-7 rounded-full border-2 transition-all"
                      style={{
                        background: color,
                        borderColor: widgetColor === color ? "white" : "transparent",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={loading}
                className="bg-violet-600 hover:bg-violet-500 !text-white h-12 flex-1"
              >
                {loading ? "Guardando..." : "Guardar cambios"}
              </Button>
              <Link href={`/dashboard/bots/${id}`} className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/20 !text-white bg-transparent hover:bg-white/10 h-12 w-full"
                >
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>

          {/* Zona de peligro */}
          <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-6 flex flex-col gap-4">
            <h2 className="font-semibold text-red-400">Zona de peligro</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Eliminar chatbot</p>
                <p className="text-white/40 text-xs mt-0.5">Esta acción es permanente y no se puede deshacer</p>
              </div>
              <Button
                onClick={handleDelete}
                disabled={deleting}
                variant="outline"
                className="border-red-500/30 !text-red-400 bg-transparent hover:bg-red-500/10 gap-2 shrink-0"
              >
                <Trash2 className="w-4 h-4" />
                {deleting ? "Eliminando..." : "Eliminar bot"}
              </Button>
            </div>
          </div>

        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-6">

          {/* Preview del widget */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4">
            <h3 className="font-semibold text-sm text-white/70 uppercase tracking-wide">Preview del widget</h3>
            <div className="bg-black/30 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: `${widgetColor}33`, border: `1px solid ${widgetColor}66` }}
                >
                  <Bot className="w-3.5 h-3.5" style={{ color: widgetColor }} />
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
                {welcomeMessage || `¡Hola! Soy ${name || "tu asistente"}. ¿En qué puedo ayudarte?`}
              </div>
              <div
                className="rounded-xl rounded-tr-none px-3 py-2 text-xs max-w-[90%] self-end text-white"
                style={{ background: `${widgetColor}4d`, border: `1px solid ${widgetColor}33` }}
              >
                ¿Cuál es el horario?
              </div>
            </div>
            <div className="flex justify-end">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: widgetColor }}
              >
                <Bot className="w-5 h-5 text-white" />
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