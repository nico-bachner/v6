import Link from 'next/link'

import { fetchNotes } from '@/lib/fetchNotes'
import { cn } from '@/utils/cn'

const Page = async () => {
  const notes = await fetchNotes()

  return (
    <main className="lg:pt-28 flex flex-col gap-20 px-6 pb-32 pt-12 md:pt-20">
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <h1 className="font-serif text-4xl font-extrabold tracking-tight text-primary-3 sm:text-5xl lg:text-6xl">
          Notes
        </h1>

        <p className="sm:text-lg lg:text-xl">
          My public notes, sorted in reverse chronological order by the date
          they were originally published. Click through to read them.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        <div className="mx-auto flex max-w-2xl flex-col gap-2">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-primary-3 sm:text-3xl lg:text-4xl">
            Timeless
          </h2>

          <p className="sm:text-lg lg:text-xl">
            These notes need not be dated, whether it be due to their abstract
            nature or because they are continuously updated.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl gap-6 lg:max-w-5xl lg:grid-cols-2">
          {notes
            .filter(({ published }) => !published)
            .map(({ title, description, slug }) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className={cn(
                  'border bg-highlight-1',
                  'relative flex flex-col gap-2 rounded-lg p-8 sm:gap-3 sm:p-10 lg:gap-4 lg:p-12',
                )}
              >
                <h3 className="text-xl font-extrabold tracking-tight text-primary-3 sm:text-2xl lg:text-3xl">
                  {title}
                </h3>

                <p className="line-clamp-2 sm:text-lg lg:text-xl">
                  {description}
                </p>
              </Link>
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-12">
        <div className="mx-auto flex max-w-2xl flex-col gap-2">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-primary-3 sm:text-3xl lg:text-4xl">
            Timestamped
          </h2>

          <p className="sm:text-lg lg:text-xl">
            These notes were relevant at the time of writing, but will due to
            their nature become less relevant over time as best practices and
            available technologies change.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl gap-6 lg:max-w-5xl lg:grid-cols-2">
          {notes
            .filter(({ published }) => published)
            .sort((a, b) => b.published!.getTime() - a.published!.getTime())
            .map(({ title, description, slug, published }) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className={cn(
                  'border bg-highlight-1',
                  'relative flex flex-col justify-center gap-2 rounded-lg p-8 sm:gap-3 sm:p-10 lg:gap-4 lg:p-12',
                )}
              >
                <h3 className="text-xl font-extrabold tracking-tight text-primary-3 sm:text-2xl lg:text-3xl">
                  {title}
                </h3>

                <p className="line-clamp-2 sm:text-lg lg:text-xl">
                  {description}
                </p>

                <div
                  className={cn(
                    'border bg-highlight-1',
                    'absolute -right-3 -top-3 rounded px-4 py-2',
                  )}
                >
                  <p className="text-sm font-light text-primary-1 sm:text-base lg:text-lg">
                    {published!.toLocaleDateString('en-AU')}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </main>
  )
}

export default Page
