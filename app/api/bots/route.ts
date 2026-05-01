import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true },
    })

    // Limitar a 1 bot en plan free
    if (user?.plan === "free") {
      const botCount = await prisma.bot.count({
        where: { userId: session.user.id },
      })
      if (botCount >= 1) {
        return NextResponse.json(
          { error: "Has alcanzado el límite de tu plan gratuito. Actualiza a Pro para crear más chatbots." },
          { status: 403 }
        )
      }
    }

    const { name, description, instructions } = await req.json()

    if (!name) {
      return NextResponse.json({ error: "El nombre es obligatorio" }, { status: 400 })
    }

    const bot = await prisma.bot.create({
      data: {
        name,
        description,
        instructions,
        userId: session.user.id,
      },
    })

    return NextResponse.json(bot, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}