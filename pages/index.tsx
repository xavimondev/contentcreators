import type { NextPage } from 'next'

import Layout from 'components/layout'
import CustomLink from 'components/custom-link'
import { GitHubIc } from 'components/icons'
import { BlobHome } from 'components/blob'
import ListCategory from 'components/list-category'
import PageHeader from 'components/page-header'
import LiveStreamers from 'components/live-streamers'

const Home: NextPage = () => {
  return (
    <>
      <PageHeader>
        <nav>
          <ul className='flex flex-row justify-between'>
            <li>
              <CustomLink
                href='/'
                classes='text-lg sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#e82e6b] to-[#e6da7a] bg-[length:200%_auto] animate-text-clip'
              >
                content.[creators]
              </CustomLink>
            </li>
          </ul>
        </nav>
        <LiveStreamers />
      </PageHeader>
      <Layout>
        <section className='relative max-w-6xl mx-auto flex justify-center flex-col text-center py-8 sm:py-12 lg:py-16'>
          <BlobHome />
          <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-[#ff8b42] to-[#8b36bb] font-bold tracking-wide text-3xl sm:text-5xl lg:text-6xl'>
            content.[creators]
          </h1>
          <p className='mt-10 mx-auto max-w-2xl font-semibold text-base sm:text-xl lg:text-2xl text-white'>
            Hay diversos{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#f38948] to-[#ed68dd]'>
              creadores de contenido
            </span>{' '}
            en internet y es difícil encontrar a los mejores. Aquí encontrarás a los que te ayudarán
            en tu crecimiento como profesional, además están agrupados en categorías para que te
            enfoques en lo que realmente necesites.
          </p>
        </section>
        <section className='max-w-6xl mx-auto flex justify-center flex-col mt-24' id='categories'>
          <h2 className='text-white font-bold tracking-wide text-2xl sm:text-3xl lg:text-5xl text-center'>
            Categorías
          </h2>
          <ListCategory listType='normal' />
        </section>
      </Layout>
      <footer className='w-full'>
        <div className='py-10'>
          <div className='flex justify-center'>
            <CustomLink
              href='https://github.com/d3vcloud/content-creators'
              rel='noopener noreferrer'
              target='_blank'
              aria-label='Go to Repository'
            >
              <GitHubIc className='w-6 h-6 text-white' />
            </CustomLink>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Home
