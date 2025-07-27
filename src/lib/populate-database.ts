import { processWebsiteContent } from './content-extractor'
import { generateEmbeddings } from './openai'
import { prisma } from './prisma'

export async function populateDatabase() {
  try {
    console.log('📄 Extracting content from website...')
    const chunks = await processWebsiteContent()
    
    console.log(`📊 Generating embeddings for ${chunks.length} chunks...`)
    const texts = chunks.map(chunk => chunk.content)
    const embeddings = await generateEmbeddings(texts)
    
    console.log('💾 Clearing existing documents...')
    await prisma.document.deleteMany({})
    
    console.log('💾 Saving chunks with embeddings to database...')
    const documentsWithEmbeddings = chunks.map((chunk, index) => ({
      content: chunk.content,
      metadata: chunk.metadata,
      embedding: JSON.stringify(embeddings[index])
    }))
    
    const result = await prisma.document.createMany({
      data: documentsWithEmbeddings
    })
    
    console.log(`✅ Successfully populated database with ${result.count} documents`)
    return result
    
  } catch (error) {
    console.error('❌ Error populating database:', error)
    throw error
  }
}

// For running from command line
if (require.main === module) {
  populateDatabase()
    .then(() => {
      console.log('Database population completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Database population failed:', error)
      process.exit(1)
    })
}