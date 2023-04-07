import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { SECONDS_TTL_REDIS } from 'global/constants'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const username = params.get('username')
  const keys = await redis.keys(`${username}:*`)
  if (keys.length === 0) return NextResponse.json({ data: [] })

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
  return NextResponse.json({ data })
}

export async function POST(req: Request) {
  const { commentId, creatorUsername, commentAuthor, commentValue, createdAtMilliseconds } =
    await req.json()
  const key = `${creatorUsername}:${commentId}:${commentAuthor}:${createdAtMilliseconds}`
  const result = await redis.set(key, commentValue, {
    ex: SECONDS_TTL_REDIS
  })
  return NextResponse.json({ msg: result })
}
