import type { StreamerLive } from 'types'
import { URL_TWITCH_GENERATE_TOKEN } from 'global/constants'
import { CREATORS_DATA } from 'data/creators'
import { generateUrlStreams } from './generateUrlStreams'

const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET as string
const CLIENT_ID = process.env.TWITCH_CLIENT_ID as string

const getTwitchToken = async (): Promise<string> => {
  // Doc: https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#client-credentials-grant-flow
  const responseToken = await fetch(URL_TWITCH_GENERATE_TOKEN, {
    method: 'POST',
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials'
    })
  })
  const { access_token } = await responseToken.json()
  return access_token
}

const formatStreamersData = (data: any) => {
  const creatorsLive: StreamerLive[] = data.map((item: any) => {
    const { id, title, user_name, user_login, viewer_count } = item
    const avatarUrl = CREATORS_DATA.find((creator) => creator.twitchId === user_login)?.profileUrl

    return {
      id: id,
      titleStream: title,
      streamerName: user_name,
      streamerLogin: user_login,
      viewerCount: viewer_count,
      avatarUrl
    }
  })

  return creatorsLive
}

export const getLiveStreamers = async () => {
  // Doc: https://dev.twitch.tv/docs/api/reference/#get-streams
  const url = generateUrlStreams()
  const token = await getTwitchToken()
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Client-Id': CLIENT_ID,
      Authorization: `Bearer ${token}`
    }
  })

  const { data } = await response.json()
  const streamersData = formatStreamersData(data)
  return streamersData
}
