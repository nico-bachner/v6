import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'

import { CommandMenu } from '@/components/client/CommandMenu'
import { Theme } from '@/providers/Theme'
import '@/styles/tailwind.css'
import { cn } from '@/utils/cn'

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const serif = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nico Bachner',
  description: 'Student. Developer. Entrepreneur.',
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <body
      className={cn(
        'bg-gray-50 font-sans text-gray-700 dark:bg-gray-950 dark:text-gray-300',
        sans.variable,
        serif.variable,
      )}
    >
      <Theme>
        {children}
        <CommandMenu />
      </Theme>
    </body>
  </html>
)

export default Layout
