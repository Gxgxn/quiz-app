/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        karla: ["Karla", "sans-serif"],
      },
      colors: {
        textBlue: "#293264",
        btnBlue: "#4D5B9E",
        btnHover: "#D6DBF5",
      },
    },
  },
  plugins: [],
};
