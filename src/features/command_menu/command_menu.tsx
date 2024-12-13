'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useHotkeys } from '@mantine/hooks'
import { Command } from 'cmdk'
import { useState } from 'react'

import { Dialog } from '@/components/client/Dialog'
import { CommandIcon } from '@/icons/Command'
import { pruneArray } from '@/utils/prune_array'

import { KeyboardShortcut } from '../../components/ui/KeyboardShortcut'
import { Shortcut } from './types'
import { useCommandMenuItems } from './use_command_menu_items'
import { getFlattenedCommandMenuItems } from './utils'

export const CommandMenu: React.FC = () => {
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false)
  const [value, setValue] = useState('')
  const [tabs, setTabs] = useState(['Home'])

  const items = useCommandMenuItems()

  const flattenedItems = getFlattenedCommandMenuItems(items)
  const shortcuts = pruneArray(
    flattenedItems.map(({ shortcut, action }) => {
      if (shortcut && action) {
        return [shortcut, action] as Shortcut
      }
    }),
  )

  useHotkeys([
    ['mod+k', () => setIsCommandMenuOpen(!isCommandMenuOpen)],
    ...shortcuts,
  ])

  const currentTabItems =
    flattenedItems.find(({ id }) => tabs[tabs.length - 1] == id)?.children ??
    items

  return (
    <>
      <nav className="fixed bottom-4 right-4 z-20 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8">
        <button
          onClick={() => {
            setIsCommandMenuOpen(!isCommandMenuOpen)
          }}
          className="cursor-pointer rounded-full bg-highlight-2 p-3 transition hover:scale-110 hover:bg-highlight-3 focus:scale-110 focus:bg-highlight-3 focus:outline-none"
        >
          <CommandIcon className="size-8 stroke-primary-3 sm:size-9 lg:size-10" />
        </button>
      </nav>

      <Dialog
        open={isCommandMenuOpen}
        onOpenChange={() => {
          setValue('')

          if (tabs.length > 1) {
            setTabs(tabs.slice(0, tabs.length - 1))
          } else {
            setIsCommandMenuOpen(false)
          }
        }}
      >
        <Command className="bg-transparent">
          <div className="flex flex-col-reverse gap-3 p-3">
            <div className="flex items-center gap-4 px-3">
              <MagnifyingGlassIcon className="h-6 w-6" />
              <Command.Input
                className="w-full bg-transparent text-md outline-none placeholder:text-primary-1"
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
                    className="py-0.5 rounded bg-highlight-2 px-2 text-sm transition hover:bg-highlight-3 focus:scale-110 focus:bg-highlight-3 focus:outline-none"
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <KeyboardShortcut shortcut="mod+k" />
            </div>
          </div>

          <hr />

          <Command.List className="max-h-80 overflow-y-scroll p-3">
            <Command.Empty className="flex items-center justify-center py-6">
              <p>No results found.</p>
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
                              setIsCommandMenuOpen(false)
                              setTabs(['Home'])

                              if (action) {
                                action()
                              }
                            }
                          }}
                          className="flex cursor-pointer items-center gap-4 rounded p-3 data-[selected=true]:bg-highlight-2"
                        >
                          <Icon className="box-content h-6 w-6" />
                          <span className="flex-1">{title}</span>
                          {shortcut && <KeyboardShortcut shortcut={shortcut} />}
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
