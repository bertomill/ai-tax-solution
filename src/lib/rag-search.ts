import { generateEmbedding, generateChatCompletion } from './openai'
import { supabase } from './supabase-direct'

export interface SearchResult {
  id: string
  content: string
  metadata: {
    source: string
    section: string
    page_title?: string
    chunk_index: number
    total_chunks: number
    fileName?: string
    fileType?: string
    storagePath?: string
    uploadedAt?: string
    userId?: string
  }
  similarity: number
}

export async function searchContent(
  query: string,
  options: {
    matchThreshold?: number
    matchCount?: number
  } = {}
): Promise<SearchResult[]> {
  const { matchThreshold = 0.1, matchCount = 5 } = options // Lowered from 0.3 to 0.1

  try {
    console.log(`🔍 Searching for: "${query}"`)
    console.log(`📊 Search options: threshold=${matchThreshold}, count=${matchCount}`)
    
    // Generate embedding for the search query
    const queryEmbedding = await generateEmbedding(query)
    console.log(`📐 Generated query embedding with ${queryEmbedding.length} dimensions`)
    
    // Use Supabase's built-in vector similarity search
    const { data: documents, error } = await supabase.rpc('match_documents', {
      query_embedding: queryEmbedding,
      match_threshold: matchThreshold,
      match_count: matchCount
    })
    
    if (error) {
      console.error('Vector search error:', error)
      // Fallback to manual search if vector search fails
      return await fallbackSearch(query, queryEmbedding, options)
    }
    
    if (!documents || documents.length === 0) {
      console.log(`❌ No documents found in database`)
      // Let's check if there are any documents at all
      const { data: allDocs, error: countError } = await supabase
        .from('documents')
        .select('id, embedding')
        .limit(5)
      
      if (countError) {
        console.error('Error checking document count:', countError)
      } else {
        console.log(`📋 Total documents in database: ${allDocs?.length || 0}`)
        if (allDocs && allDocs.length > 0) {
          console.log('🔍 Sample document embedding type:', typeof allDocs[0].embedding)
          console.log('🔍 Sample document embedding length:', Array.isArray(allDocs[0].embedding) ? allDocs[0].embedding.length : 'Not an array')
        }
      }
      return []
    }
    
    // Transform the results to match our interface
    const results: SearchResult[] = documents.map((doc: {
      id: string
      content: string
      metadata: Record<string, unknown>
      similarity: number
    }) => ({
      id: doc.id,
      content: doc.content,
      metadata: {
        source: doc.metadata.source as string,
        section: doc.metadata.section as string || doc.metadata.fileName as string,
        page_title: doc.metadata.page_title as string,
        chunk_index: doc.metadata.chunkIndex as number || doc.metadata.chunk_index as number,
        total_chunks: doc.metadata.totalChunks as number || doc.metadata.total_chunks as number,
        fileName: doc.metadata.fileName as string,
        fileType: doc.metadata.fileType as string,
        storagePath: doc.metadata.storagePath as string,
        uploadedAt: doc.metadata.uploadedAt as string,
        userId: doc.metadata.userId as string
      },
      similarity: doc.similarity
    }))
    
    console.log(`📊 Found ${results.length} relevant results`)
    results.forEach((result, index) => {
      console.log(`  ${index + 1}. Similarity: ${(result.similarity * 100).toFixed(1)}%, Source: ${result.metadata.source}, Section: ${result.metadata.section}`)
    })
    
    return results
    
  } catch (error) {
    console.error('❌ Error during search:', error)
    // Try fallback search
    try {
      const queryEmbedding = await generateEmbedding(query)
      return await fallbackSearch(query, queryEmbedding, options)
    } catch (fallbackError) {
      console.error('❌ Fallback search also failed:', fallbackError)
      throw error
    }
  }
}

// Fallback search using manual cosine similarity
async function fallbackSearch(
  query: string,
  queryEmbedding: number[],
  options: { matchThreshold?: number; matchCount?: number }
): Promise<SearchResult[]> {
  const { matchThreshold = 0.1, matchCount = 5 } = options // Lowered from 0.3 to 0.1
  
  console.log('🔄 Using fallback search method...')
  
  // Get all documents from database
  const { data: documents, error } = await supabase
    .from('documents')
    .select('*')
  
  if (error) {
    console.error('Error fetching documents for fallback search:', error)
    throw error
  }
  
  if (!documents || documents.length === 0) {
    console.log(`❌ No documents found in database`)
    return []
  }
  
  console.log(`📋 Found ${documents.length} total documents for fallback search`)
  
  // Calculate similarity scores manually
  const results: SearchResult[] = []
  
  for (const doc of documents) {
    let docEmbedding: number[]
    
    // Handle different embedding formats
    if (typeof doc.embedding === 'string') {
      try {
        // Try parsing as JSON array first
        docEmbedding = JSON.parse(doc.embedding)
      } catch {
        // If that fails, try parsing as bracket notation
        const match = doc.embedding.match(/\[([^\]]+)\]/)
        if (match) {
          docEmbedding = match[1].split(',').map(Number)
        } else {
          console.warn('Could not parse embedding for document:', doc.id)
          continue
        }
      }
    } else if (Array.isArray(doc.embedding)) {
      docEmbedding = doc.embedding
    } else {
      console.warn('Invalid embedding format for document:', doc.id, 'Type:', typeof doc.embedding)
      continue
    }
    
    // Ensure embeddings have the same length
    if (docEmbedding.length !== queryEmbedding.length) {
      console.warn('Embedding length mismatch for document:', doc.id, 'Expected:', queryEmbedding.length, 'Got:', docEmbedding.length)
      continue
    }
    
    const similarity = cosineSimilarity(queryEmbedding, docEmbedding)
    
    if (similarity >= matchThreshold) {
      results.push({
        id: doc.id,
        content: doc.content,
        metadata: {
          source: doc.metadata.source as string,
          section: doc.metadata.section as string || doc.metadata.fileName as string,
          page_title: doc.metadata.page_title as string | undefined,
          chunk_index: doc.metadata.chunkIndex as number || doc.metadata.chunk_index as number,
          total_chunks: doc.metadata.totalChunks as number || doc.metadata.total_chunks as number,
          fileName: doc.metadata.fileName as string | undefined,
          fileType: doc.metadata.fileType as string | undefined,
          storagePath: doc.metadata.storagePath as string | undefined,
          uploadedAt: doc.metadata.uploadedAt as string | undefined,
          userId: doc.metadata.userId as string | undefined
        },
        similarity
      })
    }
  }
  
  // Sort by similarity and limit results
  results.sort((a, b) => b.similarity - a.similarity)
  const limitedResults = results.slice(0, matchCount)
  
  console.log(`📊 Found ${limitedResults.length} relevant results (fallback)`)
  limitedResults.forEach((result, index) => {
    console.log(`  ${index + 1}. Similarity: ${(result.similarity * 100).toFixed(1)}%, Source: ${result.metadata.source}, Section: ${result.metadata.section}`)
  })
  
  return limitedResults
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}

export function formatSearchResults(results: SearchResult[]): string {
  if (results.length === 0) {
    return "No relevant information found."
  }

  return results
    .map((result, index) => {
      const { metadata, content, similarity } = result
      const fileName = metadata.fileName || metadata.source
      return `
**Result ${index + 1}** (Relevance: ${(similarity * 100).toFixed(1)}%)
*Source: ${fileName} - ${metadata.section || 'General'}*

${content}

---`
    })
    .join('\n')
}

export async function ragSearch(
  query: string,
  options: {
    matchThreshold?: number
    matchCount?: number
  } = {}
): Promise<{ results: SearchResult[], response: string, totalResults: number, query: string }> {
  try {
    // Perform the search
    const results = await searchContent(query, options)
    
    // Generate the AI response
    const response = await generateRAGResponse(query, results)
    
    return {
      results,
      response,
      totalResults: results.length,
      query
    }
  } catch (error) {
    console.error('Error in ragSearch:', error)
    throw error
  }
}

export async function generateRAGResponse(
  query: string,
  context: SearchResult[]
): Promise<string> {
  try {
    // Format the context from search results
    const relevantContent = context
      .map((result, index) => {
        const { metadata, content, similarity } = result
        const fileName = metadata.fileName || metadata.source
        return `**Source ${index + 1}** (Relevance: ${(similarity * 100).toFixed(1)}%)
From: ${fileName} - ${metadata.section || 'General'}
Content: ${content}`
      })
      .join('\n\n')

    // Generate AI response using OpenAI
    const response = await generateChatCompletion(query, relevantContent)
    
    return response
  } catch (error) {
    console.error('Error generating RAG response:', error)
    
    // Fallback to basic template if OpenAI fails
    if (context.length > 0) {
      const relevantContent = context
        .map(result => {
          const fileName = result.metadata.fileName || result.metadata.source
          return `From "${fileName} - ${result.metadata.section || 'General'}": ${result.content}`
        })
        .join('\n\n')
      
      return `Based on the available information:

${relevantContent}

The most relevant sources are: ${context.map(r => {
  const fileName = r.metadata.fileName || r.metadata.source
  return `${fileName} - ${r.metadata.section || 'General'}`
}).join(', ')}.`
    } else {
      return 'I could not find specific information related to your query in the available content. Please try rephrasing your question or adding more context.'
    }
  }
}