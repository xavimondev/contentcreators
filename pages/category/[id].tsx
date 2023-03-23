import { useRouter } from 'next/router'
import Head from 'next/head'

import { Category } from 'types'

import Layout from 'components/layout'
import { LeftArrowIc } from 'components/icons'
import CustomLink from 'components/custom-link'
import ListCategory from 'components/list-category'
import CategoryDetail from 'components/category-detail'

const DashboardCategory = () => {
  const router = useRouter()
  const { id } = router.query
  const title = id ? `Categoría: ${id}` : 'Loading...'
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <div className='mb-6 w-fit'>
          <CustomLink classes='flex flex-row gap-2 items-center' href='/#categories'>
            <LeftArrowIc className='h-6 w-6 lg:h-8 lg:w-8 text-white' />
            <span className='text-center text-base sm:text-lg lg:text-xl text-white'>
              Todas las categorías
            </span>
          </CustomLink>
        </div>
        <div className='flex flex-col gap-4'>
          <ListCategory listType='colorful' />
          <CategoryDetail categoryId={id as Category} />
        </div>
      </Layout>
    </>
  )
}

export default DashboardCategory
