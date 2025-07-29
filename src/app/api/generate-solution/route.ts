import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { task } = await req.json()
    
    if (!task) {
      return new Response('Task information is required', { status: 400 })
    }

    // Create a detailed prompt for AI solution generation
    const systemPrompt = `You are an AI automation expert specializing in tax operations and process optimization. Your task is to analyze a specific tax task and generate a practical AI solution idea.

Given the task information, provide a concise but comprehensive AI solution using markdown formatting that includes:
1. The specific AI approach (e.g., ML classification, NLP processing, automation workflow)
2. Key technologies that would be used
3. Expected benefits and time savings
4. Implementation considerations

Format your response with:
- **Bold text** for key concepts and technologies
- *Italics* for emphasis
- Bullet points for lists
- \`Code snippets\` for technical terms
- Clear sections with headers

Keep your response focused, practical, and around 150-200 words. Be specific about the AI techniques and technologies.`

    const userPrompt = `Please generate an AI solution idea for this tax task:

**Task:** ${task.title}

**Description:** ${task.description}

**Primary User:** ${task.user}
**Department:** ${task.department}
**Frequency:** ${task.frequency}
**AI Classification:** ${task.aiClassification}

**Current User Journey:**
${task.userJourney.map((step: string, index: number) => `${index + 1}. ${step}`).join('\n')}

Generate a specific AI solution that could automate or significantly improve this process.`

    const result = await generateText({
      model: openai('gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      temperature: 0.7,
      maxTokens: 300,
    })

    return Response.json({ 
      solution: result.text 
    })
    
  } catch (error) {
    console.error('Error generating AI solution:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}