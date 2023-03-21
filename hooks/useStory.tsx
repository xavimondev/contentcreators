import { useEffect } from 'react'

import { CreatorStory } from 'types'
import type { Story } from 'react-insta-stories/dist/interfaces'

import { useStore } from 'state/store'

import { getRelativeTime } from 'utils/getRelativeTime'
import { getRandomGradient } from 'utils/getRandomGradient'

import { listCommentsFromCache } from 'services/comment'
import { getLastStoryIndexSeenByCreator } from 'services/story'

import { StoryCard } from 'components/stories-creator'

const useStory = (username: string) => {
  const listStories = useStore((state) => state.listStories)
  const setListStories = useStore((state) => state.setListStories)
  const lastStoryIndex = useStore((state) => state.lastStoryIndex)
  const setLastStoryIndex = useStore((state) => state.setLastStoryIndex)

  useEffect(() => {
    const getAllStories = async () => {
      try {
        const response = await listCommentsFromCache(username)
        const data = response.data as CreatorStory[]
        if (data.length === 0) return

        const stories: Story[] = data.map((creatorStory: CreatorStory, index: number) => {
          const { author, message, date } = creatorStory
          const relativeTime = getRelativeTime(new Date(date))
          const gradientColor = getRandomGradient()

          return {
            header: {
              heading: author,
              subheading: `Publicado ${relativeTime}`,
              profileImage: `https://avatars.jakerunzer.com/${index}`
            },
            content: ({ story, config }: { story: Story; config: any }) => (
              <StoryCard story={story} config={config} message={message} gradient={gradientColor} />
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

  // Fetching lastStorySeen
  useEffect(() => {
    const getLastStorySeen = async () => {
      const { data } = await getLastStoryIndexSeenByCreator(username)

      data !== 0 && setLastStoryIndex(data)
    }
    getLastStorySeen()
  }, [username])

  return {
    listStories,
    lastStoryIndex
  }
}

export default useStory
