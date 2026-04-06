import { createClient, type SupabaseClient } from '@supabase/supabase-js'


let supabase: SupabaseClient | null = null

export const getSupabase = () => {
    if (typeof window === 'undefined') return null
    
    if (!supabase) {
        supabase = createClient(
            import.meta.env.VITE_SUPABASE_URL,
            import.meta.env.VITE_SUPABASE_ANON_KEY
        )
    }
    
    return supabase
}