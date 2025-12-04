/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // scan all JS/TS/JSX/TSX files
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          25: '#fff0f7', // custom lightest pink
          50: '#ffe4f0', // very light pink
          100: '#ffc1de',
          200: '#ff99c7',
          300: '#ff6fb0',
          400: '#ff4798',
          500: '#ec4899', // default Tailwind pink-500
          600: '#db2777', // default Tailwind pink-600
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
      },
      spacing: {
        18: '4.5rem', // optional custom spacing
        72: '18rem',  // used for hero image height
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};
