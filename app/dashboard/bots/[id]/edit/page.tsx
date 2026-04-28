"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"
import { use } from "react"

export default function EditBotPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState("")
  const [bot, setBot] = useState({ name: "", description: "", instructions: "" })

  useEffect(() => {
    fetch(`/api/bots/${id}`)
      .then(res => res.json())
      .then(data => setBot(data))
  }, [id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    const res = await fetch(`/api/bots/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        description: formData.get("description"),
        instructions: formData.get("instructions"),
      }),
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

  return (
    <div className="px-8 py-8 max-w-2xl">
      <Link href={`/dashboard/bots/${id}`} className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors w-fit">
        <ArrowLeft className="w-3.5 h-3.5" />
        Volver al bot
      </Link>

      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold">Editar chatbot</h1>
          <p className="text-white/50 text-sm mt-1">Modifica la configuración de tu asistente</p>
        </div>
        <Button
          onClick={handleDelete}
          disabled={deleting}
          variant="outline"
          className="border-red-500/30 !text-red-400 bg-transparent hover:bg-red-500/10 gap-2"
        >
          <Trash2 className="w-4 h-4" />
          {deleting ? "Eliminando..." : "Eliminar bot"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label className="text-white/70">Nombre del chatbot</Label>
          <Input
            name="name"
            defaultValue={bot.name}
            required
            className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-white/70">Descripción breve</Label>
          <Input
            name="description"
            defaultValue={bot.description}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-white/70">Instrucciones del bot</Label>
          <p className="text-white/30 text-xs">Cuéntale a tu bot quién es y qué información tiene que manejar.</p>
          <textarea
            name="instructions"
            defaultValue={bot.instructions}
            rows={8}
            className="bg-white/5 border border-white/20 text-white placeholder:text-white/30 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:border-violet-500/50"
          />
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
    </div>
  )
}