import { useSelectedLayoutSegment } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { Commit } from '@/types/github'

export const useCommits = (path: string) => {
  const [commits, setCommits] = useState<Commit[]>()
  const selectedLayoutSegment = useSelectedLayoutSegment()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.github.com/repos/nico-bachner/v6/commits?path=${path}${selectedLayoutSegment}/page.mdx`,
      )
      const commits: Commit[] = await res.json()

      setCommits(commits)
    }

    fetchData()
  }, [path, selectedLayoutSegment])

  return commits
}
