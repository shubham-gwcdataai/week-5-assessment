/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow:  "#F5C518",
          purple:  "#7B2FBE",
          pink:    "#E91E8C",
          red:     "#E03030",
          green:   "#AAFF00",
          dark:    "#2D2D2D",
          orange:  "#E06820",
        },
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
