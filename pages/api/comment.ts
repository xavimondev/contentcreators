import { NextApiRequest, NextApiResponse } from 'next'
import { addComment, addCreator, searchCreator } from 'services/comment'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { username, userId, content } = req.body
      let creatorData = await searchCreator(username)

      if (!creatorData) {
        creatorData = await addCreator(username)
      }

      const commentData: any = {
        userId,
        content,
        creatorId: creatorData.id
      }

      const resData = await addComment(commentData)
      const { id } = resData

      return res.status(201).json({ status: 1, commentId: id })
    } catch (error) {
      return res.status(500).json({ status: 0 })
    }
  }

  return res.status(501).json({ status: 0 })
}
