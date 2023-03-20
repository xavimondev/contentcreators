import { useEffect } from 'react'

import { CreatorStory } from 'types'
import type { Story } from 'react-insta-stories/dist/interfaces'

import { useStore } from 'state/store'

import { getRelativeTime } from 'utils/getRelativeTime'
import { getRandomGradient } from 'utils/getRandomGradient'

import { listCommentsFromCache } from 'services/comment'

import { StoryCard } from 'components/stories-creator'

const useStory = (username: string) => {
  const listStories = useStore((state) => state.listStories)
  const setListStories = useStore((state) => state.setListStories)

  useEffect(() => {
    const getAllStories = async () => {
      try {
        const response = await listCommentsFromCache(username)
        const data = response.data as CreatorStory[]
        if (data.length === 0) return

        const stories: Story[] = data.map((creatorStory: CreatorStory, index: number) => {
          const { author, message, date } = creatorStory
          const relativeTime = getRelativeTime(new Date(date))

          return {
            header: {
              heading: author,
              subheading: `Publicado ${relativeTime}`,
              profileImage: `https://avatars.jakerunzer.com/${index}`
            },
            content: ({ story, config }: { story: Story; config: any }) => (
              <StoryCard
                story={story}
                config={config}
                message={message}
                gradient={getRandomGradient()}
              />
            )
          }
        })
        setListStories(stories)
      } catch (error) {
        console.log(error)
      }
    }
    getAllStories()
  }, [])

  return {
    listStories
  }
}

export default useStory
