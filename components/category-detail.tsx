import { useState } from 'react'

import type { Category, Creator } from 'types'

import FormSearch from './form-search'
import ListCreator from './list-creator'

type PropsCategoryDetail = {
  categoryId: Category
  listCreators: Creator[]
}

const CategoryDetail = ({ categoryId, listCreators }: PropsCategoryDetail) => {
  const [creators, setCreators] = useState<Creator[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [query, setQuery] = useState<string>('')

  // if (isLoading) return <Placeholder length={4} />

  return (
    <>
      {(creators.length > 0 || isSearching) && (
        <FormSearch
          nameClass='mb-8'
          setCreators={setCreators}
          setIsSearching={setIsSearching}
          setQuery={setQuery}
        />
      )}
      <ListCreator listCreators={listCreators} />
      {/* {creators.length > 0 ? (
        <ListCreator listCreators={listCreators} />
      ) : (
        <NoDataFound
          message='No se encontraron resultados para'
          keyword={isSearching ? query : categoryId}
        />
      )} */}
    </>
  )
}

export default CategoryDetail
