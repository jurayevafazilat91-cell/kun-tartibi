import { useState } from 'react'

export default function EditModal({ block, onSave, onDelete, onClose }) {
  const [form, setForm] = useState({ ...block })

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
            Blokni tahrirlash
          </div>
          <button onClick={onClose} style={{ color: '#4a4a6a', fontSize: 20 }}>✕</button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
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
              <label className="text-xs mb-1 block" style={{ color: '#4a4a6a' }}>Vaqt (HH:MM)</label>
              <input
                value={form.time}
                onChange={e => set('time', e.target.value)}
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
              className="w-full px-3 py-2 rounded-xl text-sm font-mono"
              style={{ background: '#161625', color: '#ddddf0', border: '1px solid #1e1e35', outline: 'none' }}
            />
          </div>

          <div>
            <label className="text-xs mb-1 block" style={{ color: '#4a4a6a' }}>Izoh</label>
            <textarea
              value={form.note}
              onChange={e => set('note', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-xl text-sm font-mono resize-none"
              style={{ background: '#161625', color: '#ddddf0', border: '1px solid #1e1e35', outline: 'none' }}
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => onSave(form)}
              className="flex-1 py-2.5 rounded-xl text-sm font-mono font-medium transition-opacity hover:opacity-90"
              style={{ background: '#6c63ff', color: '#fff' }}
            >
              ✅ Saqlash
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2.5 rounded-xl text-sm font-mono border transition-opacity hover:opacity-80"
              style={{ borderColor: '#ff6584', color: '#ff6584', background: 'transparent' }}
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
