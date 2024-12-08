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
import { useTheme } from 'next-themes'
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from 'next/navigation'

import { useNotes } from '@/hooks/useNotes'
import { useProjects } from '@/hooks/useProjects'
import { GitHubIcon } from '@/icons/GitHub'
import { LinkedInIcon } from '@/icons/LinkedIn'
import { NBIcon } from '@/icons/NB'
import { pruneArray } from '@/utils/prune_array'

import { CommandMenuItem } from './types'

const getThemeIcon = (theme: string | undefined) => {
  switch (theme) {
    case 'light':
      return SunIcon
    case 'dark':
      return MoonIcon
    default:
      return ComputerDesktopIcon
  }
}

export const useCommandMenuItems = (): CommandMenuItem[] => {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const projects = useProjects()
  const notes = useNotes()
  const pathname = usePathname()

  return pruneArray([
    pathname == '/projects'
      ? {
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
        }
      : undefined,
    pathname == '/notes'
      ? {
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
        }
      : undefined,
    {
      id: 'Front Page',
      icon: NBIcon,
      title: 'Go to Front Page',
      group: 'Navigation',
      shortcut: '2',
      action: () => {
        router.push('/')
      },
    },
    {
      id: 'Projects',
      icon: Square2StackIcon,
      title: 'Browse Projects',
      group: 'Navigation',
      shortcut: '1',
      action: () => {
        router.push('/projects')
      },
    },
    {
      id: 'Notes',
      icon: DocumentDuplicateIcon,
      title: 'Browse Notes',
      group: 'Navigation',
      shortcut: '3',
      action: () => {
        router.push('/notes')
      },
    },
    {
      id: 'Theme',
      icon: getThemeIcon(theme),
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
  ])
}
