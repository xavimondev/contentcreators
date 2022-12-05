import Image from 'next/image'

type NoCommentsFoundProps = {
  data: any
}

const NoCommentsFound = ({ data }: NoCommentsFoundProps) => {
  return (
    <div className='mx-auto max-w-6xl md:text-2xl mt-8 flex flex-col gap-4 items-center'>
      <div className='relative w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80'>
        <Image src='/img/messages.png' alt='Messages Icon' layout='fill' />
      </div>
      <p className='text-white font-semibold text-center'>
        Déjale un mensaje a{' '}
        <span className='bg-gradient-to-r from-[#d770b2] to-[#e4ad7a] font-bold text-transparent bg-clip-text'>
          {data}
        </span>{' '}
        por su aporte a la comunidad.
      </p>
    </div>
  )
}

export default NoCommentsFound
