import type { NextPage } from 'next'

import CustomLink from '@/components/custom-link'
import { BlobHome } from '@/components/blob'
import ListCategory from '@/components/list-category'
import PageHeader from '@/components/page-header'
import LiveStreamers from '@/components/live-streamers'
import Footer from '@/components/footer'

const Home: NextPage = () => {
  return (
    <>
      <PageHeader>
        <nav>
          <ul className='flex flex-row justify-between'>
            <li>
              <CustomLink
                href='/'
                classes='text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#e82e6b] to-[#e6da7a] bg-[length:200%_auto] animate-text-clip'
              >
                content.[creators]
              </CustomLink>
            </li>
          </ul>
        </nav>
        <LiveStreamers />
      </PageHeader>
      <main className='p-6 min-h-screen h-full w-full'>
        <section className='relative max-w-6xl mx-auto flex justify-center flex-col text-center py-8 sm:py-10 lg:py-14'>
          <BlobHome />
          <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-[#ff8b42] to-[#8b36bb] font-bold tracking-wide text-3xl sm:text-5xl lg:text-6xl'>
            content.[creators]
          </h1>
          <p className='mt-16 mx-auto max-w-3xl font-semibold text-xl sm:text-2xl lg:text-3xl text-white'>
            Aquí encontrarás a los{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#f38948] to-[#ed68dd]'>
              mejores creadores de contenido en español
            </span>{' '}
            que te ayudarán en tu crecimiento como profesional.
          </p>
        </section>
        <section
          className='max-w-6xl mx-auto flex justify-center flex-col mt-14 sm:mt-20'
          id='categories'
        >
          <h2 className='text-white font-bold tracking-wide text-2xl sm:text-3xl lg:text-5xl text-center'>
            Categorías
          </h2>
          <ListCategory listType='normal' />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home
