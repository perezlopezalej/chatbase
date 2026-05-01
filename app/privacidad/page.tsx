import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacidadPage() {
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
          <h1 className="text-4xl font-bold mb-3">Política de Privacidad</h1>
          <p className="text-white/40 text-sm">Última actualización: 1 de mayo de 2026</p>
        </div>
      </section>

      {/* Contenido */}
      <div className="max-w-3xl mx-auto w-full px-6 py-8 flex flex-col gap-4">

        {[
          {
            title: "1. Responsable del tratamiento",
            content: "El responsable del tratamiento de sus datos personales es ChatBase, con domicilio electrónico en contacto@chatbase-theta.vercel.app.",
          },
          {
            title: "2. Datos que recopilamos",
            content: "Recopilamos los siguientes datos personales:",
            items: [
              "Nombre y dirección de correo electrónico al registrarse",
              "Contraseña cifrada (nunca almacenamos contraseñas en texto plano)",
              "Contenido de los chatbots que crea (instrucciones, base de conocimiento)",
              "Conversaciones generadas a través de los chatbots",
              "Datos de pago procesados por Stripe (no almacenamos datos de tarjetas)",
            ],
          },
          {
            title: "3. Finalidad del tratamiento",
            content: "Utilizamos sus datos para:",
            items: [
              "Prestar el servicio de creación y gestión de chatbots con IA",
              "Gestionar su cuenta y suscripción",
              "Enviar comunicaciones relacionadas con el servicio",
              "Mejorar la plataforma mediante el análisis de uso agregado",
            ],
          },
          {
            title: "4. Base legal",
            content: "El tratamiento de sus datos se basa en la ejecución del contrato de servicio aceptado al registrarse, y en el consentimiento explícito otorgado durante el proceso de registro.",
          },
          {
            title: "5. Conservación de datos",
            content: "Conservamos sus datos mientras mantenga una cuenta activa en ChatBase. Si elimina su cuenta, sus datos serán borrados en un plazo máximo de 30 días, salvo obligación legal de conservación.",
          },
          {
            title: "6. Terceros y transferencias",
            content: "Compartimos datos con los siguientes proveedores necesarios para prestar el servicio:",
            items: [
              "Supabase — base de datos (UE)",
              "Vercel — infraestructura de hosting (UE)",
              "Groq — procesamiento de IA (EE.UU., con garantías adecuadas)",
              "Stripe — procesamiento de pagos (EE.UU., con garantías adecuadas)",
            ],
            footer: "No vendemos ni cedemos sus datos a terceros con fines comerciales.",
          },
          {
            title: "7. Sus derechos",
            content: "De acuerdo con el RGPD, tiene derecho a:",
            items: [
              "Acceder a sus datos personales",
              "Rectificar datos incorrectos",
              "Solicitar la eliminación de sus datos",
              "Oponerse al tratamiento o solicitar su limitación",
              "Portabilidad de sus datos",
            ],
            footer: "Para ejercer estos derechos, contáctenos en contacto@chatbase-theta.vercel.app.",
          },
          {
            title: "8. Cookies",
            content: "ChatBase utiliza únicamente cookies técnicas necesarias para el funcionamiento de la sesión. No utilizamos cookies de seguimiento ni publicidad.",
          },
          {
            title: "9. Contacto",
            content: "Para cualquier consulta relacionada con esta política, puede contactarnos en contacto@chatbase-theta.vercel.app.",
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
        <span>© 2026 ChatBase. Todos los derechos reservados.</span>
      </footer>

    </main>
  )
}