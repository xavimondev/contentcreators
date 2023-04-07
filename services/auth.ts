import { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { AUTH_REDIRECT } from 'global/constants'

export const signInWithGitHub = async (
  supabaseClient: SupabaseClient<any, 'public', any>,
  creatorId: string
) => {
  try {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${AUTH_REDIRECT}/creator/${creatorId}`
      }
    })
    if (error) throw new Error('An error ocurred during authentication')
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const signout = async (supabaseClient: SupabaseClient<any, 'public', any>) => {
  try {
    const { error } = await supabaseClient.auth.signOut()
    if (error) throw new Error('An error ocurred during logout')
  } catch (error) {
    console.log(error)
    return null
  }
}
