/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter var']
      }
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        'html': { fontSize: "0.9rem" },
      })
    }),
  ],
}