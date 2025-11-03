/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFC0CB',
          DEFAULT: '#FF69B4',
          dark: '#FF1493'
        },
        secondary: {
          light: '#E6E6FA',
          DEFAULT: '#9370DB',
          dark: '#8B008B'
        },
        accent: {
          pearl: '#F5F5F5',
          gold: '#FFD700'
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'sans-serif']
      }
    },
  },
  plugins: [],
}