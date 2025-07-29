import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-direct'
import { generateEmbedding } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { query = "tax changes" } = await request.json()
    
    console.log('🧪 Testing vector search with query:', query)
    
    // Generate embedding for the test query
    const queryEmbedding = await generateEmbedding(query)
    console.log(`📐 Generated query embedding with ${queryEmbedding.length} dimensions`)
    
    // Test 1: Try the vector search function
    console.log('🔍 Testing vector search function...')
    const { data: vectorResults, error: vectorError } = await supabase.rpc('match_documents', {
      query_embedding: queryEmbedding,
      match_threshold: 0.1,
      match_count: 5
    })
    
    if (vectorError) {
      console.error('Vector search error:', vectorError)
    } else {
      console.log(`✅ Vector search found ${vectorResults?.length || 0} results`)
    }
    
    // Test 2: Get raw documents to check embedding format
    console.log('🔍 Checking raw documents...')
    const { data: rawDocs, error: rawError } = await supabase
      .from('documents')
      .select('id, embedding')
      .limit(3)
    
    if (rawError) {
      console.error('Raw docs error:', rawError)
    } else {
      console.log(`📋 Found ${rawDocs?.length || 0} raw documents`)
      if (rawDocs && rawDocs.length > 0) {
        rawDocs.forEach((doc, index) => {
          console.log(`  Doc ${index + 1}: embedding type = ${typeof doc.embedding}, isArray = ${Array.isArray(doc.embedding)}`)
        })
      }
    }
    
    // Test 3: Manual similarity calculation
    console.log('🔍 Testing manual similarity calculation...')
    const { data: allDocs, error: allError } = await supabase
      .from('documents')
      .select('*')
      .limit(5)
    
    if (allError) {
      console.error('All docs error:', allError)
    } else {
      console.log(`📋 Found ${allDocs?.length || 0} documents for manual test`)
      
      const manualResults = allDocs?.map(doc => {
        let docEmbedding: number[]
        
        if (Array.isArray(doc.embedding)) {
          docEmbedding = doc.embedding
        } else if (typeof doc.embedding === 'string') {
          try {
            docEmbedding = JSON.parse(doc.embedding)
          } catch {
            return null
          }
        } else {
          return null
        }
        
        // Simple cosine similarity
        const dotProduct = queryEmbedding.reduce((sum, val, i) => sum + val * docEmbedding[i], 0)
        const magnitudeA = Math.sqrt(queryEmbedding.reduce((sum, val) => sum + val * val, 0))
        const magnitudeB = Math.sqrt(docEmbedding.reduce((sum, val) => sum + val * val, 0))
        const similarity = dotProduct / (magnitudeA * magnitudeB)
        
        return {
          id: doc.id,
          similarity,
          content_preview: doc.content.substring(0, 100)
        }
      }).filter(result => result !== null)
      .sort((a, b) => b!.similarity - a!.similarity)
      .slice(0, 3)
      
      console.log('📊 Manual similarity results:', manualResults)
    }
    
    return NextResponse.json({
      message: 'Vector search test completed',
      vector_results: vectorResults?.length || 0,
      vector_error: vectorError?.message || null,
      raw_docs_count: rawDocs?.length || 0,
      manual_results: allDocs?.length || 0
    })
    
  } catch (error) {
    console.error('Vector test error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 