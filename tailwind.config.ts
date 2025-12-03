import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
        text: {
          black: "#0E1013",
        },
        preset: {
          skyblue: "#B8EBFE",
          blue: "#0000FE",
        },
        background: {
          default: "#FAF9FA",
          muted: "#DADCE0",
          light: "#E8EAED",
          dark: "#BDC1C6",
        },
        primary: {
          DEFAULT: "#97E6AB",
          secondary: "#79C78E",
          accent: "#68E7FA",
        },
        state: {
          success: "#4AAE7A",
          warning: "#F5B84C",
          info: "#7D9AE5",
          error: "#E15A5A",
        },
        border: {
          default: "#D1D5DB",
        },
        icon: {
          default: "#FAF9FA",
          muted: "#6C727C",
        },
        accent: {
          fill: "#E4E6E9",
        },
        symbol: {
          friend: "#F5B84C",
          family: "#4AAE7A",
          love: "#7D9AE5",
          hate: "#E15A5A",
        },
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
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  safelist: [
    "bg-symbol-friend",
    "bg-symbol-family",
    "bg-symbol-love",
    "bg-symbol-hate",
  ],
};
export default config;
