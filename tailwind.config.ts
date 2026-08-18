import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        toolora: {
          50: 'hsl(221, 100%, 97%)',
          100: 'hsl(221, 96%, 93%)',
          200: 'hsl(221, 94%, 85%)',
          300: 'hsl(221, 90%, 74%)',
          400: 'hsl(221, 86%, 62%)',
          500: 'hsl(221, 83%, 53%)',
          600: 'hsl(221, 78%, 45%)',
          700: 'hsl(221, 72%, 37%)',
          800: 'hsl(221, 64%, 30%)',
          900: 'hsl(221, 56%, 25%)',
          950: 'hsl(221, 48%, 15%)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Consolas', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.07)',
        'card-hover': '0 4px 16px -2px rgba(0,0,0,0.12), 0 2px 6px -2px rgba(0,0,0,0.08)',
        'tool': '0 2px 12px -2px rgba(0,0,0,0.10)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
