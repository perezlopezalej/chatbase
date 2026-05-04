import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { sendLeadNotification } from "@/lib/emails"

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: botId } = await params
    const { name, email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "El email es obligatorio" }, { status: 400 })
    }

    const bot = await prisma.bot.findUnique({
      where: { id: botId },
      select: { id: true, userId: true, name: true },
    })

    if (!bot) {
      return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 })
    }

    const owner = await prisma.user.findUnique({
      where: { id: bot.userId },
      select: { plan: true, email: true },
    })

    if (owner?.plan !== "pro") {
      return NextResponse.json({ error: "Función no disponible" }, { status: 403 })
    }

    const lead = await prisma.lead.create({
      data: { botId, name, email },
    })

    // Notificar al dueño del bot por email (no bloqueante)
    if (owner.email) {
      sendLeadNotification(owner.email, bot.name, name || "", email)
    }

    return NextResponse.json(lead)
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { id: botId } = await params

    const bot = await prisma.bot.findFirst({
      where: { id: botId, userId: session.user.id },
    })

    if (!bot) {
      return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 })
    }

    const leads = await prisma.lead.findMany({
      where: { botId },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(leads)
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
