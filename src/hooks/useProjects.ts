import { useEffect, useState } from 'react'

import { Project } from '@/types/project'

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>()

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch('/api/projects')
      const projects = await res.json()

      setProjects(projects)
    }

    fetchProjects()
  }, [])

  return projects
}
