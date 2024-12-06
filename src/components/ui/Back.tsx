import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { cn } from '@/utils/cn'

import { Text } from './Text'

export const Back: React.FC<{ href: string }> = ({ href }) => (
  <Link
    href={href}
    className={cn(
      'bg-highlight-1 transition-colors hover:bg-highlight-2',
      'fixed flex items-center rounded px-2',
    )}
  >
    <ChevronLeftIcon className="size-4 sm:size-5 lg:size-6" />

    <Text size="sm" className="p-2">
      Back
    </Text>
  </Link>
)
