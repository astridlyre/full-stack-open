module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx"],
  },
  theme: {
    fontFamily: {
      display: ["Montserrat"],
    },
    extend: {},
  },
  variants: {},
  plugins: [require("@tailwindcss/custom-forms")],
};