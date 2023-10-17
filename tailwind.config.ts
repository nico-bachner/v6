import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{tsx,mdx}'],
  theme: {
    boxShadow: {
      DEFAULT: '0 4px 12px var(--tw-shadow-color, hsla(0deg, 0%, 0%, 0.1))',
      lg: '0 6px 18px var(--tw-shadow-color, hsla(0deg, 0%, 0%, 0.15))',
      xl: '0 8px 24px var(--tw-shadow-color, hsla(0deg, 0%, 0%, 0.2))',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
