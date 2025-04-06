import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./types/color.ts",
    "./types/relationship.ts",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "100": "#97E6AB",
          "200": "#79C78E",
          "300": "#36834F",
        },
        secondary: {
          "100": "#68E7FA",
          "200": "#008496",
        },
        accent: {
          "100": "#F18D8D",
          "200": "#883036",
        },
        text: {
          "100": "#333333",
          "200": "#5C5C5C",
        },
        background: {
          "100": "#F4F4F4",
          "200": "#EAEAEA",
          "300": "#C1C1C1",
        },
        symbol: {
          love: "#FF4C4C",
          family: "#4B8B3B",
          friend: "#FFD700",
          hate: "#1A1A1A",
        },
        brown: "#7A5128",
      },
      fontFamily: {
        "poiret-one": ["var(--font-poiret-one)", "cursive"],
        pretendard: ["var(--font-pretendard)", "sans"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
