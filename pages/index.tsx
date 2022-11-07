import type { NextPage } from 'next'

import { LIST_CATEGORIES } from 'data/categories'

import Layout from 'components/layout'
import { CategoryCard } from 'components/category'
import CustomLink from 'components/custom-link'
import { GitHubIc } from 'components/icons'

const Home: NextPage = () => {
  return (
    <>
      <header className='sticky top-0 z-50 text-white font-semibold w-full backdrop-blur-lg'>
        <div className='border-b border-[#344a8c] px-4 py-3'>
          <div className='flex flex-row justify-between'>
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
            <div>
              <CustomLink
                href='https://github.com/d3vcloud/content-creators'
                rel='noopener noreferrer'
                target='_blank'
                aria-label='Go to Repository'
              >
                <GitHubIc className='w-6 h-6' />
              </CustomLink>
            </div>
          </div>
        </div>
      </header>
      <Layout>
        <section className='max-w-6xl mx-auto flex justify-center flex-col text-center mb-8 py-8 sm:py-12 lg:py-16'>
          <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-[#d770b2] to-[#e4ad7a] font-bold tracking-wide text-3xl sm:text-5xl lg:text-6xl'>
            content.[creators]
          </h1>
          <p className='mt-10 mx-auto max-w-2xl font-semibold text-base sm:text-xl lg:text-1xl text-white'>
            Hay diversos creadores de contenidos en internet y es difícil encontrar a los mejores.
            Aquí encontrarás a los que te ayudarán en tu crecimiento como profesional, además están
            agrupados en categorías para que te enfoques en lo que realmente necesites.
          </p>
        </section>
        <section className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
          {LIST_CATEGORIES.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </section>
      </Layout>
      <footer className='bg-gradient-to-l from-[#39497e] to-[#1d184e] w-full'>
        <div className='py-10'>
          <p className='text-center text-base font-semibold text-white'>
            Hecho con ❤️ y Next.js 🚀
          </p>
        </div>
      </footer>
    </>
  )
}

export default Home
