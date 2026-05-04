"use client"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { useState } from "react"

export default function PricingProButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (!isLoggedIn) {
      window.location.href = "/register?plan=pro"
      return
    }
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
      onClick={handleClick}
      disabled={loading}
      className="bg-violet-600 hover:bg-violet-500 !text-white w-full gap-2"
    >
      <Zap className="w-4 h-4" />
      {loading ? "Redirigiendo..." : "Empezar con Pro"}
    </Button>
  )
}
