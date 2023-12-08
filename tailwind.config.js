/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      primary: ['Outfit', 'sans-serif']
    },
    extend: {
      colors: {
        primary: '#ff4500',
        secondary: '#0079d3'
      }
    },
  },
  plugins: [],
}

