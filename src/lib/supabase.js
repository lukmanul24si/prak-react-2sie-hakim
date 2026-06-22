import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jdrlvovcuddoixbgcqhp.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impkcmx2b3ZjdWRkb2l4YmdjcWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4OTcxNzEsImV4cCI6MjA5NjQ3MzE3MX0.7Sy7rDBryVhMjFS4d_8nBPIRzDSVqtP3-IXVyF1KdbU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
