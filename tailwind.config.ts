import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08090A",
        panel: "#111315",
        line: "#272A2E",
        mist: "#A7ABB2",
        paper: "#F5F7F8",
        signal: "#7DA8FF"
      },
      fontFamily: {
        sans: ["var(--font-geist)", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
