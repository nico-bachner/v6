import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import type { ImageProps } from 'next/image'
import Link from 'next/link'
import { Tabs } from 'radix-ui'

export const useMDXComponents = (components: MDXComponents): MDXComponents => ({
  Image: ({ src, alt }: ImageProps) => <Image src={src} alt={alt} />,
  a: ({ children, href }: React.ComponentProps<'a'>) =>
    href?.startsWith('/') ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  Tabs: Tabs.Root,
  TabTriggerList: Tabs.List,
  TabTrigger: Tabs.Trigger,
  TabContent: Tabs.Content,
  ...components,
})
