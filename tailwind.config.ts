import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#f7f6f2",
        ink: "#1a211c",
        muted: "#5d675f",
        line: "#d9ddd6",
        pine: "#14382c",
        "pine-deep": "#0d281f",
        brass: "#8d6840",
        cream: "#f6f3ea",
        hero: "#0c0c0c",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      borderRadius: {
        btn: "2px",
      },
      maxWidth: {
        page: "1000px",
      },
    },
  },
  plugins: [],
};

export default config;
