import { promises as fs } from 'fs'
import matter from 'gray-matter'

import type { Project } from '@/types/project'

export const fetchProject = async (slug: string) => {
  const content = await fs.readFile(
    `${process.cwd()}/src/app/(projects)/${slug}/page.mdx`,
    'utf8',
  )

  const { title, description, from, to } = matter(content).data

  const project: Project = {
    slug,
    title,
    description,
    from,
    to,
    content,
  }

  return project
}
