import { generateEmbedding } from './openai'
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
  }
  similarity: number
}

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}

export async function searchContent(
  query: string,
  options: {
    matchThreshold?: number
    matchCount?: number
  } = {}
): Promise<SearchResult[]> {
  const { matchThreshold = 0.7, matchCount = 5 } = options

  try {
    console.log(`🔍 Searching for: "${query}"`)
    
    // Generate embedding for the search query
    const queryEmbedding = await generateEmbedding(query)
    
    // Get all documents from database
    const { data: documents, error } = await supabase
      .from('documents')
      .select('*')
    
    if (error) {
      throw error
    }
    
    // Calculate similarity scores
    const results = (documents || [])
      .map(doc => {
        const docEmbedding = JSON.parse(doc.embedding || '[]')
        const similarity = cosineSimilarity(queryEmbedding, docEmbedding)
        
        return {
          id: doc.id,
          content: doc.content,
          metadata: doc.metadata as {
            source: string
            section: string
            page_title?: string
            chunk_index: number
            total_chunks: number
          },
          similarity
        }
      })
      .filter(result => result.similarity >= matchThreshold)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, matchCount)
    
    console.log(`📊 Found ${results.length} relevant results`)
    
    return results
    
  } catch (error) {
    console.error('❌ Error during search:', error)
    throw error
  }
}

export function formatSearchResults(results: SearchResult[]): string {
  if (results.length === 0) {
    return "No relevant information found."
  }

  return results
    .map((result, index) => {
      const { metadata, content, similarity } = result
      return `
**Result ${index + 1}** (Relevance: ${(similarity * 100).toFixed(1)}%)
*Section: ${metadata.section}*

${content}

---`
    })
    .join('\n')
}

export async function generateRAGResponse(
  query: string,
  context: SearchResult[]
): Promise<string> {
  // This is a simple template-based response
  // In a full implementation, you'd use OpenAI's completion API
  
  const relevantContent = context
    .map(result => `From "${result.metadata.section}": ${result.content}`)
    .join('\n\n')
  
  return `Based on the available information about the AI Tax Use Cases whiteboarding interview:

**Query:** ${query}

**Relevant Information:**
${relevantContent}

**Summary:**
${context.length > 0 
  ? `The information above addresses your question about ${query}. The most relevant sections are: ${context.map(r => r.metadata.section).join(', ')}.`
  : 'I could not find specific information related to your query in the available content.'
}`
}