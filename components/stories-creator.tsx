import Stories, { WithHeader } from 'react-insta-stories'
import { Plus_Jakarta_Sans } from 'next/font/google'
import type { Story } from 'react-insta-stories/dist/interfaces'

import { useStore } from 'state/store'

import { CancelIc } from './icons'

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['600'],
  style: ['normal'],
  subsets: ['latin']
})

const StoryCard = ({ story, config }: { story: Story; config: any }) => {
  return (
    <WithHeader story={story} globalHeader={config.header}>
      <div className='bg-gradient-to-r from-cyan-500 to-blue-500 py-28 px-4 w-full h-full flex items-center justify-center'>
        <p className={`font-semibold text-xl text-white ${plusJakartaSans.className}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet, odio eu malesuada
          commodo, justo ipsum tristique nunc, ac tempor odio augue quis nisl. Duis porttitor quam
          vel nibh finibus, in malesuada nulla auctor.
        </p>
      </div>
    </WithHeader>
  )
}

const stories = [
  {
    header: {
      heading: 'Xavier Alfaro',
      subheading: 'Publicado hace 30min',
      profileImage: 'https://picsum.photos/100/100'
    },
    content: ({ story, config }: { story: Story; config: any }) => (
      <StoryCard story={story} config={config} />
    )
  }
]

const StoriesCreator = () => {
  const setIsModalStoryOpen = useStore((state) => state.setIsModalStoryOpen)
  return (
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-full relative'>
      <div className='absolute bottom-4 left-1/2 z-50' onClick={() => setIsModalStoryOpen(false)}>
        <CancelIc className='text-white h-7 w-7' />
      </div>
      <Stories
        stories={stories}
        defaultInterval={10000}
        width='100%'
        height='98%'
        storyContainerStyles={{
          backgroundColor: 'transparent'
        }}
      />
    </div>
  )
}

export default StoriesCreator
