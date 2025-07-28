import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-large',
      input: text,
      encoding_format: 'float',
      dimensions: 1536
    })

    return response.data[0].embedding
  } catch (error) {
    console.error('Error generating embedding:', error)
    throw error
  }
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-large',
      input: texts,
      encoding_format: 'float',
      dimensions: 1536
    })

    return response.data.map(item => item.embedding)
  } catch (error) {
    console.error('Error generating embeddings:', error)
    throw error
  }
}

export async function generateChatCompletion(
  query: string,
  context: string,
  maxTokens: number = 800
): Promise<string> {
  try {
    const systemPrompt = `You are an AI assistant specializing in tax preparation and automation. You help tax professionals understand AI opportunities, prepare for interviews, and identify automation possibilities in their practice.

Your responses should be:
- Professional and knowledgeable about tax and AI topics
- Based on the provided context when available
- Specific and actionable
- Focused on practical tax professional needs
- Clear about limitations when context is insufficient

If the context doesn't contain relevant information, provide helpful general guidance based on your knowledge of tax practice and AI automation.`

    const userPrompt = context
      ? `Context from relevant documents:
${context}

User question: ${query}

Please provide a comprehensive answer based on the context above. If the context doesn't fully address the question, supplement with relevant general knowledge while clearly indicating what comes from the provided context vs. general knowledge.`
      : `User question: ${query}

The context search didn't return specific relevant information. Please provide helpful general guidance about this tax and AI automation topic based on your knowledge.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
    })

    return response.choices[0]?.message?.content || 'I apologize, but I was unable to generate a response. Please try rephrasing your question.'
  } catch (error) {
    console.error('Error generating chat completion:', error)
    throw error
  }
}