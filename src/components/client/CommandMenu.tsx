'use client'

import {
  ClipboardIcon,
  CodeBracketIcon,
  ComputerDesktopIcon,
  EnvelopeIcon,
  HomeModernIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  PencilIcon,
  SunIcon,
  UserIcon,
  WrenchIcon,
} from '@heroicons/react/24/outline'
import { useHotkeys } from '@mantine/hooks'
import { Command } from 'cmdk'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Dialog } from '@/components/client/Dialog'
import { GitHubIcon } from '@/icons/GitHub'

import { KeyboardShortcut } from '../ui/KeyboardShortcut'

export const CommandMenu = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>()
  const [tabs, setTabs] = useState(['Home'])
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  type Item = {
    id: string
    icon: React.FC<Omit<React.SVGProps<SVGSVGElement>, 'ref'>>
    title: string
    group: string
    shortcut?: string
    action: () => void
    children?: Item[]
  }

  const items: Item[] = [
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
      id: 'Theme',
      icon:
        theme == 'light'
          ? SunIcon
          : theme == 'dark'
          ? MoonIcon
          : ComputerDesktopIcon,
      title: 'Change Theme...',
      group: 'general',
      shortcut: 'ctrl+t',
      action: () => {
        setOpen(true)
        setTabs(['Home', 'Theme'])
      },
      children: [
        {
          id: 'Light Theme',
          icon: SunIcon,
          title: 'Change Theme to Light',
          group: 'general',
          action: () => {
            setTheme('light')
          },
        },
        {
          id: 'Dark Theme',
          icon: MoonIcon,
          title: 'Change Theme to Dark',
          group: 'general',
          action: () => {
            setTheme('dark')
          },
        },
        {
          id: 'System Theme',
          icon: ComputerDesktopIcon,
          title: 'Change Theme to System',
          group: 'general',
          action: () => {
            setTheme('system')
          },
        },
      ],
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
    ['mod+k', () => setOpen(!open)],
    ...items
      .filter(({ shortcut }) => shortcut)
      .map(
        ({ shortcut, action }) => [shortcut, action] as [string, () => void],
      ),
  ])

  const currentTabItems =
    items.find(({ id }) => tabs[tabs.length - 1] == id)?.children ?? items

  return (
    <Dialog
      open={open}
      onOpenChange={(open) =>
        !open && tabs.length > 1
          ? setTabs(tabs.slice(0, tabs.length - 1))
          : setOpen(false)
      }
    >
      <Command>
        <div className="flex flex-col-reverse gap-3 p-3 text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4 px-3">
            <MagnifyingGlassIcon className="h-6 w-6" />
            <Command.Input
              className="w-full bg-transparent text-base outline-none placeholder:text-gray-400 dark:text-gray-500"
              placeholder="Type a command or search..."
              value={value}
              onValueChange={(value) => setValue(value)}
            />
          </div>
          <div className="flex justify-between px-3">
            <div className="flex gap-2">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => {
                    setTabs(tabs.slice(0, i + 1))
                  }}
                  className="rounded bg-black/5 px-2 py-0.5 text-sm text-gray-500 dark:bg-white/10 dark:text-gray-400"
                >
                  {tab}
                </button>
              ))}
            </div>
            <KeyboardShortcut shortcut="mod+k" />
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        <Command.List className="m-3 max-h-80 overflow-y-scroll">
          <Command.Empty className="p-6 text-center">
            No results found.
          </Command.Empty>

          {currentTabItems
            .filter(
              ({ group }, i) =>
                currentTabItems.map(({ group }) => group).indexOf(group) == i,
            )
            .map(({ group }) => (
              <Command.Group
                key={group}
                heading={group}
                className="text-gray-500 dark:text-gray-400"
              >
                {currentTabItems
                  .filter((option) => option.group == group)
                  .map(({ id, icon: Icon, title, shortcut, action }) => (
                    <Command.Item
                      key={id}
                      value={id}
                      onSelect={() => {
                        setOpen(false)
                        setTabs(tabs.slice(0, tabs.length - 1))
                        action()
                      }}
                      className="flex cursor-pointer items-center gap-4 rounded-lg p-3 data-[selected=true]:bg-black/5 data-[selected=true]:dark:bg-white/10"
                    >
                      <Icon className="box-content h-6 w-6" />
                      <span className="flex-1">{title}</span>
                      {shortcut ? (
                        <KeyboardShortcut shortcut={shortcut} />
                      ) : null}
                    </Command.Item>
                  ))}
              </Command.Group>
            ))}
        </Command.List>
      </Command>
    </Dialog>
  )
}
