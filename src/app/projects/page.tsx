import { promises as fs } from 'fs'
import Link from 'next/link'

import { InfoCard } from '@/components/ui/InfoCard'
import { fetchMDXData } from '@/lib/fetchMDXData'

const Page = async () => {
  const routes = await fs.readdir(`${process.cwd()}/src/app/(projects)`)
  const data = await Promise.all(
    routes
      .filter((route) => !route.includes('.tsx'))
      .map(async (slug) => await fetchMDXData(`src/app/(projects)`, slug)),
  )

  return (
    <main className="flex flex-col gap-12 px-6 pb-36 pt-12 md:pt-20 lg:pt-28">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <h1 className="font-serif text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl">
          Projects
        </h1>

        <p>
          A comprehensive list of all the projects I have worked on, past &
          present, sorted in reverse chronological order by their respective
          dates of completion. <br /> Click on a card to reveal more information
          about the project.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-y-8 md:grid-cols-3 lg:gap-x-40">
        {data
          .sort((a, b) => {
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
          .map(({ title, description, slug }) => (
            <InfoCard
              key={slug}
              href={slug}
              header={title}
              body={description}
              cta="More Information"
              className="md:col-span-2 md:odd:col-start-1 md:even:col-start-2"
            />
          ))}
      </div>
    </main>
  )
}

export default Page
