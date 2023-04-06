import { Metadata } from 'next'
import { CREATORS_DATA } from 'data/creators'
import { LeftArrowIc } from '@/components/icons'
import PageHeader from '@/components/page-header'
import CreatorDashboard from '@/components/creator-dashboard'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const creatorInfo = CREATORS_DATA.find((creator) => creator.id === params.id)
  const { name, id } = creatorInfo!

  return {
    title: `content.[creators] | ${name}`,
    description: `Dashboard | ${name}`,
    openGraph: {
      type: 'website',
      url: `https://contentcreators.vercel.app/creator/${id}`,
      locale: 'es_ES',
      images: [
        {
          url: `https://contentcreators.vercel.app/api/og?username=${id}`,
          type: 'image/png'
        }
      ]
    }
  }
}

const CreatorPage = ({ params }: Props) => {
  const creatorInfo = CREATORS_DATA.find((creator) => creator.id === params.id)

  return (
    <>
      <PageHeader>
        <button className='flex flex-row gap-2 items-center'>
          <LeftArrowIc className='h-6 w-6 lg:h-8 lg:w-8 text-white' />
          <span className='text-center text-base sm:text-lg lg:text-xl text-white'>Regresar</span>
        </button>
      </PageHeader>
      <CreatorDashboard creatorInfo={creatorInfo!} />
    </>
  )
}

export default CreatorPage
