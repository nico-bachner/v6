import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/styles/tailwind.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nico Bachner',
  description: 'Student. Developer. Entrepreneur.',
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <body className={inter.className}>{children}</body>
  </html>
)

export default Layout
