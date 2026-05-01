import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Rate limiting simple en memoria
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minuto
  const maxRequests = 20 // máximo 20 mensajes por minuto por IP

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
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Demasiadas peticiones. Espera un momento." },
        { status: 429 }
      )
    }

    const { botId } = await params
    const { message, history = [] } = await req.json()

    if (!message || typeof message !== "string" || message.length > 1000) {
      return NextResponse.json({ error: "Mensaje inválido" }, { status: 400 })
    }

    const bot = await prisma.bot.findUnique({
      where: { id: botId },
      include: { sources: true },
    })

    if (!bot) {
      return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 })
    }

    // Construir contexto con las fuentes de conocimiento
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

    // Limitar historial a últimos 10 mensajes para no exceder tokens
    const recentHistory = history.slice(-10)

    const conversationMessages = [
      { role: "system", content: systemPrompt },
      ...recentHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ]

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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
    })

    const data = await response.json()
    const reply =
      data.choices?.[0]?.message?.content ||
      "Lo siento, no pude procesar tu mensaje."

    return NextResponse.json({ reply })
  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}