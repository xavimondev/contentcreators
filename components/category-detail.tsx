import { useEffect, useState } from 'react'

import type { Category, Creator } from 'types'

import FormSearch from './form-search'
import ListCreator from './list-creator'
import NoDataFound from './no-data-found'
import Placeholder from './placeholder'

type PropsCategoryDetail = {
  categoryId: Category
  listCreators: Creator[]
}

const CategoryDetail = ({ categoryId, listCreators }: PropsCategoryDetail) => {
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  console.log({ query, isSearching })

  useEffect(() => {
    setIsLoading(false)

    return () => {
      setQuery('')
    }
  }, [listCreators])

  if (isLoading) return <Placeholder length={4} />

  return (
    <>
      {(listCreators.length > 0 || isSearching) && (
        <FormSearch
          nameClass='mb-8'
          setIsLoading={setIsLoading}
          setIsSearching={setIsSearching}
          setQuery={setQuery}
        />
      )}

      {listCreators.length > 0 ? (
        <ListCreator listCreators={listCreators} />
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
