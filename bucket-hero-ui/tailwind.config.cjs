/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx}",
    "./src/components/**/*/{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      height: {
        '128' : '32rem'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
