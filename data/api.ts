import { CREATORS_DATA } from './creators'
import type { Category, Creator } from 'types'

export const api = {
  search: (categoryId?: string, creatorId?: string): Promise<Creator[]> => {
    if (categoryId === 'all') {
      return new Promise((resolve) => setTimeout(() => resolve(CREATORS_DATA), 100))
    }

    let results: Creator[] = CREATORS_DATA

    if (categoryId) {
      results = CREATORS_DATA.filter((creator) =>
        creator.categories.includes(categoryId as Category)
      )
    }

    if (creatorId) {
      results = CREATORS_DATA.filter((creator) =>
        creator.id.toLowerCase().includes(creatorId.toLowerCase())
      )
    }

    return new Promise((resolve) => setTimeout(() => resolve(results), 100))
  }
}
