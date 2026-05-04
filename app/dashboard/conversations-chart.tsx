"use client"

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface Props {
  data: { date: string; conversations: number }[]
}

export default function ConversationsChart({ data }: Props) {
  if (data.every(d => d.conversations === 0)) {
    return (
      <div className="flex items-center justify-center h-32 text-white/30 text-sm">
        Todavía no hay conversaciones esta semana
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
        <defs>
          <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tick={{ fill: "#ffffff40", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: "#ffffff40", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: "8px",
            color: "#fff",
            fontSize: "13px",
          }}
          labelStyle={{ color: "#a78bfa" }}
          formatter={(value, name) => [value, "Conversaciones"]}
        />
        <Area
          type="monotone"
          dataKey="conversations"
          stroke="#7c3aed"
          strokeWidth={2}
          fill="url(#colorConv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}