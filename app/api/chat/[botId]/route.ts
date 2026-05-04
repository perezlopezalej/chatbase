import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// NOTA: Este rate limiter en memoria funciona para desarrollo y baja carga.
// Para producción con múltiples instancias serverless, migrar a Upstash Redis:
// https://upstash.com/docs/oss/sdks/ts/ratelimit/overview
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

// Limpieza periódica del Map para evitar memory leaks
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetAt) rateLimitMap.delete(key)
  }
}, 5 * 60 * 1000)

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000
  const maxRequests = 20
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= maxRequests) return false
  entry.count++
  return true
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ botId: string }> }
) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || "unknown"

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Demasiadas peticiones. Espera un momento." },
        { status: 429 }
      )
    }

    const { botId } = await params
    const { message, history = [], conversationId } = await req.json()

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Mensaje inválido" }, { status: 400 })
    }

    if (message.length > 1000) {
      return NextResponse.json({ error: "Mensaje demasiado largo (máx. 1000 caracteres)" }, { status: 400 })
    }

    const bot = await prisma.bot.findUnique({
      where: { id: botId },
      include: { sources: true },
    })

    if (!bot) {
      return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 })
    }

    // Limitar conversaciones mensuales en plan free
    const botUser = await prisma.user.findUnique({
      where: { id: bot.userId },
      select: { plan: true },
    })

    if (botUser?.plan === "free") {
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      const conversationsThisMonth = await prisma.conversation.count({
        where: { botId: bot.id, createdAt: { gte: startOfMonth } },
      })

      if (conversationsThisMonth >= 100) {
        return NextResponse.json(
          { error: "Este chatbot ha alcanzado el límite de 100 conversaciones mensuales del plan gratuito." },
          { status: 403 }
        )
      }
    }

    // Crear o recuperar conversación
    let convId = conversationId
    if (!convId) {
      const conv = await prisma.conversation.create({ data: { botId } })
      convId = conv.id
    }

    // Guardar mensaje del usuario
    await prisma.message.create({
      data: { conversationId: convId, role: "user", content: message },
    })

    let knowledgeContext = ""
    if (bot.sources.length > 0) {
      knowledgeContext = `\n\nINFORMACIÓN DEL NEGOCIO (usa esto para responder):\n`
      bot.sources.forEach((source) => {
        knowledgeContext += `\n--- ${source.title || source.type} ---\n${source.content}\n`
      })
    }

    const systemPrompt = `Eres el asistente virtual de ${bot.name}. ${bot.description || ""}
${bot.instructions ? `\nInstrucciones: ${bot.instructions}` : ""}
${knowledgeContext}
Responde siempre en el idioma del usuario. Sé conciso y útil. Si no sabes algo, dilo honestamente.`

    const recentHistory = history.slice(-10)

    const conversationMessages = [
      { role: "system", content: systemPrompt },
      ...recentHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ]

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: 500,
        messages: conversationMessages,
      }),
      signal: AbortSignal.timeout(15000),
    })

    if (!groqResponse.ok) {
      console.error(`Groq API error: ${groqResponse.status} ${groqResponse.statusText}`)
      return NextResponse.json({ error: "Error al procesar el mensaje. Inténtalo de nuevo." }, { status: 503 })
    }

    const data = await groqResponse.json()
    const reply = data.choices?.[0]?.message?.content

    if (!reply) {
      console.error("Groq returned empty response:", JSON.stringify(data))
      return NextResponse.json({ error: "No se pudo generar una respuesta." }, { status: 503 })
    }

    // Guardar respuesta del bot
    await prisma.message.create({
      data: { conversationId: convId, role: "assistant", content: reply },
    })

    return NextResponse.json({ reply, conversationId: convId })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
