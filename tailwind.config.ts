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
        ink: {
          DEFAULT: '#0d0d0d',
          soft: '#1a1a1a',
        },
        surface: {
          DEFAULT: '#111111',
          2: '#181818',
          3: '#202020',
        },
        green: {
          DEFAULT: '#67ba67',
          light: '#85ca85',
          dim: 'rgba(103, 186, 103, 0.15)',
        },
        orange: {
          DEFAULT: '#f9a825',
        },
        cream: '#f5f0e8',
      },
      fontFamily: {
        display: ['Antonio', 'sans-serif'],
        sans: ['DM Sans', 'Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        antonio: ['Antonio', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(4rem, 10vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(3rem, 7vw, 6rem)', { lineHeight: '1.0', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      spacing: {
        'section': '8rem',
        'section-sm': '4rem',
        'section-lg': '12rem',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-slide-up': 'fadeSlideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'float': 'float 4s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config
