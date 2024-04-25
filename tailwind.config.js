/** @type {import('tailwindcss').Config} */


export default {
  content: [
    './public/**/*.html',
    './src/components/Authentication/**/*.{js,jsx,ts,tsx,vue}',
  ],
  purge: ['./src/components/Authentication/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
  },
  plugins: [],
}

