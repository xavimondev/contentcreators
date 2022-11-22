import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

const supabaseClient = createBrowserSupabaseClient()

export const auth = (username: string, creatorId: string) => {
  if (username) signout()
  else signInWithGitHub(creatorId)
}

const signInWithGitHub = async (creatorId: string) => {
  console.log(creatorId)
  try {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `http://localhost:3000/creator/${creatorId}`
      }
    })
    if (error) throw new Error('An error ocurred during authentication')
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

const signout = async () => {
  try {
    const { error } = await supabaseClient.auth.signOut()
    if (error) throw new Error('An error ocurred during logout')
  } catch (error) {
    console.log(error)
    return null
  }
}
