module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.js'],
  },
  theme: {
    colors: {
      light: '#eef2ed',
      dark: '#2d374a',
      'l-accent': '#8ec3c7',
      'd-accent': '#b8672e',
      brand: '#f4b01e',
    },
    fontFamily: {
      display: 'Montserrat',
    },
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')],
}
