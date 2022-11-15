import { Social, Creator } from 'types/index'
import { Client } from '@notionhq/client'

const NOTION_KEY = process.env.NOTION_KEY as string
const NOTION_DATABASE = process.env.NOTION_DATABASE as string

const notion = new Client({
  auth: NOTION_KEY
})

export const getDatabase = async (customQuery: string, queryCreator: string) => {
  console.log({ customQuery, queryCreator })
  const response = await notion.databases.query({
    database_id: NOTION_DATABASE,
    filter: {
      and: [
        {
          property: 'status',
          select: {
            equals: 'enabled'
          }
        },
        {
          property: 'category',
          multi_select: {
            contains: customQuery
          }
        },
        {
          property: 'name',
          rich_text: {
            contains: queryCreator
          }
        }
      ]
    },
    sorts: [
      {
        property: 'name',
        direction: 'ascending'
      }
    ]
  })
  return response.results
}

export const getContentCreators = async (
  customQuery: string,
  queryCreator: string
): Promise<any> => {
  const data = await getDatabase(customQuery, queryCreator)
  let provider = ''
  let id = ''
  const creators = data.map((item: any) => {
    const {
      photo,
      name,
      description,
      twitter,
      github,
      twitch,
      discord,
      instagram,
      youtube,
      blog,
      category
    } = item.properties
    const { rich_text: descContent } = description
    const { multi_select } = category
    const { url: urlPhoto } = photo
    const { url: urlGithub } = github
    const { url: urlTwitch } = twitch
    const { url: urlDiscord } = discord
    const { url: urlYoutube } = youtube
    const { url: urlBlog } = blog
    const { url: urlTwitter } = twitter
    const { url: urlInstagram } = instagram

    const socialLinks: Social[] = [
      {
        id: 'twitter',
        url: urlTwitter
      },
      {
        id: 'github',
        url: urlGithub
      },
      {
        id: 'twitch',
        url: urlTwitch
      },
      {
        id: 'youtube',
        url: urlYoutube
      },
      {
        id: 'discord',
        url: urlDiscord
      },
      {
        id: 'instagram',
        url: urlInstagram
      },
      {
        id: 'blog',
        url: urlBlog
      }
    ]

    const categoriesData = multi_select.map((item: any) => item.name)

    const path = new URL(urlPhoto)
    if (path.hostname.includes('instagram')) provider = 'instagram'
    else if (path.hostname.includes('twitter')) provider = 'twitter'
    else if (path.hostname.includes('github')) provider = 'github'

    id = `${provider}-${path.pathname.replace('/', '')}`

    const creator: Creator = {
      id,
      name: name.title[0].text.content,
      description: descContent[0].text.content,
      categories: categoriesData,
      social: socialLinks
    }

    return creator
  })

  return creators
}
