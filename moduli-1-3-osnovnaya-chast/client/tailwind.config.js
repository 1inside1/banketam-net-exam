/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'shadow-card',
    {
      pattern: /banquet-(gold|peach|cream|red|green|ink|muted)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        banquet: {
          gold: '#DAA520',
          peach: '#FFDAB9',
          cream: '#FFFDD0',
          red: '#DC143C',
          green: '#006400',
          ink: '#000000',
          muted: '#006400',
        },
        primary: {
          50: '#FFFDD0',
          100: '#FFDAB9',
          200: '#FFDAB9',
          300: '#DAA520',
          400: '#DAA520',
          500: '#DC143C',
          600: '#DC143C',
          700: '#B01030',
          800: '#006400',
          900: '#004d00',
        }
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(218, 165, 32, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
