/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    screens: {
      'xs': { 'min-width': '280px', 'min-height': '319px'},
      'sm': {'min-width': '320px' , 'max-width' :'480px'},
      'md' : {'min-width': '600px', 'max-width': '479px'},
      'lg': {'min-width': '990px', 'max-width': '599px'},
    }
  },
  plugins: [],
}