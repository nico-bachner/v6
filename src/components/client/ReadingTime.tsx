'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export const ReadingTime: React.FC<{
  items: {
    [key: string]: any
  }[]
}> = ({ items }) => {
  const slug = useSelectedLayoutSegment()

  const index = items.map(({ slug }) => slug).indexOf(slug)

  const { content } = items[index]

  const readingTime = [
    Math.ceil(content.split(' ').length / 230),
    Math.ceil(content.split(' ').length / 180),
  ]

  return (
    <p>
      {readingTime[0] == readingTime[1]
        ? readingTime[0]
        : readingTime.join('-')}{' '}
      minute read
    </p>
  )
}
