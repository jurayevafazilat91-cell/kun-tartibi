export default function WeeklyStats({ stats }) {
  const days = []
  const today = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    days.push(d)
  }
  const labels = ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh']

  return (
    <div
      className="p-4 rounded-2xl border"
      style={{ background: '#0f0f1a', borderColor: '#1e1e35' }}
    >
      <div className="text-xs uppercase tracking-widest mb-3" style={{ color: '#4a4a6a' }}>
        📊 Haftalik statistika
      </div>
      <div className="flex items-end gap-2 h-24">
        {days.map((d, i) => {
          const key = d.toISOString().slice(0, 10)
          const val = (stats && typeof stats === 'object' ? stats[key] : null) ?? 0
          const h = Math.max((val / 100) * 80, 4)
          const isToday = i === 6
          return (
            <div key={key} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-md transition-all"
                style={{
                  height: `${h}px`,
                  background: isToday ? '#43e97b' : '#6c63ff',
                  opacity: val > 0 ? 1 : 0.25,
                }}
              />
              <div
                className="text-[10px] font-mono"
                style={{ color: isToday ? '#ffd166' : '#4a4a6a' }}
              >
                {labels[d.getDay()]}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
