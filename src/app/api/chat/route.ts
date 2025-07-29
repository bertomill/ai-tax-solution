import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { NextRequest } from 'next/server'
import { ragSearch } from '@/lib/rag-search'

export const runtime = 'edge'

// Function to generate document URL
function generateDocumentUrl(storagePath: string | undefined, fileName: string | undefined): string {
  if (storagePath) {
    // If we have a storage path, we can generate a proper URL
    return `/api/view-document?storagePath=${encodeURIComponent(storagePath)}&userId=demo-user`
  } else if (fileName) {
    // Fallback to just the filename
    return `#${encodeURIComponent(fileName)}`
  }
  return '#'
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    
    // Get the latest user message
    const userMessage = messages[messages.length - 1]
    
    if (!userMessage || userMessage.role !== 'user') {
      return new Response('Invalid message format', { status: 400 })
    }

    // Perform RAG search with the user's query
    console.log('Performing RAG search for:', userMessage.content)
    const ragResults = await ragSearch(userMessage.content, {
      matchThreshold: 0.1, // Lowered from 0.7 to 0.1 for better document matching
      matchCount: 5
    })

    // Build context from RAG results with rich citation info
    const contextSections = ragResults.results.map((result, index) => {
      const fileName = result.metadata.fileName || 'Unknown Document'
      const section = result.metadata.section || 'General'
      return `[Source ${index + 1}] (${fileName} - ${section}): ${result.content}`
    }).join('\n\n')

    // Debug logging to see what's being passed to the AI
    console.log('🔍 RAG Results found:', ragResults.results.length)
    console.log('📄 Context sections length:', contextSections.length)
    console.log('📄 First 500 chars of context:', contextSections.substring(0, 500))
    console.log('📄 Sample result content:', ragResults.results[0]?.content?.substring(0, 200))
    
    // Check if we have valid content
    const hasValidContent = ragResults.results.length > 0 && 
      ragResults.results.some(result => result.content && result.content.trim().length > 10)
    
    console.log('✅ Has valid content:', hasValidContent)
    if (!hasValidContent) {
      console.log('⚠️ No valid content found in RAG results')
    }

    // Prepare citation information with proper URLs
    const citations = ragResults.results.map((result, index) => {
      const fileName = result.metadata.fileName || 'Unknown Document'
      const section = result.metadata.section || 'General'
      const documentUrl = generateDocumentUrl(result.metadata.storagePath, fileName)
      
      return {
        id: index + 1,
        source: result.metadata.source,
        fileName: fileName,
        section: section,
        similarity: result.similarity,
        content_preview: result.content.slice(0, 100) + '...',
        documentUrl: documentUrl
      }
    })

    // Create conversation history context
    const conversationHistory = messages.slice(0, -1).map((msg: { role: string; content: string }) => 
      `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`
    ).join('\n\n')

    // Enhanced system prompt for conversational RAG
    const systemPrompt = `You are an AI assistant specialized in tax research and interview preparation. You have access to comprehensive documentation about interview processes, tax automation opportunities, and technical implementation details.

**CRITICAL INSTRUCTION:** You MUST use the retrieved context below to answer the user's question. If you have retrieved context, you MUST provide information from it. Do NOT say you don't have information when context is provided.

**Your role:**
- Provide accurate, helpful responses based on the retrieved context
- Maintain conversation continuity by referencing previous exchanges when relevant  
- Always include specific citations for any claims or information you provide
- If the context doesn't contain sufficient information, clearly state this
- Focus on practical, actionable advice for interview preparation and tax-related questions

**Retrieved Context:**
${contextSections}

**Previous Conversation:**
${conversationHistory}

**Citation Format:**
When referencing information from the context, always include citations in this format:
[Source X] where X is the source number from the retrieved context.

**Instructions:**
1. Answer the user's question using the retrieved context as your primary source
2. Include citations [Source 1], [Source 2], etc. for every factual claim
3. Reference previous parts of the conversation when relevant
4. Be conversational and helpful while remaining accurate
5. If asking follow-up questions would be helpful, suggest them
6. Always indicate when information comes from the retrieved sources vs. general knowledge
7. End your response with a "Sources:" section listing all cited sources with their details

**Available Sources:**
${citations.map(c => `[Source ${c.id}]: ${c.fileName} - ${c.section} (${c.documentUrl})`).join('\n')}

**IMPORTANT RULES:**
- If you have retrieved context above, you MUST use it to answer the question
- Do NOT say "the retrieved context does not contain specific information" when context is provided
- If the context is relevant but incomplete, acknowledge what you found and suggest what additional information might be needed
- Always cite your sources using [Source X] format

**Important:** When you include the "Sources:" section at the end of your response, format it exactly like this example:

Sources:
1. [Source 1]: inside-indirect-tax-april-2025.pdf - European Union (/api/view-document?storagePath=demo-user/1234567890_inside-indirect-tax-april-2025.pdf&userId=demo-user)
2. [Source 2]: ca-federal-and-provincial-territorial-tax-rates.pdf - Corporate Tax Rates (/api/view-document?storagePath=demo-user/1234567890_ca-federal-and-provincial-territorial-tax-rates.pdf&userId=demo-user)

Include the full URL in parentheses for each source so users can click to view the original documents.`

    // Debug: Log the system prompt length and content preview
    console.log('🤖 System prompt length:', systemPrompt.length)
    console.log('🤖 System prompt preview (first 1000 chars):', systemPrompt.substring(0, 1000))
    console.log('🤖 Context sections in prompt:', contextSections ? 'Present' : 'Missing')

    // Create the streaming response
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        ...messages
      ],
      temperature: 0.7,
      maxTokens: 2000,
    })

    return result.toDataStreamResponse()
    
  } catch (error) {
    console.error('Error in conversational RAG API:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
} 