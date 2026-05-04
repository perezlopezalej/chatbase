import { resend } from "./resend"

const FROM = "ChatBase <onboarding@resend.dev>"
const DASHBOARD_URL = "https://chatbase-theta.vercel.app"

export async function sendWelcomeEmail(to: string, name: string) {
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: "¡Bienvenido a ChatBase! 🤖",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:40px;border-radius:12px">
          <h1 style="color:#a78bfa;margin-bottom:8px">¡Hola, ${name}! 👋</h1>
          <p style="color:#888;margin-bottom:24px">Ya tienes tu cuenta de ChatBase lista.</p>
          <p style="color:#ccc">En minutos puedes tener tu primer chatbot respondiendo preguntas de tus clientes 24/7.</p>
          <a href="${DASHBOARD_URL}/dashboard/bots/new" style="display:inline-block;margin-top:24px;background:#7c3aed;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
            Crear mi primer chatbot →
          </a>
          <hr style="border:none;border-top:1px solid #222;margin:32px 0" />
          <p style="color:#555;font-size:13px">Si tienes dudas, responde a este email y te ayudamos.</p>
          <p style="color:#333;font-size:12px;margin-top:8px">© 2026 ChatBase</p>
        </div>
      `,
    })
  } catch (e) {
    console.error("Error enviando email de bienvenida:", e)
  }
}

export async function sendLeadNotification(
  ownerEmail: string,
  botName: string,
  leadName: string,
  leadEmail: string
) {
  try {
    await resend.emails.send({
      from: FROM,
      to: ownerEmail,
      subject: `Nuevo lead en ${botName} 🎯`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:40px;border-radius:12px">
          <h1 style="color:#a78bfa;margin-bottom:8px">¡Nuevo contacto!</h1>
          <p style="color:#888;margin-bottom:24px">Tu chatbot <strong style="color:#fff">${botName}</strong> ha capturado un nuevo lead.</p>
          <div style="background:#1a1a1a;border:1px solid #333;border-radius:8px;padding:20px;margin-bottom:24px">
            <p style="margin:0 0 4px;color:#888;font-size:13px">Nombre</p>
            <p style="margin:0 0 16px;color:#fff;font-weight:600">${leadName || "No proporcionado"}</p>
            <p style="margin:0 0 4px;color:#888;font-size:13px">Email</p>
            <p style="margin:0;color:#a78bfa;font-weight:600">${leadEmail}</p>
          </div>
          <a href="${DASHBOARD_URL}/dashboard" style="display:inline-block;background:#7c3aed;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
            Ver todos mis leads →
          </a>
          <hr style="border:none;border-top:1px solid #222;margin:32px 0" />
          <p style="color:#333;font-size:12px">© 2026 ChatBase</p>
        </div>
      `,
    })
  } catch (e) {
    console.error("Error enviando notificación de lead:", e)
  }
}

export async function sendProActivationEmail(to: string, name: string) {
  try {
    await resend.emails.send({
      from: FROM,
      to,
      subject: "¡Plan Pro activado! ⚡",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:40px;border-radius:12px">
          <h1 style="color:#a78bfa;margin-bottom:8px">¡Bienvenido a Pro, ${name}! ⚡</h1>
          <p style="color:#888;margin-bottom:24px">Tu plan Pro ya está activo. Aquí tienes todo lo que puedes usar ahora:</p>
          <div style="background:#1a1a1a;border:1px solid #333;border-radius:8px;padding:20px;margin-bottom:24px">
            <ul style="margin:0;padding-left:20px;color:#ccc;line-height:2.2;font-size:15px">
              <li>✅ Chatbots ilimitados</li>
              <li>✅ Conversaciones ilimitadas</li>
              <li>✅ Base de conocimiento con IA</li>
              <li>✅ Captura de leads automática</li>
              <li>✅ Personalización del widget</li>
              <li>✅ Historial completo de conversaciones</li>
            </ul>
          </div>
          <a href="${DASHBOARD_URL}/dashboard" style="display:inline-block;background:#7c3aed;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
            Ir al dashboard →
          </a>
          <hr style="border:none;border-top:1px solid #222;margin:32px 0" />
          <p style="color:#555;font-size:13px">Gracias por confiar en ChatBase.</p>
          <p style="color:#333;font-size:12px;margin-top:4px">© 2026 ChatBase</p>
        </div>
      `,
    })
  } catch (e) {
    console.error("Error enviando email Pro:", e)
  }
}
