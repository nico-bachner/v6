export const KeyboardShortcut: React.FC<{ shortcut: string }> = ({
  shortcut,
}) => (
  <span className="flex items-center gap-2">
    {shortcut.split('+').map((key) => (
      <kbd key={key} className="uppercase text-gray-400 dark:text-gray-500">
        {key
          .replace('shift', '⇧')
          .replace('ctrl', '⌃')
          .replace('alt', '⌥')
          .replace('mod', '⌘')}
      </kbd>
    ))}
  </span>
)
