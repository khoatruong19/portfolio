/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yellowColor: '#F7AB0A',
        blackColor: 'rgb(36,36,36)',
        grayColor: '#292929',
        borderGrayColor: '#333333',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
