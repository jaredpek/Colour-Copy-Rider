/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}','node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    fontFamily: {
      'display': ['Merriweather'],
      'body': ['Merriweather'],
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

