import { createClient } from '@supabase/supabase-js'

const url = (
  // Prefer Vite-style if available
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL) ||
  // Fallback to Vue CLI-style
  (process as any).env?.VUE_APP_SUPABASE_URL
) as string | undefined

const anon = (
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY) ||
  (process as any).env?.VUE_APP_SUPABASE_ANON_KEY
) as string | undefined

if (!url || !anon) {
  // Friendly runtime warning to help setup
  // eslint-disable-next-line no-console
  console.warn('[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Set them in your .env file.')
}

export const supabase = (url && anon) ? createClient(url, anon) : null as any
