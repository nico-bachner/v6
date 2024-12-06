import { Related } from '@/components/ui/Related'
import { Text } from '@/components/ui/Text'
import { GitHubIcon } from '@/icons/GitHub'
import { ReadingTime, Sibling } from '@/types/content'
import { TemplateProps } from '@/types/next'

type ContentTemplateProps = TemplateProps & {
  slug: string
  title: string
  description: string
  lastUpdated?: string
  readingTime?: ReadingTime
  previous?: Sibling
  next?: Sibling
}

export const ContentTemplate: React.FC<ContentTemplateProps> = ({
  slug,
  title,
  description,
  lastUpdated,
  readingTime,
  previous,
  next,
  children,
}) => (
  <main className="flex flex-col gap-8">
    <div className="mx-auto flex w-full max-w-screen-sm flex-col gap-12">
      <div className="flex flex-col gap-4">
        <Text as="h1" className="text-center">
          {title}
        </Text>
        <Text as="p" size="lg" className="text-center font-sans font-light">
          {description}
        </Text>
      </div>

      <Related previous={previous} next={next} />

      <div className="flex justify-between">
        {lastUpdated ? <Text>Last Updated: {lastUpdated}</Text> : <Text />}
        {readingTime ? (
          <Text>
            {readingTime[0] == readingTime[1]
              ? readingTime[0]
              : readingTime.join('-')}{' '}
            minute read
          </Text>
        ) : (
          <Text />
        )}
      </div>
    </div>

    <hr className="mx-auto w-full max-w-screen-sm" />

    <article className="prose mx-auto max-w-screen-lg sm:prose-lg lg:prose-xl">
      {children}
    </article>

    <hr className="mx-auto w-full max-w-screen-sm" />

    <div className="mx-auto flex w-full max-w-screen-sm flex-col items-center gap-8">
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
