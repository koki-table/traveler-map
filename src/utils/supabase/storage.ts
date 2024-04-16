import { createClient as supabase } from '@supabase/supabase-js'

/**
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs
 */
export function createClient() {
  return supabase(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
