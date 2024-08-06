/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // add font family to tailwind

  theme: {
    extend: {
      colors:{
        primary: '#1aac83',
        secondary: '#e7195a',
      }
    }
  },
  plugins: [],
}

