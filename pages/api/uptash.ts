import type { NextApiRequest, NextApiResponse } from 'next'
import { Redis } from '@upstash/redis'

import { SECONDS_TTL_REDIS } from 'global/constants'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    const { username } = req.query
    const keys = await redis.keys(`${username}:*`)
    if (keys.length === 0) return res.status(200).json({ data: [] })
    const values = await redis.mget(...keys)
    const data = keys.map((key, index) => {
      const commentValue = values.at(index)
      const [creatorUsername, , commentAuthor, createdAtMilliseconds] = key.split(':')
      return {
        dedicatedTo: creatorUsername,
        author: commentAuthor.replace('-', ' '),
        message: commentValue,
        date: Number(createdAtMilliseconds)
      }
    })
    return res.status(200).json({ data })
  }
  const { commentId, creatorUsername, commentAuthor, commentValue, createdAtMilliseconds } =
    req.body
  const key = `${creatorUsername}:${commentId}:${commentAuthor}:${createdAtMilliseconds}`
  const result = await redis.set(key, commentValue, {
    ex: SECONDS_TTL_REDIS
  })
  res.status(200).json({ msg: result })
}
