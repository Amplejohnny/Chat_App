/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      // => @media (min-width: 640px) { ... }
      md: "547px",
      // => @media (min-width: 768px) { ... }
      lg: "768px",
      // => @media (min-width: 1024px) { ... }
      xl: "1024px"
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        merriweather: ["Merriweather", "serif"],
        roboto: ["Roboto", "sans-serif"],
        Indie: ["Indie Flower", ...defaultTheme.fontFamily.sans],
        SingleDay: ["Single Day", ...defaultTheme.fontFamily.sans],
        DancingScript: ["Dancing Script", ...defaultTheme.fontFamily.sans],
        Arimo: ["Arimo", ...defaultTheme.fontFamily.sans],
        Caveat: ["Caveat", ...defaultTheme.fontFamily.sans],
        Gallient: ["Gallient", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        purple: "#3f3cbb",
        midnight: "#121063",
        tahiti: {
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63"
        },
        bubbleGum: "#ff77e9",
        bermuda: "#78dcca",
        thistle: "#D8BFD8",
        lavender: "#D2D6EF"
      }
    }
  },
  plugins: []
};
