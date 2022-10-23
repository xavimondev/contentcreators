import { useEffect, useState } from 'react'

import { api } from 'data/api'

import { Category, Creator } from 'types'

import NoContentCreators from './empty-state'
import FormSearch from './form-search'
import ListCreator from './list-creator'

type PropsCategoryDetail = {
  categoryId: Category
}

const CategoryDetail = ({ categoryId }: PropsCategoryDetail) => {
  const [creators, setCreators] = useState<Creator[]>([])

  useEffect(() => {
    api.search(categoryId).then(setCreators)
  }, [categoryId])

  return (
    <>
      {creators.length > 0 ? (
        <>
          <FormSearch nameClass='mb-8' setCreators={setCreators} />
          <ListCreator listCreators={creators} />
        </>
      ) : (
        <NoContentCreators />
      )}
    </>
  )
}

export default CategoryDetail
