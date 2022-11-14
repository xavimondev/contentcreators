import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { getContentCreators } from 'lib/notion'

import { Category, Creator } from 'types'
import { LIST_CATEGORIES } from 'data/categories'

import HeaderTitle from 'components/header-title'
import Layout from 'components/layout'
import { HomeIc } from 'components/icons'
import CustomLink from 'components/custom-link'
import ListCategory from 'components/list-category'
import CategoryDetail from 'components/category-detail'

const DashboardCategory: NextPage<{ creators: Creator[] }> = ({ creators }) => {
  const router = useRouter()
  const { id } = router.query
  const title = id ? `Dashboard: ${id} 🚀` : 'Loading...'
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <div className='flex flex-row gap-2 items-center mb-12'>
          <CustomLink href='/'>
            <HomeIc className='h-8 w-8 lg:h-12 lg:w-12 text-white' />
          </CustomLink>
          <HeaderTitle msg={id as string} />
        </div>
        <div className='flex flex-col gap-4'>
          {/* Tecnologías slider */}
          <ListCategory listCategories={LIST_CATEGORIES} />
          <CategoryDetail categoryId={id as Category} listCreators={creators} />
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = async ({ params }: any) => {
  const { id } = params
  const data = await getContentCreators(id)
  console.log(id)
  return {
    props: {
      creators: data
    }
  }
}

export default DashboardCategory
