module.exports = {
  native: true,
  typescript: true,
  plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
  svgo: true,
  replaceAttrValues: {
    "#000": "currentColor"
  },
  svgoConfig: {
    plugins: [
      "preset-default",
      "convertStyleToAttrs"
    ]
  }
}