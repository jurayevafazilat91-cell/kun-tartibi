import { useState } from 'react'

export default function AddModal({ onAdd, onClose }) {
  const [form, setForm] = useState({ time: '08:00', end: '09:00', title: '', emoji: '📌', note: '' })
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center px-4"
      style={{ background: 'rgba(7,7,16,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border p-6 animate-fade-in"
        style={{ background: '#0f0f1a', borderColor: '#1e1e35' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <div className="font-syne font-bold text-lg" style={{ color: '#ddddf0' }}>
            Yangi blok qo'shish
          </div>
          <button onClick={onClose} style={{ color: '#4a4a6a', fontSize: 20 }}>✕</button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs mb-1 block" style={{ color: '#4a4a6a' }}>Emoji</label>
              <input
                value={form.emoji}
                onChange={e => set('emoji', e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-sm font-mono"
                style={{ background: '#161625', color: '#ddddf0', border: '1px solid #1e1e35', outline: 'none' }}
              />
            </div>
            <div>
              <label className="text-xs mb-1 block" style={{ color: '#4a4a6a' }}>Boshlanish</label>
              <input
                value={form.time}
                onChange={e => set('time', e.target.value)}
                placeholder="08:00"
                className="w-full px-3 py-2 rounded-xl text-sm font-mono"
                style={{ background: '#161625', color: '#ddddf0', border: '1px solid #1e1e35', outline: 'none' }}
              />
            </div>
            <div>
              <label className="text-xs mb-1 block" style={{ color: '#4a4a6a' }}>Tugash</label>
              <input
                value={form.end}
                onChange={e => set('end', e.target.value)}
                placeholder="09:00"
                className="w-full px-3 py-2 rounded-xl text-sm font-mono"
                style={{ background: '#161625', color: '#ddddf0', border: '1px solid #1e1e35', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label className="text-xs mb-1 block" style={{ color: '#4a4a6a' }}>Nomi</label>
            <input
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="Vazifa nomi..."
              className="w-full px-3 py-2 rounded-xl text-sm font-mono"
              style={{ background: '#161625', color: '#ddddf0', border: '1px solid #1e1e35', outline: 'none' }}
            />
          </div>

          <div>
            <label className="text-xs mb-1 block" style={{ color: '#4a4a6a' }}>Izoh (ixtiyoriy)</label>
            <input
              value={form.note}
              onChange={e => set('note', e.target.value)}
              placeholder="Qo'shimcha ma'lumot..."
              className="w-full px-3 py-2 rounded-xl text-sm font-mono"
              style={{ background: '#161625', color: '#ddddf0', border: '1px solid #1e1e35', outline: 'none' }}
            />
          </div>

          <button
            onClick={() => form.title && onAdd(form)}
            className="w-full py-2.5 rounded-xl text-sm font-mono font-medium mt-1 transition-opacity"
            style={{
              background: form.title ? '#43e97b' : '#1e1e35',
              color: form.title ? '#070710' : '#4a4a6a',
              cursor: form.title ? 'pointer' : 'not-allowed',
            }}
          >
            ➕ Qo'shish
          </button>
        </div>
      </div>
    </div>
  )
}
