/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans"],
      },
      colors: {
        gray: {
          900: "#0E0F0F",
          800: "#141617",
          700: "#1B1D1F",
          600: "#24272A",
          500: "#303439",
        },
      },
    },
  },
  plugins: [],
};
