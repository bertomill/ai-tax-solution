import { DocumentChunk } from './supabase'

export interface PageContent {
  title: string
  sections: Array<{
    title: string
    content: string
  }>
}

export function extractWebsiteContent(): PageContent {
  // Extract content from your current page structure
  return {
    title: "AI Tax Use Cases - Whiteboarding Interview Preparation",
    sections: [
      {
        title: "Assignment Overview",
        content: `This is a collaborative whiteboarding session—a chance to work together like colleagues exploring a new idea. You'll come prepared with a problem you believe is worth solving in the Tax space—and one or more AI-powered solution ideas to address it.

Duration: 30–45 minutes
Format: Collaborative session focused on problem-solving and ideation

This round will be a collaborative whiteboarding session where we work together like colleagues exploring a new idea. You'll come prepared with a tax space problem worth solving and AI-powered solution ideas.`
      },
      {
        title: "Interview Format",
        content: `A structured approach to collaborative problem-solving and idea exploration:

1. We'll treat this like a real working session, not a pitch
2. You'll walk us through your thinking, and together we'll collaborate, ask questions, and expand the idea
3. If you bring more than one idea, we'll choose one to focus on together
4. You're welcome to use the whiteboard, sketch, or talk through your thinking
5. If you'd like to reference visuals, content, or examples, we'll have a screen available

This is designed as a 5-step process:
- Problem Presentation: Present your identified tax problem and why it's worth solving
- Solution Ideation: Share your AI-powered solution ideas and approach
- Collaborative Discussion: Work together to expand and refine the ideas
- Technical Deep Dive: Explore implementation details and technical considerations
- Next Steps: Discuss MVP strategy and phased rollout approach`
      },
      {
        title: "What We're Looking For",
        content: `Key evaluation criteria for the collaborative whiteboarding session:

Strategic problem framing: Ability to identify and articulate meaningful problems in the tax space

Creative thinking and solution design: Innovative approaches to solving complex problems

Clear, collaborative communication: Ability to explain ideas clearly and work well with others

Comfort with ambiguity and live iteration: Thriving in uncertain situations and adapting ideas on the fly

You might touch on things like:
- Who the users are and the problem they face
- What an MVP of the solution could look like
- How it might use AI and data
- What a phased rollout or vision might be

There's no right answer—we're excited to see how you approach the problem, communicate your ideas, and shape solutions in a collaborative setting.`
      }
    ]
  }
}

export function chunkContent(content: PageContent, maxChunkSize: number = 800): DocumentChunk[] {
  const chunks: DocumentChunk[] = []
  let chunkIndex = 0

  // Create chunks for each section
  content.sections.forEach((section) => {
    const sectionText = `${section.title}\n\n${section.content}`
    
    if (sectionText.length <= maxChunkSize) {
      // If section fits in one chunk
      chunks.push({
        content: sectionText,
        metadata: {
          source: 'website',
          section: section.title,
          page_title: content.title,
          chunk_index: chunkIndex,
          total_chunks: 0 // Will be updated later
        }
      })
      chunkIndex++
    } else {
      // Split section into smaller chunks
      const sentences = sectionText.split(/[.!?]+/).filter(s => s.trim().length > 0)
      let currentChunk = section.title + '\n\n'
      
      sentences.forEach((sentence, index) => {
        const proposedChunk = currentChunk + sentence.trim() + '. '
        
        if (proposedChunk.length > maxChunkSize && currentChunk.length > section.title.length + 2) {
          // Save current chunk and start new one
          chunks.push({
            content: currentChunk.trim(),
            metadata: {
              source: 'website',
              section: section.title,
              page_title: content.title,
              chunk_index: chunkIndex,
              total_chunks: 0 // Will be updated later
            }
          })
          chunkIndex++
          currentChunk = sentence.trim() + '. '
        } else {
          currentChunk = proposedChunk
        }
        
        // Handle last sentence
        if (index === sentences.length - 1 && currentChunk.trim().length > 0) {
          chunks.push({
            content: currentChunk.trim(),
            metadata: {
              source: 'website',
              section: section.title,
              page_title: content.title,
              chunk_index: chunkIndex,
              total_chunks: 0 // Will be updated later
            }
          })
          chunkIndex++
        }
      })
    }
  })

  // Update total_chunks for all chunks
  chunks.forEach(chunk => {
    chunk.metadata.total_chunks = chunks.length
  })

  return chunks
}

export async function processWebsiteContent(): Promise<DocumentChunk[]> {
  const content = extractWebsiteContent()
  const chunks = chunkContent(content)
  
  console.log(`Extracted ${chunks.length} chunks from website content`)
  
  return chunks
}