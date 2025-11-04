/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF69B4',
          dark: '#E91E63',
          light: '#FFB6C1'
        },
        secondary: {
          DEFAULT: '#9C27B0',
          dark: '#7B1FA2',
          light: '#E1BEE7'
        },
        accent: {
          pearl: '#FFFBFE',
          lavender: '#F3E5F5'
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121'
        }
      },
      spacing: {
        'safe': 'env(safe-area-inset-bottom)',
        'safe-top': 'env(safe-area-inset-top)',
        '18': '4.5rem', // 72px for bottom nav height
        '22': '5.5rem'  // 88px for combined spacing
      },
      boxShadow: {
        'ios': '0 -2px 10px rgba(0, 0, 0, 0.08)',
        'ios-card': '0 2px 8px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
}