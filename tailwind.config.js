/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 2s linear infinite",
        "pinwheel": "spin 2s cubic-bezier(0.65, 0.03, 0.58, 1) infinite;",
      },
    },
  },
  plugins: [],
}
