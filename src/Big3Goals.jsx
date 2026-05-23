import { useState } from 'react'

export default function Big3Goals({ goals, onUpdate }) {
  const [newGoal, setNewGoal] = useState('')

  const today = new Date().toISOString().slice(0, 10)
  const safeGoals = goals && typeof goals === 'object' && !Array.isArray(goals) ? goals : {}
  const todayGoals = safeGoals[today] ?? []

  function toggle(idx) {
    const copy = [...todayGoals]
    copy[idx] = { ...copy[idx], done: !copy[idx].done }
    onUpdate({ ...safeGoals, [today]: copy })
  }

  function add() {
    if (!newGoal.trim() || todayGoals.length >= 3) return
    onUpdate({
      ...safeGoals,
      [today]: [...todayGoals, { text: newGoal.trim(), done: false }],
    })
    setNewGoal('')
  }

  function remove(idx) {
    onUpdate({ ...safeGoals, [today]: todayGoals.filter((_, i) => i !== idx) })
  }

  return (
    <div
      className="p-4 rounded-2xl border"
      style={{
        background: '#0f0f1a',
        borderColor: '#1e1e35',
        borderLeft: '3px solid #6c63ff',
      }}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="text-xs uppercase tracking-widest" style={{ color: '#4a4a6a' }}>
          🎯 Bugungi Big 3
        </div>
        <div className="text-xs font-mono" style={{ color: '#4a4a6a' }}>
          {todayGoals.filter((g) => g.done).length}/3
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {todayGoals.map((g, i) => (
          <div key={i} className="flex items-center gap-2">
            <button
              onClick={() => toggle(i)}
              className="w-5 h-5 rounded border flex items-center justify-center text-xs flex-shrink-0 transition-all"
              style={{
                borderColor: g.done ? '#43e97b' : '#1e1e35',
                background: g.done ? '#43e97b' : 'transparent',
                color: g.done ? '#070710' : 'transparent',
              }}
            >
              {g.done ? '✓' : ''}
            </button>
            <span
              className="text-sm flex-1"
              style={{
                color: g.done ? '#4a4a6a' : '#ddddf0',
                textDecoration: g.done ? 'line-through' : 'none',
              }}
            >
              {g.text}
            </span>
            <button onClick={() => remove(i)} className="text-xs px-1" style={{ color: '#4a4a6a' }}>
              ✕
            </button>
          </div>
        ))}
        {todayGoals.length < 3 && (
          <div className="flex gap-2 mt-1">
            <input
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && add()}
              placeholder="Yangi maqsad..."
              className="flex-1 px-3 py-1.5 rounded-lg text-xs font-mono"
              style={{
                background: '#161625',
                color: '#ddddf0',
                border: '1px solid #1e1e35',
                outline: 'none',
              }}
            />
            <button
              onClick={add}
              className="px-3 py-1.5 rounded-lg text-xs font-mono transition-opacity hover:opacity-90"
              style={{ background: '#6c63ff', color: '#fff' }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
