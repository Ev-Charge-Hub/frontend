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
        'footer-dark': '#1A1F2C',
      },
      container: {
        center: true, 
      },
      keyframes: {
                'fade-in': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(10px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                }
            },
      animation: {
                'fade-in': 'fade-in 0.5s ease-out'
            },
    },
  },
  plugins: [],
};