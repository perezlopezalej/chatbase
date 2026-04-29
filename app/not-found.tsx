import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 text-center gap-6">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="relative flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
          <Bot className="w-8 h-8 text-violet-400" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">404</h1>
          <h2 className="text-2xl font-bold">Página no encontrada</h2>
          <p className="text-white/50 max-w-md">La página que buscas no existe o ha sido movida.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/">
            <Button className="bg-violet-600 hover:bg-violet-500 !text-white">
              Volver al inicio
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="border-white/20 !text-white bg-transparent hover:bg-white/10">
              Ir al dashboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}