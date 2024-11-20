/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '':'',
      },
      display: ["group-hover"],
      fontFamily: {
        'sf-pro': ['SF Pro Display', 'sans-serif'],
      },
    },  
  },
  plugins: [],
}

