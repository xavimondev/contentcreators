import Image from 'next/image'
import type { Category, Social } from 'types'
import CustomLink from './custom-link'
import SocialResourceLink from './social-link'

type CreatorCardProps = {
  name: string
  description: string
  categories: Category[]
  socialLinks: Social[]
  profileUrl: string
}

const CreatorCard = ({
  name,
  description,
  categories,
  socialLinks,
  profileUrl
}: CreatorCardProps) => {
  return (
    <article className='rounded-2xl border-none bg-[#1E1C26] z-10'>
      <div className='flex flex-col gap-4 p-6'>
        {/* Photo section */}
        <div className='flex flex-row justify-between'>
          <div className='object-cover w-24 md:w-32 h-auto'>
            <Image className='rounded-xl' src={profileUrl} width='256' height='256' alt={name} />
          </div>
        </div>
        {/* Description section */}
        <div className='flex flex-col gap-2'>
          {/* Name */}
          <h2 className='text-lg md:text-2xl font-bold tracking-tight dark:text-white'>{name}</h2>
          {/* Description */}
          <p className='mb-3 font-normal text-gray-600 dark:text-gray-300 max-w-5xl'>
            {description}
          </p>
          {/* Categories area */}
          <div className='flex flex-row gap-2 flex-wrap w-full'>
            {categories.map((cat) => (
              <CustomLink key={cat} href={`/category/${cat}`}>
                <span className='text-sm font-medium px-2 py-1 rounded bg-purple-500/25 text-purple-300'>
                  {cat}
                </span>
              </CustomLink>
            ))}
          </div>
        </div>
        {/* Social section */}
        <div className='flex flex-col gap-2 md:gap-4'>
          <h5 className='text-base text-white font-semibold'>Sígueme en:</h5>
          <ul className='flex gap-4 flex-wrap'>
            {socialLinks.map(({ id, url }) => (
              <SocialResourceLink key={id} id={id} url={url} />
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default CreatorCard
