import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e6f1ff",
          100: "#b3d9ff",
          200: "#80c1ff",
          300: "#4da9ff",
          400: "#1a91ff",
          500: "#0066cc", // Royal Blue
          600: "#0052a3",
          700: "#003d7a",
          800: "#002952",
          900: "#001429",
        },
        gold: {
          50: "#fffbf0",
          100: "#fff4d6",
          200: "#ffedbc",
          300: "#ffe6a2",
          400: "#ffdf88",
          500: "#ffd700", // Gold
          600: "#ccac00",
          700: "#998100",
          800: "#665600",
          900: "#332b00",
        },
        gov: {
          blue: "#0066cc",
          white: "#ffffff",
          gold: "#ffd700",
          dark: "#001429",
        },
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "Roboto", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

