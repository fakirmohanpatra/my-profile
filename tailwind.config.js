/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        funky: {
          lime: '#CCFF00',
          cyan: '#00F0FF',
          pink: '#FF2A85',
          purple: '#8B5CF6',
          yellow: '#FFE600',
          orange: '#FF5E00',
          dark: '#0B0F19',
          card: '#161F30',
          border: '#000000',
        }
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-white': '4px 4px 0px 0px rgba(255, 255, 255, 0.9)',
        'brutal-lg': '6px 6px 0px 0px #000000',
        'brutal-lime': '4px 4px 0px 0px #CCFF00',
        'brutal-cyan': '4px 4px 0px 0px #00F0FF',
        'brutal-pink': '4px 4px 0px 0px #FF2A85',
        'brutal-hover': '2px 2px 0px 0px #000000',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce 2s infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
