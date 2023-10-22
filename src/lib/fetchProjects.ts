import { promises as fs } from 'fs'

import { fetchProject } from '@/lib/fetchProject'

export const fetchProjects = async () => {
  const routes = await fs.readdir(`${process.cwd()}/src/app/(projects)`)

  const projects = await Promise.all(
    routes
      .filter((route) => !route.includes('.tsx'))
      .map(async (slug) => await fetchProject(slug)),
  )

  return projects.sort((a, b) => {
    if (a.to && b.to) {
      return b.to.getTime() - a.to.getTime()
    }

    if (a.to) {
      return 1
    }

    if (b.to) {
      return -1
    }

    return b.from.getTime() - a.from.getTime()
  })
}
