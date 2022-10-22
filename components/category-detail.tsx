import { CREATORS_DATA } from 'data/creators'

import { Category } from 'types'

import NoContentCreators from './empty-state'
import FormSearch from './form-search'
import ListCreator from './list-creator'

type PropsCategoryDetail = {
  categoryId: Category
}

const CategoryDetail = ({ categoryId }: PropsCategoryDetail) => {
  const listCreators = CREATORS_DATA.filter((creator) => creator.categories?.includes(categoryId))
  return (
    <>
      {listCreators.length > 0 ? (
        <>
          <FormSearch nameClass='mb-8' />
          <ListCreator listCreators={listCreators} />
        </>
      ) : (
        <NoContentCreators />
      )}
    </>
  )
}

export default CategoryDetail
