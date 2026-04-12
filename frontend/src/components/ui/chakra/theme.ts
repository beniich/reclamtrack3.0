import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#fff7ed" },
          100: { value: "#ffedd5" },
          200: { value: "#fed7aa" },
          300: { value: "#fdba74" },
          400: { value: "#fb923c" },
          500: { value: "#f97316" }, // Electric Orange
          600: { value: "#ea580c" },
          700: { value: "#c2410c" },
          800: { value: "#9a3412" },
          900: { value: "#7c2d12" },
        },
        violet: {
          50: { value: "#f5f3ff" },
          100: { value: "#ede9fe" },
          200: { value: "#ddd6fe" },
          300: { value: "#c4b5fd" },
          400: { value: "#a78bfa" },
          500: { value: "#8b5cf6" },
          600: { value: "#7c3aed" },
          700: { value: "#6d28d9" },
          800: { value: "#5b21b6" },
          900: { value: "#4c1d95" },
          950: { value: "#0f0125" }, // Deep Violet background
        },
      },
    },
    semanticTokens: {
      colors: {
        primary: { value: "{colors.brand.500}" },
        background: { value: "{colors.violet.950}" },
      },
    },
  },
})
