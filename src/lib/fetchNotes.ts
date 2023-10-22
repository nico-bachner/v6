import { promises as fs } from 'fs'

import { fetchNote } from '@/lib/fetchNote'

export const fetchNotes = async () => {
  const routes = await fs.readdir(`${process.cwd()}/src/app/(notes)`)

  const notes = await Promise.all(
    routes
      .filter((route) => !route.includes('.tsx'))
      .map(async (slug) => await fetchNote(slug)),
  )

  return [
    ...notes.filter(({ published }) => !published),
    ...notes
      .filter(({ published }) => published)
      .sort((a, b) => b.published!.getTime() - a.published!.getTime()),
  ]
}
