import { CREATORS_DATA } from 'data/creators'

import { URL_TWITCH_LIST_STREAMS } from 'global/constants'

export const generateUrlStreams = () => {
  const url = new URL(URL_TWITCH_LIST_STREAMS)

  const streamersWithTwitch: string[] = CREATORS_DATA.filter((creator) => creator.twitchId).map(
    (streamer) => streamer.twitchId!
  )

  streamersWithTwitch.forEach((username: string) => url.searchParams.append('user_login', username))
  return url
}
