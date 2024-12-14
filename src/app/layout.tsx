import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Fraunces, Inter } from 'next/font/google'

import { CommandMenu } from '@/features/command_menu'
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
  metadataBase: new URL('https://nicobachner.com'),
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={cn(
        'bg-theme font-sans text-primary-2',
        sans.variable,
        serif.variable,
      )}
    >
      <ThemeProvider>
        <CommandMenu />

        {children}
      </ThemeProvider>

      <Analytics />
    </body>
  </html>
)

export default Layout
