'use client'
import { LIST_CATEGORIES } from 'data/categories'
import { useParams } from 'next/navigation'
import { CategoryCard, CategoryItem, CategoryLink } from './category'

type ListCategoryProps = {
  listType: 'colorful' | 'normal'
}

const ListCategory = ({ listType }: ListCategoryProps) => {
  if (listType === 'colorful') return <ListWithColorfulItems />
  else return <ListWithNormalItems />
}

const ListWithColorfulItems = () => {
  return (
    <div className='w-full rounded-2xl bg-transparent overflow-y-auto py-4 block md:hidden'>
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

export const NavListCategories = () => {
  // docs: https://beta.nextjs.org/docs/api-reference/use-params
  // ...category/mobile -> {id:mobile}
  const params = useParams()

  return (
    <nav className='sm:w-48 mr-6 hidden md:block' aria-label='Left Navigation'>
      <div className='flex flex-col'>
        <div className='p-2 mb-7'>
          <p className='text-gray-200 font-semibold text-lg'>Categorías</p>
        </div>
        <div className='flex flex-col gap-4 items-center w-full'>
          {LIST_CATEGORIES.map((category) => {
            const param = params.id
            const isSelected = category.id === param
            return (
              <CategoryLink
                key={category.id}
                id={category.id}
                name={category.name}
                isSelected={isSelected}
              />
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default ListCategory
