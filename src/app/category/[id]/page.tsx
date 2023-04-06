import { Metadata } from 'next'
import { LIST_CATEGORIES } from 'data/categories'
import { LeftArrowIc } from '@/components/icons'
import CustomLink from '@/components/custom-link'
import ListCategory from '@/components/list-category'
import CategoryDetail from '@/components/category-detail'
import PageHeader from '@/components/page-header'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const categoryInfo = LIST_CATEGORIES.find((creator) => creator.id === params.id)
  return { title: categoryInfo ? categoryInfo.name : '' }
}

const DashboardCategory = ({ params }: { params: { id: string } }) => {
  const categoryId = params.id

  return (
    <>
      <PageHeader>
        <CustomLink classes='flex flex-row gap-2 items-center' href='/#categories'>
          <LeftArrowIc className='h-6 w-6 lg:h-8 lg:w-8 text-white' />
          <span className='text-center text-base sm:text-lg lg:text-xl text-white'>
            Todas las categorías
          </span>
        </CustomLink>
      </PageHeader>
      <main className='p-6 min-h-screen h-full w-full'>
        <div className='flex flex-col gap-4'>
          <ListCategory listType='colorful' />
          <CategoryDetail categoryId={categoryId} />
        </div>
      </main>
    </>
  )
}

export default DashboardCategory
