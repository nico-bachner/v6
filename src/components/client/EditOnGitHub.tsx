'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import { GitHubIcon } from '@/icons/GitHub'

export const EditOnGitHub = () => {
  const slug = useSelectedLayoutSegment()

  return (
    <Link
      href={`https://github.com/nico-bachner/v6/edit/main/src/app/(projects)/${slug}/page.mdx`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded border px-4 py-2"
    >
      <GitHubIcon className="h-5 w-5" />
      <span className="">Edit on GitHub</span>
    </Link>
  )
}
