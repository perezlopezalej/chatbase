import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

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

    const lead = await prisma.lead.create({
      data: { botId, name, email },
    })

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
    const { id: botId } = await params

    const leads = await prisma.lead.findMany({
      where: { botId },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(leads)
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}