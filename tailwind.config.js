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
        primaryBlue: '#1877F2',
        primaryRed: '#DD4B39',
        whiteDark: '#F8F9FA'
      },
      spacing: {
        '3.5': '14px',
        '4.5': '17.5px',
        '15': '60px',
        '45': '45px',
        '51': '51px',
        '220': '220px'
      },
      maxWidth: {
        '973': '973px',
        '1224': '1224px',
        '601': '601px',
        '494': '494px',
      },
      letterSpacing: {
        '2': '2px'
      },
      fontSize: {
        '11.33': '11.3778px',
        '32': '32px'
      },
      borderWidth: {
        '1.5': '1.5px'
      }
    },
  },
  plugins: [],
};
