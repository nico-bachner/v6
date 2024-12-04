'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

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
    throw new Error(`Project ${project} does not exist in projects`)
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
    <main className="mx-auto flex max-w-screen-sm flex-col gap-8">
      <div className="mt-8 flex flex-col gap-12 sm:mt-12 lg:mt-20">
        <div className="mx-auto flex max-w-screen-sm flex-col gap-4 text-center">
          <h1 className="text-gray-900 dark:text-gray-100 font-serif text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="text-lg font-light sm:text-xl lg:text-2xl">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {previous ? (
            <Link href={previous.slug} className="flex items-center gap-2">
              <ChevronLeftIcon className="h-6 w-6" />
              <div className="flex flex-1 flex-col">
                <span className="text-gray-500 text-sm">Previous</span>
                <span>{previous.title}</span>
              </div>
            </Link>
          ) : (
            <div></div>
          )}
          {next ? (
            <Link href={next.slug} className="flex items-center gap-2">
              <div className="flex flex-1 flex-col">
                <span className="text-gray-500 text-sm">Next</span>
                <span>{next.title}</span>
              </div>
              <ChevronRightIcon className="h-6 w-6" />
            </Link>
          ) : (
            <div></div>
          )}
        </div>

        <div className="text-gray-500 sm:text-md flex justify-between text-sm font-light lg:text-lg">
          <p>
            Last Updated:{' '}
            {commits && commits[0]
              ? new Date(commits[0].commit.author.date).toLocaleDateString()
              : 'Never'}
          </p>
          <p>
            {readingTime[0] == readingTime[1]
              ? readingTime[0]
              : readingTime.join('-')}{' '}
            minute read
          </p>
        </div>
      </div>

      <hr />

      <article className="prose-a:text-blue-500 prose sm:prose-lg lg:prose-xl dark:prose-invert">
        {children}
      </article>

      <hr />

      <div className="mb-32 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          {previous ? (
            <Link href={previous.slug} className="flex items-center gap-2">
              <ChevronLeftIcon className="h-6 w-6" />
              <div className="flex flex-1 flex-col">
                <span className="text-gray-500 text-sm">Previous</span>
                <span>{previous.title}</span>
              </div>
            </Link>
          ) : (
            <div></div>
          )}
          {next ? (
            <Link href={next.slug} className="flex items-center gap-2">
              <div className="flex flex-1 flex-col">
                <span className="text-gray-500 text-sm">Next</span>
                <span>{next.title}</span>
              </div>
              <ChevronRightIcon className="h-6 w-6" />
            </Link>
          ) : (
            <div></div>
          )}
        </div>

        <div className="flex justify-center">
          <a
            href={`https://github.com/nico-bachner/v6/edit/main/src/app/(projects)/${slug}/page.mdx`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded border px-4 py-2"
          >
            <GitHubIcon className="h-5 w-5" />
            <span>Edit on GitHub</span>
          </a>
        </div>
      </div>
    </main>
  )
}

export default Template
