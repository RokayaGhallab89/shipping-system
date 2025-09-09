/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // ✅ مهم علشان نتحكم بالوضع الليلي
  theme: {
    extend: {
      colors: {
        primary: "#1e40af", // لون مخصص
      },
    },
  },
  plugins: [],
}
