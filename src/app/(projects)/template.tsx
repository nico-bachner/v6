'use client'

import { useHotkeys } from '@mantine/hooks'
import { notFound, useRouter, useSelectedLayoutSegment } from 'next/navigation'

import { ContentTemplate } from '@/components/ui/ContentTemplate'
import { useCommits } from '@/hooks/useCommits'
import { useProjects } from '@/hooks/useProjects'
import { TemplateProps } from '@/types/next'

const Template: React.FC<TemplateProps> = ({ children }) => {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const projects = useProjects()
  const commits = useCommits('src/app/(projects)/')
  const router = useRouter()

  useHotkeys([
    [
      'Escape',
      () => {
        router.push('/projects')
      },
    ],
  ])

  if (!projects) {
    return <></>
  }

  const project = projects.find(({ slug }) => slug == selectedLayoutSegment)

  if (!project) {
    notFound()
  }

  // figure out what the adjacent projects are
  const index = projects.map(({ slug }) => slug).indexOf(project.slug)

  return (
    <ContentTemplate
      previous={projects[index - 1]}
      next={projects[index + 1]}
      readingTime={[
        Math.ceil(project.content.split(' ').length / 230),
        Math.ceil(project.content.split(' ').length / 180),
      ]}
      lastUpdated={
        commits && new Date(commits[0]?.commit.author.date).toLocaleDateString()
      }
      {...project}
    >
      {children}
    </ContentTemplate>
  )
}

export default Template
