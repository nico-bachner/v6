import Link from 'next/link'

import { Text } from '@/components/ui/Text'

const Page = () => (
  <main className="flex h-screen w-screen flex-col items-center justify-center gap-12 p-6">
    <Text
      as="h1"
      className="text-center text-7xl leading-none sm:text-8xl lg:text-9xl"
    >
      Nico Bachner
    </Text>

    <div className="mx-auto flex w-full max-w-screen-sm flex-col gap-4 self-stretch sm:flex-row sm:gap-6 lg:max-w-screen-md lg:gap-8">
      <Link
        href="/projects"
        className="flex flex-1 justify-center rounded bg-highlight-1 p-3 transition-colors hover:bg-highlight-2 sm:p-4 lg:p-5"
      >
        <Text size="md">Projects</Text>
      </Link>
      <Link
        href="/notes"
        className="flex flex-1 justify-center rounded bg-highlight-1 p-3 transition-colors hover:bg-highlight-2 sm:p-4 lg:p-5"
      >
        <Text size="md">Notes</Text>
      </Link>
    </div>
  </main>
)

export default Page
