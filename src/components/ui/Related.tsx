import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { cn } from '@/utils/cn'

import { Text } from './Text'

type Sibling = {
  slug: string
  title: string
}

type RelatedProps = {
  previous?: Sibling
  next?: Sibling
  className?: string
}

export const Related: React.FC<RelatedProps> = ({
  previous,
  next,
  className,
}) => (
  <div className={cn('flex items-center justify-between', className)}>
    {previous ? (
      <Link
        href={previous.slug}
        className="flex items-center gap-2 rounded p-1 pr-3 transition-colors hover:bg-highlight-1"
      >
        <ChevronLeftIcon className="size-6 stroke-primary-1 sm:size-7 lg:size-8" />

        <div className="flex flex-1 flex-col">
          <Text size="xs" className="text-primary-1">
            Previous
          </Text>
          <Text className="leading-tight text-primary-2">{previous.title}</Text>
        </div>
      </Link>
    ) : (
      <div />
    )}
    {next ? (
      <Link
        href={next.slug}
        className="flex items-center gap-2 rounded p-1 pl-3 transition-colors hover:bg-highlight-1"
      >
        <div className="flex flex-1 flex-col">
          <Text size="xs" className="text-primary-1">
            Next
          </Text>
          <Text className="leading-tight text-primary-2">{next.title}</Text>
        </div>

        <ChevronRightIcon className="size-6 stroke-primary-1 sm:size-7 lg:size-8" />
      </Link>
    ) : (
      <div />
    )}
  </div>
)
