export default function DashboardLoading() {
  return (
    <div className="px-8 py-8">

      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
        <div className="flex flex-col gap-2">
          <div className="h-7 w-40 bg-white/10 rounded-lg animate-pulse" />
          <div className="h-4 w-64 bg-white/5 rounded-lg animate-pulse" />
        </div>
        <div className="h-10 w-36 bg-white/10 rounded-lg animate-pulse" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/10 animate-pulse shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-6 w-12 bg-white/10 rounded animate-pulse" />
              <div className="h-3 w-24 bg-white/5 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Bots skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="border border-white/10 bg-white/5 rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-white/10 animate-pulse" />
              <div className="h-5 w-14 bg-white/10 rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-5 w-36 bg-white/10 rounded animate-pulse" />
              <div className="h-3 w-48 bg-white/5 rounded animate-pulse" />
            </div>
            <div className="h-3 w-24 bg-white/5 rounded animate-pulse mt-2" />
          </div>
        ))}
      </div>

    </div>
  )
}