module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    enabled: false,
    content: ['./src/**/*.html', './src/**/*.js', './src/**/*.jsx'],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')],
}
