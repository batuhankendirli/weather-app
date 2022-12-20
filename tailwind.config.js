/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'color-primary': '#00B4DB',
        'color-secondary': '#0083B0',
        'color-tertiary': '#ECFCFF',
        'color-fourth': '#caf6ff',
        'color-fifth': '#001A20',
      },
    },
  },
  plugins: [],
};
