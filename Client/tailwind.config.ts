// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // scan all JS/TS/JSX/TSX files
  ],
  theme: {
    extend: {
      colors: {
        // optional: add custom colors
        primary: "#FFD700",
        secondary: "#1E293B",
        background: "rgb(var(--bg) / <alpha-value>)",
        foreground: "rgb(var(--text) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

export default config;
