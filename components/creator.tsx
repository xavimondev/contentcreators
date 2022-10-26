import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Category, Social } from 'types'
import CustomLink from './custom-link'
import SocialLink from './social-link'

type CreatorCardProps = {
  id: string
  name: string
  description: string
  categories: Category[]
  socialLinks: Social[]
}
const options = {
  threshold: 0.1
}

const CreatorCard = ({ id, name, description, categories, socialLinks }: CreatorCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  // I took blur workaround from https://github.com/vercel/next.js/discussions/26168
  const [isLoading, setLoading] = useState(true)

  // TODO: Convert observer into custom hook
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        observer.unobserve(entry.target)
        entry.target.setAttribute('style', 'opacity: 1; transform: translateY(0); transition: 0.4s')
      }
    }, options)

    const element = cardRef?.current

    if (element) observer.observe(element)

    return () => observer && observer.disconnect()
  }, [])

  return (
    <article
      className='rounded-2xl border-none dark:bg-slate-900'
      style={{
        opacity: 0,
        transform: 'translateY(100px)'
      }}
      ref={cardRef}
    >
      <div className='flex flex-col gap-4 p-6'>
        {/* Photo section */}
        <div className='object-cover w-24 md:w-32 h-auto rounded-xl'>
          <Image
            className={`rounded-xl duration-700 ease-in-out ${
              isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'
            }`}
            src={`https://unavatar.io/github/${id}`}
            width='256'
            height='256'
            alt={name}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
        {/* Description section */}
        <div className='flex flex-col gap-2'>
          {/* Name */}
          <h2 className='text-lg md:text-3xl font-bold tracking-tight dark:text-white'>{name}</h2>
          {/* Description */}
          <p className='mb-3 text-base font-normal text-gray-700 dark:text-gray-400 max-w-5xl'>
            {description}
          </p>
          {/* Categories area */}
          <div className='flex flex-row gap-2 flex-wrap w-full'>
            {categories.map((cat) => (
              <CustomLink key={cat} href={`/category/${cat}`}>
                <span className='bg-blue-100 text-blue-800 text-sm font-medium px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800'>
                  {cat}
                </span>
              </CustomLink>
            ))}
          </div>
        </div>
        {/* Social section */}
        <div className='flex flex-col gap-2 md:gap-4'>
          <h5 className='text-base md:text-lg text-white font-semibold'>Sígueme en:</h5>
          <ul className='flex gap-4 flex-wrap'>
            {socialLinks.map(({ id, url }) => (
              <SocialLink key={id} id={id} url={url} />
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default CreatorCard
