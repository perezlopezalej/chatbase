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

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ChatBase-bot/1.0)",
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "No se pudo acceder a la URL" }, { status: 400 })
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Eliminar scripts, estilos y elementos no útiles
    $("script, style, nav, footer, header, iframe, img").remove()

    // Extraer texto limpio
    const text = $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 10000) // máximo 10k caracteres

    const title = $("title").text().trim() || url

    return NextResponse.json({ title, content: text })
  } catch (error) {
    return NextResponse.json({ error: "Error al hacer scraping" }, { status: 500 })
  }
}