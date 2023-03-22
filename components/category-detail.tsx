import { useEffect, useState } from 'react'

import { api } from 'data/api'

import type { Category } from 'types'
import { useStore } from 'state/store'

import NoDataFound from './no-data-found'
import FormSearch from './form-search'
import ListCreator from './list-creator'
import FallBackLoader from 'components/fallback'

type PropsCategoryDetail = {
  categoryId: Category
}

const CategoryDetail = ({ categoryId }: PropsCategoryDetail) => {
  const listCreators = useStore((state) => state.listCreators)
  const setListCreators = useStore((state) => state.setListCreators)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [query, setQuery] = useState<string>('')

  // TODO: Check if this useEffect is an anti-pattern
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

  if (isLoading) return <FallBackLoader msg='Cargando resultados' />

  return (
    <>
      {(listCreators.length > 0 || isSearching) && (
        <FormSearch nameClass='mb-8' setIsSearching={setIsSearching} setQuery={setQuery} />
      )}
      {listCreators.length > 0 ? (
        <ListCreator />
      ) : (
        <NoDataFound
          message='No se encontraron resultados para'
          keyword={isSearching ? query : categoryId}
        />
      )}
    </>
  )
}

export default CategoryDetail
