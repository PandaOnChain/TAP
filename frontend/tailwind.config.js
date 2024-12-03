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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "gray-light": "#1b1d23",
        "gray-dark": "#131519",
        "gray-darkest": "#0d0f11",
        "brand-coal": "#0f0d0e",
        "brand-charcoal": "#231f20",
        "brand-gray": "#262522",
        "brand-yellow": "#fcba28",
        "brand-pink": "#f38ba3",
        "brand-green": "#0ba95b",
        "brand-purple": "#7b5ea7",
        "brand-beige": "#f9f4da",
        "brand-blue": "#12b5e5",
        "brand-orange": "#fc7428",
        "brand-red": "#ed203d",
        "brand-white": "#ffffff",
        gentlePeachLol: "#f99157",
        magesticPurple: "#9d7dce"
      },
    },
  },
  plugins: [],
};
