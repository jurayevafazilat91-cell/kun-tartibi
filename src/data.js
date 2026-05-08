export const DEFAULT_SCHEDULES = {
  toq: [
    { id: 1,  time: '06:30', end: '07:00', title: "Uyg'onish + nonushta",     emoji: '⏰', note: '1 stakan iliq suv, sekin boshla' },
    { id: 2,  time: '07:00', end: '08:00', title: 'Sport zal / trening',       emoji: '🏋️', note: 'Ertalab — eng kuchli vaqt' },
    { id: 3,  time: '08:00', end: '08:30', title: 'Dush + kiyinish',           emoji: '🚿', note: '' },
    { id: 4,  time: '08:30', end: '12:00', title: "Vibe-coding o'rganish",     emoji: '💻', note: "Miya eng o'tkir — shu vaqtni asra" },
    { id: 5,  time: '12:00', end: '12:30', title: 'Tushlik',                   emoji: '🍽️', note: '' },
    { id: 6,  time: '12:30', end: '18:30', title: 'Universitet darslari',      emoji: '🎓', note: 'Telefon jim rejimida' },
    { id: 7,  time: '18:30', end: '20:30', title: 'Dasturlash kursi',          emoji: '💻', note: "To'liq diqqat" },
    { id: 8,  time: '20:30', end: '21:00', title: 'Kechki ovqat + oila',       emoji: '🍽️', note: 'Ekransiz suhbat' },
    { id: 9,  time: '21:00', end: '21:30', title: 'Kitob / Rivojlanish',       emoji: '📖', note: '' },
    { id: 10, time: '21:30', end: '22:15', title: 'Kundalik + ertangi reja',   emoji: '📓', note: 'Big 3 maqsadlarni yoz' },
    { id: 11, time: '22:15', end: '22:30', title: 'Yotishga tayyorlanish',     emoji: '🌙', note: 'Telefon uzoqda' },
    { id: 12, time: '22:30', end: '06:30', title: 'Uxlash',                    emoji: '😴', note: '8 soat uyqu ✅' },
  ],
  juft: [
    { id: 1, time: '07:15', end: '08:00', title: "Uyg'onish + nonushta",       emoji: '⏰', note: '1 stakan iliq suv' },
    { id: 2, time: '08:00', end: '12:00', title: "Vibe-coding o'rganish",      emoji: '💻', note: "Chuqur o'qish bloki" },
    { id: 3, time: '12:00', end: '12:30', title: 'Tushlik',                    emoji: '🍽️', note: '' },
    { id: 4, time: '12:30', end: '18:30', title: 'Universitet darslari',       emoji: '🎓', note: 'Telefon jim rejimida' },
    { id: 5, time: '18:30', end: '22:30', title: 'Futbol mashg\'uloti + qaytish', emoji: '⚽', note: "To'liq energiya ber!" },
    { id: 6, time: '22:30', end: '23:00', title: 'Dush + kechki ovqat',        emoji: '🚿', note: 'Oqsil: tuxum, suzma' },
    { id: 7, time: '23:00', end: '23:15', title: 'Qisqa kundalik',             emoji: '📓', note: '3 savol: yaxshi? yomon? ertaga?' },
    { id: 8, time: '23:15', end: '07:15', title: 'Uxlash',                     emoji: '😴', note: '8 soat uyqu ✅' },
  ],
  yakshanba: [
    { id: 1, time: '07:00', end: '08:00', title: 'Sekin ertalab',              emoji: '☕', note: 'Choy, kitob, shoshmasdan' },
    { id: 2, time: '08:00', end: '09:30', title: 'Yengil yugurish / yurish',   emoji: '🏃', note: 'Tabiatda' },
    { id: 3, time: '09:30', end: '12:00', title: 'Oila bilan vaqt',            emoji: '👨‍👩‍👦', note: '' },
    { id: 4, time: '12:00', end: '14:00', title: 'Tushlik + dam olish',        emoji: '🍽️', note: '' },
    { id: 5, time: '14:00', end: '17:00', title: 'Vibe-coding — erkin loyiha', emoji: '💻', note: 'Xohlaganingni qur' },
    { id: 6, time: '17:00', end: '20:30', title: 'Erkin vaqt',                 emoji: '🎮', note: "Do'stlar, sevimli mashg'ulot" },
    { id: 7, time: '20:30', end: '21:00', title: 'Haftalik yakun + reja',      emoji: '📓', note: 'Keyingi hafta Big 3' },
    { id: 8, time: '21:00', end: '21:30', title: 'Yotishga tayyorlanish',      emoji: '🌙', note: '' },
    { id: 9, time: '21:30', end: '07:00', title: 'Uxlash',                     emoji: '😴', note: '8 soat uyqu ✅' },
  ],
}

export const DAY_KEYS   = ['yakshanba','toq','juft','toq','juft','toq','juft']
export const DAY_LABELS = ['Ya','Du','Se','Ch','Pa','Ju','Sh']
export const DAY_FULL   = ['Yakshanba','Dushanba','Seshanba','Chorshanba','Payshanba','Juma','Shanba']
export const MONTHS     = ['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentabr','Oktabr','Noyabr','Dekabr']

export const QUOTES = [
  "Har kuni 1% yaxshiroq bo'l.",
  "Intizom — ozodlikning eng yuqori shakli.",
  "Erta turish — g'alaba qozonishning yarmi.",
  "Muvaffaqiyat — kunlik odatlar yig'indisi.",
  "Bugun qilmagan ishingni ertaga qilolmaysan.",
  "Kichik qadamlar katta manzillarga olib boradi.",
  "Harakat qilmasdan muvaffaqiyatga erishib bo'lmaydi.",
]

export function toMins(t) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}
