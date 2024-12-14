'use client'

import { useCommandMenu } from '@/features/command_menu/provider'
import { CommandIcon } from '@/icons/Command'

export const CommandMenuTrigger = () => {
  const { setOpen } = useCommandMenu()

  return (
    <nav className="fixed bottom-4 right-4 z-20 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8">
      <button
        onClick={() => {
          setOpen(true)
        }}
        className="cursor-pointer rounded-full bg-highlight-2 p-3 transition hover:scale-110 hover:bg-highlight-3 focus:scale-110 focus:bg-highlight-3 focus:outline-none"
      >
        <CommandIcon className="size-8 stroke-primary-3 sm:size-9 lg:size-10" />
      </button>
    </nav>
  )
}
