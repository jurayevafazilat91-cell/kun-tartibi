/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bg:       '#070710',
        surface:  '#0f0f1a',
        surface2: '#161625',
        border:   '#1e1e35',
        accent:   '#6c63ff',
        accent2:  '#ff6584',
        accent3:  '#43e97b',
        now:      '#ffd166',
        muted:    '#4a4a6a',
        textc:    '#ddddf0',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        blink:   { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.2 } },
        notifSlide: { '0%': { transform: 'translateX(100%)', opacity: 0 }, '100%': { transform: 'translateX(0)', opacity: 1 } },
        ringPulse: {
          '0%':   { boxShadow: '0 0 0 0 rgba(255,209,102,0.5)' },
          '70%':  { boxShadow: '0 0 0 10px rgba(255,209,102,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255,209,102,0)' },
        },
      },
      animation: {
        'fade-in':    'fadeIn 0.3s ease',
        'slide-up':   'slideUp 0.3s ease',
        'blink':      'blink 1s infinite',
        'notif':      'notifSlide 0.4s ease',
        'ring-pulse': 'ringPulse 1.5s ease-out infinite',
      },
    },
  },
  plugins: [],
}
