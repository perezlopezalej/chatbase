import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const bot = await prisma.bot.findUnique({
      where: { id },
      select: {
        name: true,
        description: true,
        widgetColor: true,
        welcomeMessage: true,
      },
    })

    if (!bot) return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 })

    return NextResponse.json(bot)
  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}