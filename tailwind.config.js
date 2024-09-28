/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "defaultFont": ["Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode"],
      },
      colors: {
        "black-1": "#222222",
        "gray-1": "#696969"
      },
      transitionProperty: {
        "left": "left",
      },
      animation: {
        "opacity-zero": "opacity-zero linear 0.15s forwards",
        "opacity-one": "opacity-one linear 0.1s forwards",
        "open-section": "open-section 0.5s ease-in forwards",
      },
      backgroundImage: {
        "arrow": "url('../img/arrow-left.svg')"
      }
    },
  },
  plugins: [],
}

