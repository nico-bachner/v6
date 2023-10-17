'use client'

import { Content, Overlay, Portal, Root } from '@radix-ui/react-dialog'

export const Dialog: React.FC<React.ComponentProps<typeof Root>> = ({
  children,
  ...props
}) => (
  <Root {...props}>
    <Portal>
      <Overlay className="fixed inset-0 bg-white/50 backdrop-blur-sm dark:bg-black/50" />
      <Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-xl translate-x-[-50%] translate-y-[-50%] rounded-xl border border-gray-300 bg-white/50 shadow-xl backdrop-blur-lg dark:border-gray-700 dark:bg-black/50">
        {children}
      </Content>
    </Portal>
  </Root>
)
