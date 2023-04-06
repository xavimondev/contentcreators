import { useEffect, useState } from 'react'
import { api } from 'data/api'
import { useStore } from 'state/store'

const useCreators = (categoryId: string) => {
  const listCreators = useStore((state) => state.listCreators)
  const setListCreators = useStore((state) => state.setListCreators)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    if (!categoryId) return

    setIsLoading(true)
    api
      .search(categoryId)
      .then((data) => {
        setListCreators(data)
      })
      .finally(() => {
        setIsLoading(false)
      })

    return () => {
      setQuery('')
      setIsSearching(false)
    }
  }, [categoryId])

  return {
    listCreators,
    isSearching,
    setIsSearching,
    isLoading,
    query,
    setQuery
  }
}

export default useCreators
