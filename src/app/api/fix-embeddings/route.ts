import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-direct'

export async function POST(request: NextRequest) {
  try {
    console.log('🔧 Starting embedding format fix...')
    
    // Get all documents with string embeddings
    const { data: documents, error } = await supabase
      .from('documents')
      .select('*')
    
    if (error) {
      console.error('Error fetching documents:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    if (!documents || documents.length === 0) {
      return NextResponse.json({
        message: 'No documents found to fix',
        fixed: 0
      })
    }
    
    console.log(`📋 Found ${documents.length} documents to process`)
    
    let fixedCount = 0
    let errorCount = 0
    
    // Process each document
    for (const doc of documents) {
      try {
        // Check if embedding is already an array
        if (Array.isArray(doc.embedding)) {
          console.log(`✅ Document ${doc.id} already has array embedding`)
          continue
        }
        
        // Convert string embedding to array
        let embeddingArray: number[]
        
        if (typeof doc.embedding === 'string') {
          try {
            // Try parsing as JSON array first
            embeddingArray = JSON.parse(doc.embedding)
          } catch {
            // If that fails, try parsing as bracket notation
            const match = doc.embedding.match(/\[([^\]]+)\]/)
            if (match) {
              embeddingArray = match[1].split(',').map(Number)
            } else {
              console.warn(`⚠️ Could not parse embedding for document ${doc.id}`)
              errorCount++
              continue
            }
          }
        } else {
          console.warn(`⚠️ Invalid embedding type for document ${doc.id}: ${typeof doc.embedding}`)
          errorCount++
          continue
        }
        
        // Validate the array
        if (!Array.isArray(embeddingArray) || embeddingArray.length !== 1536) {
          console.warn(`⚠️ Invalid embedding array for document ${doc.id}: length ${embeddingArray.length}`)
          errorCount++
          continue
        }
        
        // Update the document with the array embedding
        const { error: updateError } = await supabase
          .from('documents')
          .update({ embedding: embeddingArray })
          .eq('id', doc.id)
        
        if (updateError) {
          console.error(`❌ Error updating document ${doc.id}:`, updateError)
          errorCount++
        } else {
          console.log(`✅ Fixed embedding for document ${doc.id}`)
          fixedCount++
        }
        
      } catch (docError) {
        console.error(`❌ Error processing document ${doc.id}:`, docError)
        errorCount++
      }
    }
    
    return NextResponse.json({
      message: 'Embedding format fix completed',
      total_documents: documents.length,
      fixed: fixedCount,
      errors: errorCount,
      skipped: documents.length - fixedCount - errorCount
    })
    
  } catch (error) {
    console.error('Embedding fix error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 