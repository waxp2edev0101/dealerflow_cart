const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#5E78FF',
        background: '#F0F5FA',
        border: '#D9D9D9',
        orange: '#D76143',
        primary: '#4557B2',
        secondary: '#89C664',
        tertiary: '#3B2F66',
      },
      fontFamily: {
        sans: ['CircularStd', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}
