'use client'
import Image from 'next/image'
import type { Creator } from 'types'
import { useStore } from 'state/store'
import useStory from '@/hooks/useStory'
import { SOCIAL_LINKS } from './social-link'
import CustomLink from './custom-link'

type CreatorProfileProps = {
  creatorInfo: Creator
}

const CreatorProfile = ({ creatorInfo }: CreatorProfileProps) => {
  const { listStories } = useStory(creatorInfo.id as string)
  const setIsModalStoryOpen = useStore((state) => state.setIsModalStoryOpen)
  const userSession = useStore((state) => state.userSession)
  const hasStories = listStories.length
  const isContentCreator = creatorInfo.id === userSession?.username

  return (
    <section className='p-0.5 rounded-xl bg-gradient-to-r from-indigo-500 to-[#d5578f]'>
      <div className='bg-[#1E1C26] rounded-xl p-4'>
        <div className='flex flex-col md:flex-row gap-2 md:gap-4 items-center '>
          <Image
            className={`rounded-full object-cover ${
              hasStories && isContentCreator ? 'border-4 border-purple-800 cursor-pointer' : ''
            }`}
            onClick={() => {
              hasStories && isContentCreator && setIsModalStoryOpen(true)
            }}
            src={creatorInfo.profileUrl}
            width='130'
            height='130'
            alt={creatorInfo.name}
          />
          <div className='flex flex-col gap-2 md:gap-4 '>
            <h2 className='text-white font-bold tracking-wide text-xl sm:text-2xl lg:text-5xl'>
              {creatorInfo.name}
            </h2>
            <p className='text-base sm:text-lg dark:text-gray-400 w-full line-clamp-3 md:line-clamp-none'>
              {creatorInfo.description}
            </p>
          </div>
        </div>
        <div className='flex gap-1 md:gap-3 flex-wrap md:flex-row mt-4 sm:mt-2'>
          {creatorInfo.social.map((item) => {
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
