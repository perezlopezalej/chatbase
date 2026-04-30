import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; sourceId: string }> }
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