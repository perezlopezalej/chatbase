import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

async function verifyBotOwnership(botId: string, userId: string) {
  const bot = await prisma.bot.findFirst({
    where: { id: botId, userId },
  })
  return !!bot
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const { id } = await params

    const isOwner = await verifyBotOwnership(id, session.user.id)
    if (!isOwner) return NextResponse.json({ error: "No autorizado" }, { status: 403 })

    const sources = await prisma.knowledgeSource.findMany({
      where: { botId: id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(sources)
  } catch {
    return NextResponse.json({ error: "Error al obtener fuentes" }, { status: 500 })
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const { id } = await params

    const isOwner = await verifyBotOwnership(id, session.user.id)
    if (!isOwner) return NextResponse.json({ error: "No autorizado" }, { status: 403 })

    const { type, title, content } = await req.json()

    if (!type || !content) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
    }

    const source = await prisma.knowledgeSource.create({
      data: { botId: id, type, title, content },
    })

    return NextResponse.json(source)
  } catch {
    return NextResponse.json({ error: "Error al crear fuente" }, { status: 500 })
  }
}
