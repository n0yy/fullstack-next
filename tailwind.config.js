/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "neumorph-sm": [
          "0.25em 0.25em 1em rgba(0, 0, 0, 0.1)",
          "-0.25em -0.25em 1em rgba(255, 255, 255, 1)",
        ],
        neumorph: [
          "0.5em 0.5em 1.5em rgba(0, 0, 0, 0.1)",
          "-0.5em -0.5em 1.5em rgba(255, 255, 255, 1)",
        ],
        "neumorph-md": [
          "0.75em 0.75em 2em rgba(0, 0, 0, 0.1)",
          "-0.75em -0.75em 2em rgba(255, 255, 255, 1)",
        ],
        "neumorph-lg": [
          "1em 1em 2.75em rgba(0, 0, 0, 0.1)",
          "-1em -1em 2.75em rgba(255, 255, 255, 1)",
        ],
        "neumorph-xl": [
          "1.5em 1.5em 3em rgba(0, 0, 0, 0.1)",
          "-1.5em -1.5em 3em rgba(255, 255, 255, 1)",
        ],
        "neumorph-2xl": [
          "2em 2em 4em rgba(0, 0, 0, 0.1)",
          "-2em -2em 4em rgba(255, 255, 255, 1)",
        ],
        "neumorph-concave-sm": [
          "inset 0.25em 0.25em 1em rgba(0, 0, 0, 0.1)",
          "inset -0.25em -0.25em 1em rgba(255, 255, 255, 1)",
        ],
      },
      colors: {
        primary: "#EDEDE9",
      },
    },
  },
  plugins: [],
};
