import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iqalorqxnngsohkgzbjh.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface DocumentChunk {
  id?: string
  content: string
  metadata: {
    source: string
    section: string
    page_title?: string
    chunk_index: number
    total_chunks: number
  }
  embedding?: number[]
  created_at?: string
}

export async function initializeDatabase() {
  // Create the documents table if it doesn't exist
  const { error: tableError } = await supabase.rpc('create_documents_table')
  
  if (tableError) {
    console.error('Error creating documents table:', tableError)
    return false
  }

  // Enable the vector extension and create the embedding index
  const { error: extensionError } = await supabase.rpc('enable_vector_extension')
  
  if (extensionError) {
    console.error('Error enabling vector extension:', extensionError)
    return false
  }

  return true
}

export async function insertDocuments(documents: DocumentChunk[]) {
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

export async function searchSimilarDocuments(
  queryEmbedding: number[], 
  matchThreshold: number = 0.8, 
  matchCount: number = 10
) {
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: matchThreshold,
    match_count: matchCount
  })

  if (error) {
    console.error('Error searching documents:', error)
    return []
  }

  return data
}