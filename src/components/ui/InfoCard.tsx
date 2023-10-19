import Link from 'next/link'

import { cn } from '@/utils/cn'

type InfoCardProps = React.ComponentProps<typeof Link> & {
  href: string
  header: string
  body?: string
  cta: string
  info?: string
}

export const InfoCard: React.FC<InfoCardProps> = ({
  href,
  header,
  body,
  cta,
  info,
  ...props
}) => (
  <Link href={href} {...props}>
    <div
      className={cn(
        'bg-white/5 shadow backdrop-blur',
        'transition hover:bg-white/10 hover:shadow-lg hover:backdrop-blur-lg',
        'flex flex-col gap-2 rounded-lg p-8 sm:gap-3 sm:p-10 lg:gap-4 lg:p-12',
      )}
    >
      <p className="text-xl tracking-tight sm:text-2xl lg:text-3xl">
        <strong className="font-extrabold">{header}</strong>
      </p>
      <p className="prose line-clamp-2 dark:prose-invert sm:prose-lg lg:prose-xl">
        {body}
      </p>
      <div className="flex items-center justify-between sm:text-lg lg:text-xl">
        <p className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text font-bold tracking-tight text-transparent">
          {cta} <span className="font-sans">{'->'}</span>
        </p>
        <p className="text-gray-500">{info}</p>
      </div>
    </div>
  </Link>
)
