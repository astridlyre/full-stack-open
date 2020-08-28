module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx"],
  theme: {
    fontFamily: {
      display: "Raleway",
    },
    extend: {},
  },
  variants: {},
  plugins: [require("@tailwindcss/custom-forms")],
};
