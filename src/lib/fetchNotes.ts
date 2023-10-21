import { promises as fs } from 'fs'

import { fetchMDXData } from '@/lib/fetchMDXData'

export const fetchNotes = async () => {
  const routes = await fs.readdir(`${process.cwd()}/src/app/(notes)`)
  const data = await Promise.all(
    routes
      .filter((route) => !route.includes('.tsx'))
      .map(async (slug) => await fetchMDXData(`src/app/(notes)`, slug)),
  )

  const notes = [
    ...data.filter(({ published }) => !published),
    ...data
      .filter(({ published }) => published)
      .sort((a, b) => b.published - a.published),
  ]

  return notes
}
