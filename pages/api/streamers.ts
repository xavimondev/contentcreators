import { NextApiRequest, NextApiResponse } from 'next'

import { StreamerLive } from 'types'

import { URL_TWITCH_GENERATE_TOKEN } from 'global/constants'

import { generateUrlStreams } from 'utils/generateUrlStreams'

import { CREATORS_DATA } from 'data/creators'

const CLIENT_ID = process.env.TWITCH_CLIENT_ID as string
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET as string

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

  // Doc: https://dev.twitch.tv/docs/api/reference/#get-streams
  const url = generateUrlStreams()
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Client-Id': CLIENT_ID,
      Authorization: `Bearer ${access_token}`
    }
  })

  const { data } = await response.json()

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

  return res.status(200).json({ data: creatorsLive })
}
