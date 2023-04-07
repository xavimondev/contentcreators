import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const creatorId = params.get('creatorId')
  const value = await redis.get(`${creatorId}-lastStorySeen`)
  return NextResponse.json({ data: value ?? 0 })
}

export async function POST(req: Request) {
  const { creatorId, lastIndexStorySeen } = await req.json()
  const key = `${creatorId}-lastStorySeen`
  const result = await redis.set(key, lastIndexStorySeen, {
    ex: 3600 // TODO: Fix this TTL, I need to calculate depending on next story time
  })
  return NextResponse.json({ msg: result })
}
