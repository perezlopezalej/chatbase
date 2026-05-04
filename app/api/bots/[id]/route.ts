import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const { id } = await params

    const bot = await prisma.bot.findFirst({
      where: { id, userId: session.user.id },
    })

    if (!bot) return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 })

    return NextResponse.json(bot)
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const { id } = await params
    const { name, description, instructions, widgetColor, welcomeMessage, captureLeads } = await req.json()

    // Verificar el plan del usuario — solo Pro puede cambiar features premium
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true },
    })

    const isPro = user?.plan === "pro"

    // Construir el objeto de datos según el plan
    const updateData: Record<string, unknown> = { name, description, instructions }

    if (isPro) {
      // Solo Pro puede cambiar estas propiedades
      if (widgetColor !== undefined) updateData.widgetColor = widgetColor
      if (welcomeMessage !== undefined) updateData.welcomeMessage = welcomeMessage
      if (captureLeads !== undefined) updateData.captureLeads = captureLeads
    }

    const bot = await prisma.bot.updateMany({
      where: { id, userId: session.user.id },
      data: updateData,
    })

    return NextResponse.json(bot)
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const { id } = await params

    await prisma.bot.deleteMany({
      where: { id, userId: session.user.id },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
