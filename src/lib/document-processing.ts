import OpenAI from 'openai'
import { supabase } from './supabase-direct'

// Initialize OpenAI client with validation
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface DocumentChunk {
  content: string
  metadata: {
    source: string
    fileName: string
    chunkIndex: number
    totalChunks: number
    fileType: string
    uploadedAt: string
    userId?: string
    section?: string
    category?: string
    storagePath?: string
  }
}

export interface ProcessingResult {
  success: boolean
  documentId?: string
  chunksProcessed?: number
  error?: string
}

/**
 * Smart text chunker that respects sentence boundaries and semantic meaning
 */
class SmartChunker {
  private chunkSize: number
  private overlap: number

  constructor(chunkSize = 1000, overlap = 200) {
    this.chunkSize = chunkSize
    this.overlap = overlap
  }

  chunk(text: string): string[] {
    // Clean and normalize text
    const cleanText = text.replace(/\s+/g, ' ').trim()
    
    if (cleanText.length <= this.chunkSize) {
      return [cleanText]
    }

    const chunks: string[] = []
    const sentences = this.splitIntoSentences(cleanText)
    
    let currentChunk = ''
    let currentSize = 0

    for (const sentence of sentences) {
      const sentenceLength = sentence.length

      // If adding this sentence would exceed chunk size
      if (currentSize + sentenceLength > this.chunkSize && currentChunk) {
        chunks.push(currentChunk.trim())
        
        // Start new chunk with overlap from previous chunk
        const overlapText = this.getOverlapText(currentChunk, this.overlap)
        currentChunk = overlapText + sentence
        currentSize = currentChunk.length
      } else {
        currentChunk += sentence
        currentSize += sentenceLength
      }
    }

    // Add the last chunk
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim())
    }

    return chunks.filter(chunk => chunk.length > 50) // Filter very short chunks
  }

  private splitIntoSentences(text: string): string[] {
    // Split on sentence endings but preserve the punctuation
    return text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0)
  }

  private getOverlapText(text: string, overlapSize: number): string {
    if (text.length <= overlapSize) return text + ' '
    
    const overlap = text.slice(-overlapSize)
    const lastSentenceStart = overlap.lastIndexOf('. ')
    
    if (lastSentenceStart > 0) {
      return overlap.slice(lastSentenceStart + 2) + ' '
    }
    
    return overlap + ' '
  }
}

/**
 * Enhanced document processor
 */
export class DocumentProcessor {
  private chunker: SmartChunker

  constructor() {
    this.chunker = new SmartChunker(1000, 200)
  }

  /**
   * Process pasted text content and store in Supabase
   */
  async processTextDocument(
    text: string,
    fileName: string,
    title: string,
    userId?: string,
    storagePath?: string
  ): Promise<ProcessingResult> {
    try {
      console.log(`Processing text document: ${title}`)

      // Validate environment
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OpenAI API key is not configured')
      }

      // Validate and clean text
      if (!text || text.trim().length === 0) {
        return {
          success: false,
          error: 'No content provided'
        }
      }

      const cleanedText = this.cleanText(text)
      if (!this.isValidTextChunk(cleanedText)) {
        return {
          success: false,
          error: 'Text content is not valid or contains too much corrupted data'
        }
      }

      console.log(`Processing ${cleanedText.length} characters of text`)

      // Smart chunking
      const chunks = this.chunker.chunk(cleanedText)
      console.log(`Text split into ${chunks.length} chunks`)

      if (chunks.length === 0) {
        return {
          success: false,
          error: 'Text could not be chunked properly'
        }
      }

      // Generate embeddings in batches
      const embeddings = await this.generateEmbeddings(chunks)

      // Store in Supabase with retry logic
      const insertPromises = chunks.map(async (chunk, index) => {
        const metadata: DocumentChunk['metadata'] = {
          source: 'user_text',
          fileName,
          chunkIndex: index,
          totalChunks: chunks.length,
          fileType: 'txt',
          uploadedAt: new Date().toISOString(),
          userId,
          category: 'pasted_text',
          section: title,
          storagePath,
        }

        // Retry logic for network issues
        let retries = 3
        while (retries > 0) {
          try {
            const { data, error } = await supabase
              .from('documents')
              .insert({
                content: chunk,
                metadata,
                embedding: `[${embeddings[index].join(',')}]`
              })
              .select('id')

            if (error) {
              console.error('Error inserting chunk:', error)
              throw error
            }

            return data[0]?.id
          } catch (error) {
            retries--
            if (retries === 0) throw error
            
            console.log(`Retrying chunk ${index} insert (${3 - retries}/3)`)
            await new Promise(resolve => setTimeout(resolve, 1000))
          }
        }
      })

      const results = await Promise.all(insertPromises)
      
      console.log(`Successfully processed ${results.length} chunks for text: ${title}`)

      return {
        success: true,
        documentId: results[0],
        chunksProcessed: results.length
      }

    } catch (error) {
      console.error('Text document processing error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  /**
   * Process a document file and store in Supabase
   */
  async processDocument(
    buffer: Buffer,
    fileName: string,
    fileType: string,
    userId?: string,
    storagePath?: string
  ): Promise<ProcessingResult> {
    try {
      console.log(`Processing document: ${fileName} (${fileType})`)

      // Validate environment
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OpenAI API key is not configured')
      }

      // 1. Extract text based on file type
      const extractedText = await this.extractText(buffer, fileName, fileType)
      
      if (!extractedText || extractedText.trim().length === 0) {
        return {
          success: false,
          error: 'No content could be extracted from document'
        }
      }

      console.log(`Extracted ${extractedText.length} characters from ${fileName}`)

      // 2. Smart chunking
      const chunks = this.chunker.chunk(extractedText)
      console.log(`Document split into ${chunks.length} chunks`)

      if (chunks.length === 0) {
        return {
          success: false,
          error: 'Document could not be chunked properly'
        }
      }

      // 3. Generate embeddings in batches
      const embeddings = await this.generateEmbeddings(chunks)

      // 4. Store in Supabase with retry logic
      const insertPromises = chunks.map(async (chunk, index) => {
        const metadata: DocumentChunk['metadata'] = {
          source: 'user_upload',
          fileName,
          chunkIndex: index,
          totalChunks: chunks.length,
          fileType,
          uploadedAt: new Date().toISOString(),
          userId,
          storagePath,
        }

        // Retry logic for network issues
        let retries = 3
        while (retries > 0) {
          try {
            const { data, error } = await supabase
              .from('documents')
              .insert({
                content: chunk,
                metadata,
                embedding: `[${embeddings[index].join(',')}]`
              })
              .select('id')

            if (error) {
              console.error('Error inserting chunk:', error)
              throw error
            }

            return data[0]?.id
          } catch (error) {
            retries--
            if (retries === 0) throw error
            
            console.log(`Retrying chunk ${index} insert (${3 - retries}/3)`)
            await new Promise(resolve => setTimeout(resolve, 1000))
          }
        }
      })

      const results = await Promise.all(insertPromises)
      
      console.log(`Successfully processed ${results.length} chunks`)

      return {
        success: true,
        documentId: results[0],
        chunksProcessed: results.length
      }

    } catch (error) {
      console.error('Document processing error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  /**
   * Extract text content from various file types
   */
  private async extractText(buffer: Buffer, fileName: string, fileType: string): Promise<string> {
    console.log(`Extracting text from ${fileType} file: ${fileName}`)
    
    try {
      switch (fileType.toLowerCase()) {
        case 'pdf': {
          return await this.extractPdfText(buffer, fileName)
        }
        
        case 'docx':
        case 'doc': {
          console.log('Using mammoth for Word document extraction')
          try {
            const mammoth = (await import('mammoth')).default
            const result = await mammoth.extractRawText({ buffer })
            return this.cleanText(result.value)
          } catch (docError) {
            console.log('Word document parsing failed:', docError)
            // Fallback to raw text extraction
            const text = buffer.toString('utf8')
            return this.cleanText(text)
          }
        }
        
        case 'txt':
        case 'md':
        case 'markdown': {
          const text = buffer.toString('utf8')
          return this.cleanText(text)
        }
        
        default:
          throw new Error(`Unsupported file type: ${fileType}`)
      }
    } catch (error) {
      console.error(`Error extracting text from ${fileName}:`, error)
      throw new Error(`Failed to extract text from ${fileName}: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Advanced PDF text extraction with multiple fallback strategies
   * Handles encrypted/protected PDFs
   */
  private async extractPdfText(buffer: Buffer, fileName: string): Promise<string> {
    console.log(`Starting PDF text extraction for: ${fileName}`)
    
    // Strategy 1: Try LlamaParse (best for complex/encrypted PDFs)
    if (process.env.LLAMA_CLOUD_API_KEY) {
      try {
        console.log('Attempting LlamaParse extraction')
        const { LlamaParse } = await import('llama-parse')
        
        const parser = new LlamaParse({
          apiKey: process.env.LLAMA_CLOUD_API_KEY
        })
        
        // Create a File object from the buffer
        const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
        const file = new File([arrayBuffer as ArrayBuffer], fileName, { type: 'application/pdf' })
        
        console.log(`Parsing PDF with LlamaParse: ${fileName}`)
        const result = await parser.parseFile(file)
        
        if (result && result.markdown && result.markdown.trim().length > 100) {
          console.log(`LlamaParse extraction successful: ${result.markdown.length} characters`)
          return this.cleanText(result.markdown)
        } else {
          console.log('LlamaParse returned insufficient content')
        }
      } catch (llamaError) {
        console.log('LlamaParse extraction failed:', llamaError)
      }
    } else {
      console.log('Skipping LlamaParse: LLAMA_CLOUD_API_KEY not configured')
    }

    // Strategy 2: Try pdfjs-dist (Mozilla's PDF.js) with proper implementation
    try {
      console.log('Attempting pdfjs-dist extraction')
      const pdfjsLib = await import('pdfjs-dist')
      
      // Load the PDF document using ArrayBuffer
      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(buffer),
        verbosity: 0, // Suppress console logs
        standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
        cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
        cMapPacked: true
      })
      
      const pdf = await loadingTask.promise
      let fullText = ''
      
      console.log(`PDF has ${pdf.numPages} pages`)
      
      // Extract text from each page (limit to 50 pages for performance)
      for (let pageNum = 1; pageNum <= Math.min(pdf.numPages, 50); pageNum++) {
        try {
          const page = await pdf.getPage(pageNum)
          const textContent = await page.getTextContent()
          
          const pageText = textContent.items
            .map((item: { str?: string } | unknown) => {
              if (item && typeof item === 'object' && 'str' in item && typeof item.str === 'string') {
                return item.str
              }
              return ''
            })
            .join(' ')
          
          if (pageText.trim()) {
            fullText += `${pageText}\n`
            console.log(`Page ${pageNum}: extracted ${pageText.length} characters`)
          }
        } catch (pageError) {
          console.log(`Error processing page ${pageNum}:`, pageError)
        }
      }
      
      if (fullText.trim().length > 100) {
        console.log(`pdfjs-dist extraction successful: ${fullText.length} characters`)
        return this.cleanText(fullText)
      } else {
        console.log('pdfjs-dist extracted insufficient text content')
      }
    } catch (pdfjsError) {
      console.log('pdfjs-dist extraction failed:', pdfjsError)
    }

    // Strategy 3: Try enhanced pdf-parse with better options
    try {
      console.log('Attempting enhanced pdf-parse extraction')
      // Use dynamic import with error handling
      const pdfParseModule = await import('pdf-parse')
      const pdfParse = pdfParseModule.default
      const data = await pdfParse(buffer, {
        max: 0 // Parse all pages
      })
      
      if (data.text && data.text.trim().length > 50 && this.isValidTextChunk(data.text)) {
        console.log(`Enhanced pdf-parse extraction successful: ${data.text.length} characters`)
        return this.cleanText(data.text)
      }
    } catch (parseError) {
      console.log('Enhanced pdf-parse extraction failed:', parseError)
    }

    // Strategy 4: Try basic pdf-parse (fallback)
    try {
      console.log('Attempting basic pdf-parse extraction (fallback)')
      const pdfParseModule = await import('pdf-parse')
      const pdfParse = pdfParseModule.default
      const data = await pdfParse(buffer)
      
      if (data.text && data.text.trim().length > 20) {
        const cleanedText = this.cleanText(data.text)
        if (this.isValidTextChunk(cleanedText)) {
          console.log(`Basic pdf-parse extraction successful: ${cleanedText.length} characters`)
          return cleanedText
        }
      }
    } catch (parseError) {
      console.log('Basic pdf-parse extraction failed:', parseError)
    }

    // Strategy 5: Try pdf-text-reader with Promise polyfill
    try {
      console.log('Attempting pdf-text-reader extraction')
      
      // Polyfill Promise.withResolvers if not available
      if (!Promise.withResolvers) {
        Promise.withResolvers = function<T>() {
          let resolve: (value: T | PromiseLike<T>) => void
          let reject: (reason?: unknown) => void
          const promise = new Promise<T>((res, rej) => {
            resolve = res
            reject = rej
          })
          return { promise, resolve: resolve!, reject: reject! }
        }
      }
      
      const { readPdfText } = await import('pdf-text-reader')
      const text = await readPdfText({ data: new Uint8Array(buffer) })
      
      if (text && text.trim().length > 20) {
        const cleanedText = this.cleanText(text)
        if (this.isValidTextChunk(cleanedText)) {
          console.log(`pdf-text-reader extraction successful: ${cleanedText.length} characters`)
          return cleanedText
        }
      }
    } catch (readerError) {
      console.log('pdf-text-reader extraction failed:', readerError)
    }

    // Strategy 6: Manual buffer analysis with better validation (last resort)
    try {
      console.log('Attempting manual text extraction from PDF buffer')
      const text = this.extractTextFromPdfBuffer(buffer.toString('utf8'))
      if (text && text.trim().length > 20) {
        const cleanedText = this.cleanText(text)
        if (this.isValidTextChunk(cleanedText)) {
          console.log(`Manual extraction found ${cleanedText.length} characters`)
          return cleanedText
        }
      }
    } catch (manualError) {
      console.log('Manual extraction failed:', manualError)
    }

    // Final check: if we got here, the PDF is likely encrypted or protected
    console.error(`All PDF extraction methods failed for ${fileName}`)
    console.error('This PDF appears to be:')
    console.error('- Encrypted/password protected')
    console.error('- Contains only scanned images (requires OCR)')
    console.error('- Corrupted or has proprietary formatting')
    
    throw new Error(`Unable to extract text from ${fileName}. This PDF appears to be encrypted, password-protected, or contains only scanned images. Please provide a text-based, unprotected PDF.`)
  }

  /**
   * Advanced text cleaning optimized for PDF extraction issues
   */
  private cleanText(text: string): string {
    if (!text) return ''
    
    return text
      // Remove null characters and control characters that break databases
      .replace(/\u0000/g, '')
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
      
      // Remove PDF-specific corruption markers
      .replace(/Adobe Identity/gi, '')
      .replace(/Skia\/PDF.*?Renderer/gi, '')
      .replace(/Google Docs Renderer/gi, '')
      
      // Clean up URL corruption (common in PDF exports)
      .replace(/https?:\/\/[^\s]{200,}/g, '[URL]')
      .replace(/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g, '[EMAIL]')
      
      // Fix common PDF text extraction issues
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between joined words
      .replace(/(\d)([A-Za-z])/g, '$1 $2') // Space between numbers and letters
      .replace(/([A-Za-z])(\d)/g, '$1 $2') // Space between letters and numbers
      
      // Remove binary/corrupted character sequences
      .replace(/[^\x20-\x7E\s\u00A0-\uFFFF]/g, ' ')
      
      // Clean up excessive special characters
      .replace(/[^\w\s\-_.,;:!?()\[\]{}@#$%&*+=<>'"\/\\|~`]/g, ' ')
      
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n\s*\n/g, '\n\n') // Max 2 consecutive newlines
      
      // Remove corrupted lines (mostly special characters)
      .split('\n')
      .filter(line => {
        const cleanLine = line.trim()
        if (cleanLine.length < 3) return true // Keep short lines
        
        // Check if line has reasonable text content
        const alphanumericCount = (cleanLine.match(/[a-zA-Z0-9]/g) || []).length
        const totalLength = cleanLine.length
        
        // Keep lines that are at least 30% alphanumeric
        return alphanumericCount / totalLength >= 0.3
      })
      .join('\n')
      
      // Final cleanup
      .trim()
  }

  /**
   * Enhanced fallback PDF text extraction
   */
  private extractTextFromPdfBuffer(text: string): string {
    // Multiple extraction strategies for corrupted PDFs
    
    // Strategy 1: Extract text from parentheses (common PDF structure)
    const parenthesesMatches = text.match(/\(([^)]{3,})\)/g)
    if (parenthesesMatches && parenthesesMatches.length > 5) {
      const extracted = parenthesesMatches
        .map(match => match.slice(1, -1)) // Remove parentheses
        .filter(content => content.length > 3 && /[a-zA-Z]/.test(content))
        .join(' ')
      
      if (extracted.length > 100) {
        return extracted
      }
    }
    
    // Strategy 2: Look for readable text blocks
    const textBlocks = text.match(/[A-Za-z][A-Za-z0-9\s.,!?]{10,}/g)
    if (textBlocks && textBlocks.length > 0) {
      return textBlocks.join(' ')
    }
    
    // Strategy 3: Extract any sequences of readable characters
    const readableChars = text.match(/[A-Za-z0-9\s.,!?;:'"()-]{5,}/g)
    if (readableChars) {
      return readableChars
        .filter(chunk => /[A-Za-z]/.test(chunk)) // Must contain letters
        .join(' ')
    }
    
    // Final fallback: cleaned raw text
    return text.replace(/[^\w\s.,!?-]/g, ' ').replace(/\s+/g, ' ')
  }

  /**
   * Generate embeddings in batches to handle rate limits
   */
  private async generateEmbeddings(texts: string[]): Promise<number[][]> {
    console.log(`Generating embeddings for ${texts.length} text chunks`)
    
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured')
    }

    // Validate text quality before embedding
    const validTexts = texts.filter(text => this.isValidTextForEmbedding(text))
    
    if (validTexts.length === 0) {
      throw new Error('No valid text found for embedding generation')
    }

    if (validTexts.length < texts.length) {
      console.warn(`Filtered out ${texts.length - validTexts.length} invalid text chunks`)
    }

    const batchSize = 20 // Reduced batch size for better reliability
    const embeddings: number[][] = []

    for (let i = 0; i < validTexts.length; i += batchSize) {
      const batch = validTexts.slice(i, i + batchSize)
      console.log(`Processing embedding batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(validTexts.length/batchSize)}`)
      
      try {
        const response = await openai.embeddings.create({
          model: 'text-embedding-3-large', // Upgraded model
          input: batch,
          encoding_format: 'float',
          dimensions: 1536, // Match existing Supabase database schema
        })

        if (!response.data || response.data.length === 0) {
          throw new Error('No embeddings returned from OpenAI')
        }

        embeddings.push(...response.data.map(d => d.embedding))
        
        // Small delay between batches to respect rate limits
        if (i + batchSize < validTexts.length) {
          await new Promise(resolve => setTimeout(resolve, 200))
        }
      } catch (error) {
        console.error('Error generating embeddings for batch:', error)
        if (error instanceof Error && error.message.includes('API key')) {
          throw new Error('Invalid OpenAI API key or quota exceeded')
        }
        throw error
      }
    }

    console.log(`Successfully generated ${embeddings.length} embeddings`)
    return embeddings
  }

  /**
   * Validate text quality before embedding
   */
  private isValidTextForEmbedding(text: string): boolean {
    if (!text || text.trim().length < 10) {
      return false
    }

    // Check for reasonable ratio of printable characters
    const printableChars = text.match(/[a-zA-Z0-9\s.,!?;:'"()\-]/g)?.length || 0
    const totalChars = text.length
    const printableRatio = printableChars / totalChars

    // Require at least 70% printable characters
    if (printableRatio < 0.7) {
      console.warn(`Text rejected: low printable ratio ${printableRatio.toFixed(2)}`)
      return false
    }

    // Check for excessive random characters (binary data indicators)
    const binaryIndicators = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]|[^\x20-\x7E\s\u00A0-\uFFFF]/g
    const binaryMatches = text.match(binaryIndicators)?.length || 0
    
    if (binaryMatches > text.length * 0.1) {
      console.warn(`Text rejected: too many binary characters ${binaryMatches}/${text.length}`)
      return false
    }

    // Check for minimum meaningful content
    const words = text.split(/\s+/).filter(word => word.length > 2)
    if (words.length < 3) {
      console.warn(`Text rejected: insufficient meaningful words`)
      return false
    }

    return true
  }

  /**
   * Validate if a text chunk is meaningful before processing
   */
  private isValidTextChunk(text: string): boolean {
    if (!text || text.trim().length < 10) {
      return false
    }

    // Check for reasonable ratio of printable characters
    const printableChars = text.match(/[a-zA-Z0-9\s.,!?;:'"()\-]/g)?.length || 0
    const totalChars = text.length
    const printableRatio = printableChars / totalChars

    // Require at least 60% printable characters (more lenient than embedding validation)
    if (printableRatio < 0.6) {
      return false
    }

    // Check for excessive binary/corrupted data indicators
    const binaryIndicators = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g
    const binaryMatches = text.match(binaryIndicators)?.length || 0
    
    if (binaryMatches > text.length * 0.15) {
      return false
    }

    // Check for minimum meaningful content
    const words = text.split(/\s+/).filter(word => word.length > 1)
    if (words.length < 2) {
      return false
    }

    return true
  }

  /**
   * Pre-populate database with sample tax documents
   */
  async populateInitialDocuments(): Promise<void> {
    try {
      // Check if we already have system documents
      const { data: existing } = await supabase
        .from('documents')
        .select('id')
        .eq('metadata->source', 'system')
        .limit(1)

      if (existing && existing.length > 0) {
        console.log('System documents already exist, skipping population')
        return
      }

      // Validate OpenAI API key before processing
      if (!process.env.OPENAI_API_KEY) {
        console.error('OpenAI API key is not configured, skipping document population')
        return
      }

      const sampleDocuments = [
        {
          content: `# Tax Interview Preparation Guide

## Overview
This comprehensive guide covers everything you need to know about the tax professional interview process, including format expectations, evaluation criteria, and preparation strategies.

## Interview Format
The interview consists of three main components:
1. Whiteboarding session (45 minutes) - Demonstrate problem-solving approach
2. Problem-solving discussion (30 minutes) - Identify automation opportunities
3. Collaborative solution design (15 minutes) - Design technical solutions

## What We're Looking For
- Problem identification and analysis skills
- AI/automation opportunity recognition  
- Technical solution design capability
- Communication and collaboration abilities
- Understanding of tax workflow complexities

## Preparation Tips
- Review common tax preparation bottlenecks
- Practice explaining technical concepts simply
- Prepare examples of automation opportunities
- Think about scalable solution architectures`,
          metadata: {
            source: 'system',
            fileName: 'interview-preparation-guide.md',
            section: 'preparation',
            category: 'interview_guide'
          }
        },
        {
          content: `# AI Tax Research Best Practices

## Research Process Framework
Tax professionals should follow a systematic approach when using AI tools for research:

### 1. Query Formulation
- Use specific, detailed questions
- Include relevant context (entity type, jurisdiction, tax year)
- Specify the level of detail needed
- Provide relevant case facts

### 2. Source Validation
- Always verify AI responses with primary sources
- Cross-reference multiple authorities (IRS, courts, regulations)
- Check for recent regulatory changes
- Validate jurisdiction-specific rules

### 3. Documentation Standards
- Maintain clear audit trails
- Document AI tool usage in client files
- Include confidence levels and limitations
- Note sources and validation steps taken

## Common Pitfalls to Avoid
- Over-reliance on AI without human validation
- Failing to update knowledge bases regularly
- Insufficient context in queries
- Ignoring jurisdiction-specific variations
- Not considering recent regulatory changes`,
          metadata: {
            source: 'system',
            fileName: 'ai-research-best-practices.md',
            section: 'research',
            category: 'best_practices'
          }
        },
        {
          content: `# Automation Opportunity Identification

## High-Volume, Low-Complexity Task Criteria
Look for tasks that meet these criteria:
- Performed repeatedly (daily/weekly/monthly)
- Follow standardized procedures
- Require minimal professional judgment
- Have clear input/output requirements
- Currently manual and time-consuming

## Tax Practice Automation Examples

### 1. Data Entry & Processing
- Client information updates from source documents
- Document classification and organization
- Basic calculations and form population
- Data validation and error checking

### 2. Document Processing
- Standard form completion
- Routine client correspondence
- Filing confirmations and tracking
- Document scanning and organization

### 3. Compliance Monitoring
- Deadline tracking and alerts
- Regulatory change notifications
- Client communication schedules
- Return status monitoring

### 4. Quality Control
- Mathematical accuracy checks
- Completeness validation
- Cross-reference verification
- Compliance requirement checking

## Implementation Considerations
- Start with pilot programs on low-risk tasks
- Measure ROI and efficiency gains
- Ensure compliance and quality control
- Plan for staff training and adaptation
- Consider client communication about automation`,
          metadata: {
            source: 'system',
            fileName: 'automation-opportunities.md',
            section: 'automation',
            category: 'strategy'
          }
        }
      ]

      for (const doc of sampleDocuments) {
        await this.processDocumentFromText(
          doc.content,
          doc.metadata.fileName,
          'md',
          doc.metadata
        )
      }

      console.log('✅ Initial documents populated successfully')
    } catch (error) {
      console.error('Error populating initial documents:', error)
      throw error
    }
  }

  /**
   * Process document from text content (for pre-population)
   */
  private async processDocumentFromText(
    content: string,
    fileName: string,
    fileType: string,
    additionalMetadata: Record<string, string | number | boolean> = {}
  ): Promise<void> {
    try {
      console.log(`Processing pre-populated document: ${fileName}`)
      
      // Chunk the content
      const chunks = this.chunker.chunk(content)
      console.log(`Document chunked into ${chunks.length} pieces`)
      
      // Generate embeddings
      const embeddings = await this.generateEmbeddings(chunks)

      // Store in Supabase
      const insertPromises = chunks.map(async (chunk, index) => {
        const metadata = {
          source: 'system',
          fileName,
          chunkIndex: index,
          totalChunks: chunks.length,
          fileType,
          uploadedAt: new Date().toISOString(),
          ...additionalMetadata,
        }

        const { error } = await supabase
          .from('documents')
          .insert({
            content: chunk,
            metadata,
            embedding: `[${embeddings[index].join(',')}]`
          })

        if (error) {
          console.error('Error inserting pre-populated chunk:', error)
          throw error
        }
      })

      await Promise.all(insertPromises)
      console.log(`Successfully stored ${chunks.length} chunks for ${fileName}`)
    } catch (error) {
      console.error('Error processing pre-populated document:', error)
      throw error
    }
  }

  /**
   * Delete document by filename
   */
  async deleteDocument(fileName: string, userId?: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('metadata->>fileName', fileName)
        .eq('metadata->>userId', userId)

      if (error) {
        console.error('Error deleting document:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error deleting document:', error)
      return false
    }
  }

  /**
   * Get user's uploaded documents
   */
  async getUserDocuments(userId: string) {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('metadata')
        .eq('metadata->>userId', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching user documents:', error)
        return []
      }

      // Group by fileName and get unique documents
      const uniqueDocuments = data
        .reduce((acc: Array<{
          fileName: string
          fileType: string
          uploadedAt: string
          totalChunks: number
          storagePath?: string
        }>, curr) => {
          const fileName = curr.metadata.fileName
          if (!acc.find(doc => doc.fileName === fileName)) {
            acc.push({
              fileName,
              fileType: curr.metadata.fileType,
              uploadedAt: curr.metadata.uploadedAt,
              totalChunks: curr.metadata.totalChunks,
              storagePath: curr.metadata.storagePath,
            })
          }
          return acc
        }, [])

      return uniqueDocuments
    } catch (error) {
      console.error('Error fetching user documents:', error)
      return []
    }
  }
}

// Export singleton instance
export const documentProcessor = new DocumentProcessor() 