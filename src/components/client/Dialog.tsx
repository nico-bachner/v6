'use client'

import { Content, Overlay, Portal, Root } from '@radix-ui/react-dialog'

import { cn } from '@/utils/cn'

export const Dialog: React.FC<React.ComponentProps<typeof Root>> = ({
  children,
  ...props
}) => (
  <Root {...props}>
    <Portal>
      <Overlay
        className={cn('bg-white/5 shadow backdrop-blur', 'fixed inset-0')}
      />
      <Content
        className={cn(
          'bg-white/10 shadow-lg backdrop-blur-lg',
          'fixed left-[50%] top-[50%] z-50 w-full max-w-xl translate-x-[-50%] translate-y-[-50%] rounded-lg',
        )}
      >
        {children}
      </Content>
    </Portal>
  </Root>
)
