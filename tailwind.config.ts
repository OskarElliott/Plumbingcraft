import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep slate/navy base
        ink: {
          DEFAULT: '#0F1B2A',
          900: '#0B1521',
          800: '#14263A',
          700: '#1B3149',
          600: '#274158',
        },
        // Warm bone / off-white
        bone: {
          DEFAULT: '#F7F5F1',
          200: '#EDE9E1',
          300: '#DED8CC',
        },
        // Deep, refined blue drawn from the logo (CTAs, links, rules, hovers)
        blue: {
          DEFAULT: '#1F63C4',
          light: '#3E82DF',
          dark: '#164C97',
        },
        muted: '#8494A5',   // muted text on dark
        line: '#26374A',    // hairline rules on dark
      },
      fontFamily: {
        display: ['var(--font-grotesk)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      fontSize: {
        display: ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '600' }],
      },
      maxWidth: {
        content: '80rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,27,42,0.04), 0 10px 30px rgba(15,27,42,0.06)',
        'card-hover': '0 8px 40px rgba(15,27,42,0.14)',
        blue: '0 6px 24px rgba(31,99,196,0.35)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
      },
    },
  },
  plugins: [],
}

export default config
