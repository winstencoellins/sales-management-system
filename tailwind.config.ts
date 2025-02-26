import type { Config } from "tailwindcss";
import { heroui } from "@heroui/theme";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",

    // Hero UI component
    "./node_modules/@heroui/theme/dist/components/(pagination|form|input|alert|autocomplete|date-input).js",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          primary: '#e8eaf6'
        }
      }
    }
  })],
} satisfies Config;
