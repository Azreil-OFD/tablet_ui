import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://ibickrqswjnujcybubax.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliaWNrcnFzd2pudWpjeWJ1YmF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyNjgxMzUsImV4cCI6MjAzNjg0NDEzNX0.ns4RDor3iEJhrtW6AK_9NtkkkI3aeDuebsjAlUMurJs'
)
