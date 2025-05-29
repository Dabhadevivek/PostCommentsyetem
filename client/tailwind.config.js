/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        indigo: {
          600: '#4F46E5',
          800: '#3730A3',
        },
        cyan: {
          400: '#22D3EE',
          500: '#06B6D4',
        },
      },
    },
  },
  plugins: [],
} 