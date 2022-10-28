/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryOrange: "#f36c25",
        primaryExtraLight: "#ffae83",
        primaryLight: "#CED4DA",
        primaryDark: "#08090a",
        primaryDarkLight: "#2B2B2B",
        primaryGray: "#6D747A",
        primaryDarkGray: "#4E4E4E",
        primaryLightGray: "#939CA3",
        primaryExtraLightGray: "#7C8691",
      },
      spacing: {
        '4.5': '17.5px',
        '15': '60px',
      },
      maxWidth: {
        '973': '973px',
        '1224': '1224px',
        '601': '601px',
     },
    },
  },
  plugins: [],
};
