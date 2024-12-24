/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#43B0F1',
        'secondary': '#12202C',
        'blackBG': '#E8EEF1',
        'favorite': '#FF5841'
      },
      fontFamily: {
        'primary': ["Montserrat", "sans-serif"],
        'secondary' : ["Nunito Sans", "sans-serif"]
      
      }
    },
  },
  plugins: [],
};

