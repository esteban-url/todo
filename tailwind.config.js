module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
    // defaultLineHeights: true,
    // standardFontWeights: true
  },
  purge: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {},
  },
  variants: { opacity: ["responsive", "hover", "focus", "group-hover"] },
  plugins: [],
}
