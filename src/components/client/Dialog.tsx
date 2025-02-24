'use client'

import { Dialog as RadixDialog } from 'radix-ui'
import { useLayoutEffect, useState } from 'react'

import { cn } from '@/utils/cn'

export const Dialog: React.FC<
  React.ComponentProps<typeof RadixDialog.Root>
> = ({ children, ...props }) => {
  const [viewportDimensions, setViewportDimensions] = useState<{
    width?: number
    height?: number
  }>({
    width: undefined,
    height: undefined,
  })

  useLayoutEffect(() => {
    const updateViewportDimensions = () => {
      setViewportDimensions({
        width: window.visualViewport?.width,
        height: window.visualViewport?.height,
      })
    }

    updateViewportDimensions()

    window.visualViewport?.addEventListener('resize', updateViewportDimensions)

    return () => {
      window.visualViewport?.removeEventListener(
        'resize',
        updateViewportDimensions,
      )
    }
  }, [])

  return (
    <RadixDialog.Root {...props}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={cn('backdrop-blur', 'fixed inset-0')} />

        <RadixDialog.Content
          style={{
            top: viewportDimensions.height && viewportDimensions.height / 2,
            left: viewportDimensions.width && viewportDimensions.width / 2,
          }}
          className={cn(
            'rounded-lg border bg-highlight-1 shadow-lg',
            'fixed z-50 w-full max-w-xl translate-x-[-50%] translate-y-[-50%]',
          )}
        >
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
