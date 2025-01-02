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
        "gray-1": "#696969",
        "icon-0": "#d9ed92",
        "icon-1": "#b5e48c",
        "icon-2": "#99d98c",
        "icon-3": "#76c893",
        "icon-4": "#52b69a",
        "icon-5": "#34a0a4",
        "icon-6": "#168aad",
        "icon-7": "#1a759f",
        "icon-8": "#1e6091",
        "icon-9": "#184e77",
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

