export default function SettingsLoading() {
  return (
    <div className="px-4 md:px-8 py-6 md:py-8 animate-pulse">
      <div className="mb-8 pb-6 border-b border-white/10">
        <div className="h-8 bg-white/10 rounded-lg w-48 mb-2" />
        <div className="h-4 bg-white/5 rounded w-64" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 h-48" />
          ))}
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 h-48" />
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 h-40" />
        </div>
      </div>
    </div>
  )
}
