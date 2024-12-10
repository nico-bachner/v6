'use client'

import Link from 'next/link'

import { cn } from '@/utils/cn'

import { Text } from './Text'

type CardProps = {
  href: string
  title: string
  description: string
  additionalInfo?: string
  className?: string
}

export const Card: React.FC<CardProps> = ({
  href,
  title,
  description,
  additionalInfo,
  className,
}) => (
  <Link
    href={href}
    className={cn(
      'group relative flex flex-col gap-2 rounded-lg border bg-highlight-1 p-8 transition-colors hover:bg-highlight-2 focus:bg-highlight-2 focus:outline-none sm:gap-3 sm:p-10 lg:gap-4 lg:p-12',
      className,
    )}
  >
    <Text as="h3" className="font-bold">
      {title}
    </Text>

    <Text as="p" className="line-clamp-2">
      {description}
    </Text>

    {additionalInfo && (
      <div className="absolute -right-3 -top-3 rounded border bg-highlight-1 px-4 py-2 transition-colors group-hover:bg-highlight-2 group-focus:bg-highlight-2">
        <p className="text-sm font-light text-primary-1 sm:text-md lg:text-lg">
          {additionalInfo}
        </p>
      </div>
    )}
  </Link>
)
