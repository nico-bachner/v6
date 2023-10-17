import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import type { ImageProps } from 'next/image'

export const useMDXComponents = (components: MDXComponents): MDXComponents => ({
  // eslint-disable-next-line jsx-a11y/alt-text
  Image: (props: ImageProps) => <Image {...props} />,
  ...components,
})
