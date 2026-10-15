/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          nude: "#E5B899",
          peach: "#F4DCD0",
          charcoal: "#2B2A29",
          black: "#171717",
          cream: "#FAF7F2",
          gold: "#D4AF37",
          emerald: "#1B4D3E",
          rose: "#E0A996",
          gray: "#73706C"
        }
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
};
