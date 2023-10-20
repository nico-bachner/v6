'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export const Navigation: React.FC<{
  items: {
    [key: string]: any
  }[]
}> = ({ items }) => {
  const slug = useSelectedLayoutSegment()

  const index = items.map(({ slug }) => slug).indexOf(slug)

  const previous = items[index - 1]
  const next = items[index + 1]

  return (
    <div className="flex items-center justify-between">
      {previous ? (
        <Link href={previous.slug} className="flex items-center gap-2">
          <ChevronLeftIcon className="h-6 w-6" />
          <div className="flex flex-1 flex-col">
            <span className="text-sm text-gray-500">Previous</span>
            <span>{previous.title}</span>
          </div>
        </Link>
      ) : (
        <div></div>
      )}
      {next ? (
        <Link href={next.slug} className="flex items-center gap-2">
          <div className="flex flex-1 flex-col">
            <span className="text-sm text-gray-500">Next</span>
            <span>{next.title}</span>
          </div>
          <ChevronRightIcon className="h-6 w-6" />
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  )
}
