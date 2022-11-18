import { ImageResponse } from '@vercel/og'
import { CREATORS_DATA } from 'data/creators'
import Image from 'next/image'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge'
}

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl

    const hasUsername = searchParams.has('username')
    const username = hasUsername ? searchParams.get('username') : 'midudev'
    const creatorInfo = CREATORS_DATA.find((creator) => creator.id === username)

    console.log(creatorInfo)

    if (!username) {
      return new ImageResponse(<>Visit with &quot;?username=vercel&quot;</>, {
        width: 1200,
        height: 630
      })
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            fontSize: 60,
            color: 'black',
            backgroundImage: 'linear-gradient(to left, #39497e, #1d184e)',
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img
            width='256'
            height='256'
            src={`https://github.com/${username}.png`}
            style={{
              borderRadius: 128
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <h1
              style={{
                fontWeight: 700,
                backgroundImage: 'linear-gradient(to right, #d770b2, #e4ad7a)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              {creatorInfo?.name}
            </h1>
            <p
              style={{
                color: 'white',
                fontSize: '12px'
              }}
            >
              {creatorInfo?.description}
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500
    })
  }
}
