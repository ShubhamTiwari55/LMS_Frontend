/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors:{
        'font-color': '#172449',
        'para-color': '#F6F7F9',
        'button-color': '#4676B4',
        'dull-color': '#D3DDE9'
      }
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
}

