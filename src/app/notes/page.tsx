import Link from 'next/link'

import { Text } from '@/components/ui/Text'
import { fetchNotes } from '@/lib/fetchNotes'
import { cn } from '@/utils/cn'

const Page = async () => {
  const notes = await fetchNotes()

  return (
    <main className="lg:pt-28 flex flex-col gap-20 px-6 pb-32 pt-12 md:pt-20">
      <div className="mx-auto flex max-w-screen-sm flex-col gap-4">
        <Text as="h1">Notes</Text>

        <Text as="p">
          My public notes, sorted in reverse chronological order by the date
          they were originally published. Click through to read them.
        </Text>
      </div>

      <div className="flex flex-col gap-12">
        <div className={cn('mx-auto max-w-screen-sm', 'flex flex-col gap-2')}>
          <Text as="h2">Timeless</Text>

          <Text as="p">
            These notes need not be dated, whether it be due to their abstract
            nature or because they are continuously updated.
          </Text>
        </div>

        <div
          className={cn(
            'mx-auto max-w-screen-sm lg:max-w-screen-lg',
            'grid grid-cols-1 gap-6 lg:grid-cols-2',
          )}
        >
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
                <Text as="h3" className="font-bold">
                  {title}
                </Text>

                <Text as="p" className="line-clamp-2">
                  {description}
                </Text>
              </Link>
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-12">
        <div className={cn('mx-auto max-w-screen-sm', 'flex flex-col gap-2')}>
          <Text as="h2">Timestamped</Text>

          <Text as="p">
            These notes were relevant at the time of writing, but will due to
            their nature become less relevant over time as best practices and
            available technologies change.
          </Text>
        </div>

        <div
          className={cn(
            'mx-auto max-w-screen-sm lg:max-w-screen-lg',
            'grid grid-cols-1 gap-6 lg:grid-cols-2',
          )}
        >
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
                <Text as="h3" className="font-bold">
                  {title}
                </Text>

                <Text as="p" className="line-clamp-2">
                  {description}
                </Text>

                <div
                  className={cn(
                    'border bg-highlight-1',
                    'absolute -right-3 -top-3 rounded px-4 py-2',
                  )}
                >
                  <p className="text-sm font-light text-primary-1 sm:text-md lg:text-lg">
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
