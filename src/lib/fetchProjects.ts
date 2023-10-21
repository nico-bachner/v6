import { promises as fs } from 'fs'

import { fetchMDXData } from '@/lib/fetchMDXData'

export const fetchProjects = async () => {
  const routes = await fs.readdir(`${process.cwd()}/src/app/(projects)`)
  const data = await Promise.all(
    routes
      .filter((route) => !route.includes('.tsx'))
      .map(async (slug) => await fetchMDXData(`src/app/(projects)`, slug)),
  )

  const projects = data.sort((a, b) => {
    if (a.to && b.to) {
      return b.to - a.to
    }

    if (a.to) {
      return 1
    }

    if (b.to) {
      return -1
    }

    return b.from - a.from
  })

  return projects
}
