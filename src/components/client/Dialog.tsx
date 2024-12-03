'use client'

import { Content, Overlay, Portal, Root } from '@radix-ui/react-dialog'

import { cn } from '@/utils/cn'

export const Dialog: React.FC<React.ComponentProps<typeof Root>> = ({
  children,
  ...props
}) => (
  <Root {...props}>
    <Portal>
      <Overlay className={cn('shadow backdrop-blur', 'fixed inset-0')} />
      <Content
        className={cn(
          'border border-gray-500/20 bg-white/50 shadow-lg backdrop-blur-lg dark:bg-gray-950/50',
          'fixed left-[50%] top-[50%] z-50 w-full max-w-xl translate-x-[-50%] translate-y-[-50%] rounded-lg',
        )}
      >
        {children}
      </Content>
    </Portal>
  </Root>
)
