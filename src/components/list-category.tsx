import { LIST_CATEGORIES } from 'data/categories'
import { CategoryCard, CategoryItem } from './category'

type ListCategoryProps = {
  listType: 'colorful' | 'normal'
}

const ListCategory = ({ listType }: ListCategoryProps) => {
  if (listType === 'colorful') return <ListWithColorfulItems />
  else return <ListWithNormalItems />
}

const ListWithColorfulItems = () => {
  return (
    <div className='w-full rounded-2xl bg-transparent overflow-y-auto py-4'>
      <ul className='flex gap-4'>
        {LIST_CATEGORIES.map((category: any) => (
          <CategoryItem key={category.id} {...category} />
        ))}
      </ul>
    </div>
  )
}

const ListWithNormalItems = () => {
  return (
    <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
      {LIST_CATEGORIES.map((category) => (
        <CategoryCard key={category.id} {...category} />
      ))}
    </div>
  )
}

export default ListCategory
