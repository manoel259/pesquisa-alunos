/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        aba: {
          dark: '#0C1E40',
          primary: '#0072CE',
          light: '#E5F2FF',
        },
      },
    },
  },
  plugins: [],
}
