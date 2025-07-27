import { processWebsiteContent } from './content-extractor'
import { generateEmbeddings } from './openai'
import { supabase } from './supabase-direct'

export async function testPopulateDatabase() {
  try {
    console.log('📄 Extracting content from website...')
    const chunks = await processWebsiteContent()
    console.log('Chunks extracted:', chunks.length)
    
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set')
    }
    
    console.log(`📊 Generating embeddings for ${chunks.length} chunks...`)
    const texts = chunks.map(chunk => chunk.content)
    const embeddings = await generateEmbeddings(texts)
    console.log('Embeddings generated:', embeddings.length)
    
    console.log('🗑️ Clearing existing documents...')
    const { error: deleteError } = await supabase.from('documents').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    if (deleteError) {
      console.log('Delete error (might be expected if table is empty):', deleteError)
    }
    
    console.log('💾 Saving chunks with embeddings to database...')
    const documentsWithEmbeddings = chunks.map((chunk, index) => ({
      content: chunk.content,
      metadata: chunk.metadata,
      embedding: JSON.stringify(embeddings[index])
    }))
    
    console.log('Documents to insert:', documentsWithEmbeddings.length)
    
    const { data, error } = await supabase
      .from('documents')
      .insert(documentsWithEmbeddings)
      .select()
    
    if (error) {
      console.error('Insert error:', error)
      throw error
    }
    
    console.log(`✅ Successfully populated database with ${data?.length || 0} documents`)
    return data
    
  } catch (error) {
    console.error('❌ Error populating database:', error)
    console.error('Full error details:', JSON.stringify(error, null, 2))
    throw error
  }
}