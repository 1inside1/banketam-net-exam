/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'shadow-card',
    {
      pattern: /banquet-(navy|ink|cream|sand|taupe|wine|gold|muted|error|wine-dark)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        banquet: {
          navy: '#1A2332',
          ink: '#2C3344',
          cream: '#FAF8F5',
          sand: '#E8E2D9',
          taupe: '#8B7355',
          wine: '#7B3B4B',
          'wine-dark': '#5E2D38',
          gold: '#C4A35A',
          muted: '#6B7280',
          error: '#B42318',
        },
        primary: {
          50: '#F9F5F6',
          100: '#F0E4E7',
          200: '#E1C9CF',
          300: '#C995A3',
          400: '#A85F73',
          500: '#7B3B4B',
          600: '#7B3B4B',
          700: '#5E2D38',
          800: '#452129',
          900: '#1A2332',
        }
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(26, 35, 50, 0.08)',
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
