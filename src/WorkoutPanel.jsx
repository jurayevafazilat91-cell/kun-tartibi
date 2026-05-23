import { useState } from 'react'

// ─── Ma'lumotlar ─────────────────────────────────────────────────────────────

const WORKOUT_DATA = {
  toq: {
    label: 'Kuch + Ball Mastery',
    color: '#6c63ff',
    sections: [
      {
        title: 'KUCH MASHQLARI',
        emoji: '🏋️',
        color: '#6c63ff',
        exercises: [
          { id: 'sq',  name: 'Squat',                    sets: '4×20',  note: 'Sekin tush 3 sek → tez qalq. Tizzalar barmoq yo\'nalishida.' },
          { id: 'lu',  name: 'Yon Lunges',               sets: '3×12',  note: 'Har oyoq. Lateral harakat uchun — chap himoyachining asosi.' },
          { id: 'nh',  name: 'Nordic Hamstring',         sets: '3×6',   note: 'SEKIN tush (5 sek). Divan ostiga oyoq tiq. Travmani 90% oldini oladi!' },
          { id: 'gb',  name: 'Glute Bridge (1 oyoq)',    sets: '3×12',  note: 'Har oyoq. Dumni QISIB ko\'tar. Yuqorida 1 sek ushla.' },
          { id: 'cr',  name: 'Calf Raises',              sets: '3×25',  note: 'Zinada tur. Sekin tush → tez qalq. 1 oyoqda qilsang 2x kuchli.' },
          { id: 'pu',  name: 'Push-up',                  sets: '3×15',  note: 'Duelda yelka kuchi. Ko\'krak to\'g\'ri chiziqda.' },
        ],
      },
      {
        title: 'CORE',
        emoji: '💪',
        color: '#a855f7',
        exercises: [
          { id: 'pl',  name: 'To\'g\'ri Plank',          sets: '3×60"', note: 'Tana to\'g\'ri chiziq. Qorin QISILIB tursin. Nafas to\'xtatma.' },
          { id: 'sp',  name: 'Yon Plank',                sets: '3×45"', note: 'Har tomon. Dum pastga tushmasin.' },
          { id: 'db',  name: 'Dead Bug',                 sets: '3×10',  note: 'Bel yerga tegib tursin. Qarama-qarshi qo\'l-oyoq.' },
        ],
      },
      {
        title: 'BALL MASTERY — CHAP OYOQ',
        emoji: '⚽',
        color: '#43e97b',
        exercises: [
          { id: 'wp',  name: 'Devorga pas (chap)',       sets: '200 ta', note: 'Past, o\'rta, baland. Chap oyoq "tilini" his qil.' },
          { id: 'hp',  name: 'Havodan pas (chap)',       sets: '50 ta',  note: 'To\'pni havoga ot → 1-2 yerga → chap oyoq bilan devorga ur.' },
          { id: 'ci',  name: 'Cut inside',               sets: '30 ta',  note: 'Chapga aldash → o\'ngga kesib o\'t → zarba. Marcelo uslubi.' },
          { id: 'ft',  name: '1-teginish pas',           sets: '100 ta', note: 'Hamkor bilan. Faqat 1 teginish — oldinga yo\'naltir.' },
          { id: 'tj',  name: 'Tennis to\'p juggling',    sets: '5 daqiqa', note: 'Kichik to\'p → asosiy to\'p oson tuyuladi.' },
        ],
      },
      {
        title: 'TEZLIK',
        emoji: '⚡',
        color: '#ffd166',
        exercises: [
          { id: 'es',  name: 'Explosive start sprinti',  sets: '10×10m', note: 'Dam: 30 sek. Birinchi 3 qadam KUCHLI. Tana 45° oldinga.' },
          { id: 'ls',  name: 'Lateral shuffle',          sets: '10×',    note: '5m chapga + 5m o\'ngga. Yelkang raqibga qarab tursin.' },
          { id: 'iv',  name: 'Interval yugurish 15/15',  sets: '15 marta', note: '15 sek max + 15 sek yurish. Aerob + anaerob ikkalasi.' },
        ],
      },
      {
        title: "CHO'ZISH — MAJBURIY ✅",
        emoji: '🧘',
        color: '#ff6584',
        exercises: [
          { id: 'qs',  name: 'Quad cho\'zish',           sets: '45"×2',  note: 'Orqaga bukib ushla. Tana tik. Har oyoq.' },
          { id: 'hs',  name: 'Hamstring cho\'zish',      sets: '45"×2',  note: 'Yerga yot. Oyoqni TO\'G\'RI ko\'tar. Har oyoq.' },
          { id: 'hf',  name: 'Hip Flexor cho\'zish',     sets: '45"×2',  note: 'Tizda tur (namoz holati). DUM QISIB tur. Har oyoq.' },
          { id: 'gs',  name: 'Glute cho\'zish (Figure-4)', sets: '45"×2', note: 'Bir oyoq ikkinchisi ustiga. Ko\'kragingga tort. Har oyoq.' },
          { id: 'ba',  name: 'Bel aylanma',              sets: '10+10',  note: 'Katta doira. Sekin. Bir tomonga 10, boshqasiga 10.' },
        ],
      },
    ],
  },

  juft: {
    label: 'Futbol Mashg\'uloti',
    color: '#43e97b',
    sections: [
      {
        title: 'MASHG\'ULOT OLDIDAN',
        emoji: '🍌',
        color: '#ffd166',
        exercises: [
          { id: 'pn',  name: 'Pre-training snack',       sets: '17:00',  note: 'Banan + yogurt. Mashg\'ulotdan 1.5 soat oldin. Energiya uchun.' },
          { id: 'hy',  name: 'Gidratatsiya',             sets: '500ml',  note: 'Mashg\'ulotdan 1 soat oldin suv ich.' },
        ],
      },
      {
        title: 'MASHG\'ULOTDA FOKUS',
        emoji: '⚽',
        color: '#43e97b',
        exercises: [
          { id: 'sc',  name: '3-nuqta Scan',             sets: 'Har pas', note: '5-6 sek oldin → 2-3 sek oldin 3 variant → to\'p kelganda FAQAT bajara.' },
          { id: 'wo',  name: 'Chap oyoq ishlatish',      sets: 'Maqsad',  note: 'Har imkonda chap oyoqdan foydalан. Zaif oyoq = sir qurol.' },
          { id: 'ov',  name: 'Overlap / Underlap',       sets: 'Vaziyat', note: 'Overlap: tashqaridan o\'t. Underlap: ichkaridan o\'t. Raqibni chalkаshtir.' },
          { id: 'cr2', name: 'Cross berish',             sets: 'Sifat',   note: 'Pastki cross → tezkor hujumchi. O\'rta → penalti nuqtasi. Kesuvchi → himoyachi ortidan.' },
          { id: 'rt',  name: 'Hujumdan qaytish',         sets: '5 sek',   note: 'Har hujumdan keyin 5 SONIYA ICHIDA pozitsiyangga qayt. Bu — professional belgisi.' },
        ],
      },
      {
        title: "MASHG'ULOTDAN KEYIN — MAJBURIY ✅",
        emoji: '🧘',
        color: '#ff6584',
        exercises: [
          { id: 'cd',  name: 'Sovuq dush',               sets: '2-3 daqiqa', note: 'Yallig\'lanishni kamaytiradi. Tiklaniшni 2x tezlashtiradi.' },
          { id: 'ro',  name: 'Tiklaniш ovqati',          sets: '30 daqiqa ichida', note: 'Tovuq + guruch. OLTIN OYNA — mushak tiklanishining eng muhim vaqti.' },
          { id: 'st',  name: 'Cho\'zish (13 daqiqa)',    sets: 'Majburiy', note: 'Quad → Hamstring → Hip Flexor → Glute → Bel aylanma. O\'TKAZMA!' },
          { id: 'wl',  name: 'Oyoqlarni devorga tiraб',  sets: '3 daqiqa', note: 'Yerga yot, oyoqlar devorga. Qon oqimini tiklaydi. Tiklaniшni 40% oshiradi.' },
        ],
      },
    ],
  },

  yakshanba: {
    label: 'MATCH DAY 🏟️',
    color: '#ffd166',
    sections: [
      {
        title: 'MATCH OLDI OVQATLANISH',
        emoji: '🍝',
        color: '#ffd166',
        exercises: [
          { id: 'mb',  name: 'Match oldi nonushta',      sets: '08:00',  note: 'Tuxum + non + banan. UGLEVODLAR 70%. Yog\' emas.' },
          { id: 'ml',  name: 'Asosiy ovqat (3-4 soat oldin)', sets: '12:00', note: 'Makaron/guruch + tovuq. Ko\'p uglevodlar. Kam yog\' va tola.' },
          { id: 'ms',  name: 'Snack (1.5 soat oldin)',   sets: '15:30',  note: 'Banan. Energiya uchun. Og\'ir taom emas.' },
        ],
      },
      {
        title: 'MATCH OLDI ISISH',
        emoji: '⚡',
        color: '#ff6584',
        exercises: [
          { id: 'dw',  name: 'Dinamik cho\'zish',        sets: '10 daqiqa', note: 'Bel aylanma ×20. Hip circles ×10. Oyoq silkish ×10.' },
          { id: 'as',  name: 'Isish sprinti',            sets: '5×',     note: 'Yengil, 60% tezlikda. Faqat isish uchun.' },
          { id: 'la',  name: 'Lateral shuffle',          sets: '5×',     note: 'Yon harakat. Tana pastda.' },
          { id: 'tp',  name: '1-teginish pas',           sets: '30 ta',  note: 'Devorga yoki hamkor bilan. Miya\'ni "o\'yin rejimiga" sol.' },
        ],
      },
      {
        title: 'MATCH MENTAL PROTOKOL',
        emoji: '🎯',
        color: '#6c63ff',
        exercises: [
          { id: 'vz',  name: 'Vizualizatsiya',           sets: '5 daqiqa', note: 'Ko\'zingni yum. Scan qilyapsan. Overlap qilyapsan. Cross beryapsan.' },
          { id: 'gm',  name: 'Maqsad yoz',               sets: '3 ta',   note: 'Masalan: "10 marta scan. Har hujumdan 5 sek ichida qaytaman. Chap oyoqdan 3 marta."' },
          { id: 'mu',  name: 'Sevimli musiqa',           sets: '2 soat',  note: 'Match oldidan. "Mode"ga kirish.' },
          { id: 'er',  name: 'Xato protokoli',           sets: 'Match',   note: 'Xato bo\'ldi → 3 SONIYA afsuslan → UNUT → keyingi harakatga o\'t.' },
        ],
      },
      {
        title: 'MATCH KEYIN TIKLANIШ',
        emoji: '🧊',
        color: '#0ea5e9',
        exercises: [
          { id: 'cs',  name: 'Sovuq dush (darhol)',      sets: '3 daqiqa', note: 'Match tugagandan 10 daqiqa ichida. Yallig\'lanishni kamaytiradi.' },
          { id: 'rm',  name: 'Tiklaniш ovqati',          sets: '30 daqiqa', note: 'Tovuq 150g + guruch 150g. OLTIN OYNA.' },
          { id: 'ps',  name: 'Cho\'zish (13 daqiqa)',    sets: 'Majburiy', note: 'Quad → Hamstring → Hip Flexor → Glute → Bel.' },
          { id: 'wa',  name: 'Oyoqlarni devorga tiraб',  sets: '5 daqiqa', note: 'Match keyin ko\'proq ushla. Qon oqimini tiklaydi.' },
          { id: 'sl',  name: 'Uxlash — 10 soat',        sets: '21:30',   note: 'Match kuni ko\'proq uyqu. Mushaklar tiklanadi. Bu — bepul performance boost.' },
        ],
      },
    ],
  },
}

// ─── Har bir mashq elementi ────────────────────────────────────────────────────
function ExerciseItem({ ex, done, onToggle }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{
        background: done ? 'rgba(67,233,123,0.04)' : '#161625',
        border: `1px solid ${done ? 'rgba(67,233,123,0.2)' : '#1e1e35'}`,
        borderRadius: 10,
        marginBottom: 6,
        opacity: done ? 0.6 : 1,
        transition: 'all 0.2s',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto',
          alignItems: 'center',
          gap: 8,
          padding: '10px 12px',
          cursor: 'pointer',
        }}
        onClick={() => setOpen(o => !o)}
      >
        <div>
          <div style={{
            fontSize: 13,
            color: done ? '#4a4a6a' : '#ddddf0',
            textDecoration: done ? 'line-through' : 'none',
            fontWeight: 500,
          }}>
            {ex.name}
          </div>
          <div style={{ fontSize: 11, color: '#6c63ff', fontFamily: 'monospace', marginTop: 2 }}>
            {ex.sets}
          </div>
        </div>

        <div style={{ fontSize: 10, color: '#4a4a6a' }}>
          {open ? '▲' : '▼'}
        </div>

        <div
          onClick={e => { e.stopPropagation(); onToggle() }}
          style={{
            width: 22, height: 22,
            borderRadius: '50%',
            border: `2px solid ${done ? '#43e97b' : '#1e1e35'}`,
            background: done ? '#43e97b' : 'transparent',
            color: done ? '#070710' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700,
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.2s',
          }}
        >
          {done ? '✓' : ''}
        </div>
      </div>

      {open && (
        <div style={{
          padding: '0 12px 10px',
          fontSize: 12,
          color: '#4a4a6a',
          lineHeight: 1.6,
          borderTop: '1px solid #1e1e35',
          paddingTop: 8,
        }}>
          💡 {ex.note}
        </div>
      )}
    </div>
  )
}

// ─── Asosiy komponent ─────────────────────────────────────────────────────────
export default function WorkoutPanel({ dayType, checked, onToggle }) {
  const [collapsed, setCollapsed] = useState({})

  const data = WORKOUT_DATA[dayType]
  if (!data) return null

  // Umumiy progress
  const allExercises = data.sections.flatMap(s => s.exercises)
  const doneCount    = allExercises.filter(ex => !!checked[`w_${dayType}_${ex.id}`]).length
  const totalCount   = allExercises.length
  const pct          = totalCount ? Math.round((doneCount / totalCount) * 100) : 0

  function toggleSection(sIdx) {
    setCollapsed(c => ({ ...c, [sIdx]: !c[sIdx] }))
  }

  return (
    <div style={{ marginBottom: 24 }}>

      {/* HEADER */}
      <div style={{
        background: '#0f0f1a',
        border: `1px solid ${data.color}33`,
        borderLeft: `3px solid ${data.color}`,
        borderRadius: 14,
        padding: '14px 16px',
        marginBottom: 12,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 10, color: '#4a4a6a', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 4 }}>
              ⚽ Mashg'ulotlar
            </div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16, color: data.color }}>
              {data.label}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 22, color: '#43e97b' }}>
              {pct}%
            </div>
            <div style={{ fontSize: 10, color: '#4a4a6a' }}>
              {doneCount}/{totalCount}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          height: 4, background: '#1e1e35', borderRadius: 4,
          marginTop: 10, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', borderRadius: 4,
            width: pct + '%',
            background: `linear-gradient(90deg, ${data.color}, #43e97b)`,
            transition: 'width 0.5s ease',
          }} />
        </div>
      </div>

      {/* SEKSIYALAR */}
      {data.sections.map((section, sIdx) => {
        const isCollapsed = collapsed[sIdx]
        const sectionDone = section.exercises.filter(ex => !!checked[`w_${dayType}_${ex.id}`]).length
        return (
          <div key={sIdx} style={{ marginBottom: 10 }}>
            {/* Section header */}
            <div
              onClick={() => toggleSection(sIdx)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 14px',
                background: '#0f0f1a',
                border: `1px solid ${section.color}22`,
                borderLeft: `3px solid ${section.color}`,
                borderRadius: isCollapsed ? 10 : '10px 10px 0 0',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>{section.emoji}</span>
                <span style={{
                  fontSize: 11, fontFamily: 'monospace',
                  color: section.color, letterSpacing: 2,
                  textTransform: 'uppercase',
                }}>
                  {section.title}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, color: '#4a4a6a', fontFamily: 'monospace' }}>
                  {sectionDone}/{section.exercises.length}
                </span>
                <span style={{ fontSize: 10, color: '#4a4a6a' }}>
                  {isCollapsed ? '▼' : '▲'}
                </span>
              </div>
            </div>

            {/* Exercises */}
            {!isCollapsed && (
              <div style={{
                padding: '10px 10px 4px',
                background: '#0a0a14',
                border: `1px solid ${section.color}11`,
                borderTop: 'none',
                borderRadius: '0 0 10px 10px',
              }}>
                {section.exercises.map(ex => (
                  <ExerciseItem
                    key={ex.id}
                    ex={ex}
                    done={!!checked[`w_${dayType}_${ex.id}`]}
                    onToggle={() => onToggle(`w_${dayType}_${ex.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
