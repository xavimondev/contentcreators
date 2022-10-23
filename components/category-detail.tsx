import { useEffect, useState } from 'react'

import { api } from 'data/api'

import type { Category, Creator } from 'types'

import NoContentCreators from './empty-state'
import FormSearch from './form-search'
import ListCreator from './list-creator'

type PropsCategoryDetail = {
  categoryId: Category
}

const CategoryDetail = ({ categoryId }: PropsCategoryDetail) => {
  const [creators, setCreators] = useState<Creator[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  console.log({ query, isSearching })

  // TODO: Check if this useEffect is an anti-pattern
  useEffect(() => {
    api.search(categoryId).then(setCreators)

    return () => {
      setQuery('')
      setIsSearching(false)
    }
  }, [categoryId])

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

      {creators.length > 0 ? (
        <ListCreator listCreators={creators} />
      ) : (
        <NoContentCreators>
          {!isSearching ? (
            <>Aún no se han registrado creadores de contenido para esta tecnología.</>
          ) : (
            <>
              No se encontraron resultados para{' '}
              <span className='text-red-500 text-2xl font-bold'>{query}</span> en esta tecnología.
            </>
          )}
        </NoContentCreators>
      )}
    </>
  )
}

export default CategoryDetail
