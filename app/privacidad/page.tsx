import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-6 py-16 max-w-3xl mx-auto">
      <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-12 transition-colors w-fit">
        <ArrowLeft className="w-3.5 h-3.5" />
        Volver al inicio
      </Link>

      <h1 className="text-4xl font-bold mb-2">Política de Privacidad</h1>
      <p className="text-white/40 text-sm mb-12">Última actualización: 1 de mayo de 2026</p>

      <div className="flex flex-col gap-10 text-white/70 leading-relaxed">

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white">1. Responsable del tratamiento</h2>
          <p>El responsable del tratamiento de sus datos personales es ChatBase, con domicilio electrónico en <a href="mailto:contacto@chatbase-theta.vercel.app" className="text-violet-400 hover:text-violet-300">contacto@chatbase-theta.vercel.app</a>.</p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white">2. Datos que recopilamos</h2>
          <p>Recopilamos los siguientes datos personales:</p>
          <ul className="flex flex-col gap-2 pl-4">
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> Nombre y dirección de correo electrónico al registrarse</li>
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> Contraseña cifrada (nunca almacenamos contraseñas en texto plano)</li>
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> Contenido de los chatbots que crea (instrucciones, base de conocimiento)</li>
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> Conversaciones generadas a través de los chatbots</li>
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> Datos de pago procesados por Stripe (no almacenamos datos de tarjetas)</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white">3. Finalidad del tratamiento</h2>
          <p>Utilizamos sus datos para:</p>
          <ul className="flex flex-col gap-2 pl-4">
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> Prestar el servicio de creación y gestión de chatbots con IA</li>
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> Gestionar su cuenta y suscripción</li>
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> Enviar comunicaciones relacionadas con el servicio</li>
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> Mejorar la plataforma mediante el análisis de uso agregado</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white">4. Base legal</h2>
          <p>El tratamiento de sus datos se basa en la ejecución del contrato de servicio aceptado al registrarse, y en el consentimiento explícito otorgado durante el proceso de registro.</p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white">5. Conservación de datos</h2>
          <p>Conservamos sus datos mientras mantenga una cuenta activa en ChatBase. Si elimina su cuenta, sus datos serán borrados en un plazo máximo de 30 días, salvo obligación legal de conservación.</p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white">6. Terceros y transferencias</h2>
          <p>Compartimos datos con los siguientes proveedores necesarios para prestar el servicio:</p>
          <ul className="flex flex-col gap-2 pl-4">
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> <strong className="text-white">Supabase</strong> — base de datos (UE)</li>
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> <strong className="text-white">Vercel</strong> — infraestructura de hosting (UE)</li>
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> <strong className="text-white">Groq</strong> — procesamiento de IA (EE.UU., con garantías adecuadas)</li>
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> <strong className="text-white">Stripe</strong> — procesamiento de pagos (EE.UU., con garantías adecuadas)</li>
          </ul>
          <p>No vendemos ni cedemos sus datos a terceros con fines comerciales.</p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white">7. Sus derechos</h2>
          <p>De acuerdo con el RGPD, tiene derecho a:</p>
          <ul className="flex flex-col gap-2 pl-4">
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> Acceder a sus datos personales</li>
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> Rectificar datos incorrectos</li>
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> Solicitar la eliminación de sus datos</li>
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> Oponerse al tratamiento o solicitar su limitación</li>
            <li className="flex gap-2"><span className="text-violet-400 shrink-0">—</span> Portabilidad de sus datos</li>
          </ul>
          <p>Para ejercer estos derechos, contáctenos en <a href="mailto:contacto@chatbase-theta.vercel.app" className="text-violet-400 hover:text-violet-300">contacto@chatbase-theta.vercel.app</a>.</p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white">8. Cookies</h2>
          <p>ChatBase utiliza únicamente cookies técnicas necesarias para el funcionamiento de la sesión. No utilizamos cookies de seguimiento ni publicidad.</p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-white">9. Contacto</h2>
          <p>Para cualquier consulta relacionada con esta política, puede contactarnos en <a href="mailto:contacto@chatbase-theta.vercel.app" className="text-violet-400 hover:text-violet-300">contacto@chatbase-theta.vercel.app</a>.</p>
        </section>

      </div>
    </main>
  )
}