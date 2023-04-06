'use client'
import useCreators from '@/hooks/useCreators'
import NoDataFound from './no-data-found'
import FormSearch from './form-search'
import ListCreator from './list-creator'
import FallBackLoader from './fallback'

type PropsCategoryDetail = {
  categoryId: string
}

const CategoryDetail = ({ categoryId }: PropsCategoryDetail) => {
  const { isLoading, listCreators, isSearching, setIsSearching, query, setQuery } =
    useCreators(categoryId)

  if (isLoading) return <FallBackLoader msg='Cargando resultados' />

  return (
    <>
      {(listCreators.length > 0 || isSearching) && (
        <FormSearch setIsSearching={setIsSearching} setQuery={setQuery} />
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
