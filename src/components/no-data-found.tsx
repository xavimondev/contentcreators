import Image from 'next/image'
import CustomLink from './custom-link'

type NoDataFoundProps = {
  message: string
  keyword: string
}

const NoDataFound = ({ message, keyword }: NoDataFoundProps) => {
  return (
    <div className='flex flex-col gap-6 justify-center items-center mt-16'>
      <Image src='/img/no-data.webp' alt='Data not found' height='250' width='250' />
      <p className='dark:text-white text-base md:text-xl font-semibold max-w-xl text-center'>
        {message} <span className='text-red-500 font-bold'>{keyword}</span>. Sin embargo, puedes
        agregarlos contribuyendo al{' '}
        <CustomLink
          classes='text-cyan-500'
          href='https://github.com/xavimondev/content-creators'
          target='_blank'
        >
          🚀 repositorio 😊
        </CustomLink>
        .
      </p>
    </div>
  )
}

export default NoDataFound
