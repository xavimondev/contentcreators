import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})

type Context = {
  params: { id: string }
}

export async function DELETE(req: NextRequest, context: Context) {
  const id = context.params.id
  // Getting keys by pattern
  const key = await redis.scan(0, {
    match: `*:${id}:*`
  })
  // Just want the first key
  const keyData = key.at(1) as string[]
  if (keyData.length === 0) return NextResponse.json({ msg: 'Data not found' })
  const keyValue = keyData.at(0) as string
  // Deleting story
  const result = await redis.del(keyValue)
  return NextResponse.json({ msg: result })
}

export async function PATCH(req: NextRequest, context: Context) {
  const id = context.params.id
  // Getting keys by pattern
  const key = await redis.scan(0, {
    match: `*:${id}:*`
  })
  // Just want the first key
  const keyData = key.at(1) as string[]
  if (keyData.length === 0) return NextResponse.json({ msg: 'Data not found' })
  const keyValue = keyData.at(0) as string
  // Updating story
  const { commentValue } = await req.json()
  // Getting the current TTL and then updating key's value
  const ttl = await redis.ttl(keyValue)
  const result = await redis.set(keyValue, commentValue, {
    ex: ttl
  })
  return NextResponse.json({ msg: result })
}
