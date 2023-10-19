'use client'

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const EditOnGitHub = () => {
  const pathname = usePathname()
  const path = pathname.split('/')
  const slug = path[path.length - 1]

  return (
    <Link
      href={`https://github.com/nico-bachner/v6/edit/main/src/app/(projects)/${slug}/page.mdx`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2"
    >
      <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text font-bold tracking-tight text-transparent">
        Edit on GitHub
      </span>
      <ArrowTopRightOnSquareIcon className="h-5 w-5 stroke-pink-500 stroke-2" />
    </Link>
  )
}
