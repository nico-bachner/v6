import { promises as fs } from 'fs'
import matter from 'gray-matter'

/**
 * Asynchronously parses YAML Frontmatter from a MDX file.
 *
 * @param path
 * Path to the directory containing the page from the root directory of the repository.
 * Example: `src/app/`
 *
 * @param slug
 * Path to the MDX file from the root directory of the repository.
 * Example: `hello-world`
 */
export const fetchMDXData = async (
  path: string,
  slug: string,
): Promise<{ [key: string]: any }> => {
  const content = await fs.readFile(
    `${process.cwd()}/${path}/${slug}/page.mdx`,
    'utf8',
  )

  return {
    slug,
    ...matter(content).data,
    content,
  }
}
