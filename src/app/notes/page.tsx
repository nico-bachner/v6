import { InfoCard } from '@/components/ui/InfoCard'
import { fetchNotes } from '@/lib/fetchNotes'

const Page = async () => {
  const notes = await fetchNotes()

  return (
    <main className="lg:pt-28 flex flex-col gap-20 px-6 pb-32 pt-12 md:pt-20">
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <h1 className="font-serif text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl">
          Notes
        </h1>

        <p className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
          My public notes, sorted in reverse chronological order by the date
          they were originally published. Click through to read them.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        <div className="mx-auto flex max-w-2xl flex-col gap-2">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl lg:text-4xl">
            Timeless
          </h2>

          <p className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
            These notes need not be dated, whether it be due to their abstract
            nature or because they are continuously updated.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl gap-6 lg:max-w-5xl lg:grid-cols-2">
          {notes
            .filter(({ published }) => !published)
            .map(({ title, description, slug }) => (
              <InfoCard
                key={slug}
                href={slug}
                header={title}
                body={description}
              />
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-12">
        <div className="mx-auto flex max-w-2xl flex-col gap-2">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl lg:text-4xl">
            Timestamped
          </h2>

          <p className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
            These notes were relevant at the time of writing, but will due to
            their nature become less relevant over time as best practices and
            available technologies change.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl gap-6 lg:max-w-5xl lg:grid-cols-2">
          {notes
            .filter(({ published }) => published)
            .sort((a, b) => b.published - a.published)
            .map(({ title, description, slug, published }) => (
              <InfoCard
                key={slug}
                href={slug}
                header={title}
                body={description}
                info={new Date(published).toLocaleDateString()}
              />
            ))}
        </div>
      </div>
    </main>
  )
}

export default Page
