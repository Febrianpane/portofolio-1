import { createClient } from '@supabase/supabase-js'

// Vue CLI: process.env.VUE_APP_* are replaced at build time.
const url = process.env.VUE_APP_SUPABASE_URL || ''
const anon = process.env.VUE_APP_SUPABASE_ANON_KEY || ''

if (!url || !anon) {
  // eslint-disable-next-line no-console
  console.warn('[supabase] Missing env. Set VUE_APP_SUPABASE_URL/VUE_APP_SUPABASE_ANON_KEY (Vue CLI) or VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY (Vite) in .env')
}

export const supabase = createClient(url, anon)
// eslint-disable-next-line no-console
if (url && anon) console.info('[supabase] Client initialized')
