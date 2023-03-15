/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'text-clip': 'text-clip 5s linear infinite',
        'bounce-in-up': 'bounce-in-up 0.5s ease-out',
        pulse: 'pulse 0.5s ease-out',
        'spin-slow': 'spin 20s linear infinite'
      },
      keyframes: {
        'text-clip': {
          to: { 'background-position': '200% center' }
        },
        'bounce-in-up': {
          '0%': { opacity: 0, transform: 'translate3d(0, 20px, 0)' },
          '60%': { opacity: 1, transform: 'translate3d(0, -25px, 0)' },
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
        }
      }
    }
  },
  plugins: []
}
