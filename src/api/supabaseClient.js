import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://drvuhmipyzzlrwnzgdvq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRydnVobWlweXp6bHJ3bnpnZHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NzE2NzAsImV4cCI6MjA3ODU0NzY3MH0.699Eq1lhrr7cvhJBSN0okdjoS83UJIXMd7WzMRXRmt8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
