import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'text-clip': 'text-clip 5s linear infinite',
        pulse: 'pulse 0.5s ease-out',
        'spin-slow': 'spin 20s linear infinite',
        'fadeIn': 'fadeIn 0.7s'
      },
      keyframes: {
        'text-clip': {
          to: { 'background-position': '200% center' }
        },
        pulse: {
          '0%': { transform: 'scaleX(1)' },
          '50%': { transform: 'scale3d(1.05,1.05,1.05)' },
          '100%': { transform: 'scaleX(1)' }
        },
        spin: {
          '100%': { transform: 'rotate(1turn)' }
        },
        'fadeIn': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      }
    }
  },
  plugins: []
} satisfies Config

