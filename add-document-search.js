// Simple script to add AI Document Search data point
const { addAIDocumentSearchOpportunity } = require('./src/lib/automation-data.ts')

async function addDataPoint() {
  try {
    console.log('Adding AI Document Search opportunity...')
    const result = await addAIDocumentSearchOpportunity()
    
    if (result) {
      console.log('✅ Successfully added AI Document Search:', result)
    } else {
      console.log('❌ Failed to add AI Document Search')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

addDataPoint()