import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import "@/lib/env"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "ChatBase — Tu negocio con un asistente inteligente 24/7",
  description: "Crea un chatbot personalizado con la información de tu negocio y añádelo a tu web en minutos. Sin código.",
  openGraph: {
    title: "ChatBase — Tu negocio con un asistente inteligente 24/7",
    description: "Crea un chatbot personalizado con la información de tu negocio y añádelo a tu web en minutos.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}