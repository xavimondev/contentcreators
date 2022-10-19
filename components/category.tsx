import Image from 'next/image'
import CustomLink from './custom-link'

type CategoryProps = {
  id: string
  name: string
  colorFrom: string
  colorTo: string
  image: any
}

export const CategoryCard = ({ id, name, colorFrom, colorTo, image }: CategoryProps) => {
  return (
    <>
      <article
        key={id}
        className={`w-full rounded-xl transition duration-200 ease-in-out group hover:-translate-y-1 `}
        style={{
          background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`
        }}
      >
        <CustomLink href={`category/${id}`}>
          <div className='h-auto flex flex-col gap-8 py-8 px-4'>
            <Image src={image} height='256' width='256' alt={name} />
            <p className='max-w-xl font-extrabold text-white/80'>{name}</p>
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
          <div className='flex flex-col items-center'>
            <div
              className={`w-14 h-14 p-1 rounded-full`}
              style={{
                background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`
              }}
            >
              <div className='h-full p-2 bg-white text-white rounded-full'>
                <Image
                  className='rounded-full'
                  src={image}
                  alt='frontend'
                  width='256'
                  height='256'
                />
              </div>
            </div>
            <span className='text-center text-white font-semibold'>{name.toLowerCase()}</span>
          </div>
        </CustomLink>
      </li>
    </>
  )
}
