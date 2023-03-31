import type { ResponseData } from 'types'
import { supabase } from './db'

export const saveComment = async (comment: any) => {
  let creatorId = null
  const { userId, content, username } = comment
  const creatorData = await searchCreator(username)
  if (creatorData!.length > 0) {
    creatorId = creatorData![0].id
  } else {
    // Saving creator into database
    const { data } = await addCreator(username)
    creatorId = data![0].id
  }

  const commentData = {
    userId,
    content,
    creatorId
  }

  const { error, data } = await supabase.from('Comment').insert(commentData).select()
  return {
    error,
    data
  }
}

const searchCreator = async (username: string) => {
  const { data } = await supabase.from('Creator').select('id').eq('username', username)
  return data
}

const addCreator = async (username: string) => {
  const { error, data } = await supabase.from('Creator').insert({ username }).select()
  return {
    error,
    data
  }
}

export const listCommentsByCreator = async (username: string): Promise<ResponseData> => {
  const { data, error } = await supabase
    .from('Comment')
    .select(
      `
    id,
    content,
    createdAt,
    Creator!inner(
      username
    ),
    User(
      id,
      githubId,
      name,
      username,
      photoUrl
    )
  `
    )
    .eq('Creator.username', username)
    .order('createdAt', { ascending: false })

  if (error)
    return {
      status: 0,
      error
    }

  const listCommentsFormatted = data.map((comment: any) => {
    const { id, content, User, createdAt } = comment
    const { id: authorId, name, photoUrl, username } = User
    return {
      id,
      message: content,
      authorId,
      author: name,
      authorAvatar: photoUrl,
      authorUsername: username,
      createdAt
    }
  })
  return {
    status: 1,
    data: listCommentsFormatted
  }
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

export const deleteCommentInCache = async (commentId: number): Promise<string> => {
  const response = await fetch(`/api/uptash/${commentId}`, {
    method: 'DELETE'
  })
  const result = await response.json()
  return result
}
