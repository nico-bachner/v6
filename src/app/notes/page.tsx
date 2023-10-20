import { promises as fs } from 'fs'

import { InfoCard } from '@/components/ui/InfoCard'
import { fetchMDXData } from '@/lib/fetchMDXData'

const Page = async () => {
  const routes = await fs.readdir(`${process.cwd()}/src/app/(notes)`)
  const data = await Promise.all(
    routes
      .filter((route) => !route.includes('.tsx'))
      .map(async (slug) => await fetchMDXData(`src/app/(notes)`, slug)),
  )

  return (
    <main className="flex flex-col gap-20 px-6 pb-36 pt-12 md:pt-20 lg:pt-28">
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <h1 className="font-serif text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl">
          Notes
        </h1>

        <p className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
          My public notes, sorted in reverse chronological order by the date
          they were originally published. Click through to read them.
        </p>
      </div>

      <div className="mx-auto grid max-w-2xl gap-12 lg:max-w-5xl lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl lg:text-4xl">
            Timeless
          </h2>

          <p className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
            These notes need not be dated, whether it be due to their abstract
            nature or because they are continuously updated.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {data
            .filter(({ published }) => !published)
            .map(({ title, description, slug }) => (
              <InfoCard
                key={slug}
                href={slug}
                header={title}
                body={description}
                className="md:col-span-2 md:odd:col-start-1 md:even:col-start-2"
              />
            ))}
        </div>

        <div className="flex flex-col gap-2 lg:col-start-2 lg:row-start-1">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl lg:text-4xl">
            Timestamped
          </h2>

          <p className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
            These notes were relevant at the time of writing, but will due to
            their nature become less relevant over time as best practices and
            available technologies change.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {data
            .filter(({ published }) => published)
            .sort((a, b) => b.published - a.published)
            .map(({ title, description, slug, published }) => (
              <InfoCard
                key={slug}
                href={slug}
                header={title}
                body={description}
                info={new Date(published).toLocaleDateString()}
                className="md:col-span-2 md:odd:col-start-1 md:even:col-start-2"
              />
            ))}
        </div>
      </div>
    </main>
  )
}

export default Page
