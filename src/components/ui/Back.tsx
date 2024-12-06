import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { cn } from '@/utils/cn'

import { Text } from './Text'

type BackProps = {
  href: string
  className?: string
}

export const Back: React.FC<BackProps> = ({ href, className }) => (
  <Link
    href={href}
    className={cn(
      'rounded bg-highlight-1 transition-colors hover:bg-highlight-2',
      'flex w-fit items-center px-2',
      className,
    )}
  >
    <ChevronLeftIcon className="size-4 stroke-primary-1 sm:size-5 lg:size-6" />

    <Text size="sm" className="p-2">
      Back
    </Text>
  </Link>
)
