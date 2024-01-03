/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#9a64ff',
        'primary-200': '#C7A9FF',
        'secondary': '#5125b8',
        'title': '#ff6464',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['Menlo', 'Monaco', 'monospace'],
      },
    },
  },
  plugins: [],
}

