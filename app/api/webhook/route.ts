import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: "Webhook inválido" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any
    const userId = session.metadata?.userId

    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { plan: "pro" },
      })
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as any
    const customer = await stripe.customers.retrieve(subscription.customer)
    const email = (customer as any).email

    if (email) {
      await prisma.user.update({
        where: { email },
        data: { plan: "free" },
      })
    }
  }

  return NextResponse.json({ received: true })
}