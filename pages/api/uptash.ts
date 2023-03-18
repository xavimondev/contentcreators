import type { NextApiRequest, NextApiResponse } from 'next'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { creatorUsername, commentAuthor, commentValue, createdAtMilliseconds } = req.body
  const key = `${creatorUsername}:${commentAuthor}:${createdAtMilliseconds}`
  const result = await redis.set(key, commentValue, {
    ex: 60
  })
  res.status(200).json({ msg: result })
}
