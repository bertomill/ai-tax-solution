import { NextResponse } from 'next/server'
import { testPopulateDatabase, addSampleTaxContent } from '@/lib/test-populate'

export async function POST() {
  try {
    const result = await testPopulateDatabase()
    
    return NextResponse.json({
      success: true,
      message: `Successfully populated database with ${result?.length || 0} documents`,
      documentsCount: result?.length || 0
    })
    
  } catch (error) {
    console.error('Populate API error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to populate database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Database Population API',
    usage: 'POST to populate the database with website content and embeddings'
  })
}

// New endpoint to add sample tax content
export async function PUT() {
  try {
    const result = await addSampleTaxContent()
    
    return NextResponse.json({
      success: true,
      message: `Successfully added ${result?.length || 0} sample tax documents`,
      documentsCount: result?.length || 0
    })
    
  } catch (error) {
    console.error('Sample content API error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to add sample content',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}