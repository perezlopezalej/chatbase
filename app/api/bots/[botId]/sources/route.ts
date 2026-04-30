import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { auth } from "@/auth"

const prisma = new PrismaClient()

// GET - obtener todas las fuentes de un bot
export async function GET(
  req: Request,
  { params }: { params: Promise<{ botId: string }> }
) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const { botId } = await params

    const sources = await prisma.knowledgeSource.findMany({
      where: { botId },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(sources)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener fuentes" }, { status: 500 })
  }
}

// POST - añadir una fuente nueva
export async function POST(
  req: Request,
  { params }: { params: Promise<{ botId: string }> }
) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const { botId } = await params
    const { type, title, content } = await req.json()

    if (!type || !content) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
    }

    const source = await prisma.knowledgeSource.create({
      data: { botId, type, title, content },
    })

    return NextResponse.json(source)
  } catch (error) {
    return NextResponse.json({ error: "Error al crear fuente" }, { status: 500 })
  }
}