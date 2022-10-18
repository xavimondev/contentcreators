import { useRouter } from 'next/router'

import { Category } from 'types'
import CREATORS_DATA from 'data/creators'
import { LIST_CATEGORIES } from 'data'

import FormSearch from 'components/form-search'
import HeaderTitle from 'components/header-title'
import Layout from 'components/layout'
import { CategoryItem } from 'components/category'
import Creator from 'components/creator'

const DashboardCategory = () => {
  const router = useRouter()
  const { id } = router.query
  const creatorsList = CREATORS_DATA.filter((creator) =>
    creator.categories?.includes(id as Category)
  )
  return (
    <Layout>
      <HeaderTitle msg={id as string} />
      <div className='flex flex-col gap-4'>
        {/* Categorías slider */}
        <div className='w-full rounded-2xl bg-transparent overflow-y-auto py-4'>
          <div className='mb-5'>
            <span className='text-md md:text-xl font-semibold text-white mb-10'>Categorías</span>
          </div>
          <ul className='flex gap-4'>
            {LIST_CATEGORIES.map((category) => (
              <CategoryItem key={category.id} {...category} />
            ))}
          </ul>
        </div>
        <FormSearch nameClass='mb-8' />
        <section className='flex flex-col gap-4 w-full'>
          {creatorsList.map(({ id, name, description, categories, social }) => (
            <Creator
              key={id}
              id={id}
              name={name}
              description={description}
              categories={categories}
              socialLinks={social}
            />
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default DashboardCategory
