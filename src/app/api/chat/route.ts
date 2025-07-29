import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { NextRequest } from 'next/server'
import { ragSearch } from '@/lib/rag-search'

export const runtime = 'edge'

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
      matchThreshold: 0.7,
      matchCount: 5
    })

    // Build context from RAG results with rich citation info
    const contextSections = ragResults.results.map((result, index) => 
      `[Source ${index + 1}] (${result.metadata.source} - ${result.metadata.section}, Chunk ${result.metadata.chunk_index}/${result.metadata.total_chunks}): ${result.content}`
    ).join('\n\n')

    // Prepare citation information
    const citations = ragResults.results.map((result, index) => ({
      id: index + 1,
      source: result.metadata.source,
      section: result.metadata.section,
      page_title: result.metadata.page_title,
      chunk_index: result.metadata.chunk_index,
      total_chunks: result.metadata.total_chunks,
      similarity: result.similarity,
      content_preview: result.content.slice(0, 100) + '...'
    }))

    // Create conversation history context
    const conversationHistory = messages.slice(0, -1).map((msg: { role: string; content: string }) => 
      `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`
    ).join('\n\n')

    // Enhanced system prompt for conversational RAG
    const systemPrompt = `You are an AI assistant specialized in tax research and interview preparation. You have access to comprehensive documentation about interview processes, tax automation opportunities, and technical implementation details.

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
${citations.map(c => `[Source ${c.id}]: ${c.source} - ${c.section} (Chunk ${c.chunk_index}/${c.total_chunks})`).join('\n')}`

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