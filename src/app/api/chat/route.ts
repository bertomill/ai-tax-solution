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

    // Build context from RAG results
    const contextSections = ragResults.results.map((result, index) => 
      `[Source ${index + 1}]: ${result.content}`
    ).join('\n\n')

    // Create conversation history context
    const conversationHistory = messages.slice(0, -1).map((msg: { role: string; content: string }) => 
      `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`
    ).join('\n\n')

    // Enhanced system prompt for conversational RAG
    const systemPrompt = `You are an AI assistant specialized in tax research and interview preparation. You have access to comprehensive documentation about interview processes, tax automation opportunities, and technical implementation details.

**Your role:**
- Provide accurate, helpful responses based on the retrieved context
- Maintain conversation continuity by referencing previous exchanges when relevant
- Cite specific sources when making claims
- If the context doesn't contain sufficient information, clearly state this
- Focus on practical, actionable advice for interview preparation and tax-related questions

**Retrieved Context:**
${contextSections}

**Previous Conversation:**
${conversationHistory}

**Instructions:**
1. Answer the user's question using the retrieved context as your primary source
2. Reference previous parts of the conversation when relevant
3. Be conversational and helpful while remaining accurate
4. If asking follow-up questions would be helpful, suggest them
5. Always indicate when information comes from the retrieved sources vs. general knowledge`

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