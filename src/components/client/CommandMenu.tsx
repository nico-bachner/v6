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
import { CommandIcon } from '@/icons/Command'
import { GitHubIcon } from '@/icons/GitHub'
import { cn } from '@/utils/cn'

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
      title: 'Browse Projects',
      group: 'navigation',
      shortcut: 'ctrl+2',
      action: () => {
        router.push('/projects')
      },
    },
    {
      id: 'Notes',
      icon: PencilIcon,
      title: 'Read Notes',
      group: 'navigation',
      shortcut: 'ctrl+3',
      action: () => {
        router.push('/notes')
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
      group: 'settings',
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
      id: 'Copy URL',
      icon: ClipboardIcon,
      title: 'Copy Current URL',
      group: 'miscellaneous',
      shortcut: 'ctrl+c',
      action: () => {
        navigator.clipboard.writeText(window.location.href)
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
    ['space', () => setOpen(!open)],
    ...items
      .filter(({ shortcut }) => shortcut)
      .map(
        ({ shortcut, action }) => [shortcut, action] as [string, () => void],
      ),
  ])

  const currentTabItems =
    items.find(({ id }) => tabs[tabs.length - 1] == id)?.children ?? items

  return (
    <>
      <nav className="fixed bottom-4 left-0 right-0 z-20 flex justify-center">
        <button
          onClick={() => {
            setOpen(!open)
          }}
          className={cn(
            'bg-white/10 shadow-lg backdrop-blur-lg transition',
            'cursor-pointer rounded-full p-4 hover:scale-110',
          )}
        >
          <CommandIcon className="h-8 w-8 stroke-gray-700 dark:stroke-gray-300" />
        </button>
      </nav>

      <Dialog
        open={open}
        onOpenChange={(open) =>
          !open && tabs.length > 1
            ? setTabs(tabs.slice(0, tabs.length - 1))
            : setOpen(false)
        }
      >
        <Command>
          <div className="flex flex-col-reverse gap-3 p-3">
            <div className="flex items-center gap-4 px-3">
              <MagnifyingGlassIcon className="h-6 w-6" />
              <Command.Input
                className="w-full bg-transparent text-base outline-none placeholder:text-gray-500"
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
                    className={cn(
                      'bg-white/5 shadow backdrop-blur',
                      'rounded px-2 py-0.5 text-sm text-gray-700 dark:text-gray-300',
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <KeyboardShortcut shortcut="mod+k" />
            </div>
          </div>

          <hr className="border-gray-500/20" />

          <Command.List className="max-h-80 overflow-y-scroll p-3 px-3">
            <Command.Empty className="p-6 text-center">
              No results found.
            </Command.Empty>

            {currentTabItems
              .filter(
                ({ group }, i) =>
                  currentTabItems.map(({ group }) => group).indexOf(group) == i,
              )
              .map(({ group }) => (
                <Command.Group key={group} heading={group}>
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
                        className={cn(
                          'data-[selected=true]:bg-white/5 data-[selected=true]:shadow data-[selected=true]:backdrop-blur-sm',
                          'flex cursor-pointer items-center gap-4 rounded p-3',
                        )}
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
    </>
  )
}
