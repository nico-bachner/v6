import { Card } from '@/components/client/Card'
import { Text } from '@/components/ui/Text'
import { fetchProjects } from '@/lib/fetchProjects'

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

const Page = async () => {
  const projects = await fetchProjects()

  return (
    <main className="lg:pt-28 flex flex-col gap-12 px-6 pb-32 pt-12 md:pt-20">
      <div className="mx-auto flex max-w-screen-sm flex-col gap-8">
        <Text as="h1">Projects</Text>

        <Text as="p">
          A comprehensive list of all the projects I have worked on, past &
          present, sorted in reverse chronological order by their respective
          dates of completion. Click on a card to reveal more information about
          the project.
        </Text>
      </div>

      <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-y-8 md:grid-cols-3 lg:gap-x-40">
        {projects.map(({ slug, title, description, from, to }) => (
          <Card
            key={slug}
            href={`/${slug}`}
            title={title}
            description={description}
            additionalInfo={getPeriod(from, to)}
            className="md:col-span-2 md:odd:col-start-1 md:even:col-start-2"
          />
        ))}
      </div>
    </main>
  )
}

export default Page
