module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    enabled: false,
    content: [],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')],
}
