'use client'

import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export const Next: React.FC<{
  items: {
    [key: string]: any
  }[]
}> = ({ items }) => {
  const slug = useSelectedLayoutSegment()

  const index = items.map(({ slug }) => slug).indexOf(slug)

  const item = items[index + 1]

  if (!item) {
    return <></>
  }

  return (
    <Link href={item.slug} className="flex items-center gap-2">
      <div className="flex flex-1 flex-col">
        <span className="text-sm text-gray-500">Next</span>
        <span>{item.title}</span>
      </div>
      <ChevronRightIcon className="h-6 w-6" />
    </Link>
  )
}
