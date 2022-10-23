import { CREATORS_DATA } from './creators'
import { Category, Creator } from 'types'

export const api = {
  search: (query: string, queryId?: string): Promise<Creator[]> => {
    let results = CREATORS_DATA.filter((creator) => creator.categories.includes(query as Category))
    if (queryId) {
      results = results.filter((creator) =>
        creator.id.toLowerCase().includes(queryId.toLowerCase())
      )
    }

    return new Promise((resolve) => setTimeout(() => resolve(results), 200))
  }
}
