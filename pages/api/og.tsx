import { ImageResponse } from '@vercel/og'
import { CREATORS_DATA } from 'data/creators'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge'
}

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl

    const hasUsername = searchParams.has('username')
    const username = hasUsername ? searchParams.get('username') : ''
    const creatorInfo = CREATORS_DATA.find((creator) => creator.id === username)

    if (!creatorInfo) {
      return new ImageResponse(<>Visit with &quot;?username=vercel&quot;</>, {
        width: 1200,
        height: 630
      })
    }
    console.log(creatorInfo)
    const { name, description, id } = creatorInfo
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            backgroundImage: 'linear-gradient(to left, #39497e, #1d184e)',
            height: '100%'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto',
              maxWidth: '40rem',
              width: '100%'
            }}
          >
            <img
              alt={name}
              width='210'
              height='210'
              src={`https://github.com/${id}.png`}
              style={{
                borderRadius: '50%'
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginLeft: '40px'
              }}
            >
              <h1
                style={{
                  fontSize: '40px',
                  fontWeight: 'bold',
                  backgroundImage: 'linear-gradient(to right, #d770b2, #e4ad7a)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                {name}
              </h1>
              <p
                style={{
                  color: 'white',
                  fontSize: '22px',
                  fontWeight: 'bold'
                }}
              >
                {description}
              </p>
            </div>
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
