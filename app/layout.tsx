import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "ChatBase — Chatbot con IA para tu negocio",
  description: "Crea un asistente virtual con IA para tu negocio en minutos. Sin código. Responde preguntas de tus clientes 24/7 automáticamente. Empieza gratis.",
  keywords: ["chatbot", "IA", "inteligencia artificial", "asistente virtual", "negocio local", "atención al cliente automática"],
  authors: [{ name: "ChatBase" }],
  openGraph: {
    title: "ChatBase — Tu negocio con un asistente inteligente 24/7",
    description: "Crea un chatbot con IA para tu negocio en minutos. Sin código. Empieza gratis.",
    url: "https://chatbase-theta.vercel.app",
    siteName: "ChatBase",
    type: "website",
    images: [
      {
        url: "https://chatbase-theta.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "ChatBase — Chatbot con IA para tu negocio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatBase — Tu negocio con un asistente inteligente 24/7",
    description: "Crea un chatbot con IA para tu negocio en minutos. Sin código. Empieza gratis.",
    images: ["https://chatbase-theta.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
