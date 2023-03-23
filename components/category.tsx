import Image from 'next/image'

import CustomLink from 'components/custom-link'

type CategoryProps = {
  id: string
  name: string
  colorFrom: string
  colorTo: string
  image: any
}

export const CategoryCard = ({ id, name }: CategoryProps) => {
  return (
    <>
      <article
        key={id}
        className='border border-white border-opacity-10 hover:border-opacity-30 shadow-md w-full rounded-xl transition duration-200 ease-in-out group hover:-translate-y-1 z-10 bg-[#13111a] text-gray-400 hover:text-white'
      >
        <CustomLink href={`category/${id}`}>
          <div className='w-full rounded-xl h-auto flex flex-col gap-8 py-7 px-4'>
            <p className='max-w-xl font-semibold'>{name}</p>
          </div>
        </CustomLink>
      </article>
    </>
  )
}

export const CategoryItem = ({ id, name, colorFrom, colorTo, image }: CategoryProps) => {
  return (
    <>
      <li>
        <CustomLink href={`/category/${id}`}>
          <div className='flex flex-col gap-1.5 items-center'>
            <div
              className={`w-14 h-14 p-1 rounded-full`}
              style={{
                background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`
              }}
            >
              <div className='h-full p-1 text-white rounded-full'>
                <Image
                  className='rounded-full w-full h-full'
                  src={image}
                  alt='frontend'
                  width='100'
                  height='100'
                />
              </div>
            </div>
            <span className='text-center text-white font-semibold'>{name}</span>
          </div>
        </CustomLink>
      </li>
    </>
  )
}
