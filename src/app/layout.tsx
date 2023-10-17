import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { CommandMenu } from '@/components/client/CommandMenu'
import { Theme } from '@/providers/Theme'
import '@/styles/tailwind.css'
import { cn } from '@/utils/cn'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nico Bachner',
  description: 'Student. Developer. Entrepreneur.',
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <body
      className={cn(
        'bg-white text-gray-700 dark:bg-black dark:text-gray-300',
        inter.className,
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
