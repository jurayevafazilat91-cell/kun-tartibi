const PRESETS = [5, 10, 15, 25, 30, 45, 60]
const RADIUS  = 54
const CIRC    = 2 * Math.PI * RADIUS

export default function TimerModal({
  timerSecs, timerRunning, timerCustom,
  onStart, onPause, onReset, onSetMins, onClose,
}) {
  const m = String(Math.floor(timerSecs / 60)).padStart(2, '0')
  const s = String(timerSecs % 60).padStart(2, '0')
  const dashOffset = CIRC * (1 - timerSecs / (timerCustom * 60))

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center px-4"
      style={{ background: 'rgba(7,7,16,0.9)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border p-6 animate-fade-in"
        style={{ background: '#0f0f1a', borderColor: '#1e1e35' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="font-syne font-bold text-lg" style={{ color: '#ddddf0' }}>
            ⏱️ Pomodoro Taymer
          </div>
          <button onClick={onClose} style={{ color: '#4a4a6a', fontSize: 20 }}>✕</button>
        </div>

        {/* Ring */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="70" cy="70" r={RADIUS} fill="none" stroke="#1e1e35" strokeWidth="6" />
              <circle
                cx="70" cy="70" r={RADIUS} fill="none"
                stroke="#ffd166" strokeWidth="6"
                strokeDasharray={CIRC}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="timer-ring"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="font-syne font-black text-4xl tracking-tight" style={{ color: '#ffd166' }}>
                {m}:{s}
              </div>
              <div className="text-xs mt-1" style={{ color: '#4a4a6a' }}>
                {timerRunning ? 'ishlayapti...' : 'tayyor'}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-5">
          <button
            onClick={timerRunning ? onPause : onStart}
            className="flex-1 py-2.5 rounded-xl font-mono text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: '#ffd166', color: '#070710' }}
          >
            {timerRunning ? '⏸ Pauza' : '▶ Boshlash'}
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2.5 rounded-xl font-mono text-sm border transition-opacity hover:opacity-80"
            style={{ borderColor: '#1e1e35', color: '#4a4a6a', background: 'transparent' }}
          >
            🔄
          </button>
        </div>

        {/* Presets */}
        <div>
          <div className="text-xs mb-2 uppercase tracking-wider" style={{ color: '#4a4a6a' }}>
            Vaqt tanlash (daqiqa)
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map(mins => (
              <button
                key={mins}
                onClick={() => onSetMins(mins)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono border transition-all"
                style={{
                  background:   timerCustom === mins ? '#ffd166' : '#161625',
                  borderColor:  timerCustom === mins ? '#ffd166' : '#1e1e35',
                  color:        timerCustom === mins ? '#070710' : '#4a4a6a',
                }}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
