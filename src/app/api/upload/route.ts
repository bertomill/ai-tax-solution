import { NextRequest, NextResponse } from 'next/server'
import { documentProcessor } from '@/lib/document-processing'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const userId = formData.get('userId') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['pdf', 'docx', 'doc', 'txt', 'md']
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    
    if (!fileExtension || !allowedTypes.includes(fileExtension)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload PDF, DOCX, DOC, TXT, or MD files.' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 10MB.' },
        { status: 400 }
      )
    }

    // Convert to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Process document
    const result = await documentProcessor.processDocument(
      buffer,
      file.name,
      fileExtension,
      userId
    )

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${result.chunksProcessed} chunks`,
      documentId: result.documentId,
      chunksProcessed: result.chunksProcessed,
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const documents = await documentProcessor.getUserDocuments(userId)

    return NextResponse.json({
      success: true,
      documents,
    })

  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { fileName, userId } = await request.json()

    if (!fileName) {
      return NextResponse.json(
        { error: 'File name required' },
        { status: 400 }
      )
    }

    const success = await documentProcessor.deleteDocument(fileName, userId)

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete document' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Document deleted successfully',
    })

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 