import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-direct'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing database contents...')
    
    // Get all documents
    const { data: documents, error } = await supabase
      .from('documents')
      .select('*')
      .limit(10)
    
    if (error) {
      console.error('Error fetching documents:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    if (!documents || documents.length === 0) {
      return NextResponse.json({
        message: 'No documents found in database',
        count: 0
      })
    }
    
    // Analyze the documents
    const analysis = documents.map((doc, index) => ({
      id: doc.id,
      content_length: doc.content?.length || 0,
      content_preview: doc.content?.substring(0, 100) + '...',
      metadata: doc.metadata,
      embedding_type: typeof doc.embedding,
      embedding_length: Array.isArray(doc.embedding) ? doc.embedding.length : 'Not an array',
      embedding_preview: Array.isArray(doc.embedding) ? 
        `[${doc.embedding.slice(0, 5).join(', ')}...]` : 
        String(doc.embedding).substring(0, 50) + '...'
    }))
    
    return NextResponse.json({
      message: 'Database test completed',
      total_documents: documents.length,
      documents: analysis
    })
    
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 