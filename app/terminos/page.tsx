import Link from "next/link"

export default function TerminosPage() {
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
      <section className="relative px-6 py-10 text-center border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Términos y Condiciones</h1>
          <p className="text-white/40 text-sm">Última actualización: 1 de mayo de 2026</p>
        </div>
      </section>

      {/* Contenido */}
      <div className="max-w-3xl mx-auto w-full px-6 py-8 flex flex-col gap-4">
        {[
          {
            title: "1. Aceptación de los términos",
            content: "Al registrarse y utilizar ChatBase, usted acepta estos Términos y Condiciones en su totalidad. Si no está de acuerdo con alguno de estos términos, no debe utilizar el servicio.",
          },
          {
            title: "2. Descripción del servicio",
            content: "ChatBase es una plataforma SaaS que permite a los usuarios crear chatbots con inteligencia artificial y añadirlos a sus sitios web. El servicio se ofrece en modalidad de suscripción con planes gratuito y de pago.",
          },
          {
            title: "3. Planes y precios",
            content: "ChatBase ofrece los siguientes planes:",
            items: [
              "Plan Gratuito: 1 chatbot, hasta 100 conversaciones mensuales, widget para web",
              "Plan Pro (29€/mes): chatbots ilimitados, conversaciones ilimitadas, base de conocimiento con IA, soporte prioritario",
            ],
            footer: "Los precios pueden cambiar con un preaviso de 30 días. Los cambios no afectarán a las suscripciones activas hasta su próxima renovación.",
          },
          {
            title: "4. Pagos y facturación",
            content: "Los pagos se procesan de forma segura a través de Stripe. La suscripción Pro se renueva automáticamente cada mes. Puede cancelar en cualquier momento desde su panel de control. No se realizan reembolsos por períodos parciales ya facturados.",
          },
          {
            title: "5. Cancelación",
            content: "Puede cancelar su suscripción en cualquier momento. Al cancelar, su plan pasará a gratuito al final del período de facturación actual. No se eliminarán sus datos ni sus chatbots, pero quedará sujeto a los límites del plan gratuito.",
          },
          {
            title: "6. Uso aceptable",
            content: "El usuario se compromete a no utilizar ChatBase para:",
            items: [
              "Crear chatbots con contenido ilegal, fraudulento o dañino",
              "Spam, phishing o cualquier actividad maliciosa",
              "Infringir derechos de propiedad intelectual de terceros",
              "Sobrecargar o interferir con la infraestructura del servicio",
            ],
            footer: "ChatBase se reserva el derecho de suspender cuentas que incumplan estas normas sin previo aviso.",
          },
          {
            title: "7. Propiedad intelectual",
            content: "El usuario conserva todos los derechos sobre el contenido que añade a sus chatbots (instrucciones, base de conocimiento). ChatBase conserva todos los derechos sobre la plataforma, el código y el diseño del servicio.",
          },
          {
            title: "8. Limitación de responsabilidad",
            content: "ChatBase se proporciona 'tal cual'. No garantizamos disponibilidad ininterrumpida ni ausencia de errores. En ningún caso nuestra responsabilidad total superará el importe pagado por el usuario en los últimos 12 meses.",
          },
          {
            title: "9. Modificaciones del servicio",
            content: "ChatBase se reserva el derecho de modificar, suspender o discontinuar cualquier parte del servicio con un preaviso razonable. Los cambios sustanciales en los términos serán comunicados por email con al menos 30 días de antelación.",
          },
          {
            title: "10. Ley aplicable",
            content: "Estos términos se rigen por la legislación española. Cualquier disputa será sometida a los tribunales competentes de España.",
          },
          {
            title: "11. Contacto",
            content: "Para cualquier consulta sobre estos términos, contáctenos en contacto@chatbase-theta.vercel.app.",
          },
        ].map(({ title, content, items, footer }) => (
          <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-3">
            <h2 className="font-semibold text-violet-300">{title}</h2>
            <p className="text-white/60 text-sm leading-relaxed">{content}</p>
            {items && (
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                    <span className="text-violet-400 shrink-0 mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {footer && <p className="text-white/60 text-sm leading-relaxed">{footer}</p>}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-6 flex items-center justify-between text-white/30 text-sm mt-auto">
        <span className="font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">ChatBase</span>
        <div className="flex items-center gap-6">
          <Link href="/privacidad" className="hover:text-white/60 transition-colors">Política de privacidad</Link>
          <span>© 2026 ChatBase. Todos los derechos reservados.</span>
        </div>
      </footer>

    </main>
  )
}