import { Prisma } from '@prisma/client'
import { prisma } from './client'

export const searchCreator = async (username: string) => {
  const user = await prisma.creator.findUnique({
    where: {
      username
    },
    select: {
      id: true,
      username: true
    }
  })
  return user
}

export const addComment = async (comment: Prisma.CommentCreateInput) => {
  const res = await prisma.comment.create({
    data: {
      ...comment
    }
  })
  return res
}

export const addCreator = async (username: string) => {
  const res = await prisma.creator.create({
    data: {
      username
    }
  })
  return res
}

export const listCommentsByCreator = async (username: string) => {
  const data = await prisma.comment.findMany({
    select: {
      id: true,
      content: true,
      creator: {
        select: {
          id: true,
          username: true
        }
      },
      user: {
        select: {
          id: true,
          githubId: true,
          name: true,
          username: true,
          photoUrl: true
        }
      }
    },
    where: {
      creator: {
        username
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return data
}
