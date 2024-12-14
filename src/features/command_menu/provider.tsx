'use client'

import { createContext, useContext, useState } from 'react'

import { CommandMenu } from './command_menu'

type CommandMenuContext = {
  open: boolean
  setOpen: (open: CommandMenuContext['open']) => void

  tabs: string[]
  setTabs: (tabs: CommandMenuContext['tabs']) => void
}

const CommandMenuContext = createContext<CommandMenuContext | undefined>(
  undefined,
)

export const useCommandMenu = () => {
  const context = useContext(CommandMenuContext)

  if (context == undefined) {
    throw new Error('useCommandMenu must be used within CommandMenuProvider')
  }

  return context
}

type CommandMenuProviderProps = {
  children: React.ReactNode
}

export const CommandMenuProvider: React.FC<CommandMenuProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false)
  const [tabs, setTabs] = useState(['Home'])

  return (
    <CommandMenuContext.Provider value={{ open, setOpen, tabs, setTabs }}>
      {children}

      <CommandMenu />
    </CommandMenuContext.Provider>
  )
}
