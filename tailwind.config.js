/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      color:{
        aqua: "#00f0ff",
      },
      fontFamily: {
        horizon: ["Horizon", "sans-serif"],
        circular: ["CircularXXWeb-Book", "sans-serif"],
        Helvetic: ["Helvetic"],
        apline: ["apline"],
        Opti: ["Opti"],
        SFPRO: ["SFPRO"],
      },
      keyframes: {
        levitate: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wave: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        levitate: "levitate 3s ease-in-out infinite",
        wave: "wave 2s ease-in-out infinite",
      },
      
    },
  },
  plugins: [],
};
