export const KeyboardShortcut: React.FC<{ shortcut: string }> = ({
  shortcut,
}) => (
  <span className="flex items-center gap-2">
    {shortcut.split('+').map((key) => (
      <kbd key={key} className="text-primary-1 uppercase">
        {key
          .replace('shift', '⇧')
          .replace('ctrl', '⌃')
          .replace('alt', '⌥')
          .replace('mod', '⌘')}
      </kbd>
    ))}
  </span>
)
