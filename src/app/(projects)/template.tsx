'use client'

import { notFound, useSelectedLayoutSegment } from 'next/navigation'

import { Related } from '@/components/ui/Related'
import { Text } from '@/components/ui/Text'
import { useCommits } from '@/hooks/useCommits'
import { useProjects } from '@/hooks/useProjects'
import { GitHubIcon } from '@/icons/GitHub'
import { TemplateProps } from '@/types/next'

const Template: React.FC<TemplateProps> = ({ children }) => {
  const selectedLayoutSegment = useSelectedLayoutSegment()
  const projects = useProjects()
  const commits = useCommits('src/app/(projects)/')

  if (!projects) {
    return <></>
  }

  const project = projects.find(({ slug }) => slug == selectedLayoutSegment)

  if (!project) {
    notFound()
  }

  const { slug, title, description, content } = project

  const readingTime = [
    Math.ceil(content.split(' ').length / 230),
    Math.ceil(content.split(' ').length / 180),
  ]

  // figure out what the adjacent projects are
  const index = projects.map(({ slug }) => slug).indexOf(slug)
  const previous = projects[index - 1]
  const next = projects[index + 1]

  return (
    <main className="mx-auto flex w-full max-w-screen-sm flex-col gap-8">
      <div className="flex flex-col gap-12">
        <div className="mx-auto flex w-full max-w-screen-sm flex-col gap-4">
          <Text as="h1" className="text-center">
            {title}
          </Text>
          <Text as="p" size="lg" className="text-center font-sans font-light">
            {description}
          </Text>
        </div>

        <Related previous={previous} next={next} />

        <div className="flex justify-between">
          <Text>
            Last Updated:{' '}
            {commits && commits[0]
              ? new Date(commits[0].commit.author.date).toLocaleDateString()
              : 'Never'}
          </Text>
          <Text>
            {readingTime[0] == readingTime[1]
              ? readingTime[0]
              : readingTime.join('-')}{' '}
            minute read
          </Text>
        </div>
      </div>

      <hr />

      <article className="prose w-full">{children}</article>

      <hr />

      <div className="flex flex-col items-center gap-8">
        <Related previous={previous} next={next} className="w-full" />

        <a
          href={`https://github.com/nico-bachner/v6/edit/main/src/app/(projects)/${slug}/page.mdx`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row items-center gap-4 rounded border px-4 py-2"
        >
          <GitHubIcon className="size-4 stroke-primary-1 sm:size-5 lg:size-6" />
          <Text>Edit on GitHub</Text>
        </a>
      </div>
    </main>
  )
}

export default Template
