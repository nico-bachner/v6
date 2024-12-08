import { CommandMenuItem } from './types'

export const getFlattenedItems = (
  items: CommandMenuItem[],
  allItems: CommandMenuItem[] = [],
) => {
  items.forEach((item) => {
    allItems.push(item)

    if (item.children) {
      getFlattenedItems(item.children, allItems)
    }
  })

  return allItems
}
