/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bb: {
          headerBg: '#e6edf8',
          pageBg: '#f5f5f5',
          navy: '#28369a',
          navyDark: '#1b2264',
          blue: '#324dc7',
          blueLight: '#4259d2',
          yellow: '#ffd54a',
          yellowDark: '#f5c426',
          border: '#d1d5db',
          gray: '#6b7280',
          textDark: '#1e1e1e',
          reviewRed: '#c62828',
          mintGreen: '#d6e8d6',
          breakBg: '#0a0d14',
          softBlue: '#eef0fb',
        },
      },
      fontFamily: {
        serif: ['"Crimson Text"', '"Noto Serif"', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', '"Helvetica Neue"', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
        mono: ['"Courier Prime"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      boxShadow: {
        modal: '0 8px 24px rgba(0,0,0,0.15)',
        popover: '0 4px 16px rgba(0,0,0,0.18)',
      },
      keyframes: {
        loaderDot: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)' },
        },
      },
      animation: {
        loaderDot: 'loaderDot 1.4s infinite ease-in-out both',
        confetti: 'confettiFall linear infinite',
      },
    },
  },
  plugins: [],
};
