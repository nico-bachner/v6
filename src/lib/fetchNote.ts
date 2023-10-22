import { promises as fs } from 'fs'
import matter from 'gray-matter'

import type { Note } from '@/types/note'

export const fetchNote = async (slug: string) => {
  const content = await fs.readFile(
    `${process.cwd()}/src/app/(notes)/${slug}/page.mdx`,
    'utf8',
  )

  const { title, description, published } = matter(content).data

  const note: Note = {
    slug,
    title,
    description,
    published,
    content,
  }

  return note
}
