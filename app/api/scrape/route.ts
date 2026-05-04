import { NextResponse } from "next/server"
import { auth } from "@/auth"
import * as cheerio from "cheerio"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const { url } = await req.json()

    if (!url) {
      return NextResponse.json({ error: "URL requerida" }, { status: 400 })
    }

    // Validar que es una URL http/https válida
    let parsedUrl: URL
    try {
      parsedUrl = new URL(url)
    } catch {
      return NextResponse.json({ error: "URL no válida" }, { status: 400 })
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: "Solo se permiten URLs http y https" }, { status: 400 })
    }

    // Bloquear IPs internas y localhost
    const hostname = parsedUrl.hostname
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("172.")
    ) {
      return NextResponse.json({ error: "URL no permitida" }, { status: 400 })
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ChatBase-bot/1.0)",
      },
      signal: AbortSignal.timeout(10000), // timeout 10s
    })

    if (!response.ok) {
      return NextResponse.json({ error: "No se pudo acceder a la URL" }, { status: 400 })
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    $("script, style, nav, footer, header, iframe, img").remove()

    const text = $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 10000)

    const title = $("title").text().trim() || url

    return NextResponse.json({ title, content: text })
  } catch (error) {
    return NextResponse.json({ error: "Error al hacer scraping" }, { status: 500 })
  }
}
