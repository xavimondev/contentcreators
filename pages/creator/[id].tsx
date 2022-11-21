import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { CREATORS_DATA } from 'data/creators'

import CustomLink from 'components/custom-link'
import { GitHubIc, HomeIc } from 'components/icons'
import Layout from 'components/layout'
import { SOCIAL_LINKS } from 'components/social-link'

const DashboardCreator = () => {
  const router = useRouter()

  const { id } = router.query

  let creatorInfo = null,
    title = ''

  if (id) {
    console.log(id)
    creatorInfo = CREATORS_DATA.find((creator) => creator.id === id)
    title = `Creador: ${creatorInfo?.name} 🚀`
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <CustomLink href='/'>
          <div className='flex flex-row gap-2 items-center mb-2 text-white'>
            <HomeIc className='h-8 w-8' />
            <span className='text-base'>Regresar a Inicio</span>
          </div>
        </CustomLink>
        <section className='mt-10 p-4 flex flex-col gap-4 bg-slate-900 rounded-xl'>
          <div className='flex flex-row gap-4 items-center'>
            <div className='object-cover w-24 md:w-32 h-auto rounded-full'>
              <Image
                className='rounded-full duration-700 ease-in-out'
                src={`https://unavatar.io/github/${id}`}
                width='256'
                height='256'
                alt={creatorInfo?.name}
              />
            </div>
            <div className='flex flex-col gap-4'>
              <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-[#d770b2] to-[#e4ad7a] font-bold tracking-wide text-2xl lg:text-5xl'>
                {creatorInfo?.name}
              </h1>
              <p className='font-semibold text-base sm:text-xl lg:text-1xl text-white'>
                {creatorInfo?.description}
              </p>
            </div>
          </div>
          <div className='flex gap-3 flex-wrap md:flex-row'>
            {creatorInfo?.social.map((item) => {
              const Component = SOCIAL_LINKS.find((link) => link.id === item.id)?.Component
              return (
                <CustomLink href={item.url} key={item.id} rel='noopener noreferrer' target='_blank'>
                  <div className='p-2 rounded-lg transition hover:scale-110'>{Component}</div>
                </CustomLink>
              )
            })}
          </div>
        </section>
        <section className='mx-auto max-w-6xl md:text-2xl mt-8 flex flex-col gap-4 items-center'>
          <div className='object-cover w-52 md:w-96 h-full'>
            <Image
              src='/img/messages.png'
              alt='Messages Icon'
              height='300'
              width='300'
              layout='fixed'
            />
          </div>
          <p className='text-white font-semibold'>
            Dejalé un mensaje a{' '}
            <span className='bg-gradient-to-r from-[#d770b2] to-[#e4ad7a] font-bold text-transparent bg-clip-text'>
              {creatorInfo?.name}
            </span>{' '}
            por su aporte a la comunidad.
          </p>
        </section>
        <div className='fixed bottom-4 rounded-3xl bg-slate-900 hover:bg-slate-800'>
          <button className='px-8 py-4 flex flex-row items-center gap-2'>
            <GitHubIc className='w-6 h-6 text-white' />
            <span className='text-base font-semibold text-white'>Iniciar Sesión</span>
          </button>
        </div>
      </Layout>
    </>
  )
}

export default DashboardCreator
