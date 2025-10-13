import { createClient } from '@supabase/supabase-js'

// Support both Vue CLI (VUE_APP_*) and Vite (VITE_*) environment variables
const url = process.env.VUE_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''
const anon = process.env.VUE_APP_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''

const hasEnv = Boolean(url && anon)
if (!hasEnv) {
  // eslint-disable-next-line no-console
  console.warn('[supabase] Missing env. Set either VUE_APP_SUPABASE_URL/VUE_APP_SUPABASE_ANON_KEY (Vue CLI) or VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY (Vite) in your hosting environment.')
}

// Only create the client when env is properly configured to avoid runtime errors
export const supabase = hasEnv ? createClient(url, anon) : null
// eslint-disable-next-line no-console
if (hasEnv) console.info('[supabase] Client initialized')
