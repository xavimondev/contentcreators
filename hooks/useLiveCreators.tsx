import { useEffect, useState } from 'react'

import { StreamerLive } from 'types'

const useLiveCreators = () => {
  const [streamers, setStreamers] = useState<StreamerLive[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getLiveStreamers = async () => {
      const response = await fetch('/api/streamers')
      const { data } = await response.json()
      setStreamers(data)
      setIsLoading(false)
    }

    getLiveStreamers()
  }, [])

  return {
    streamers,
    isLoading
  }
}

export default useLiveCreators
