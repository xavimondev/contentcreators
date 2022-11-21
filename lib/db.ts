import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const SUPABASE_KEY: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
