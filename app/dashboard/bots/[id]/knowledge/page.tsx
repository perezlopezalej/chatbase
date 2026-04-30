"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Globe, FileText, Loader2, ArrowLeft, BookOpen, Lightbulb, CheckCircle } from "lucide-react"
import Link from "next/link"

interface Source {
  id: string
  type: string
  title: string | null
  content: string
  createdAt: string
}

export default function KnowledgePage() {
  const { id: botId } = useParams()
  const [sources, setSources] = useState<Source[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [scraping, setScraping] = useState(false)
  const [url, setUrl] = useState("")
  const [textTitle, setTextTitle] = useState("")
  const [textContent, setTextContent] = useState("")
  const [plan, setPlan] = useState<string>("free")

  useEffect(() => {
    fetchSources()
    fetchPlan()
  }, [])

  async function fetchPlan() {
    const res = await fetch("/api/user/plan")
    const data = await res.json()
    setPlan(data.plan)
  }

  async function fetchSources() {
    const res = await fetch(`/api/bots/${botId}/sources`)
    const data = await res.json()
    setSources(data)
    setLoading(false)
  }

  async function handleScrapeUrl() {
    if (!url) return
    setScraping(true)
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)

      await fetch(`/api/bots/${botId}/sources`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "url", title: data.title, content: data.content }),
      })

      setUrl("")
      fetchSources()
    } catch (error) {
      alert("Error al procesar la URL. Prueba con texto libre.")
    } finally {
      setScraping(false)
    }
  }

  async function handleAddText() {
    if (!textContent) return
    setSaving(true)
    try {
      await fetch(`/api/bots/${botId}/sources`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "text",
          title: textTitle || "Texto sin título",
          content: textContent,
        }),
      })
      setTextTitle("")
      setTextContent("")
      fetchSources()
    } catch (error) {
      alert("Error al guardar el texto")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(sourceId: string) {
    await fetch(`/api/bots/${botId}/sources/${sourceId}`, { method: "DELETE" })
    fetchSources()
  }

if (plan === "free") {
    return (
      <div className="px-8 py-8">
        <Link href={`/dashboard/bots/${botId}`} className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors w-fit">
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver al bot
        </Link>
        <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-violet-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Función Pro</h2>
            <p className="text-white/50 max-w-md">La base de conocimiento está disponible en el plan Pro. Actualiza para entrenar tu bot con la información real de tu negocio.</p>
          </div>
          <div className="flex flex-col gap-3 bg-white/5 border border-white/10 rounded-xl p-6 max-w-sm w-full">
            {[
              "Añade URLs de tu web",
              "Sube texto e información del negocio",
              "El bot responde con datos reales",
              "Múltiples fuentes por bot",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-400 shrink-0" />
                <p className="text-white/70 text-sm">{item}</p>
              </div>
            ))}
          </div>
          <Button className="bg-violet-600 hover:bg-violet-500 !text-white px-8">
            Actualizar a Pro — próximamente
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-8 py-8">

      {/* Breadcrumb */}
      <Link href={`/dashboard/bots/${botId}`} className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors w-fit">
        <ArrowLeft className="w-3.5 h-3.5" />
        Volver al bot
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
        <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-violet-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Base de conocimiento</h1>
          <p className="text-white/50 text-sm mt-0.5">Añade contenido para que tu bot responda con información real</p>
        </div>
      </div>

      {/* Layout dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Columna izquierda */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          {/* Tabs */}
          <Tabs defaultValue="url">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="url" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-white/50">
                Desde URL
              </TabsTrigger>
              <TabsTrigger value="text" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-white/50">
                Texto libre
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="mt-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">URL de tu web</p>
                  <p className="text-white/40 text-xs">Extraeremos el contenido automáticamente</p>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://turestaurante.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                  />
                  <Button
                    onClick={handleScrapeUrl}
                    disabled={scraping || !url}
                    className="bg-violet-600 hover:bg-violet-500 !text-white shrink-0"
                  >
                    {scraping ? <Loader2 className="h-4 w-4 animate-spin" /> : "Añadir"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="text" className="mt-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Información del negocio</p>
                  <p className="text-white/40 text-xs">Escribe o pega directamente horarios, servicios, precios...</p>
                </div>
                <Input
                  placeholder="Título (ej: Horarios, Servicios...)"
                  value={textTitle}
                  onChange={(e) => setTextTitle(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
                />
                <Textarea
                  placeholder="Escribe aquí la información de tu negocio..."
                  rows={6}
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 resize-none"
                />
                <Button
                  onClick={handleAddText}
                  disabled={saving || !textContent}
                  className="bg-violet-600 hover:bg-violet-500 !text-white w-fit"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Fuentes */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-sm text-white/70 uppercase tracking-wide">
              Fuentes añadidas ({sources.length})
            </h2>
            {loading ? (
              <p className="text-sm text-white/40">Cargando...</p>
            ) : sources.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                <BookOpen className="w-8 h-8 text-white/20 mx-auto mb-3" />
                <p className="text-white/40 text-sm">No hay fuentes todavía</p>
                <p className="text-white/25 text-xs mt-1">Añade una URL o texto libre para empezar</p>
              </div>
            ) : (
              sources.map((source) => (
                <div key={source.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      {source.type === "url" ? (
                        <Globe className="h-4 w-4 text-violet-400" />
                      ) : (
                        <FileText className="h-4 w-4 text-violet-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{source.title || "Sin título"}</p>
                      <p className="text-xs text-white/40 mt-0.5 line-clamp-2">{source.content}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(source.id)}
                    className="text-white/20 hover:text-red-400 transition-colors shrink-0 mt-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Columna derecha — tips */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-violet-400" />
              <h3 className="font-semibold text-sm">Consejos</h3>
            </div>
            <div className="flex flex-col gap-3">
              {[
                "Añade los horarios exactos de tu negocio",
                "Incluye precios y servicios disponibles",
                "Añade preguntas frecuentes y sus respuestas",
                "Cuanto más detallado, mejor responderá el bot",
                "Puedes añadir varias fuentes a la vez",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                  <p className="text-white/50 text-xs leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-5 flex flex-col gap-3">
            <h3 className="font-semibold text-sm text-violet-300">¿Qué puedes añadir?</h3>
            <div className="flex flex-col gap-2">
              {[
                { icon: Globe, text: "URL de tu web o redes sociales" },
                { icon: FileText, text: "Texto con info de tu negocio" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                  <p className="text-white/40 text-xs">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}