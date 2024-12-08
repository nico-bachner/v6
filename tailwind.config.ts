import type { Config } from 'tailwindcss'
import defaultColors from 'tailwindcss/colors'

const config: Config = {
  content: ['./src/**/*.{tsx,mdx}'],
  theme: {
    colors: {
      // theme colors
      theme: 'var(--color-theme)',
      primary: {
        1: 'var(--color-primary-1)',
        2: 'var(--color-primary-2)',
        3: 'var(--color-primary-3)',
      },
      highlight: {
        1: 'var(--color-highlight-1)',
        2: 'var(--color-highlight-2)',
        3: 'var(--color-highlight-3)',
      },

      // utility colors
      current: defaultColors.current,
      transparent: defaultColors.transparent,
    },
    blur: {
      DEFAULT: '8px',
      lg: '16px',
    },
    borderRadius: {
      DEFAULT: '0.5rem',
      lg: '1rem',
      full: '9999px',
    },
    borderColor: {
      DEFAULT: 'var(--color-primary-1)',
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
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
    },
    height: ({ theme }) => ({
      ...theme('spacing'),
      screen: '100dvh',
    }),
    spacing: {
      0: '0rem',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
      40: '10rem',
      60: '15rem',
      80: '20rem',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
