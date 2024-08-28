'use client'

import {
  ClipboardIcon,
  CodeBracketIcon,
  ComputerDesktopIcon,
  DocumentDuplicateIcon,
  DocumentIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  Square2StackIcon,
  StopIcon,
  SunIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { useHotkeys } from '@mantine/hooks'
import { Command } from 'cmdk'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Dialog } from '@/components/client/Dialog'
import { useNotes } from '@/hooks/useNotes'
import { useProjects } from '@/hooks/useProjects'
import { CommandIcon } from '@/icons/Command'
import { GitHubIcon } from '@/icons/GitHub'
import { LinkedInIcon } from '@/icons/LinkedIn'
import { NBIcon } from '@/icons/NB'
import { cn } from '@/utils/cn'

import { KeyboardShortcut } from '../ui/KeyboardShortcut'

export const CommandMenu = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>()
  const [tabs, setTabs] = useState(['Home'])
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const projects = useProjects()
  const notes = useNotes()

  type Item = {
    id: string
    icon: React.FC<Omit<React.SVGProps<SVGSVGElement>, 'ref'>>
    title: string
    group: string
    shortcut?: string
    action?: () => void
    children?: Item[]
  }

  const items: Item[] = [
    {
      id: 'Front Page',
      icon: NBIcon,
      title: 'Go to Front Page',
      group: 'Navigation',
      shortcut: 'ctrl+1',
      action: () => {
        router.push('/')
      },
    },
    {
      id: 'Projects',
      icon: Square2StackIcon,
      title: 'Projects',
      group: 'Navigation',
      children: [
        {
          id: 'Browse Projects',
          icon: Square2StackIcon,
          title: 'Browse Projects',
          group: 'Navigation',
          shortcut: 'ctrl+2',
          action: () => {
            router.push('/projects')
          },
        },
        {
          id: 'Search Projects',
          icon: MagnifyingGlassIcon,
          title: 'Search Projects',
          group: 'Navigation',
          children: projects?.map(({ title, slug }) => ({
            id: title,
            icon: StopIcon,
            title: title,
            group: 'Projects',
            action: () => {
              router.push(`/${slug}`)
            },
          })),
        },
      ],
    },
    {
      id: 'Notes',
      icon: DocumentDuplicateIcon,
      title: 'Browse Notes',
      group: 'Navigation',
      children: [
        {
          id: 'Browse Notes',
          icon: DocumentDuplicateIcon,
          title: 'Browse Notes',
          group: 'Navigation',
          shortcut: 'ctrl+3',
          action: () => {
            router.push('/notes')
          },
        },
        {
          id: 'Search Notes',
          icon: DocumentIcon,
          title: 'Search Notes',
          group: 'Navigation',
          children: notes?.map(({ title, slug }) => ({
            id: title,
            icon: DocumentIcon,
            title: title,
            group: 'Notes',
            action: () => {
              router.push(`/${slug}`)
            },
          })),
        },
      ],
    },
    {
      id: 'Email',
      icon: EnvelopeIcon,
      title: 'Send Me an Email',
      group: 'Contact',
      action: () => {
        window.open('mailto:mail@nbac.me')
      },
    },
    {
      id: 'LinkedIn',
      icon: LinkedInIcon,
      title: 'Connect on LinkedIn',
      group: 'Contact',
      action: () => {
        window.open('https://www.linkedin.com/in/nico-bachner/')
      },
    },
    {
      id: 'CV',
      icon: UserIcon,
      title: 'Curriculum Vitae',
      group: 'Personal Info',
      action: () => {
        window.open('https://read.cv/nico_bachner')
      },
    },
    {
      id: 'GitHub',
      icon: GitHubIcon,
      title: 'Browse my GitHub',
      group: 'Personal Info',
      action: () => {
        window.open('https://github.com/nico-bachner')
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
      title: 'Change Theme',
      group: 'Settings',
      shortcut: 'ctrl+t',
      children: [
        {
          id: 'Light Theme',
          icon: SunIcon,
          title: 'Change Theme to Light',
          group: 'settings',
          action: () => {
            setTheme('light')
          },
        },
        {
          id: 'Dark Theme',
          icon: MoonIcon,
          title: 'Change Theme to Dark',
          group: 'settings',
          action: () => {
            setTheme('dark')
          },
        },
        {
          id: 'System Theme',
          icon: ComputerDesktopIcon,
          title: 'Change Theme to System',
          group: 'settings',
          action: () => {
            setTheme('system')
          },
        },
      ],
    },
    {
      id: 'Copy URL',
      icon: ClipboardIcon,
      title: 'Copy Current URL',
      group: 'Miscellaneous',
      shortcut: 'ctrl+c',
      action: () => {
        navigator.clipboard.writeText(window.location.href)
      },
    },
    {
      id: 'Source',
      icon: CodeBracketIcon,
      title: 'View Source Code',
      group: 'Miscellaneous',
      shortcut: 'ctrl+u',
      action: () => {
        window.open('https://github.com/nico-bachner/v6')
      },
    },
  ]

  const getAllShortcuts = (items: Item[]) => {
    const shortcuts: [string, () => void][] = []

    const getShortcuts = (items: Item[]) => {
      items.forEach(({ shortcut, action, children }) => {
        if (shortcut && action) {
          shortcuts.push([shortcut, action])
        }

        if (children) {
          getShortcuts(children)
        }
      })
    }

    getShortcuts(items)

    return shortcuts
  }

  useHotkeys([['mod+k', () => setOpen(!open)], ...getAllShortcuts(items)])

  const allItems: Item[] = []

  const getAllItems = (items: Item[]) => {
    items.forEach((item) => {
      allItems.push(item)

      if (item.children) {
        getAllItems(item.children)
      }
    })

    return items
  }

  getAllItems(items)

  const currentTabItems =
    allItems.find(({ id }) => tabs[tabs.length - 1] == id)?.children ?? items

  return (
    <>
      <nav className="fixed bottom-4 right-4 z-20 flex justify-center sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8">
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
        <Command className="bg-transparent">
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
                      'py-0.5 rounded px-2 text-sm text-gray-700 dark:text-gray-300',
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

          <Command.List className="my-3 max-h-80 overflow-y-scroll px-3">
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
                    .map(
                      ({
                        id,
                        icon: Icon,
                        title,
                        shortcut,
                        action,
                        children,
                      }) => (
                        <Command.Item
                          key={id}
                          value={id}
                          onSelect={() => {
                            if (children) {
                              setTabs([...tabs, id])
                            } else {
                              setOpen(false)
                              setTabs(['Home'])

                              if (action) {
                                action()
                              }
                            }
                          }}
                          className={cn(
                            'data-[selected=true]:backdrop-blur-sm data-[selected=true]:bg-white/5 data-[selected=true]:shadow',
                            'flex cursor-pointer items-center gap-4 rounded p-3',
                          )}
                        >
                          <Icon className="box-content h-6 w-6" />
                          <span className="flex-1">{title}</span>
                          {shortcut ? (
                            <KeyboardShortcut shortcut={shortcut} />
                          ) : null}
                        </Command.Item>
                      ),
                    )}
                </Command.Group>
              ))}
          </Command.List>
        </Command>
      </Dialog>
    </>
  )
}
