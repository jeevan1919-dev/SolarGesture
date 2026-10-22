/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          darkest: '#030712',
          deep: '#060B1E',
          void: '#0B132B',
          nebula: '#1C2541',
          accent: '#3A506B',
          cyan: '#48E5C2',
          electric: '#00F0FF',
          violet: '#8B5CF6',
          gold: '#FDB813'
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 240, 255, 0.45)',
        'glow-violet': '0 0 25px rgba(139, 92, 246, 0.45)',
        'glow-sun': '0 0 60px rgba(253, 184, 19, 0.65)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
