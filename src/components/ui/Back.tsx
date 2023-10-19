import Link from 'next/link'

import { cn } from '@/utils/cn'

export const Back: React.FC<{ href: string }> = ({ href }) => (
  <Link
    href={href}
    className={cn(
      'bg-white/5 shadow backdrop-blur',
      'hover:bg-white/10 hover:shadow-lg hover:backdrop-blur-lg',
      'flex w-fit items-center rounded px-4 py-2',
    )}
  >
    {'<-'} Back
  </Link>
)
