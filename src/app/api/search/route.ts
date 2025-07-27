import { NextRequest, NextResponse } from 'next/server'
import { searchContent, generateRAGResponse } from '@/lib/rag-search'

export async function POST(request: NextRequest) {
  try {
    const { query, options = {} } = await request.json()
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      )
    }

    // Search for relevant content
    const searchResults = await searchContent(query, options)
    
    // Generate RAG response
    const ragResponse = await generateRAGResponse(query, searchResults)
    
    return NextResponse.json({
      query,
      results: searchResults,
      response: ragResponse,
      totalResults: searchResults.length
    })
    
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error during search' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'RAG Search API',
      usage: 'POST with { query: string, options?: { matchThreshold?: number, matchCount?: number } }'
    }
  )
}