'use client'

import { Content, Overlay, Portal, Root } from '@radix-ui/react-dialog'

import { cn } from '@/utils/cn'

export const Dialog: React.FC<React.ComponentProps<typeof Root>> = ({
  children,
  ...props
}) => (
  <Root {...props}>
    <Portal>
      <Overlay className={cn('backdrop-blur', 'fixed inset-0')} />
      <Content
        className={cn(
          'border-neutral-2 rounded-lg border bg-highlight-1 shadow-lg',
          'fixed left-[50%] top-[50%] z-50 w-full max-w-xl translate-x-[-50%] translate-y-[-50%]',
        )}
      >
        {children}
      </Content>
    </Portal>
  </Root>
)
