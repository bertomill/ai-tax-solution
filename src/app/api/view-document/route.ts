import { NextRequest, NextResponse } from 'next/server'
import { getDocumentUrl } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const storagePath = searchParams.get('storagePath')
    const userId = searchParams.get('userId')

    if (!storagePath) {
      return NextResponse.json(
        { error: 'Storage path is required' },
        { status: 400 }
      )
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Verify the user has access to this document (basic security check)
    if (!storagePath.startsWith(userId + '/')) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    // Get signed URL for the document
    const signedUrl = await getDocumentUrl(storagePath)

    if (!signedUrl) {
      return NextResponse.json(
        { error: 'Document not found or access denied' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      documentUrl: signedUrl,
    })

  } catch (error) {
    console.error('View document error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 