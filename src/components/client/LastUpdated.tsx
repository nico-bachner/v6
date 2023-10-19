'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import { useEffect, useState } from 'react'

export const LastUpdated = () => {
  const slug = useSelectedLayoutSegment()

  const [lastUpdated, setLastUpdated] = useState<Date>()

  useEffect(() => {
    const fetchLastUpdated = async () => {
      const res = await fetch(
        `https://api.github.com/repos/nico-bachner/v6/commits?path=src/app/(projects)/${slug}/page.mdx`,
      )
      const commitHistory = await res.json()
      const latestCommit = commitHistory[0]

      if (latestCommit) {
        setLastUpdated(new Date(latestCommit.commit.author.date))
      }
    }

    fetchLastUpdated()
  }, [slug])

  return <p>Last Updated: {lastUpdated?.toLocaleDateString() ?? 'Never'}</p>
}
