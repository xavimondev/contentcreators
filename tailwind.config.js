/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'text-clip': 'text-clip 5s linear infinite'
      },
      keyframes: {
        'text-clip': {
          to: { 'background-position': '200% center' }
        }
      }
    }
  },
  plugins: []
}
