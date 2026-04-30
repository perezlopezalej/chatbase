import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { auth } from "@/auth"

const prisma = new PrismaClient()

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ botId: string; sourceId: string }> }
) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const { sourceId } = await params

    await prisma.knowledgeSource.delete({
      where: { id: sourceId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar fuente" }, { status: 500 })
  }
}