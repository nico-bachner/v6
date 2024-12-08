'use client'

import Link from 'next/link'
import { useState } from 'react'

import { cn } from '@/utils/cn'

import { Text } from '../ui/Text'

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
}) => {
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  return (
    <Link
      href={href}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className={cn(
        'relative flex flex-col gap-2 rounded-lg border p-8 transition-colors focus:outline-none sm:gap-3 sm:p-10 lg:gap-4 lg:p-12',
        hovered || active ? 'bg-highlight-2' : 'bg-highlight-1',
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
        <div
          className={cn(
            'absolute -right-3 -top-3 rounded border px-4 py-2 transition-colors',
            active ? 'bg-highlight-2' : 'bg-highlight-1',
          )}
        >
          <p className="text-sm font-light text-primary-1 sm:text-md lg:text-lg">
            {additionalInfo}
          </p>
        </div>
      )}
    </Link>
  )
}
