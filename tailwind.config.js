/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 2px 4px rgba(0, 0, 0, 0.05)'
      }
    },
  },
  plugins: [],
}