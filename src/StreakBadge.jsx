export default function StreakBadge({ streak }) {
  const safe = streak ?? { count: 0, lastDate: '' }
  const today = new Date().toISOString().slice(0, 10)
  const isToday = safe.lastDate === today

  return (
    <div
      className="flex items-center gap-3 p-4 rounded-2xl border"
      style={{
        background: '#0f0f1a',
        borderColor: '#1e1e35',
        borderLeft: '3px solid #ff6584',
      }}
    >
      <div className="text-3xl">🔥</div>
      <div>
        <div className="font-syne font-bold text-xl" style={{ color: '#ff6584' }}>
          {safe.count} kun
        </div>
        <div className="text-xs" style={{ color: '#4a4a6a' }}>
          {isToday ? 'Bugun ham bajarildi!' : 'Buguni ham bajaring!'}
        </div>
      </div>
    </div>
  )
}
