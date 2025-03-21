/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-kanit)", "system-ui", "sans-serif"],
      },
      colors: {
        'custom-green': '#00AB82',
        'custom-red': '#FF6B6B',  
        'custom-gray': '#E7F5ED',  
      },
      container: {
        center: true, 
      },
    },
  },
  plugins: [],
};