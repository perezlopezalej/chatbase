"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Globe, FileText, Loader2 } from "lucide-react"

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

  useEffect(() => {
    fetchSources()
  }, [])

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
        body: JSON.stringify({
          type: "url",
          title: data.title,
          content: data.content,
        }),
      })

      setUrl("")
      fetchSources()
    } catch (error) {
      alert("Error al procesar la URL")
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

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Base de conocimiento</h1>
        <p className="text-muted-foreground mt-1">
          Añade contenido para que tu bot responda con información real de tu negocio
        </p>
      </div>

      <Tabs defaultValue="url">
        <TabsList>
          <TabsTrigger value="url">Desde URL</TabsTrigger>
          <TabsTrigger value="text">Texto libre</TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-3 mt-4">
          <p className="text-sm text-muted-foreground">
            Pega la URL de tu web y extraeremos el contenido automáticamente
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="https://turestaurante.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button onClick={handleScrapeUrl} disabled={scraping || !url}>
              {scraping ? <Loader2 className="h-4 w-4 animate-spin" /> : "Añadir"}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="text" className="space-y-3 mt-4">
          <p className="text-sm text-muted-foreground">
            Escribe o pega directamente la información de tu negocio
          </p>
          <Input
            placeholder="Título (ej: Horarios, Servicios...)"
            value={textTitle}
            onChange={(e) => setTextTitle(e.target.value)}
          />
          <Textarea
            placeholder="Escribe aquí la información de tu negocio..."
            rows={6}
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
          />
          <Button onClick={handleAddText} disabled={saving || !textContent}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar"}
          </Button>
        </TabsContent>
      </Tabs>

      <div className="space-y-3">
        <h2 className="font-semibold">Fuentes añadidas ({sources.length})</h2>
        {loading ? (
          <p className="text-sm text-muted-foreground">Cargando...</p>
        ) : sources.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hay fuentes todavía</p>
        ) : (
          sources.map((source) => (
            <Card key={source.id}>
              <CardHeader className="py-3 px-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {source.type === "url" ? (
                      <Globe className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    )}
                    <CardTitle className="text-sm font-medium">
                      {source.title || "Sin título"}
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(source.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="py-2 px-4">
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {source.content}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}