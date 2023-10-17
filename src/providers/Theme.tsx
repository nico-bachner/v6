'use client'

import { ThemeProvider } from 'next-themes'

export const Theme: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <ThemeProvider attribute="class">{children}</ThemeProvider>
