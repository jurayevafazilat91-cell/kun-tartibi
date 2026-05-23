import { useState, useEffect, useRef } from 'react'
import { DEFAULT_SCHEDULES, DAY_KEYS, DAY_LABELS, DAY_FULL, MONTHS, QUOTES, toMins } from './data'
import EditModal from './EditModal'
import AddModal from './AddModal'
import TimerModal from './TimerModal'
import StreakBadge from './StreakBadge'
import WeeklyStats from './WeeklyStats'
import Big3Goals from './Big3Goals'
import WorkoutPanel from './WorkoutPanel'

// ─── helpers ────────────────────────────────────────────────────────────────
function loadLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    const val = JSON.parse(raw)
    if (val === null || val === undefined) return fallback
    if (typeof fallback === 'object' && fallback !== null && !Array.isArray(fallback)) {
      if (typeof val !== 'object' || Array.isArray(val) || val === null) return fallback
    }
    return val
  } catch { return fallback }
}

// ─── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const todayJsDay  = new Date().getDay()
  const [selectedDay, setSelectedDay] = useState(todayJsDay)
  const [schedules,   setSchedules]   = useState(() => loadLS('kt_schedules', DEFAULT_SCHEDULES))
  const [checked,     setChecked]     = useState(() => loadLS('kt_checked',   {}))
  const [now,         setNow]         = useState(new Date())

  // NEW: Workout tab
  const [activeTab, setActiveTab] = useState('schedule') // 'schedule' | 'workout'

  // modals
  const [editModal,  setEditModal]  = useState(null)
  const [addModal,   setAddModal]   = useState(null)
  const [timerModal, setTimerModal] = useState(false)

  // streak, weekly stats, big 3 goals
  const [streak, setStreak] = useState(() => loadLS('kt_streak', { count: 0, lastDate: '' }))
  const [weekly, setWeekly] = useState(() => loadLS('kt_weekly', {}))
  const [goals,  setGoals]  = useState(() => loadLS('kt_goals',   {}))

  // timer state
  const [timerCustom,  setTimerCustom]  = useState(25)
  const [timerSecs,    setTimerSecs]    = useState(25 * 60)
  const [timerRunning, setTimerRunning] = useState(false)

  // reminder
  const [reminderOn, setReminderOn] = useState(true)

  // notification
  const [notif, setNotif] = useState(null)

  const timerRef    = useRef(null)
  const reminderRef = useRef(null)

  // ── clock ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(iv)
  }, [])

  // ── pwa ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  // ── persist ────────────────────────────────────────────────────────────────
  useEffect(() => { localStorage.setItem('kt_schedules', JSON.stringify(schedules)) }, [schedules])
  useEffect(() => { localStorage.setItem('kt_checked',   JSON.stringify(checked))   }, [checked])
  useEffect(() => { localStorage.setItem('kt_streak',    JSON.stringify(streak))    }, [streak])
  useEffect(() => { localStorage.setItem('kt_weekly',    JSON.stringify(weekly))    }, [weekly])
  useEffect(() => { localStorage.setItem('kt_goals',     JSON.stringify(goals))     }, [goals])

  // ── timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    clearInterval(timerRef.current)
    if (!timerRunning) return
    timerRef.current = setInterval(() => {
      setTimerSecs(s => {
        if (s <= 1) {
          setTimerRunning(false)
          showNotif('⏱️ Taymer tugadi! Yaxshi ish!', 'accent3')
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [timerRunning])

  // ── reminder ───────────────────────────────────────────────────────────────
  useEffect(() => {
    clearInterval(reminderRef.current)
    if (!reminderOn) return
    reminderRef.current = setInterval(() => {
      const n    = new Date()
      const mins = n.getHours() * 60 + n.getMinutes()
      if (n.getSeconds() !== 0) return
      const sched = schedules[DAY_KEYS[selectedDay]]
      sched.forEach(block => {
        const bMins = toMins(block.time)
        if (bMins === mins)        showNotif(`${block.emoji} Vaqt keldi: ${block.title}`, 'now')
        if (bMins - 5 === mins)   showNotif(`⚠️ 5 daqiqadan keyin: ${block.title}`, 'accent')
      })
    }, 1000)
    return () => clearInterval(reminderRef.current)
  }, [reminderOn, schedules, selectedDay])

  // ── derived ────────────────────────────────────────────────────────────────
  const dayKey  = DAY_KEYS[selectedDay]
  const sched   = schedules[dayKey]
  const nowMins = now.getHours() * 60 + now.getMinutes()

  const currentBlockIdx = selectedDay === todayJsDay
    ? (() => {
        for (let i = 0; i < sched.length; i++) {
          const start = toMins(sched[i].time)
          const next  = sched[i + 1] ?? sched[0]
          const end   = toMins(next.time)
          if (end > start) { if (nowMins >= start && nowMins < end) return i }
          else             { if (nowMins >= start || nowMins < end) return i }
        }
        return -1
      })()
    : -1

  const nextBlock     = currentBlockIdx >= 0 ? sched[currentBlockIdx + 1] : null
  const minsUntilNext = nextBlock ? (() => {
    let d = toMins(nextBlock.time) - nowMins
    if (d < 0) d += 1440
    return d
  })() : null

  const doneCount = sched.filter(b => !!checked[`${selectedDay}_${b.id}`]).length
  const pct       = sched.length ? Math.round((doneCount / sched.length) * 100) : 0
  const quote     = QUOTES[new Date().getDay() % QUOTES.length]

  // ── streak + weekly stats ──────────────────────────────────────────────────
  const todayStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`
  useEffect(() => {
    if (pct === 100 && streak.lastDate !== todayStr) {
      const yest = new Date(now)
      yest.setDate(yest.getDate() - 1)
      const yestStr = `${yest.getFullYear()}-${String(yest.getMonth()+1).padStart(2,'0')}-${String(yest.getDate()).padStart(2,'0')}`
      setStreak(s => ({
        count: s.lastDate === yestStr ? s.count + 1 : 1,
        lastDate: todayStr,
      }))
    }
    if (sched.length) {
      setWeekly(w => ({ ...w, [todayStr]: pct }))
    }
  }, [todayStr, pct, streak.lastDate, sched.length])

  // ── helpers ────────────────────────────────────────────────────────────────
  function showNotif(msg, color = 'accent') {
    setNotif({ msg, color })
    setTimeout(() => setNotif(null), 5000)
  }

  function toggleCheck(blockId) {
    const key = `${selectedDay}_${blockId}`
    setChecked(c => ({ ...c, [key]: !c[key] }))
  }

  // NEW: workout checkbox toggle
  function toggleWorkout(key) {
    setChecked(c => ({ ...c, [key]: !c[key] }))
  }

  function handleEditSave(dk, idx, updated) {
    setSchedules(s => {
      const copy = { ...s, [dk]: s[dk].map((b, i) => i === idx ? { ...b, ...updated } : b) }
      return copy
    })
    setEditModal(null)
    showNotif('✅ Saqlandi!', 'accent3')
  }

  function handleDelete(dk, idx) {
    setSchedules(s => ({ ...s, [dk]: s[dk].filter((_, i) => i !== idx) }))
    setEditModal(null)
    showNotif('🗑️ O\'chirildi', 'accent2')
  }

  function handleAdd(dk, block) {
    setSchedules(s => {
      const blocks = [...s[dk]]
      const newB   = { ...block, id: Date.now() }
      const idx    = blocks.findIndex(b => toMins(b.time) > toMins(newB.time))
      idx === -1 ? blocks.push(newB) : blocks.splice(idx, 0, newB)
      return { ...s, [dk]: blocks }
    })
    setAddModal(null)
    showNotif('➕ Yangi blok qo\'shildi!', 'accent3')
  }

  function resetDay() {
    setChecked(c => {
      const copy = { ...c }
      sched.forEach(b => delete copy[`${selectedDay}_${b.id}`])
      return copy
    })
    showNotif('🔄 Kun qayta boshlandi', 'accent')
  }

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen relative z-10">

      {/* NOTIFICATION */}
      {notif && (
        <div
          className="animate-notif fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl text-sm font-mono border"
          style={{
            background:   '#161625',
            borderColor:  notif.color === 'accent3' ? '#43e97b' : notif.color === 'now' ? '#ffd166' : '#6c63ff',
            color:        notif.color === 'accent3' ? '#43e97b' : notif.color === 'now' ? '#ffd166' : '#ddddf0',
            maxWidth: 320,
          }}
        >
          {notif.msg}
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-8 pb-24">

        {/* ── HEADER ── */}
        <div className="flex justify-between items-start mb-8 gap-4 flex-wrap">
          <div>
            <h1
              className="font-syne font-black text-4xl tracking-tight"
              style={{ background: 'linear-gradient(135deg,#ddddf0,#6c63ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Kun Tartibi
            </h1>
            <div className="text-xs mt-1 tracking-widest uppercase" style={{ color: '#4a4a6a' }}>
              {DAY_FULL[selectedDay]} · {dayKey === 'toq' ? 'Toq kun' : dayKey === 'juft' ? 'Juft kun' : 'Yakshanba'}
            </div>
          </div>
          <div className="text-right">
            <div className="font-syne font-bold text-3xl tracking-tight" style={{ color: '#ffd166' }}>
              {String(now.getHours()).padStart(2,'0')}:{String(now.getMinutes()).padStart(2,'0')}
              <span className="text-lg" style={{ color: '#4a4a6a' }}>:{String(now.getSeconds()).padStart(2,'0')}</span>
            </div>
            <div className="text-xs tracking-wide mt-1" style={{ color: '#4a4a6a' }}>
              {now.getDate()} {MONTHS[now.getMonth()]}
            </div>
          </div>
        </div>

        {/* ── CURRENT TASK BANNER ── */}
        {currentBlockIdx >= 0 && (
          <div
            className="mb-5 p-4 rounded-2xl border animate-ring-pulse"
            style={{ background: 'rgba(255,209,102,0.07)', borderColor: 'rgba(255,209,102,0.3)' }}
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <div className="text-xs uppercase tracking-widest mb-1" style={{ color: '#ffd166' }}>
                  ⚡ Hozir shu ishni qil
                </div>
                <div className="font-syne font-bold text-lg" style={{ color: '#ffd166' }}>
                  {sched[currentBlockIdx].emoji} {sched[currentBlockIdx].title}
                </div>
                {sched[currentBlockIdx].note && (
                  <div className="text-xs mt-1" style={{ color: '#4a4a6a' }}>
                    {sched[currentBlockIdx].note}
                  </div>
                )}
              </div>
              {minsUntilNext !== null && (
                <div className="text-right">
                  <div className="text-xs" style={{ color: '#4a4a6a' }}>Keyingisi</div>
                  <div className="font-syne font-bold text-2xl" style={{ color: '#ddddf0' }}>{minsUntilNext}m</div>
                  <div className="text-xs" style={{ color: '#4a4a6a' }}>qoldi</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── PROGRESS ── */}
        <div className="mb-6 p-5 rounded-2xl border" style={{ background: '#0f0f1a', borderColor: '#1e1e35' }}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs uppercase tracking-widest" style={{ color: '#4a4a6a' }}>Bugungi progress</span>
            <span className="font-syne font-bold text-xl" style={{ color: '#43e97b' }}>{pct}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#1e1e35' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: pct + '%', background: 'linear-gradient(90deg,#6c63ff,#43e97b)' }}
            />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { val: doneCount,               label: 'Bajarildi', color: '#43e97b' },
              { val: sched.length - doneCount, label: 'Qoldi',     color: '#6c63ff' },
              { val: sched.length,             label: 'Jami',      color: '#4a4a6a' },
            ].map(st => (
              <div key={st.label} className="rounded-xl p-3 text-center border" style={{ background: '#161625', borderColor: '#1e1e35' }}>
                <div className="font-syne font-bold text-2xl" style={{ color: st.color }}>{st.val}</div>
                <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: '#4a4a6a' }}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── STREAK + BIG 3 + WEEKLY ── */}
        <div className="grid gap-4 mb-6">
          <StreakBadge streak={streak} />
          <Big3Goals goals={goals} onUpdate={setGoals} />
          <WeeklyStats stats={weekly} />
        </div>

        {/* ── DAY TABS ── */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {DAY_LABELS.map((label, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-mono border transition-all duration-200"
              style={{
                background:  selectedDay === i ? (i === todayJsDay ? '#ffd166' : '#6c63ff') : '#0f0f1a',
                borderColor: selectedDay === i ? (i === todayJsDay ? '#ffd166' : '#6c63ff') : i === todayJsDay ? 'rgba(255,209,102,0.4)' : '#1e1e35',
                color:       selectedDay === i ? (i === todayJsDay ? '#070710' : '#fff')     : i === todayJsDay ? '#ffd166' : '#4a4a6a',
              }}
            >
              {label}{i === todayJsDay ? ' •' : ''}
            </button>
          ))}
        </div>

        {/* ── CONTENT TABS: Schedule | Mashg'ulotlar ── */}
        <div className="flex gap-2 mb-5">
          {[
            { key: 'schedule', label: '📅 Kun tartibi' },
            { key: 'workout',  label: '⚽ Mashg\'ulotlar' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex-1 py-2.5 rounded-xl text-xs font-mono border transition-all duration-200"
              style={{
                background:  activeTab === tab.key ? (tab.key === 'workout' ? '#43e97b' : '#6c63ff') : '#0f0f1a',
                borderColor: activeTab === tab.key ? (tab.key === 'workout' ? '#43e97b' : '#6c63ff') : '#1e1e35',
                color:       activeTab === tab.key ? '#070710' : '#4a4a6a',
                fontWeight:  activeTab === tab.key ? 700 : 400,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── SCHEDULE TAB ── */}
        {activeTab === 'schedule' && (
          <>
            <div className="flex flex-col gap-2 mb-6">
              {sched.map((block, i) => {
                const done      = !!checked[`${selectedDay}_${block.id}`]
                const isCurrent = i === currentBlockIdx
                return (
                  <div
                    key={block.id}
                    className="block-hover items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '100px 1fr auto auto',
                      background:   isCurrent ? 'rgba(255,209,102,0.06)' : '#0f0f1a',
                      borderColor:  isCurrent ? 'rgba(255,209,102,0.4)' : done ? 'rgba(67,233,123,0.2)' : '#1e1e35',
                      borderLeft:   `3px solid ${isCurrent ? '#ffd166' : done ? '#43e97b' : '#1e1e35'}`,
                      opacity:      done ? 0.55 : 1,
                    }}
                    onClick={() => toggleCheck(block.id)}
                  >
                    <div className="text-xs" style={{ color: isCurrent ? '#ffd166' : '#4a4a6a' }}>
                      {block.time}
                    </div>
                    <div>
                      <div
                        className="text-sm flex items-center gap-2 flex-wrap"
                        style={{ color: '#ddddf0', textDecoration: done ? 'line-through' : 'none' }}
                      >
                        <span>{block.emoji}</span>
                        <span>{block.title}</span>
                        {isCurrent && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full border"
                            style={{ background: 'rgba(255,209,102,0.1)', borderColor: 'rgba(255,209,102,0.3)', color: '#ffd166' }}
                          >
                            <span
                              className="inline-block w-1.5 h-1.5 rounded-full mr-1 align-middle animate-blink"
                              style={{ background: '#ffd166' }}
                            />
                            hozir
                          </span>
                        )}
                      </div>
                      {block.note && (
                        <div className="text-xs mt-0.5" style={{ color: '#4a4a6a' }}>{block.note}</div>
                      )}
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); setEditModal({ dayKey, blockIdx: i }) }}
                      className="text-xs px-2 py-1 rounded-lg border transition-all hover:border-accent"
                      style={{ borderColor: '#1e1e35', color: '#4a4a6a', background: 'transparent' }}
                    >
                      ✏️
                    </button>
                    <div
                      className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs flex-shrink-0 transition-all"
                      style={{
                        borderColor: done ? '#43e97b' : isCurrent ? '#ffd166' : '#1e1e35',
                        background:  done ? '#43e97b' : 'transparent',
                        color:       done ? '#070710' : 'transparent',
                      }}
                    >
                      {done ? '✓' : ''}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 flex-wrap mb-6">
              <button
                onClick={resetDay}
                className="px-4 py-2 rounded-full text-xs border font-mono transition-opacity hover:opacity-80"
                style={{ background: '#6c63ff', borderColor: '#6c63ff', color: '#fff' }}
              >
                🔄 Qayta boshlash
              </button>
              <button
                onClick={() => setAddModal(dayKey)}
                className="px-4 py-2 rounded-full text-xs border font-mono transition-all hover:border-accent3"
                style={{ background: '#0f0f1a', borderColor: '#1e1e35', color: '#4a4a6a' }}
              >
                ➕ Blok qo'shish
              </button>
              <button
                onClick={() => setTimerModal(true)}
                className="px-4 py-2 rounded-full text-xs border font-mono transition-all hover:border-now"
                style={{ background: '#0f0f1a', borderColor: '#1e1e35', color: timerRunning ? '#ffd166' : '#4a4a6a' }}
              >
                ⏱️ Taymer {timerRunning ? `(${String(Math.floor(timerSecs/60)).padStart(2,'0')}:${String(timerSecs%60).padStart(2,'0')})` : ''}
              </button>
              <button
                onClick={() => setReminderOn(r => !r)}
                className="px-4 py-2 rounded-full text-xs border font-mono transition-all"
                style={{
                  background:  '#0f0f1a',
                  borderColor: reminderOn ? 'rgba(67,233,123,0.4)' : '#1e1e35',
                  color:       reminderOn ? '#43e97b' : '#4a4a6a',
                }}
              >
                🔔 Eslatmalar {reminderOn ? 'yoq' : "o'ch"}
              </button>
            </div>
          </>
        )}

        {/* ── WORKOUT TAB ── */}
        {activeTab === 'workout' && (
          <WorkoutPanel
            dayType={dayKey}
            checked={checked}
            onToggle={toggleWorkout}
          />
        )}

        {/* ── QUOTE ── */}
        <div
          className="p-5 rounded-2xl border"
          style={{ background: '#0f0f1a', borderColor: '#1e1e35', borderLeft: '3px solid #6c63ff' }}
        >
          <div className="font-syne font-semibold text-sm leading-relaxed" style={{ color: '#ddddf0' }}>
            "{quote}"
          </div>
          <div className="text-xs mt-2" style={{ color: '#4a4a6a' }}>— Bugungi eslatma</div>
        </div>

      </div>

      {/* ── MODALS ── */}
      {editModal && (
        <EditModal
          block={schedules[editModal.dayKey][editModal.blockIdx]}
          onSave={updated => handleEditSave(editModal.dayKey, editModal.blockIdx, updated)}
          onDelete={() => handleDelete(editModal.dayKey, editModal.blockIdx)}
          onClose={() => setEditModal(null)}
        />
      )}
      {addModal && (
        <AddModal
          onAdd={block => handleAdd(addModal, block)}
          onClose={() => setAddModal(null)}
        />
      )}
      {timerModal && (
        <TimerModal
          timerSecs={timerSecs}
          timerRunning={timerRunning}
          timerCustom={timerCustom}
          onStart={() => setTimerRunning(true)}
          onPause={() => setTimerRunning(false)}
          onReset={() => { setTimerRunning(false); setTimerSecs(timerCustom * 60) }}
          onSetMins={m => { setTimerCustom(m); setTimerSecs(m * 60); setTimerRunning(false) }}
          onClose={() => setTimerModal(false)}
        />
      )}
    </div>
  )
}
