import Image from 'next/image'
import { useRouter } from 'next/router'
import FormSearch from 'components/form-search'
import HeaderTitle from 'components/header-title'
import {
  BlogIc,
  DiscordIc,
  GitHubIc,
  InstagramIc,
  TwitchIc,
  TwitterIc,
  YoutubeIc
} from 'components/icons'
import Layout from 'components/layout'

const DashboardCategory = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <Layout>
      <HeaderTitle msg={id as string} />
      <FormSearch nameClass='mb-8' />
      <div className='flex flex-col md:flex-row gap-4'>
        <aside className='hidden md:block w-64'>
          <div className='overflow-y-auto py-4 px-3 rounded-2xl dark:bg-slate-900'>
            <a href='https://flowbite.com/' className='flex items-center pl-2.5 mb-5'>
              <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
                Tecnologías
              </span>
            </a>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#'
                  className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                >
                  <svg
                    aria-hidden='true'
                    className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
                    <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
                  </svg>
                  <span className='ml-3'>DevOps</span>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                >
                  <svg
                    aria-hidden='true'
                    className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'></path>
                  </svg>
                  <span className='flex-1 ml-3 whitespace-nowrap'>Desarrollo Web</span>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                >
                  <svg
                    aria-hidden='true'
                    className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z'></path>
                    <path d='M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z'></path>
                  </svg>
                  <span className='flex-1 ml-3 whitespace-nowrap'>Inteligencia Artificial</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
        {/* Technologies slider */}
        <div className='w-full rounded-2xl dark:bg-slate-900 overflow-y-auto py-4 px-3 block md:hidden'>
          <a href='https://flowbite.com/' className='flex items-center pl-2.5 mb-5'>
            <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
              Tecnologías
            </span>
          </a>
          <ul className='flex gap-4'>
            <li className='flex flex-col items-center gap-1'>
              <div className='w-14 h-14 p-1 rounded-full bg-gradient-to-tr from-[#8e1d9e] to-[#bc6cc9]'>
                <div className='h-full p-2 bg-white text-white rounded-full'>
                  <Image
                    className='rounded-full'
                    src='/technologies/frontend.webp'
                    alt='frontend'
                    width='256'
                    height='256'
                  />
                </div>
              </div>
              <span className='text-white font-semibold'>frontend</span>
            </li>
            <li className='flex flex-col items-center gap-1'>
              <div className='w-14 h-14 p-1 rounded-full bg-gradient-to-tr from-[#8e1d9e] to-[#bc6cc9]'>
                <div className='h-full p-2 bg-white text-white rounded-full'>
                  <Image
                    className='rounded-full'
                    src='/technologies/backend.webp'
                    alt='backend'
                    width='256'
                    height='256'
                  />
                </div>
              </div>
              <span className='text-white font-semibold'>backend</span>
            </li>
          </ul>
        </div>
        <section className='flex flex-col gap-4 w-full'>
          <article className='rounded-2xl border-none dark:bg-slate-900'>
            <div className='flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-6'>
              {/* Photo section */}
              <div className='object-cover w-24 md:w-32 h-auto rounded-xl'>
                <Image
                  className='rounded-xl'
                  src='https://unavatar.io/github/midudev'
                  width='256'
                  height='256'
                  // layout='responsive'
                  alt='midudev'
                />
              </div>
              {/* Description section */}
              <div className='flex flex-col gap-2 w-full md:w-3/4'>
                <h2 className='text-lg md:text-3xl font-bold tracking-tight dark:text-white'>
                  Miguel Angel Durán García
                </h2>
                <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                  Soy Desarrollador Full Stack JavaScript con 15 años de experiencia. ⭐ Reconocido
                  como Google Developer Expert y GitHub Star.
                </p>
                {/* Tags area */}
                <div className='flex flex-row gap-2 w-full'>
                  <span className='bg-blue-100 text-blue-800 text-sm font-medium px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800'>
                    Desarrollo Web
                  </span>
                  <span className='bg-green-100 text-green-800 text-sm font-medium px-2 py-0.5 rounded dark:bg-green-200 dark:text-green-900'>
                    Ciencia de datos
                  </span>
                </div>
              </div>
              {/* Social section */}
              <div className='flex flex-col gap-3 md:gap-2'>
                <h5 className='text-lg md:text-xl text-white font-semibold'>Sígueme en:</h5>
                <ul className='flex gap-2 md:gap-4 justify-between md:items-center md:flex-wrap'>
                  <li>
                    <a href='https://twitter.com/midudev'>
                      <TwitterIc className='w-6 h-6' color='white' />
                    </a>
                  </li>
                  <li>
                    <a href='https://github.com/midudev'>
                      <GitHubIc className='w-6 h-6' color='white' />
                    </a>
                  </li>
                  <li>
                    <a href='https://www.twitch.tv/midudev'>
                      <TwitchIc className='w-6 h-6' color='white' />
                    </a>
                  </li>
                  <li>
                    <a href='https://midu.tube/'>
                      <YoutubeIc className='w-6 h-6' color='white' />
                    </a>
                  </li>
                  <li>
                    <a href='https://discord.com/invite/midudev'>
                      <DiscordIc className='w-6 h-6' color='white' />
                    </a>
                  </li>
                  <li>
                    <a href='https://www.instagram.com/midu.dev'>
                      <InstagramIc className='w-6 h-6' color='white' />
                    </a>
                  </li>
                  <li>
                    <a href='https://midu.dev/'>
                      <BlogIc className='w-6 h-6' color='white' />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </section>
      </div>
    </Layout>
  )
}

export default DashboardCategory
