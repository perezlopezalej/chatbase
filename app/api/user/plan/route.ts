import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const user = await prisma.user.findUnique({
      where: { id: session.user?.id as string },
      select: { plan: true },
    })

    return NextResponse.json({ plan: user?.plan || "free" })
  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}