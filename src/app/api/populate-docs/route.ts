import { NextResponse } from 'next/server'
import { documentProcessor } from '@/lib/document-processing'

export async function POST() {
  try {
    console.log('🚀 Starting document population...')
    
    await documentProcessor.populateInitialDocuments()
    
    return NextResponse.json({
      success: true,
      message: 'Initial tax documents populated successfully',
    })

  } catch (error) {
    console.error('Error populating documents:', error)
    return NextResponse.json(
      { error: 'Failed to populate initial documents' },
      { status: 500 }
    )
  }
} 