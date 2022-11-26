import { supabase } from './db'

export const addComment = async (comment: any, username: string) => {
  let creatorData = await searchCreator(username)

  if (!creatorData) {
    creatorData = await addCreator(username)
  }

  const { id } = creatorData
  comment.creatorId = id

  const { data, error } = await supabase.from('Comment').insert(comment).select()
  if (error) {
    console.error(error)
    return null
  }

  return data
}

export const addCreator = async (username: string) => {
  const { data, error } = await supabase.from('Creator').insert({ username }).select()
  if (error) {
    console.error(error)
    return null
  }

  return data[0]
}

export const searchCreator = async (username: string) => {
  const { data, error } = await supabase.from('Creator').select().eq('username', username)
  if (error) {
    console.error(error)
    return null
  }

  return data[0]
}

export const listCommentsByCreator = async (username: string) => {
  const { data, error } = await supabase
    .from('Comment')
    .select(
      `
    id,
    content,
    Creator (
      id,
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
  if (error) {
    console.error(error)
    return null
  }

  return data
}
