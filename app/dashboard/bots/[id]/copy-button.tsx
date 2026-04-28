"use client"

import { Button } from "@/components/ui/button"

export default function CopyButton({ code }: { code: string }) {
  return (
    <Button
      variant="outline"
      className="border-white/20 !text-white bg-transparent hover:bg-white/10 w-full"
      onClick={() => navigator.clipboard.writeText(code)}
    >
      Copiar código
    </Button>
  )
}