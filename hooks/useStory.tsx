import { useEffect } from 'react'

import { useStore } from 'state/store'

import { listCommentsFromCache } from 'services/comment'

const useStory = (username: string) => {
  const listStories = useStore((state) => state.listStories)
  const setListStories = useStore((state) => state.setListStories)

  useEffect(() => {
    const getAllStories = async () => {
      try {
        const response = await listCommentsFromCache(username)
        const data = response.data
        if (data.length === 0) return
        setListStories(data)
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
