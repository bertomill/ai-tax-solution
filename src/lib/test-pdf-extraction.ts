import fs from 'fs'
import path from 'path'

/**
 * Test PDF text extraction by saving extracted content to files
 */
export class PDFExtractionTester {
  
  /**
   * Test manual PDF text extraction and save to file
   */
  static async testManualExtraction(buffer: Buffer, fileName: string): Promise<string> {
    console.log(`Testing manual PDF extraction for: ${fileName}`)
    
    try {
      // Convert buffer to string (this is what the manual extraction does)
      const rawText = buffer.toString('utf8')
      
      // Save raw extracted content
      const rawOutputPath = path.join(process.cwd(), `extracted-raw-${fileName}.txt`)
      fs.writeFileSync(rawOutputPath, rawText)
      console.log(`Raw extraction saved to: ${rawOutputPath}`)
      
      // Try the manual extraction methods
      const extractedText = this.extractTextFromPdfBuffer(rawText)
      
      // Save processed extracted content
      const processedOutputPath = path.join(process.cwd(), `extracted-processed-${fileName}.txt`)
      fs.writeFileSync(processedOutputPath, extractedText)
      console.log(`Processed extraction saved to: ${processedOutputPath}`)
      
      // Apply text cleaning
      const cleanedText = this.cleanText(extractedText)
      
      // Save cleaned content
      const cleanedOutputPath = path.join(process.cwd(), `extracted-cleaned-${fileName}.txt`)
      fs.writeFileSync(cleanedOutputPath, cleanedText)
      console.log(`Cleaned extraction saved to: ${cleanedOutputPath}`)
      
      return cleanedText
      
    } catch (error) {
      console.error('Test extraction failed:', error)
      throw error
    }
  }
  
  /**
   * Enhanced fallback PDF text extraction (copied from document-processing.ts)
   */
  private static extractTextFromPdfBuffer(text: string): string {
    // Multiple extraction strategies for corrupted PDFs
    
    // Strategy 1: Extract text from parentheses (common PDF structure)
    const parenthesesMatches = text.match(/\(([^)]{3,})\)/g)
    if (parenthesesMatches && parenthesesMatches.length > 5) {
      const extracted = parenthesesMatches
        .map(match => match.slice(1, -1)) // Remove parentheses
        .filter(content => content.length > 3 && /[a-zA-Z]/.test(content))
        .join(' ')
      
      if (extracted.length > 100) {
        console.log(`Strategy 1 (parentheses) extracted ${extracted.length} characters`)
        return extracted
      }
    }
    
    // Strategy 2: Look for readable text blocks
    const textBlocks = text.match(/[A-Za-z][A-Za-z0-9\s.,!?]{10,}/g)
    if (textBlocks && textBlocks.length > 0) {
      const extracted = textBlocks.join(' ')
      console.log(`Strategy 2 (text blocks) extracted ${extracted.length} characters`)
      return extracted
    }
    
    // Strategy 3: Extract any sequences of readable characters
    const readableChars = text.match(/[A-Za-z0-9\s.,!?;:'"()-]{5,}/g)
    if (readableChars) {
      const extracted = readableChars
        .filter(chunk => /[A-Za-z]/.test(chunk)) // Must contain letters
        .join(' ')
      console.log(`Strategy 3 (readable chars) extracted ${extracted.length} characters`)
      return extracted
    }
    
    // Final fallback: cleaned raw text
    const fallback = text.replace(/[^\w\s.,!?-]/g, ' ').replace(/\s+/g, ' ')
    console.log(`Fallback strategy extracted ${fallback.length} characters`)
    return fallback
  }
  
  /**
   * Advanced text cleaning (copied from document-processing.ts)
   */
  private static cleanText(text: string): string {
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
}