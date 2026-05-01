"use client"

import Link from "next/link"
import { Bot, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function DemoPage() {

  useEffect(() => {
    // Cargar el widget al entrar
    const script = document.createElement("script")
    script.src = "https://chatbase-theta.vercel.app/widget.js"
    script.setAttribute("data-bot-id", "cmomxx07c0001nx6b1zcjn1qw")
    script.async = true
    document.body.appendChild(script)

    // Limpiar el widget al salir
    return () => {
      script.remove()
      document.getElementById("cb-widget-btn")?.remove()
      document.getElementById("cb-widget-box")?.remove()
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">

      {/* Navbar */}
      <nav className="border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-sm z-50">
        <span className="font-bold text-xl bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
          ChatBase
        </span>
        <Link href="/" className="text-white/50 hover:text-white text-sm transition-colors">
          Volver al inicio
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative px-6 py-16 text-center border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-2xl mx-auto flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-sm text-violet-300 mx-auto">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Demo en vivo
          </div>
          <h1 className="text-4xl font-bold">Prueba ChatBase ahora</h1>
          <p className="text-white/50">Este es un chatbot real creado con ChatBase. Pregúntale lo que quieras sobre el restaurante de ejemplo.</p>
        </div>
      </section>

      {/* Demo */}
      <section className="flex-1 px-6 py-12 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Info izquierda */}
          <div className="flex flex-col gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <p className="font-semibold">Restaurante Demo</p>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    En línea
                  </p>
                </div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Este bot sabe responder sobre el menú, horarios, reservas y más. Está entrenado con información real del negocio.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-white/70">Prueba preguntando:</p>
              {[
                "¿Cuál es el horario?",
                "¿Qué platos tenéis?",
                "¿Cómo puedo reservar una mesa?",
                "¿Abrís los lunes?",
                "¿Cuánto cuesta el menú del día?",
              ].map((q) => (
                <div key={q} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/60 cursor-default">
                  💬 {q}
                </div>
              ))}
            </div>

            <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-5 flex flex-col gap-3">
              <p className="font-semibold text-sm">¿Quieres uno para tu negocio?</p>
              <p className="text-white/50 text-xs leading-relaxed">Crea tu propio chatbot en minutos. Sin código. Gratis para empezar.</p>
              <Link href="/register">
                <Button className="bg-violet-600 hover:bg-violet-500 !text-white w-full gap-2">
                  Crear mi chatbot gratis <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Chat derecha */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-white/70">Chat en vivo — abre el widget abajo a la derecha 👇</p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-center" style={{ minHeight: "400px" }}>
              <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <Bot className="w-8 h-8 text-violet-400" />
              </div>
              <p className="text-white/50 text-sm">El chatbot está activo en la esquina inferior derecha. Dale al botón morado para chatear.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-6 flex items-center justify-between text-white/30 text-sm">
        <span className="font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">ChatBase</span>
        <span>© 2026 ChatBase. Todos los derechos reservados.</span>
      </footer>

    </main>
  )
}