import { promises as fs } from 'fs'

import { EditOnGitHub } from '@/components/client/EditOnGitHub'
import { Header } from '@/components/client/Header'
import { LastUpdated } from '@/components/client/LastUpdated'
import { Navigation } from '@/components/client/Navigation'
import { ReadingTime } from '@/components/client/ReadingTime'
import { Back } from '@/components/ui/Back'
import { fetchMDXData } from '@/lib/fetchMDXData'

const Template: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const routes = await fs.readdir(`${process.cwd()}/src/app/(notes)`)
  const data = await Promise.all(
    routes
      .filter((route) => !route.includes('.tsx'))
      .map(async (slug) => await fetchMDXData(`src/app/(notes)`, slug)),
  )

  const notes = [
    ...data.filter(({ published }) => !published),
    ...data
      .filter(({ published }) => published)
      .sort((a, b) => b.published - a.published),
  ]

  return (
    <div className="p-6">
      <Back href="/notes" />

      <main className="mx-auto flex max-w-2xl flex-col gap-8">
        <div className="mt-8 flex flex-col gap-12 sm:mt-12 lg:mt-20">
          <Header items={notes} />

          <div className="flex justify-between text-sm font-light text-gray-500 sm:text-base lg:text-lg">
            <LastUpdated />
            <ReadingTime items={notes} />
          </div>
        </div>

        <hr />

        <article className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
          {children}
        </article>

        <hr />

        <div className="mb-32 flex flex-col gap-8">
          <Navigation items={notes} />

          <div className="flex justify-center">
            <EditOnGitHub />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Template
