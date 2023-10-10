/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    keyframes: {
      slidein: {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(0%)' },
      },
      pulse: {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '0.4' },
      },
    },
    animation: {
      slidein: 'slidein 0.5s ease-in-out forwards',
      pulse: 'pulse 2s ease-in-out infinite',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        sidebar: "248px auto", //for sidebar layout
        "sidebar-collapsed": "73px auto", //for sidebar layout
      },
      colors: {
        primary: "#808182",
        brand: "#FD8A09",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide"),
  ],
  daisyui: {
    themes: [],
  },
};
