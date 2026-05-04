"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function PricingProButton() {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    const res = await fetch("/api/checkout", { method: "POST" })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      // Si no está logado, redirigir a registro
      window.location.href = "/register"
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      className="bg-violet-600 hover:bg-violet-500 !text-white w-full"
    >
      {loading ? "Redirigiendo..." : "Empezar con Pro"}
    </Button>
  )
}