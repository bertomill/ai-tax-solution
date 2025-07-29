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

// Add sample tax content for testing
export async function addSampleTaxContent() {
  try {
    console.log('📄 Adding sample tax content...')
    
    const sampleContent = [
      {
        content: `Corporate Tax Rates in Canada (2025-2026)

Federal Corporate Tax Rates:
- General corporate income: 15% (reduced from 28% in 2000)
- Small business income (first $500,000): 9% (reduced from 12% in 2019)
- Manufacturing and processing: 15%

Provincial/Territorial Corporate Tax Rates:
- Alberta: 8% (general), 2% (small business)
- British Columbia: 12% (general), 2% (small business)
- Ontario: 11.5% (general), 3.2% (small business)
- Quebec: 11.6% (general), 3.2% (small business)
- Saskatchewan: 12% (general), 2% (small business)
- Manitoba: 12% (general), 0% (small business)
- Nova Scotia: 14% (general), 2.5% (small business)
- New Brunswick: 14% (general), 2.5% (small business)
- Newfoundland and Labrador: 15% (general), 3% (small business)
- Prince Edward Island: 16% (general), 1% (small business)
- Northwest Territories: 11.5% (general), 4% (small business)
- Nunavut: 12% (general), 3% (small business)
- Yukon: 12% (general), 2% (small business)

Combined Federal and Provincial Rates (General):
- Alberta: 23% (15% federal + 8% provincial)
- British Columbia: 27% (15% federal + 12% provincial)
- Ontario: 26.5% (15% federal + 11.5% provincial)
- Quebec: 26.6% (15% federal + 11.6% provincial)

These rates apply to income earned by general corporations and are subject to change based on government budgets and tax policy updates.`,
        metadata: {
          source: 'sample',
          fileName: 'canadian-corporate-tax-rates-2025-2026.pdf',
          section: 'Corporate Tax Rates',
          chunkIndex: 0,
          totalChunks: 1,
          fileType: 'pdf',
          uploadedAt: new Date().toISOString()
        }
      },
      {
        content: `Personal Income Tax Rates in Canada (2025)

Federal Personal Income Tax Rates:
- 15% on the first $55,867 of taxable income
- 20.5% on the next $55,866 of taxable income (up to $111,733)
- 26% on the next $61,353 of taxable income (up to $173,086)
- 29% on the next $64,533 of taxable income (up to $237,619)
- 33% on taxable income over $237,619

Provincial Personal Income Tax Rates (examples):
Ontario:
- 5.05% on the first $51,446 of taxable income
- 9.15% on the next $51,448 of taxable income
- 11.16% on the next $62,145 of taxable income
- 12.16% on the next $70,000 of taxable income
- 13.16% on taxable income over $235,039

British Columbia:
- 5.06% on the first $47,937 of taxable income
- 7.7% on the next $47,938 of taxable income
- 10.5% on the next $52,882 of taxable income
- 12.29% on the next $20,243 of taxable income
- 14.7% on the next $41,401 of taxable income
- 16.8% on taxable income over $210,401

Alberta:
- 10% on the first $148,269 of taxable income
- 12% on the next $29,654 of taxable income
- 13% on the next $59,308 of taxable income
- 14% on the next $118,616 of taxable income
- 15% on taxable income over $355,845

These rates are indexed to inflation and may be adjusted annually.`,
        metadata: {
          source: 'sample',
          fileName: 'canadian-personal-tax-rates-2025.pdf',
          section: 'Personal Tax Rates',
          chunkIndex: 0,
          totalChunks: 1,
          fileType: 'pdf',
          uploadedAt: new Date().toISOString()
        }
      },
      {
        content: `Tax Planning Strategies for 2025

Year-End Tax Planning Tips:

1. Income Splitting Opportunities:
- Consider paying reasonable salaries to family members
- Use family trusts for income distribution
- Maximize spousal RRSP contributions
- Utilize the pension income splitting rules

2. Business Tax Strategies:
- Accelerate business expenses before year-end
- Defer income where possible
- Maximize capital cost allowance claims
- Consider the small business deduction limit ($500,000)

3. Investment Tax Planning:
- Harvest capital losses to offset gains
- Consider tax-loss selling before year-end
- Maximize TFSA contributions ($7,000 for 2025)
- Review RRSP contribution limits

4. Corporate Tax Planning:
- Consider year-end bonuses to reduce corporate income
- Review inter-corporate dividend strategies
- Optimize the use of the small business deduction
- Consider the general rate reduction pool

5. International Tax Considerations:
- Review foreign income reporting requirements
- Consider the impact of new international tax rules
- Review transfer pricing documentation
- Assess the impact of global minimum tax rules

6. Estate Planning:
- Review and update wills and powers of attorney
- Consider life insurance strategies
- Review beneficiary designations
- Plan for the deemed disposition at death

These strategies should be implemented in consultation with qualified tax professionals.`,
        metadata: {
          source: 'sample',
          fileName: 'tax-planning-strategies-2025.pdf',
          section: 'Tax Planning',
          chunkIndex: 0,
          totalChunks: 1,
          fileType: 'pdf',
          uploadedAt: new Date().toISOString()
        }
      }
    ]
    
    console.log(`📊 Generating embeddings for ${sampleContent.length} sample documents...`)
    const texts = sampleContent.map(doc => doc.content)
    const embeddings = await generateEmbeddings(texts)
    
    console.log('💾 Saving sample content to database...')
    const documentsWithEmbeddings = sampleContent.map((doc, index) => ({
      content: doc.content,
      metadata: doc.metadata,
      embedding: JSON.stringify(embeddings[index])
    }))
    
    const result = await prisma.document.createMany({
      data: documentsWithEmbeddings
    })
    
    console.log(`✅ Successfully added ${result.count} sample documents`)
    return result
    
  } catch (error) {
    console.error('❌ Error adding sample content:', error)
    throw error
  }
}

// For running from command line
if (require.main === module) {
  populateDatabase()
    .then(() => console.log('Database population completed'))
    .catch(console.error)
}