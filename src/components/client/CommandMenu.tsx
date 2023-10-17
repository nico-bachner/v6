'use client'

import {
  ClipboardIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  HomeModernIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  UserIcon,
  WrenchIcon,
} from '@heroicons/react/24/outline'
import { useHotkeys } from '@mantine/hooks'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Dialog } from '@/components/client/Dialog'
import { GitHubIcon } from '@/icons/GitHub'

export const CommandMenu = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>()
  const router = useRouter()

  const items = [
    {
      id: 'Copy URL',
      icon: ClipboardIcon,
      title: 'Copy Current URL',
      group: 'general',
      shortcut: 'ctrl+c',
      action: () => {
        navigator.clipboard.writeText(window.location.href)
      },
    },
    {
      id: 'Home',
      icon: HomeModernIcon,
      title: 'Go Home',
      group: 'navigation',
      shortcut: 'ctrl+1',
      action: () => {
        router.push('/')
      },
    },
    {
      id: 'Projects',
      icon: WrenchIcon,
      title: 'See Projects',
      group: 'navigation',
      shortcut: 'ctrl+2',
      action: () => {
        router.push('/projects')
      },
    },
    {
      id: 'Articles',
      icon: PencilIcon,
      title: 'Browse Articles',
      group: 'navigation',
      shortcut: 'ctrl+3',
      action: () => {
        router.push('/articles')
      },
    },
    {
      id: 'GitHub',
      icon: GitHubIcon,
      title: 'Follow Me on GitHub',
      group: 'social',
      action: () => {
        window.open('https://github.com/nico-bachner')
      },
    },
    {
      id: 'Email',
      icon: EnvelopeIcon,
      title: 'Send Me an Email',
      group: 'contact',
      action: () => {
        window.open('mailto:mail@nbac.me')
      },
    },
    {
      id: 'CV',
      icon: UserIcon,
      title: 'Curriculum Vitae',
      group: 'miscellaneous',
      action: () => {
        window.open('https://read.cv/nico_bachner')
      },
    },
    {
      id: 'Source',
      icon: CodeBracketIcon,
      title: 'View Source Code',
      group: 'miscellaneous',
      action: () => {
        window.open('https://github.com/nico-bachner/v6')
      },
    },
  ]

  useHotkeys([
    ['mod+k', () => setOpen(true)],
    ...items
      .filter(({ shortcut }) => shortcut)
      .map(
        ({ shortcut, action }) => [shortcut, action] as [string, () => void],
      ),
  ])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Command>
        <div className="flex items-center gap-4 px-6 py-4 text-gray-700 dark:text-gray-300">
          <MagnifyingGlassIcon className="h-6 w-6" />
          <Command.Input
            className="w-full bg-transparent text-base outline-none placeholder:text-gray-500"
            placeholder="Type a command or search..."
            value={value}
            onValueChange={(value) => setValue(value)}
          />
        </div>

        <hr className="border-gray-300 dark:border-gray-700" />

        <Command.List className="m-2 max-h-80 overflow-y-scroll">
          <Command.Empty className="p-6 text-center">
            No results found.
          </Command.Empty>

          {items.map(({ id, icon: Icon, title, shortcut, action }) => (
            <Command.Item
              key={id}
              value={id}
              onSelect={() => action()}
              className="flex cursor-pointer items-center gap-4 rounded-lg p-4 text-gray-600 data-[selected=true]:bg-black/10 data-[selected=true]:text-gray-700 dark:text-gray-400 data-[selected=true]:dark:bg-white/10 data-[selected=true]:dark:text-gray-300"
            >
              <Icon className="box-content h-6 w-6" />
              <span className="flex-1">{title}</span>
              <span className="flex items-center gap-2">
                {shortcut?.split('+').map((key) => (
                  <kbd key={key} className="text-base">
                    {key}
                  </kbd>
                ))}
              </span>
            </Command.Item>
          ))}
        </Command.List>
      </Command>
    </Dialog>
  )
}
