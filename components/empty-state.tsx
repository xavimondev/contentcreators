import Image from 'next/image'
import CustomLink from './custom-link'

const NoContentCreators = () => {
  return (
    <div className='flex flex-col gap-6 justify-center items-center mt-16'>
      <Image
        src='/img/no-data.webp'
        alt='Creators not found'
        height='250'
        width='250'
        layout='fixed'
      />
      <p className='dark:text-white text-base md:text-xl font-semibold max-w-xl text-center'>
        Aún no se han registrado creadores de contenido para esta tecnología. Sin embargo, puedes
        agregarlos contribuyendo al{' '}
        <CustomLink
          classes='text-cyan-500'
          href='https://github.com/d3vcloud/social-creators'
          target='_blank'
        >
          🚀 repositorio 😊
        </CustomLink>
        .
      </p>
    </div>
  )
}

export default NoContentCreators
