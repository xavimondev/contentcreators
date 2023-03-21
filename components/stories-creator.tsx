import Stories, { WithHeader } from 'react-insta-stories'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { useRouter } from 'next/router'
import type { Story } from 'react-insta-stories/dist/interfaces'

import { GradientColor } from 'types'

import { saveLastStoryIndexSeen } from 'services/story'

import { useStore } from 'state/store'

import { CancelIc } from './icons'

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['600'],
  style: ['normal'],
  subsets: ['latin']
})

export const StoryCard = ({
  story,
  config,
  message,
  gradient
}: {
  story: Story
  config: any
  message: string
  gradient: GradientColor
}) => {
  const { colorFrom, colorTo } = gradient
  return (
    <WithHeader story={story} globalHeader={config.header}>
      <div
        className='py-28 px-4 w-full h-full flex items-center justify-center'
        style={{
          background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`
        }}
      >
        <p className={`font-semibold text-xl text-white ${plusJakartaSans.className}`}>{message}</p>
      </div>
    </WithHeader>
  )
}

const StoriesCreator = () => {
  const setIsModalStoryOpen = useStore((state) => state.setIsModalStoryOpen)
  const listStories = useStore((state) => state.listStories)
  const lastStoryIndex = useStore((state) => state.lastStoryIndex)
  const router = useRouter()
  const { id } = router.query

  return (
    <div className='bg-white w-full h-full relative'>
      <Stories
        stories={listStories}
        defaultInterval={10000}
        width='100%'
        height='100%'
        keyboardNavigation
        loop
        preventDefault
        storyContainerStyles={{
          backgroundColor: 'transparent'
        }}
        onStoryStart={async (indexStory: number) => {
          const nextIndex = listStories.length - 1 === indexStory ? 0 : indexStory + 1
          await saveLastStoryIndexSeen(id as string, nextIndex)
        }}
        currentIndex={lastStoryIndex}
        onAllStoriesEnd={() => setIsModalStoryOpen(false)}
      />
      <button className='absolute bottom-4 left-1/2' onClick={() => setIsModalStoryOpen(false)}>
        <CancelIc className='text-white h-7 w-7' />
      </button>
    </div>
  )
}

export default StoriesCreator
