import Image from 'next/image'
import { useRouter } from 'next/router'

import { useStore } from 'state/store'

import useStory from 'hooks/useStory'

import { CREATORS_DATA } from 'data/creators'

import { SOCIAL_LINKS } from 'components/social-link'
import CustomLink from 'components/custom-link'

const CreatorProfile = () => {
  const router = useRouter()
  const { id } = router.query
  const { listStories } = useStory(id as string)
  const setIsModalStoryOpen = useStore((state) => state.setIsModalStoryOpen)
  const hasStories = listStories.length

  let creatorInfo = null

  if (id) {
    creatorInfo = CREATORS_DATA.find((creator) => creator.id === id)
  }

  return (
    <section className='mt-10 p-0.5 flex flex-col gap-2 md:gap-4 rounded-xl bg-gradient-to-r from-indigo-500 to-[#d5578f]'>
      <div className='bg-[#1E1C26] rounded-xl p-4'>
        <div className='flex flex-col md:flex-row gap-2 md:gap-4 items-center'>
          <div
            className='object-cover w-24 md:w-32 h-auto cursor-pointer'
            onClick={() => {
              hasStories && setIsModalStoryOpen(true)
            }}
          >
            <Image
              className={`rounded-full ${hasStories ? 'border-4 border-purple-800' : ''}`}
              src={`https://unavatar.io/github/${id}`}
              width='256'
              height='256'
              alt={creatorInfo!.name}
            />
          </div>
          <div className='flex flex-col gap-2 md:gap-4'>
            <h2 className='text-white font-bold tracking-wide text-xl sm:text-2xl lg:text-5xl'>
              {creatorInfo?.name}
            </h2>
            <p className='text-base sm:text-lg lg:text-xl dark:text-gray-400'>
              {creatorInfo?.description}
            </p>
          </div>
        </div>
        <div className='flex gap-1 md:gap-3 flex-wrap md:flex-row mt-4 sm:mt-2'>
          {creatorInfo?.social.map((item) => {
            const Component = SOCIAL_LINKS.find((link) => link.id === item.id)?.Component
            return (
              <CustomLink href={item.url} key={item.id} rel='noopener noreferrer' target='_blank'>
                <div className='p-2 rounded-lg transition hover:scale-110'>{Component}</div>
              </CustomLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CreatorProfile
