import type { Session } from '@supabase/supabase-js'

export const getDataFromUser = (session: Session) => {
  const { user } = session
  const {
    user_metadata: { avatar_url, user_name, full_name }
  } = user

  return {
    userId: user.id,
    fullName: full_name,
    username: user_name,
    avatarUrl: avatar_url
  }
}
