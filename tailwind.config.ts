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
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        ink: {
          DEFAULT: '#0d0d0d',
          soft: '#1a1a1a',
        },
        surface: {
          DEFAULT: '#111111',
          2: '#181818',
          3: '#202020',
        },
        // ── ACLL Brand Guide (Rev 1) — Primary Colours ──
        green: {
          DEFAULT: '#66cc33',   // Moderate Lime Green — brand primary
          light: '#A4D79C',
          mid: '#A4D79C',
          dark: '#3C8B36',
          dim: 'rgba(102, 204, 51, 0.15)',
        },
        gold: {
          DEFAULT: '#cc9933',
          light: '#D4A556',
          dark: '#B37B29',
        },
        // Accent colours — charts / colour coding only, never backgrounds
        accentPurple: '#b048b8',
        accentBlue: '#296ed6',
        cream: '#ffffff',
      },
      fontFamily: {
        display: ['Antonio', 'sans-serif'],
        sans: ['DM Sans', 'Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        antonio: ['Antonio', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
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
        'bounce-slow': 'bounceSlow 2s ease-in-out infinite',
        'cell-in': 'cellIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        cellIn: {
          '0%': { opacity: '0', transform: 'scale(1.12)', filter: 'blur(6px)' },
          '100%': { opacity: '1', transform: 'scale(1)', filter: 'blur(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config
