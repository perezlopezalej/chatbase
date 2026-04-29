import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(
  req: Request,
  { params }: { params: Promise<{ botId: string }> }
) {
  try {
    const { botId } = await params
    const { message, history } = await req.json()

    const bot = await prisma.bot.findUnique({
      where: { id: botId },
    })

    if (!bot) {
      return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 })
    }

    const messages = [
      ...history.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ]

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: 500,
        messages: [
          {
            role: "system",
            content: bot.instructions || `Eres el asistente virtual de ${bot.name}. ${bot.description || ""}`,
          },
          ...messages,
        ],
      }),
    })

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || "Lo siento, no pude procesar tu mensaje."

    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}