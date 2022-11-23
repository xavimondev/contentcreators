import { supabase } from './db'

export const addComment = async (comment: any, creator: any) => {
  const newCreator = await addCreator(creator)
  if (newCreator) {
    const { id } = newCreator
    comment.creatorId = id
    const { data, error } = await supabase.from('Comment').insert(comment)
    if (error) {
      console.error(error)
      return null
    }
    return data
  }
  return newCreator
}

export const addCreator = async (creator: any) => {
  const { data, error } = await supabase.from('Creator').upsert(creator).select()
  console.log(data)
  if (error) {
    console.error(error)
    return null
  }

  return data[0]
}
