import type { NextApiRequest, NextApiResponse } from 'next'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { creatorId } = req.query
    const value = await redis.get(`${creatorId}-lastStorySeen`)
    return res.status(200).json({ data: value ?? 0 })
  }
  const { creatorId, lastIndexStorySeen } = req.body
  const key = `${creatorId}-lastStorySeen`
  const result = await redis.set(key, lastIndexStorySeen, {
    ex: 3600 // TODO: Fix this TTL, I need to calculate depending on next story time
  })
  return res.status(200).json({ msg: result })
}
