import Link from 'next/link'

import { cn } from '@/utils/cn'

export const Back: React.FC<{ href: string }> = ({ href }) => (
  <Link
    href={href}
    className={cn(
      'shadow dark:bg-gray-900',
      'hover:shadow-lg dark:hover:bg-gray-800',
      'fixed flex w-fit items-center rounded px-4 py-2',
    )}
  >
    {'<-'} Back
  </Link>
)
