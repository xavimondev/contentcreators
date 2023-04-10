import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'text-clip': 'text-clip 5s linear infinite',
        'bounce-in-up': 'bounce-in-up 0.5s ease-out',
        pulse: 'pulse 0.5s ease-out',
        'spin-slow': 'spin 20s linear infinite',
        'zoomIn': 'zoomIn 0.3s',
        'fadeIn': 'fadeIn 0.7s',
        enter: 'enter 200ms ease-out',
        leave: 'leave 150ms ease-in forwards'
      },
      keyframes: {
        'text-clip': {
          to: { 'background-position': '200% center' }
        },
        'bounce-in-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 20px, 0)' },
          '60%': { opacity: '1', transform: 'translate3d(0, -25px, 0)' },
          '75%': { transform: 'translate3d(0, 5px, 0)' },
          '90%': { transform: 'translate3d(0, -5px, 0)' },
          '100%': { transform: 'translateZ(0)' }
        },
        pulse: {
          '0%': { transform: 'scaleX(1)' },
          '50%': { transform: 'scale3d(1.05,1.05,1.05)' },
          '100%': { transform: 'scaleX(1)' }
        },
        spin: {
          '100%': { transform: 'rotate(1turn)' }
        },
        'zoomIn': {
          from: { opacity: '0', transform: 'scale3d(0.3, 0.3, 0.3)' },
          '50%': { opacity: '1' }
        },
        'fadeIn': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        enter: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        },
        leave: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.9)', opacity: 0 }
        }
      }
    }
  },
  plugins: []
} satisfies Config

