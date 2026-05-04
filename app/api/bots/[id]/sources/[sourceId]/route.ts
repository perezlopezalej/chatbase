import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; sourceId: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { id: botId, sourceId } = await params

    // Verificar que el bot pertenece al usuario antes de borrar la fuente
    const bot = await prisma.bot.findFirst({
      where: { id: botId, userId: session.user.id },
    })

    if (!bot) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    // Verificar que la fuente pertenece a este bot
    const source = await prisma.knowledgeSource.findFirst({
      where: { id: sourceId, botId },
    })

    if (!source) {
      return NextResponse.json({ error: "Fuente no encontrada" }, { status: 404 })
    }

    await prisma.knowledgeSource.delete({
      where: { id: sourceId },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Error al eliminar fuente" }, { status: 500 })
  }
}
