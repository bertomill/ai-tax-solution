import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iqalorqxnngsohkgzbjh.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// Storage bucket name for documents
export const DOCUMENTS_BUCKET = 'documents'

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

export interface StoredDocument {
  fileName: string
  fileType: string
  fileSize: number
  uploadedAt: string
  userId: string
  storagePath: string
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

export async function initializeStorage() {
  // Create documents bucket if it doesn't exist
  const { data: buckets, error: listError } = await supabase.storage.listBuckets()
  
  if (listError) {
    console.error('Error listing buckets:', listError)
    return false
  }

  const bucketExists = buckets?.some(bucket => bucket.name === DOCUMENTS_BUCKET)
  
  if (!bucketExists) {
    const { error: createError } = await supabase.storage.createBucket(DOCUMENTS_BUCKET, {
      public: false,
      allowedMimeTypes: [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'text/plain',
        'text/markdown'
      ],
      fileSizeLimit: 10485760 // 10MB limit
    })

    if (createError) {
      console.error('Error creating bucket:', createError)
      return false
    }
  }

  return true
}

export async function storeDocument(
  file: Buffer | File,
  fileName: string,
  userId: string,
  fileType: string
): Promise<{ success: boolean; storagePath?: string; error?: string }> {
  try {
    // Create a unique path for the file
    const timestamp = new Date().getTime()
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
    const storagePath = `${userId}/${timestamp}_${cleanFileName}`

    const { error } = await supabase.storage
      .from(DOCUMENTS_BUCKET)
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Storage upload error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, storagePath }
  } catch (error) {
    console.error('Storage error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown storage error'
    }
  }
}

export async function getDocumentUrl(storagePath: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from(DOCUMENTS_BUCKET)
      .createSignedUrl(storagePath, 3600) // 1 hour expiry

    if (error) {
      console.error('Error creating signed URL:', error)
      return null
    }

    return data.signedUrl
  } catch (error) {
    console.error('Error getting document URL:', error)
    return null
  }
}

export async function deleteDocumentFromStorage(storagePath: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(DOCUMENTS_BUCKET)
      .remove([storagePath])

    if (error) {
      console.error('Error deleting from storage:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Storage deletion error:', error)
    return false
  }
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