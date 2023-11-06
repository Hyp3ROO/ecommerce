/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      gridTemplateColumns: {
        fill: 'repeat(auto-fill, 80px)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
