import { CategoryItem } from './category'

type ListCategoryProps = {
  listCategories: any
}

const ListCategory = ({ listCategories }: ListCategoryProps) => {
  return (
    <div className='w-full rounded-2xl bg-transparent overflow-y-auto py-4'>
      <ul className='flex gap-4'>
        {listCategories.map((category: any) => (
          <CategoryItem key={category.id} {...category} />
        ))}
      </ul>
    </div>
  )
}

export default ListCategory
