import Link from 'next/link'

import { fetchProjects } from '@/lib/fetchProjects'
import { cn } from '@/utils/cn'

const Page = async () => {
  const projects = await fetchProjects()

  const getPeriod = (from: Date, to: Date | undefined) => {
    const from_year = from.getFullYear()

    if (to) {
      const to_year = to.getFullYear()

      if (to_year == from_year) {
        return to_year.toString()
      }

      return [from_year, to_year].join(' – ')
    }

    return `${from_year} – Now`
  }

  return (
    <main className="lg:pt-28 flex flex-col gap-12 px-6 pb-32 pt-12 md:pt-20">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <h1 className="font-serif text-4xl font-extrabold tracking-tight text-primary-3 sm:text-5xl lg:text-6xl">
          Projects
        </h1>

        <p className="sm:text-lg lg:text-xl">
          A comprehensive list of all the projects I have worked on, past &
          present, sorted in reverse chronological order by their respective
          dates of completion. Click on a card to reveal more information about
          the project.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-y-8 md:grid-cols-3 lg:gap-x-40">
        {projects.map(({ title, description, slug, from, to }) => (
          <Link
            key={slug}
            href={`/${slug}`}
            className={cn(
              'border bg-highlight-1',
              'relative flex flex-col gap-2 rounded-lg p-8 sm:gap-3 sm:p-10 lg:gap-4 lg:p-12',
              'md:col-span-2 md:odd:col-start-1 md:even:col-start-2',
            )}
          >
            <h3 className="text-xl font-extrabold tracking-tight text-primary-3 sm:text-2xl lg:text-3xl">
              {title}
            </h3>

            <p className="line-clamp-2 sm:text-lg lg:text-xl">{description}</p>

            <div
              className={cn(
                'border bg-highlight-1',
                'absolute -right-3 -top-3 rounded px-4 py-2',
              )}
            >
              <p className="text-sm font-light text-primary-1 sm:text-base lg:text-lg">
                {getPeriod(from, to)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

export default Page
