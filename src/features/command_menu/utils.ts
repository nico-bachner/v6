import { CommandMenuItem } from './types'

export const getFlattenedCommandMenuItems = (
  items: CommandMenuItem[],
  allItems: CommandMenuItem[] = [],
) => {
  items.forEach((item) => {
    allItems.push(item)

    if (item.children) {
      getFlattenedCommandMenuItems(item.children, allItems)
    }
  })

  return allItems
}
