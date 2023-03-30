import { Prisma } from '@prisma/client'
import { prisma } from './client'
import { supabase } from './db'

export const saveComment = async (comment: any) => {
  const response = await fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()
  return data
}

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
      },
      createdAt: true
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

export const removeComment = async (commentId: number) => {
  const { error } = await supabase.from('Comment').delete().eq('id', commentId)
  return error
}

export const editComment = async (comment: { id: number; content: string }) => {
  const { error, data } = await supabase
    .from('Comment')
    .update({ content: comment.content })
    .eq('id', comment.id)
    .select()
  return {
    error,
    data
  }
}

/* Services cache */
type CacheData = {
  commentId: string
  creatorUsername: string
  commentAuthor: string
  commentValue: string
  createdAtMilliseconds: number
}

export const saveCommentInCache = async (data: CacheData): Promise<string> => {
  const response = await fetch('/api/uptash', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const result = await response.json()
  return result
}

export const listCommentsFromCache = async (username: string) => {
  const response = await fetch(`/api/uptash/?username=${username}`)
  const result = await response.json()
  return result
}

export const updateCommentInCache = async (
  commentId: number,
  commentValue: string
): Promise<string> => {
  const response = await fetch(`/api/uptash/${commentId}`, {
    method: 'PATCH',
    body: JSON.stringify({ commentValue }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const result = await response.json()
  return result
}
