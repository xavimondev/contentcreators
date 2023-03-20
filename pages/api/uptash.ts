import type { NextApiRequest, NextApiResponse } from 'next'
import { Redis } from '@upstash/redis'

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
      const [creatorUsername, commentAuthor, createdAtMilliseconds] = key.split(':')
      return {
        dedicatedTo: creatorUsername,
        author: commentAuthor.replace('-', ' '),
        content: commentValue,
        date: Number(createdAtMilliseconds)
      }
    })
    return res.status(200).json({ data })
  }
  const { creatorUsername, commentAuthor, commentValue, createdAtMilliseconds } = req.body
  const key = `${creatorUsername}:${commentAuthor}:${createdAtMilliseconds}`
  const result = await redis.set(key, commentValue, {
    ex: 120
  })
  res.status(200).json({ msg: result })
}
