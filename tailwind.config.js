/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#021b14',
          900: '#062c21',
          850: '#08372a',
          800: '#0b4635',
          700: '#12634c',
          600: '#1b8164',
        },
        burgundy: {
          950: '#230409',
          900: '#420a14',
          850: '#520c19',
          800: '#681120',
          700: '#8c162b',
        },
        gold: {
          50: '#fffdf5',
          100: '#fdf8e6',
          200: '#faecc2',
          300: '#f5dc99',
          400: '#ecc869',
          500: '#d4af37', // Antique Royal Gold
          600: '#b89228',
          700: '#94721d',
          800: '#755819',
          900: '#4a3809',
        },
        ivory: {
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f3ece0',
          300: '#ebe0ce',
          400: '#ded0ba',
        },
        champagne: {
          50: '#fbf9f4',
          100: '#f5f0e6',
          200: '#ede3d1',
          300: '#e3d4bb',
          400: '#d7c2a1',
        },
        blush: {
          50: '#fff8f8',
          100: '#fdf0f0',
          200: '#fadfe0',
          300: '#f5c6c9',
          400: '#ec9ca2',
        },
        mehndi: {
          amber: '#d97706',
          marigold: '#f59e0b',
          turmeric: '#eab308',
          olive: '#4d7c0f',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        display: ['Cinzel Decorative', 'Playfair Display', 'serif'],
        heading: ['Playfair Display', 'Cormorant Garamond', 'serif'],
        script: ['Great Vibes', 'Alex Brush', 'cursive'],
        arabic: ['Amiri', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(135deg, #f5dc99 0%, #d4af37 25%, #ecc869 50%, #b89228 75%, #f5dc99 100%)',
        'gold-metallic': 'linear-gradient(105deg, #d4af37 0%, #faecc2 30%, #d4af37 55%, #b89228 80%, #ecc869 100%)',
        'emerald-velvet': 'radial-gradient(ellipse at top, #0b4635 0%, #062c21 55%, #021b14 100%)',
        'burgundy-velvet': 'radial-gradient(ellipse at top, #681120 0%, #420a14 60%, #230409 100%)',
        'cream-parchment': 'radial-gradient(ellipse at center, #faf6ee 0%, #f3ece0 70%, #ebe0ce 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseGlow 3s ease-in-out infinite',
        'shimmer-spin': 'shimmer 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
      },
      boxShadow: {
        'royal': '0 20px 45px -10px rgba(0, 0, 0, 0.6), 0 0 25px 0 rgba(212, 175, 55, 0.25)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.45), 0 0 50px rgba(212, 175, 55, 0.2)',
        'seal': '0 10px 25px -5px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -2px 5px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
