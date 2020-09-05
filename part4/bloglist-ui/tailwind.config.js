module.exports = {
  purge: {
    enabled: false,
    content: ['./src/**/*.js'],
  },
  theme: {
    extend: {
      colors: {
        light: '#eef2ed',
        dark: '#2d374a',
        'l-accent': '#8ec3c7',
        'd-accent': '#b8672e',
        brand: '#f4b01e',
      },
    },
    fontFamily: {
      display: 'Montserrat',
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')],
}
