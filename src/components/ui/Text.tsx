import { cn } from '@/utils/cn'

type TextProps = Omit<React.ComponentProps<'p'>, 'color'> & {
  as?: 'h1' | 'h2' | 'h3' | 'p'
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  color?: 1 | 2 | 3
}

const getTextSize = (size: TextProps['size']) => {
  switch (size) {
    case 'sm':
      return 'text-sm sm:text-base md:text-lg'
    case 'md':
      return 'text-base sm:text-lg md:text-xl'
    case 'lg':
      return 'text-lg sm:text-xl md:text-2xl'
    case 'xl':
      return 'text-xl sm:text-2xl md:text-3xl'
    case '2xl':
      return 'text-2xl sm:text-3xl md:text-4xl'
    case '3xl':
      return 'text-3xl sm:text-4xl md:text-5xl'
    case '4xl':
      return 'text-4xl sm:text-5xl md:text-6xl'
  }
}

const getTextColor = (color: TextProps['color']) => {
  switch (color) {
    case 1:
      return 'text-primary-1'
    case 2:
      return 'text-primary-2'
    case 3:
      return 'text-primary-3'
  }
}

/**
 * Text
 *
 * @param as semantic html tag to render
 * @param size font size
 * @param color text color - 1, 2, 3 \
 * 1 - Headings & bold text \
 * 2 - Regular text \
 * 3 - Subdued text (e.g. metadata)
 */
export const Text: React.FC<TextProps> = ({
  as = 'p',
  size,
  color,
  className,
  ...props
}) => {
  switch (as) {
    case 'h1':
      return (
        <h1
          className={cn(
            getTextSize(size) ?? getTextSize('4xl'),
            getTextColor(color) ?? getTextColor(3),
            className,
          )}
          {...props}
        />
      )
    case 'h2':
      return (
        <h2
          className={cn(
            getTextSize(size) ?? getTextSize('2xl'),
            getTextColor(color) ?? getTextColor(3),
            className,
          )}
          {...props}
        />
      )
    case 'h3':
      return (
        <h3
          className={cn(
            getTextSize(size) ?? getTextSize('lg'),
            getTextColor(color) ?? getTextColor(3),
            className,
          )}
          {...props}
        />
      )
    case 'p':
      return (
        <p
          className={cn(
            getTextSize(size) ?? getTextSize('md'),
            getTextColor(color) ?? getTextColor(2),
            className,
          )}
          {...props}
        />
      )
  }
}
