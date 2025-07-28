import { NextRequest, NextResponse } from 'next/server'
import { PDFExtractionTester } from '@/lib/test-pdf-extraction'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    
    if (fileExtension !== 'pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported for testing' },
        { status: 400 }
      )
    }

    // Convert to buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    
    console.log(`Testing PDF extraction for: ${file.name}`)
    console.log(`File size: ${buffer.length} bytes`)

    // Test the extraction and save to files
    const extractedText = await PDFExtractionTester.testManualExtraction(buffer, file.name)
    
    return NextResponse.json({
      success: true,
      message: `PDF text extraction test completed for ${file.name}`,
      extractedLength: extractedText.length,
      preview: extractedText.substring(0, 500) + (extractedText.length > 500 ? '...' : ''),
      filesCreated: [
        `extracted-raw-${file.name}.txt`,
        `extracted-processed-${file.name}.txt`, 
        `extracted-cleaned-${file.name}.txt`
      ]
    })

  } catch (error) {
    console.error('PDF test error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}