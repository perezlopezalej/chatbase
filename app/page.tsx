import { Button } from "@/components/ui/button"
import { Bot, Zap, Code, Check, ArrowRight, CheckCircle, Star, Shield, Clock, HelpCircle } from "lucide-react"
import Link from "next/link"
import { auth } from "@/auth"
import PricingProButton from "./pricing-button"
import LandingMobileNav from "./landing-mobile-nav"

export default async function Home() {
  const session = await auth()

  let isPro = false
  if (session?.user?.id) {
    const { prisma } = await import("@/lib/prisma")
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true },
    })
    isPro = user?.plan === "pro"
  }

  return (
    <main id="inicio" className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">

      {/* Navbar */}
      <nav className="border-b border-white/10 px-6 md:px-8 py-4 flex items-center justify-between sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-sm z-50">
        <span className="font-bold text-xl bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
          ChatBase
        </span>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-2 text-sm absolute left-1/2 -translate-x-1/2">
          {[
            { label: "Inicio", href: "#inicio" },
            { label: "Cómo funciona", href: "#como-funciona" },
            { label: "Features", href: "#features" },
            { label: "Precios", href: "#precios" },
            { label: "FAQ", href: "#faq" },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="text-white/70 hover:text-white border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all px-3 py-1.5 rounded-lg font-medium">
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <Link href="/dashboard">
              <Button className="bg-violet-600 hover:bg-violet-500 !text-white">Ir al dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" className="!text-white/70 hover:!text-white hover:bg-white/10">Iniciar sesión</Button>
              </Link>
              <div className="w-px h-4 bg-white/20 hidden sm:block" />
              <Link href="/register">
                <Button className="bg-violet-600 hover:bg-violet-500 !text-white">Empezar gratis</Button>
              </Link>
            </>
          )}
          {/* Hamburguesa móvil */}
          <LandingMobileNav />
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 gap-6 md:gap-8 py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-transparent to-transparent pointer-events-none" />

        {!session && (
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs md:text-sm text-white/40 relative">
            <span>⚡ Impulsado por Llama 3.1</span>
            <span className="hidden sm:block w-px h-4 bg-white/20" />
            <span>🔒 Sin tarjeta de crédito</span>
            <span className="hidden sm:block w-px h-4 bg-white/20" />
            <span>🚀 Listo en minutos</span>
          </div>
        )}

        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-sm text-violet-300 relative">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          Impulsado por IA
        </div>

        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight relative">
          Tu negocio con un{" "}
          <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            asistente inteligente
          </span>{" "}
          24/7
        </h1>

        <p className="text-white/50 text-base md:text-lg max-w-xl relative">
          Crea un chatbot personalizado con la información de tu negocio y añádelo a tu web en minutos. Sin código.
        </p>

        {/* Indicadores de confianza */}
        <div className="flex flex-wrap justify-center gap-3 relative">
          {[
            { icon: Shield, text: "Sin permanencia" },
            { icon: Clock, text: "Cancela cuando quieras" },
            { icon: CheckCircle, text: "Soporte incluido" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-xs text-white/40">
              <Icon className="w-3.5 h-3.5 text-violet-400" />
              {text}
            </div>
          ))}
        </div>

        {/* CTAs — solo para no logados */}
        {!session && (
          <div className="flex flex-col sm:flex-row gap-3 relative w-full sm:w-auto">
            <Link href="/register">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-500 !text-white gap-2 w-full sm:w-auto">
                Crear mi chatbot gratis <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-violet-500/50 !text-violet-300 bg-transparent hover:bg-violet-500/10 hover:border-violet-400 w-full sm:w-auto">
                Ver demo en vivo
              </Button>
            </Link>
          </div>
        )}

        {session && (
          <Link href="/demo" className="relative">
            <Button size="lg" variant="outline" className="border-violet-500/50 !text-violet-300 bg-transparent hover:bg-violet-500/10 hover:border-violet-400">
              Ver demo en vivo
            </Button>
          </Link>
        )}

        {/* Mockup chat */}
        <div className="relative w-full max-w-lg mt-4 md:mt-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 text-left backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
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
              <div className="bg-white/10 rounded-xl rounded-tl-none px-4 py-2 text-sm max-w-xs">¡Hola! ¿En qué puedo ayudarte hoy?</div>
              <div className="bg-violet-600/30 border border-violet-500/20 rounded-xl rounded-tr-none px-4 py-2 text-sm max-w-xs self-end">¿Cuál es el horario de apertura?</div>
              <div className="bg-white/10 rounded-xl rounded-tl-none px-4 py-2 text-sm max-w-xs">Abrimos de lunes a domingo de 13:00 a 16:00 y de 20:00 a 23:30. ¡Te esperamos! 🍽️</div>
            </div>
          </div>
          <div className="absolute -inset-4 bg-violet-500/5 rounded-3xl blur-2xl -z-10" />
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 pt-4 relative">
          {[
            { value: "50+", label: "Negocios usando ChatBase" },
            { value: "24/7", label: "Disponibilidad garantizada" },
            { value: "5 min", label: "Para estar en marcha" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">{value}</p>
              <p className="text-white/40 text-xs text-center">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="border-t border-white/10 px-6 py-16 max-w-5xl mx-auto w-full">
        <p className="text-center text-white/30 text-sm mb-8 uppercase tracking-widest">Lo que dicen nuestros clientes</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              quote: "En una semana el bot ya estaba respondiendo el 80% de las preguntas de mis clientes. Ahora puedo centrarme en el negocio.",
              author: "María G.",
              role: "Peluquería María",
            },
            {
              quote: "Mis clientes preguntan los horarios a las 2 de la mañana y el bot les responde. Es como tener un empleado que nunca duerme.",
              author: "Carlos M.",
              role: "Restaurante El Rincón",
            },
            {
              quote: "Lo instalé en mi web de Wix en 5 minutos copiando una línea de código. No sabía que podía ser tan fácil.",
              author: "Ana P.",
              role: "Centro de Estética",
            },
          ].map(({ quote, author, role }) => (
            <div key={author} className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed">"{quote}"</p>
              <div>
                <p className="text-sm font-medium">{author}</p>
                <p className="text-white/40 text-xs">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="scroll-mt-20 px-6 py-16 md:py-24 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Listo en 3 pasos</h2>
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
          { icon: Code, title: "Fácil de instalar", desc: "Copia una línea de código y pégala en tu web. Compatible con WordPress, Shopify, Wix y más." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex flex-col gap-3 p-8 md:p-10">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <Icon className="w-5 h-5 text-violet-400" />
            </div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>

      {/* Pricing */}
      <section id="precios" className="scroll-mt-20 px-6 py-16 md:py-24 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Precios simples y transparentes</h2>
          <p className="text-white/50 text-lg">Empieza gratis, escala cuando lo necesites.</p>
        </div>

        {/* Banner Pro activo */}
        {isPro && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 max-w-3xl mx-auto w-full mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              <p className="text-sm text-green-300 font-medium">Ya tienes el plan Pro activo. Tienes acceso a todas las funcionalidades.</p>
            </div>
            <Link href="/dashboard">
              <Button size="sm" className="bg-green-600 hover:bg-green-500 !text-white shrink-0">Ir al dashboard</Button>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">

          {/* Plan Gratis */}
          <div className={`flex flex-col gap-6 p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 ${isPro ? "opacity-50" : ""}`}>
            <div>
              <p className="text-white/50 text-sm mb-1">Gratis</p>
              <p className="text-4xl font-bold">0€<span className="text-white/30 text-base font-normal">/mes</span></p>
              <p className="text-white/50 text-sm mt-1">Para empezar</p>
            </div>
            <ul className="flex flex-col gap-3">
              {["1 chatbot", "100 conversaciones/mes", "Widget para tu web", "Soporte por email"].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                  <Check className="w-4 h-4 text-violet-400 shrink-0" />{f}
                </li>
              ))}
            </ul>
            {isPro ? (
              <Button disabled className="border border-white/20 !text-white/30 bg-transparent w-full cursor-not-allowed">Plan anterior</Button>
            ) : session ? (
              <Button disabled className="border border-white/20 !text-white/30 bg-transparent w-full cursor-not-allowed">Plan actual</Button>
            ) : (
              <Link href="/register">
                <Button className="border border-white/40 !text-white bg-transparent hover:bg-white/10 w-full">Empezar gratis</Button>
              </Link>
            )}
          </div>

          {/* Plan Pro */}
          <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl border border-violet-500/50 bg-violet-500/10 shadow-[0_0_40px_rgba(139,92,246,0.1)] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {isPro ? "Plan activo" : "Más popular"}
            </div>
            <div>
              <p className="text-white/50 text-sm mb-1">Pro</p>
              <p className="text-4xl font-bold">29€<span className="text-white/30 text-base font-normal">/mes</span></p>
              <p className="text-white/50 text-sm mt-1">Para crecer</p>
            </div>
            <ul className="flex flex-col gap-3">
              {[
                "Chatbots ilimitados",
                "Conversaciones ilimitadas",
                "Base de conocimiento con IA",
                "Captura de leads automática",
                "Personalización del widget",
                "Soporte prioritario",
              ].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                  <Check className="w-4 h-4 text-violet-400 shrink-0" />{f}
                </li>
              ))}
            </ul>
            {isPro ? (
              <Button disabled className="bg-green-600/50 !text-white/70 w-full gap-2 cursor-not-allowed">
                <CheckCircle className="w-4 h-4" /> Plan activo
              </Button>
            ) : (
              <PricingProButton isLoggedIn={!!session} />
            )}
            <p className="text-center text-white/30 text-xs">Sin permanencia · Cancela cuando quieras</p>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 border-t border-white/10 px-6 py-16 md:py-24 max-w-3xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-violet-400" />
            <h2 className="text-3xl md:text-4xl font-bold">Preguntas frecuentes</h2>
          </div>
          <p className="text-white/50">Todo lo que necesitas saber antes de empezar.</p>
        </div>
        <div className="flex flex-col gap-4">
          {[
            {
              q: "¿Necesito saber programar?",
              a: "No. Crear y configurar tu chatbot es completamente visual. Para instalarlo en tu web solo tienes que copiar y pegar una línea de código.",
            },
            {
              q: "¿Con qué plataformas web es compatible?",
              a: "Con cualquiera. WordPress, Shopify, Wix, Webflow, Squarespace, o cualquier web con HTML. Si puedes pegar código en tu web, funciona.",
            },
            {
              q: "¿Puedo cancelar cuando quiera?",
              a: "Sí, sin preguntas ni penalizaciones. Puedes cancelar en cualquier momento desde tu configuración y no se te cobrará el siguiente mes.",
            },
            {
              q: "¿Es seguro? ¿Qué pasa con mis datos?",
              a: "Tus datos y los de tus clientes están almacenados de forma segura en servidores europeos. Cumplimos con la normativa RGPD.",
            },
            {
              q: "¿Puedo probar el plan Pro antes de pagar?",
              a: "Puedes empezar con el plan gratuito para probar cómo funciona. Si necesitas más funcionalidades, el plan Pro se puede activar en segundos.",
            },
            {
              q: "¿Cuántas preguntas puede responder el bot?",
              a: "En el plan gratuito, 100 conversaciones al mes. En el plan Pro, conversaciones ilimitadas. El bot responde basándose en la información que tú le das.",
            },
          ].map(({ q, a }) => (
            <details key={q} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                <span className="font-medium text-sm md:text-base">{q}</span>
                <span className="text-violet-400 group-open:rotate-45 transition-transform shrink-0 ml-4 text-xl font-light">+</span>
              </summary>
              <div className="px-5 pb-5 text-white/50 text-sm leading-relaxed border-t border-white/10 pt-4">
                {a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA final — solo para no logados */}
      {!session && (
        <section className="relative border-t border-white/10 px-6 py-16 md:py-24 flex flex-col items-center text-center gap-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 via-transparent to-transparent pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-bold max-w-xl relative">¿Listo para tener tu propio asistente inteligente?</h2>
          <p className="text-white/50 text-lg relative">Empieza gratis hoy. Sin tarjeta de crédito.</p>
          <div className="flex flex-col sm:flex-row gap-3 relative">
            <Link href="/register">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-500 !text-white gap-2">
                Crear mi chatbot gratis <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-violet-500/50 !text-violet-300 bg-transparent hover:bg-violet-500/10 hover:border-violet-400">
                Ver demo en vivo
              </Button>
            </Link>
          </div>
          <p className="text-white/30 text-sm">Sin permanencia · Cancela cuando quieras · Soporte incluido</p>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
          <span className="font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">ChatBase</span>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            <Link href="/privacidad" className="hover:text-white/60 transition-colors">Política de privacidad</Link>
            <Link href="/terminos" className="hover:text-white/60 transition-colors">Términos y condiciones</Link>
            <Link href="/demo" className="hover:text-white/60 transition-colors">Demo</Link>
          </div>
          <span className="text-xs">© 2026 ChatBase. Todos los derechos reservados.</span>
        </div>
      </footer>

    </main>
  )
}
