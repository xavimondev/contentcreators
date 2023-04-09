import { ImageResponse } from 'next/server'
import { CREATORS_DATA } from 'data/creators'

// const interMedium = fetch(new URL('../../../../assets/Inter-Medium.ttf', import.meta.url)).then(
//   (res) => res.arrayBuffer()
// )
// const interBold = fetch(new URL('../../../assets/Inter-Bold.ttf', import.meta.url)).then((res) =>
//   res.arrayBuffer()
// )
export const contentType = 'image/png'

type Context = {
  params: { id: string }
}

export default async function og({ params }: Context) {
  const contentCreatorId = params.id
  // const fontDataMedium = await interMedium
  // const fontDataBold = await interBold

  try {
    const creatorInfo = CREATORS_DATA.find((creator) => creator.id === contentCreatorId)

    if (!creatorInfo) {
      return new ImageResponse(
        (
          <div
            style={{
              display: 'flex',
              backgroundColor: '#13111a',
              height: '100%'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto',
                maxWidth: '70rem',
                width: '100%'
              }}
            >
              <span
                style={{
                  fontSize: 130
                }}
              >
                🫤
              </span>
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center'
                }}
              >
                El usuario que estas intentando buscar no está registrado.
              </p>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
          emoji: 'fluentFlat'
        }
      )
    }
    const { name, description } = creatorInfo
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            backgroundColor: '#13111a',
            width: '100%',
            height: '100%',
            position: 'relative'
          }}
        >
          <div
            style={{
              display: 'flex',
              backgroundImage: 'linear-gradient(135deg, #ffffff14 -1px, #13111a 7%)',
              backgroundSize: '13px 13px',
              width: '100%',
              height: '100%',
              position: 'absolute'
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
                width='340'
                height='340'
                src={creatorInfo.profileUrl}
                style={{
                  borderRadius: '50%'
                }}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                  marginLeft: '38px'
                }}
              >
                <h1
                  style={{
                    fontSize: '60px',
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
                    fontSize: '24px',
                    color: 'white'
                  }}
                >
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630
        // fonts: [
        //   {
        //     name: 'Inter',
        //     data: fontDataMedium,
        //     weight: 500
        //   },
        //   {
        //     name: 'Inter',
        //     data: fontDataBold,
        //     weight: 700
        //   }
        // ]
      }
    )
  } catch (e: any) {
    console.error(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500
    })
  }
}
