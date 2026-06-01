import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "rgb(19 28 49 / <alpha-value>)",
          light: "rgb(26 36 64 / <alpha-value>)",
          elevated: "rgb(34 46 74 / <alpha-value>)",
        },
        accent: {
          blue: "#4F8EF7",
          cyan: "#22D3EE",
          purple: "#9D7BF5",
        },
        muted: "#B8C5D9",
      },
      fontFamily: {
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "var(--font-source-sans)", "sans-serif"],
      },
      letterSpacing: {
        display: "-0.025em",
        tight: "-0.015em",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(ellipse at center, rgba(79,142,247,0.12) 0%, transparent 70%)",
        "premium-bg": "linear-gradient(180deg, #131C31 0%, #161F35 45%, #1A2440 100%)",
        "premium-radial": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79,142,247,0.14) 0%, transparent 60%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scroll": "scroll 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px rgba(15, 23, 42, 0.28)",
        glow: "0 0 40px rgba(79, 142, 247, 0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
