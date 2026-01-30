import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Deep luxurious tones
        primary: {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#e8e4dc',
          300: '#d4cdc0',
          400: '#b8ac99',
          500: '#9d8e78',
          600: '#8a7a64',
          700: '#736553',
          800: '#605546',
          900: '#51483c',
        },
        // Gold accent colors
        gold: {
          light: '#e8d5a3',
          DEFAULT: '#c9a96e',
          dark: '#a68b4b',
          muted: '#d4c4a0',
        },
        // Luxe dark theme
        luxe: {
          black: '#0a0a0f',
          charcoal: '#1a1a1f',
          graphite: '#2a2a30',
          slate: '#3a3a42',
          mist: '#8a8a92',
        },
        // Warm neutrals
        cream: {
          light: '#fdfcfa',
          DEFAULT: '#f5f1eb',
          dark: '#ebe5db',
        },
        // Champagne
        champagne: {
          light: '#f7f3e9',
          DEFAULT: '#f0e6d3',
          dark: '#e5d7be',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        body: ['var(--font-pretendard)', 'Pretendard', 'sans-serif'],
        accent: ['var(--font-italiana)', 'Italiana', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(201, 169, 110, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(201, 169, 110, 0.6)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.4), transparent)',
        'dark-gradient': 'linear-gradient(180deg, #0a0a0f 0%, #1a1a1f 100%)',
        'luxury-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a1f 50%, #0a0a0f 100%)',
      },
      boxShadow: {
        'gold': '0 4px 30px rgba(201, 169, 110, 0.15)',
        'gold-lg': '0 10px 50px rgba(201, 169, 110, 0.25)',
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'inner-gold': 'inset 0 2px 20px rgba(201, 169, 110, 0.1)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config
