import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../apps/web/src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          dawn: "#FFB347",
          day: "#4FC3F7",
          dusk: "#FF7043",
          night: "#0D1B2A",
        },
        road: {
          asphalt: "#2C2C2C",
          line: "#F5D547",
          grey: "#6B7280",
        },
        foliage: {
          deep: "#1B4332",
          mid: "#52B788",
          light: "#95D5B2",
        },
        blossom: {
          pink: "#FF85A1",
          yellow: "#FFF176",
          purple: "#CE93D8",
        },
        sand: {
          warm: "#E9C46A",
        },
        mountain: {
          stone: "#607D8B",
        },
        water: {
          deep: "#0077B6",
          light: "#90E0EF",
        },
        gold: {
          accent: "#FFD700",
        },
        white: {
          pure: "#FFFFFF",
        },
        glass: {
          blur: "rgba(255, 255, 255, 0.08)",
          border: "rgba(255, 255, 255, 0.15)",
        }
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        heading: ["Syne", "sans-serif"],
        display: ["Playfair Display", "serif"],
        accent: ["Bebas Neue", "sans-serif"],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
      }
    },
  },
  plugins: [],
};

export default config;
