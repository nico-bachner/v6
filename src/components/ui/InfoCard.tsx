import Link from 'next/link'

import { cn } from '@/utils/cn'

type InfoCardProps = React.ComponentProps<typeof Link> & {
  href: string
  header: string
  body?: string
  info?: string
}

export const InfoCard: React.FC<InfoCardProps> = ({
  href,
  header,
  body,
  info,
  className,
  ...props
}) => (
  <Link
    href={href}
    className={cn(
      'bg-white/5 shadow backdrop-blur',
      'transition hover:bg-white/10 hover:shadow-lg hover:backdrop-blur-lg',
      'relative flex flex-col gap-2 rounded-lg p-8 sm:gap-3 sm:p-10 lg:gap-4 lg:p-12',
      className,
    )}
    {...props}
  >
    <p className="text-xl tracking-tight sm:text-2xl lg:text-3xl">
      <strong className="font-extrabold">{header}</strong>
    </p>

    <p className="prose line-clamp-2 dark:prose-invert sm:prose-lg lg:prose-xl">
      {body}
    </p>

    {info ? (
      <div
        className={cn(
          'bg-white/5 shadow backdrop-blur',
          'absolute -right-3 -top-3 rounded px-4 py-2',
        )}
      >
        <p className="text-sm font-light text-gray-500 sm:text-base lg:text-lg">
          {info}
        </p>
      </div>
    ) : (
      <></>
    )}
  </Link>
)
