import { useRouter } from 'next/router'
import Head from 'next/head'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { Category } from 'types'
import CREATORS_DATA from 'data/creators'
import { LIST_CATEGORIES } from 'data'

import FormSearch from 'components/form-search'
import HeaderTitle from 'components/header-title'
import Layout from 'components/layout'
import { CategoryItem } from 'components/category'
import { HomeIc } from 'components/icons'
import Creator from 'components/creator'
import CustomLink from 'components/custom-link'
import NoContentCreators from 'components/empty-state'

const DashboardCategory = () => {
  const router = useRouter()
  const { id } = router.query
  const creatorsList = CREATORS_DATA.filter((creator) =>
    creator.categories?.includes(id as Category)
  )
  return (
    <>
      <Head>
        <title>Buscando en: {id}</title>
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
          <div className='w-full rounded-2xl bg-transparent overflow-y-auto py-4'>
            {/* <div className='mb-5'>
            <span className='text-md md:text-xl font-semibold text-white mb-10'>Tecnologías</span>
          </div> */}
            <ul className='flex gap-4'>
              {LIST_CATEGORIES.map((category) => (
                <CategoryItem key={category.id} {...category} />
              ))}
            </ul>
          </div>
          {creatorsList.length > 0 ? (
            <>
              <FormSearch nameClass='mb-8' />
              {/* Section */}
              <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}>
                <Masonry gutter='10px'>
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
                </Masonry>
              </ResponsiveMasonry>
            </>
          ) : (
            <NoContentCreators />
          )}
        </div>
      </Layout>
    </>
  )
}

export default DashboardCategory
