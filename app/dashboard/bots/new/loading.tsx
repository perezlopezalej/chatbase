export default function NewBotLoading() {
  return (
    <div className="px-8 py-8">
      <div className="h-4 w-32 bg-white/10 rounded animate-pulse mb-8" />
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
        <div className="w-12 h-12 rounded-xl bg-white/10 animate-pulse" />
        <div className="flex flex-col gap-2">
          <div className="h-7 w-48 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-40 bg-white/5 rounded animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl h-48 animate-pulse" />
          <div className="bg-white/5 border border-white/10 rounded-xl h-72 animate-pulse" />
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl h-48 animate-pulse" />
          <div className="bg-white/5 border border-white/10 rounded-xl h-64 animate-pulse" />
        </div>
      </div>
    </div>
  )
}