/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/cssModule/**/*.{js,jsx,ts,tsx}" ,
  ],
  theme: {
    screens: {
      'xxl': {'max':'3280px'},
      
      'xl': {'max': '1280px'},

      'lg': {'max': '1047px'},

      'md': {'max': '940px'},

      'sm': {'max': '639px'},

    },
    extend: {
      fontFamily: {
        'body': ['Roboto-Regular'],
        'ItalicRoboto':['Roboto-Italic'],
        'BoldRoboto':['Roboto-Bold']
      }
    },
  },
  plugins: [],
}
