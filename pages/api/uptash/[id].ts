import type { NextApiRequest, NextApiResponse } from 'next'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'PATCH') {
    const { id } = req.query
    // Getting keys by pattern
    const keys = await redis.keys(`*:${id}:*`)
    // Just want the first key
    const key = keys.at(0)
    if (keys.length === 0 || key == null) return res.status(200).json({ msg: 'Data not found' })

    const { commentValue } = req.body
    // Getting the current TTL and then updating key's value
    const ttl = await redis.ttl(key)
    const result = await redis.set(key, commentValue, {
      ex: ttl
    })
    return res.status(200).json({ msg: result })
  }
}
