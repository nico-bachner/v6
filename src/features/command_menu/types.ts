export type CommandMenuItem = {
  id: string
  icon: React.FC<Omit<React.SVGProps<SVGSVGElement>, 'ref'>>
  title: string
  group: string
  shortcut?: string
  action?: () => void
  children?: CommandMenuItem[]
}

export type Shortcut = [string, () => void]
