export default function BotLoading() {
  return (
    <div className="px-8 py-8">

      {/* Breadcrumb skeleton */}
      <div className="h-4 w-24 bg-white/10 rounded animate-pulse mb-8" />

      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 animate-pulse" />
          <div className="flex flex-col gap-2">
            <div className="h-7 w-48 bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-64 bg-white/5 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="h-6 w-16 bg-white/10 rounded animate-pulse mb-2" />
            <div className="h-3 w-32 bg-white/5 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Main grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-xl h-[560px] animate-pulse" />
        <div className="bg-white/5 border border-white/10 rounded-xl h-[560px] animate-pulse" />
      </div>

    </div>
  )
}