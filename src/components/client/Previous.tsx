'use client'

import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export const Previous: React.FC<{
  items: {
    [key: string]: any
  }[]
}> = ({ items }) => {
  const slug = useSelectedLayoutSegment()

  const index = items.map(({ slug }) => slug).indexOf(slug)

  const item = items[index - 1]

  if (!item) {
    return <></>
  }

  return (
    <Link href={item.slug} className="flex items-center gap-2">
      <ChevronLeftIcon className="h-6 w-6" />
      <div className="flex flex-1 flex-col">
        <span className="text-sm text-gray-500">Previous</span>
        <span>{item.title}</span>
      </div>
    </Link>
  )
}
