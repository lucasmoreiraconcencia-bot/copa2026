import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta inspirada na Copa do Mundo 2026 (verde-campo, dourado, azul)
        copa: {
          green: "#0B7A4B",
          greenDark: "#075235",
          gold: "#F2C14E",
          goldDark: "#D9A520",
          blue: "#1D63ED",
          blueDark: "#0E3FA8",
          ink: "#0A1F17",
          cream: "#F7F5EF",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 4px 24px -8px rgba(7, 82, 53, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
