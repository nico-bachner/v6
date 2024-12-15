import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Fraunces, Inter } from 'next/font/google'

import { CommandMenuTrigger } from '@/components/ui/CommandMenuTrigger'
import { CommandMenuProvider } from '@/features/command_menu/provider'
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

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={cn(
        'bg-theme font-sans text-primary-2',
        sans.variable,
        serif.variable,
      )}
    >
      <ThemeProvider>
        <CommandMenuProvider>
          <CommandMenuTrigger />

          {children}
        </CommandMenuProvider>
      </ThemeProvider>

      <Analytics />
    </body>
  </html>
)

export default Layout
