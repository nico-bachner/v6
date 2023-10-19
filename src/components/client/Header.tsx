'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

export const Header: React.FC<{
  items: {
    [key: string]: any
  }[]
}> = ({ items }) => {
  const slug = useSelectedLayoutSegment()

  const index = items.map(({ slug }) => slug).indexOf(slug)

  const { title, description } = items[index]

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4 text-center">
      <h1 className="font-serif text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="text-lg font-light text-gray-500 sm:text-xl lg:text-2xl">
        {description}
      </p>
    </div>
  )
}
