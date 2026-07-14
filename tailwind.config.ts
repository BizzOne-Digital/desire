import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        noir: "#0A0A0B",
        charcoal: "#141414",
        ivory: "#F7F0DF",
        champagne: "#D7B56D",
        antique: "#A97828",
        ember: "#6B3E12"
      },
      fontFamily: {
        serif: ["var(--font-display)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-body)", "Inter", "sans-serif"]
      },
      boxShadow: {
        gold: "0 0 45px rgba(215, 181, 109, 0.18)",
        soft: "0 24px 80px rgba(0, 0, 0, 0.45)"
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #FFF2B8 0%, #D7B56D 34%, #A97828 66%, #FFE6A5 100%)",
        "radial-gold":
          "radial-gradient(circle at center, rgba(215,181,109,0.24), rgba(5,5,5,0) 58%)"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" }
        }
      },
      animation: {
        shimmer: "shimmer 3s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
