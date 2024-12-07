'use client'

import { useHotkeys } from '@mantine/hooks'
import { notFound, useRouter, useSelectedLayoutSegment } from 'next/navigation'

import { ContentTemplate } from '@/components/ui/ContentTemplate'
import { useCommits } from '@/hooks/useCommits'
import { useNotes } from '@/hooks/useNotes'
import { TemplateProps } from '@/types/next'

const Template: React.FC<TemplateProps> = ({ children }) => {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const notes = useNotes()
  const commits = useCommits('src/app/(notes)/')
  const router = useRouter()

  useHotkeys([
    [
      'Escape',
      () => {
        router.push('/projects')
      },
    ],
  ])

  if (!notes) {
    return <></>
  }

  const project = notes.find(({ slug }) => slug == selectedLayoutSegment)

  if (!project) {
    notFound()
  }

  // figure out what the adjacent notes are
  const index = notes.map(({ slug }) => slug).indexOf(project.slug)

  return (
    <ContentTemplate
      previous={notes[index - 1]}
      next={notes[index + 1]}
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
