'use client'

import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Back: React.FC = () => {
  const pathname = usePathname()
  const path = pathname.split('/')

  return (
    <Link
      href={{ pathname: path.slice(0, path.length - 1).join('/') }}
      className="flex items-center gap-2"
    >
      <ChevronLeftIcon className="h-5 w-5" /> Back
    </Link>
  )
}
