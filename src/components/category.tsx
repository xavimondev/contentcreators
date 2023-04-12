import Image from 'next/image'
import Link from 'next/link'
import CustomLink from './custom-link'

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
      <li className='w-full'>
        <CustomLink href={`/category/${id}`}>
          <div className='flex flex-col gap-1.5 items-center'>
            <div
              className={`w-12 h-12 p-1 rounded-full`}
              style={{
                background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`
              }}
            >
              <div className='h-full p-1 text-white rounded-full'>
                <Image
                  className='rounded-full w-full h-full'
                  src={image}
                  alt='frontend'
                  width='130'
                  height='130'
                />
              </div>
            </div>
            <span className='text-center text-white text-sm max-w-[80px] truncate'>{name}</span>
          </div>
        </CustomLink>
      </li>
    </>
  )
}

export const CategoryLink = ({
  id,
  name,
  isSelected
}: {
  id: string
  name: string
  isSelected: boolean
}) => {
  return (
    <Link
      href={`/category/${id}`}
      className={`flex w-full p-2 items-center rounded-md transition-none duration-100 hover:bg-purple-500/20 hover:text-purple-200 ${
        isSelected ? 'bg-purple-500/30 text-purple-300' : 'text-white'
      }`}
    >
      {name}
    </Link>
  )
}
