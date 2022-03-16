module.exports = {
  trailingComma: "none",
  tabWidth: 2,
  semi: false,
  singleQuote: false,
  printWidth: 88,
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("prettier-plugin-organize-imports")
  ]
}
