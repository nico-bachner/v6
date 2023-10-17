import { promises as fs } from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'

const Page = async () => {
  const routes = await fs.readdir(process.cwd() + '/src/app/(projects)')
  const pages = await Promise.all(
    routes
      .filter((route) => !route.includes('.tsx'))
      .map(async (route) => {
        const content = await fs.readFile(
          process.cwd() + `/src/app/(projects)/${route}/page.mdx`,
          'utf8',
        )

        return {
          slug: route,
          content,
        }
      }),
  )

  const data: {
    [key: string]: any
  }[] = pages.map(({ slug, content }) => ({
    slug,
    ...matter(content).data,
  }))

  return (
    <main className="p-6">
      <h1>Projects</h1>

      <div className="my-20 flex flex-col gap-6">
        {data.map(({ title, description, slug }) => (
          <Link
            href={{ pathname: slug }}
            key={title}
            className="flex flex-col gap-2"
          >
            <p>{title}</p>
            <p>{description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}

export default Page
