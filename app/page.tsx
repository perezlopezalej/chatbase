import { Button } from "@/components/ui/button"
import { Bot, Zap, Code } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">

      {/* Navbar */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-xl bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
          ChatBase
        </span>
        <div className="flex items-center gap-3">
<Button variant="outline" className="border-white/20 !text-white/70 bg-transparent hover:!text-white hover:bg-white/10 hover:border-white/40">
  Iniciar sesión
</Button>
          <div className="w-px h-4 bg-white/20" />
          <Button className="bg-violet-600 hover:bg-violet-500 !text-white">
            Empezar gratis
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-8 py-24">
        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-sm text-violet-300">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          Impulsado por IA
        </div>
        <h1 className="text-6xl font-bold max-w-3xl leading-tight">
          Tu negocio con un{" "}
          <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            asistente inteligente
          </span>{" "}
          24/7
        </h1>
        <p className="text-white/50 text-lg max-w-xl">
          Crea un chatbot personalizado con la información de tu negocio y añádelo a tu web en minutos. Sin código.
        </p>
        <div className="flex gap-3">
          <Button size="lg" className="bg-violet-600 hover:bg-violet-500 !text-white">
            Crear mi chatbot gratis
          </Button>
          <Button size="lg" variant="outline" className="border-violet-500/50 !text-violet-300 bg-transparent hover:bg-violet-500/10 hover:border-violet-400">
            Ver demo
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {[
          { icon: Bot, title: "IA personalizada", desc: "El bot aprende de la información de tu negocio y responde como si fuera de tu equipo." },
          { icon: Zap, title: "Listo en minutos", desc: "Configura tu asistente, personaliza las respuestas y publícalo sin necesidad de programar." },
          { icon: Code, title: "Fácil de instalar", desc: "Copia una línea de código y pégala en tu web. Compatible con cualquier plataforma." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex flex-col gap-3 p-10">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <Icon className="w-5 h-5 text-violet-400" />
            </div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>

    </main>
  )
}