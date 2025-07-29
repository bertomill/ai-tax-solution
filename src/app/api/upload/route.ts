import { NextRequest, NextResponse } from 'next/server'
import { documentProcessor } from '@/lib/document-processing'
import { storeDocument } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type')
    
    // Handle text submission (JSON)
    if (contentType?.includes('application/json')) {
      const { text, title, userId } = await request.json()

      if (!text || !text.trim()) {
        return NextResponse.json(
          { error: 'No text content provided' },
          { status: 400 }
        )
      }

      if (!title || !title.trim()) {
        return NextResponse.json(
          { error: 'Document title is required' },
          { status: 400 }
        )
      }

      if (!userId) {
        return NextResponse.json(
          { error: 'User ID is required' },
          { status: 400 }
        )
      }

      // Validate text length (1MB limit)
      if (text.length > 1000000) {
        return NextResponse.json(
          { error: 'Text is too long. Maximum length is 1MB.' },
          { status: 400 }
        )
      }

      // Create a filename from the title
      const fileName = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`

      // Store text content as a file in Supabase storage
      const textBuffer = Buffer.from(text, 'utf-8')
      const storageResult = await storeDocument(
        textBuffer,
        fileName,
        userId || 'anonymous',
        'txt'
      )

      if (!storageResult.success) {
        return NextResponse.json(
          { error: `Failed to store document: ${storageResult.error}` },
          { status: 500 }
        )
      }

      // Process text as document
      const result = await documentProcessor.processTextDocument(
        text,
        fileName,
        title,
        userId,
        storageResult.storagePath
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
        fileName,
        fileType: 'txt',
        uploadedAt: new Date().toISOString(),
        totalChunks: result.chunksProcessed,
        storagePath: storageResult.storagePath,
      })
    }

    // Handle file upload (FormData)
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

    // Store original file in Supabase storage (bucket already exists)
    const storageResult = await storeDocument(
      buffer,
      file.name,
      userId || 'anonymous',
      fileExtension
    )

    if (!storageResult.success) {
      return NextResponse.json(
        { error: `Failed to store document: ${storageResult.error}` },
        { status: 500 }
      )
    }

    // Process document for search/embedding
    const result = await documentProcessor.processDocument(
      buffer,
      file.name,
      fileExtension,
      userId,
      storageResult.storagePath // Pass storage path to processor
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
      fileName: file.name,
      fileType: fileExtension,
      uploadedAt: new Date().toISOString(),
      totalChunks: result.chunksProcessed,
      storagePath: storageResult.storagePath,
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