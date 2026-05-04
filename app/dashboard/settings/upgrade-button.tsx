"use client"

import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { useState } from "react"

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false)

  async function handleUpgrade() {
    setLoading(true)
    const res = await fetch("/api/checkout", { method: "POST" })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleUpgrade}
      disabled={loading}
      className="bg-violet-600 hover:bg-violet-500 !text-white gap-2"
    >
      <Zap className="w-4 h-4" />
      {loading ? "Redirigiendo..." : "Actualizar por 29€/mes"}
    </Button>
  )
}