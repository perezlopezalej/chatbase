"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function ChatPreview({ botId, botName }: { botId: string, botName: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: `¡Hola! Soy ${botName}. ¿En qué puedo ayudarte?` }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  async function sendMessage() {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setLoading(true)

    const res = await fetch(`/api/chat/${botId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    })

    const data = await res.json()
    setMessages(prev => [...prev, { role: "assistant", content: data.reply }])
    setLoading(false)
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl flex flex-col h-[560px]">

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
          <Bot className="w-4 h-4 text-violet-400" />
        </div>
        <div>
          <p className="text-sm font-medium">{botName}</p>
          <p className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
            En línea
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2.5 rounded-xl text-sm max-w-xs leading-relaxed ${
              msg.role === "user"
                ? "bg-violet-600/30 border border-violet-500/20 rounded-tr-none"
                : "bg-white/10 rounded-tl-none"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/10 rounded-xl rounded-tl-none px-4 py-3 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Escribe un mensaje..."
          className="bg-white/5 border-white/20 text-white placeholder:text-white/30"
        />
        <Button
          onClick={sendMessage}
          disabled={loading}
          className="bg-violet-600 hover:bg-violet-500 !text-white px-3 shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

    </div>
  )
}