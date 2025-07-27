import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function createDocumentsTable() {
  // Create documents table using Supabase SQL
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS documents (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        content TEXT NOT NULL,
        metadata JSONB NOT NULL,
        embedding TEXT, -- Store as JSON string
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS documents_metadata_idx ON documents USING GIN (metadata);
    `
  })
  
  if (error) {
    console.error('Error creating table:', error)
    return false
  }
  
  return true
}

export async function insertDocumentsDirectly(documents: any[]) {
  const { data, error } = await supabase
    .from('documents')
    .insert(documents)
    .select()

  if (error) {
    console.error('Error inserting documents:', error)
    return null
  }

  return data
}

export async function searchDocumentsDirectly(query: string) {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    
  if (error) {
    console.error('Error searching documents:', error)
    return []
  }

  return data
}