import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{tsx,mdx}'],
  theme: {
    blur: {
      DEFAULT: '8px',
      lg: '16px',
    },
    borderRadius: {
      DEFAULT: '0.375rem',
      lg: '0.75rem',
      full: '9999px',
    },
    boxShadow: {
      DEFAULT: '0 3px 12px var(--tw-shadow-color, hsla(0deg, 0%, 0%, 0.1))',
      lg: '0 6px 24px var(--tw-shadow-color, hsla(0deg, 0%, 0%, 0.1))',
    },
    fontFamily: {
      sans: ['var(--font-sans)'],
      serif: ['var(--font-serif)'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.5' }],
      sm: ['0.875rem', { lineHeight: '1.475' }],
      base: ['1rem', { lineHeight: '1.45' }],
      lg: ['1.125rem', { lineHeight: '1.425' }],
      xl: ['1.25rem', { lineHeight: '1.4' }],
      '2xl': ['1.5rem', { lineHeight: '1.375' }],
      '3xl': ['1.875rem', { lineHeight: '1.35' }],
      '4xl': ['2.25rem', { lineHeight: '1.325' }],
      '5xl': ['3rem', { lineHeight: '1.3' }],
      '6xl': ['3.75rem', { lineHeight: '1.275' }],
      '7xl': ['4.5rem', { lineHeight: '1.25' }],
      '8xl': ['6rem', { lineHeight: '1.225' }],
      '9xl': ['8rem', { lineHeight: '1.2' }],
    },

    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
