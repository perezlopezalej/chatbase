import { Button } from "@/components/ui/button"
import { Bot, Zap, Code, Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { auth } from "@/auth"

export default async function Home() {
  const session = await auth()

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">

      {/* Navbar */}
      <nav className="border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-sm z-50">
        <span className="font-bold text-xl bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
          ChatBase
        </span>
        <div className="hidden md:flex items-center gap-2 text-sm absolute left-1/2 -translate-x-1/2">
          <a href="#" className="text-white/70 hover:text-white border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all px-3 py-1.5 rounded-lg font-medium">
            Inicio
          </a>
          <a href="#como-funciona" className="text-white/70 hover:text-white border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all px-3 py-1.5 rounded-lg font-medium">
            Cómo funciona
          </a>
          <a href="#features" className="text-white/70 hover:text-white border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all px-3 py-1.5 rounded-lg font-medium">
            Features
          </a>
          <a href="#precios" className="text-white/70 hover:text-white border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all px-3 py-1.5 rounded-lg font-medium">
            Precios
          </a>
        </div>
        <div className="flex items-center gap-3">
          {session ? (
            <Link href="/dashboard">
              <Button className="bg-violet-600 hover:bg-violet-500 !text-white">
                Ir al dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="!text-white/70 hover:!text-white hover:bg-white/10">
                  Iniciar sesión
                </Button>
              </Link>
              <div className="w-px h-4 bg-white/20" />
              <Link href="/register">
                <Button className="bg-violet-600 hover:bg-violet-500 !text-white">
                  Empezar gratis
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 gap-8 py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="flex items-center gap-6 text-sm text-white/40 relative">
          <span>⚡ Impulsado por Llama 3.1</span>
          <span className="w-px h-4 bg-white/20" />
          <span>🔒 Sin tarjeta de crédito</span>
          <span className="w-px h-4 bg-white/20" />
          <span>🚀 Listo en minutos</span>
        </div>

        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-sm text-violet-300 relative">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          Impulsado por IA
        </div>

        <h1 className="text-6xl font-bold max-w-3xl leading-tight relative">
          Tu negocio con un{" "}
          <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            asistente inteligente 24/7
          </span>
        </h1>

        <p className="text-white/50 text-lg max-w-xl relative">
          Crea un chatbot personalizado con la información de tu negocio y añádelo a tu web en minutos. Sin código.
        </p>

        <div className="flex gap-3 relative">
          <Link href={session ? "/dashboard" : "/register"}>
            <Button size="lg" className="bg-violet-600 hover:bg-violet-500 !text-white gap-2">
              {session ? "Ir al dashboard" : "Crear mi chatbot gratis"} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href="#como-funciona">
            <Button size="lg" variant="outline" className="border-violet-500/50 !text-violet-300 bg-transparent hover:bg-violet-500/10 hover:border-violet-400">
              Ver cómo funciona
            </Button>
          </a>
        </div>

        <div className="relative w-full max-w-lg mt-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 text-left backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                <Bot className="w-4 h-4 text-violet-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Asistente de Restaurante Pepe</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  En línea
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-white/10 rounded-xl rounded-tl-none px-4 py-2 text-sm max-w-xs">
                ¡Hola! ¿En qué puedo ayudarte hoy?
              </div>
              <div className="bg-violet-600/30 border border-violet-500/20 rounded-xl rounded-tr-none px-4 py-2 text-sm max-w-xs self-end">
                ¿Cuál es el horario de apertura?
              </div>
              <div className="bg-white/10 rounded-xl rounded-tl-none px-4 py-2 text-sm max-w-xs">
                Abrimos de lunes a domingo de 13:00 a 16:00 y de 20:00 a 23:30. ¡Te esperamos! 🍽️
              </div>
            </div>
          </div>
          <div className="absolute -inset-4 bg-violet-500/5 rounded-3xl blur-2xl -z-10" />
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="scroll-mt-20 px-6 py-24 max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Listo en 3 pasos</h2>
          <p className="text-white/50 text-lg">Sin código. Sin complicaciones.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[calc(16.66%+32px)] w-[calc(33.33%-64px)] h-px bg-gradient-to-r from-violet-500/40 to-violet-500/10" />
          <div className="hidden md:block absolute top-8 left-[calc(50%+32px)] w-[calc(33.33%-64px)] h-px bg-gradient-to-r from-violet-500/40 to-violet-500/10" />
          {[
            { step: "01", title: "Configura tu bot", desc: "Añade el nombre de tu negocio, horarios, servicios y cualquier información relevante." },
            { step: "02", title: "Personaliza las respuestas", desc: "Define cómo quieres que responda tu asistente y pruébalo en tiempo real." },
            { step: "03", title: "Publícalo en tu web", desc: "Copia una línea de código y pégala en tu web. Compatible con cualquier plataforma." },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex flex-col gap-4 items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-violet-400">{step}</span>
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-white/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
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
            <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>

      {/* Pricing */}
      <section id="precios" className="scroll-mt-20 px-6 py-24 max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Precios simples y transparentes</h2>
          <p className="text-white/50 text-lg">Empieza gratis, escala cuando lo necesites.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {[
            {
              name: "Gratis",
              price: "0€",
              desc: "Para empezar",
              features: ["1 chatbot", "100 conversaciones/mes", "Widget para tu web", "Soporte por email"],
              cta: "Empezar gratis",
              highlight: false,
              href: "/register",
            },
            {
              name: "Pro",
              price: "29€",
              desc: "Para crecer",
              features: ["Chatbots ilimitados", "Conversaciones ilimitadas", "Base de conocimiento con IA", "Soporte prioritario"],
              cta: "Empezar con Pro",
              highlight: true,
              href: "/register",
            },
          ].map(({ name, price, desc, features, cta, highlight, href }) => (
            <div key={name} className={`flex flex-col gap-6 p-8 rounded-2xl border relative ${highlight ? "border-violet-500/50 bg-violet-500/10 shadow-[0_0_40px_rgba(139,92,246,0.1)]" : "border-white/10 bg-white/5"}`}>
              {highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Más popular
                </div>
              )}
              <div>
                <p className="text-white/50 text-sm mb-1">{name}</p>
                <p className="text-4xl font-bold">{price}<span className="text-white/30 text-base font-normal">/mes</span></p>
                <p className="text-white/50 text-sm mt-1">{desc}</p>
              </div>
              <ul className="flex flex-col gap-3">
                {features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                    <Check className="w-4 h-4 text-violet-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={href}>
                <Button className={highlight ? "bg-violet-600 hover:bg-violet-500 !text-white w-full" : "border border-white/40 !text-white bg-transparent hover:bg-white/10 w-full"}>
                  {cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="relative border-t border-white/10 px-6 py-24 flex flex-col items-center text-center gap-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 via-transparent to-transparent pointer-events-none" />
        <h2 className="text-4xl font-bold max-w-xl relative">¿Listo para tener tu propio asistente inteligente?</h2>
        <p className="text-white/50 text-lg relative">Empieza gratis hoy. Sin tarjeta de crédito.</p>
        <Link href={session ? "/dashboard" : "/register"}>
          <Button size="lg" className="bg-violet-600 hover:bg-violet-500 !text-white gap-2 relative">
            {session ? "Ir al dashboard" : "Crear mi chatbot gratis"} <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
<footer className="border-t border-white/10 px-6 py-6 flex items-center justify-between text-white/30 text-sm">
  <span className="font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">ChatBase</span>
  <div className="flex items-center gap-6">
    <Link href="/privacidad" className="hover:text-white/60 transition-colors">Política de privacidad</Link>
    <span>© 2026 ChatBase. Todos los derechos reservados.</span>
  </div>
</footer>

    </main>
  )
}