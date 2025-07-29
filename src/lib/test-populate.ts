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
      },
      {
        content: `Depreciation Rules for Business Equipment and Property:

Capital Cost Allowance (CCA) Classes:

Class 1 (4%): Buildings acquired after 1987
Class 3 (5%): Buildings acquired before 1988
Class 6 (10%): Buildings that are frame, log, stucco on frame, galvanized iron, or corrugated metal
Class 8 (20%): Most machinery and equipment, furniture, fixtures, outdoor advertising signs, photocopiers, and electronic communications equipment
Class 10 (30%): Automobiles, vans, trucks, tractors, and other motor vehicles
Class 12 (100%): Computer software, tools costing less than $500, and certain other items
Class 13 (Straight-line): Leasehold improvements
Class 14 (Declining balance): Patents, franchises, concessions, or licenses for a limited period
Class 16 (40%): Taxis, rental cars, and buses
Class 43 (30%): Manufacturing and processing machinery and equipment
Class 50 (55%): Computer hardware and systems software

Key Rules:
- Half-year rule applies in the year of acquisition
- Recapture occurs when proceeds exceed undepreciated capital cost
- Terminal loss available when proceeds are less than undepreciated capital cost
- Accelerated Investment Incentive provides enhanced first-year deduction for eligible property

Example Calculation:
- Computer equipment (Class 50): $10,000 purchase
- First year CCA: $10,000 × 55% × 50% = $2,750 (half-year rule)
- Second year CCA: ($10,000 - $2,750) × 55% = $3,987.50`,
        metadata: {
          source: 'sample',
          fileName: 'depreciation-rules-guide.pdf',
          section: 'CCA Classes and Rules',
          chunkIndex: 0,
          totalChunks: 1,
          fileType: 'pdf',
          uploadedAt: new Date().toISOString()
        }
      },
      {
        content: `AI Tax Research Best Practices:

## Research Process Framework
Tax professionals should follow a systematic approach when using AI tools for research:

### 1. Query Formulation
- Use specific, detailed questions with relevant context
- Include entity type, jurisdiction, and tax year information
- Specify the level of detail needed (overview vs. technical)
- Provide relevant case facts and circumstances

### 2. Source Validation
- Always verify AI responses with primary sources
- Cross-reference multiple authorities (IRS, courts, regulations)
- Check for recent regulatory changes and updates
- Validate jurisdiction-specific rules and requirements

### 3. Documentation Standards
- Maintain clear audit trails of AI tool usage
- Document AI tool usage in client files and workpapers
- Include confidence levels and limitations in findings
- Note sources and validation steps taken

### 4. Quality Control
- Review AI-generated content for accuracy and completeness
- Ensure proper citation of sources and authorities
- Validate technical calculations and interpretations
- Consider alternative interpretations and scenarios

## Common Pitfalls to Avoid
- Over-reliance on AI without human validation
- Failing to update knowledge bases regularly
- Insufficient context in research queries
- Ignoring jurisdiction-specific variations
- Not considering recent regulatory changes
- Accepting AI responses without critical analysis

## Best Practices for Implementation
- Start with low-risk research tasks
- Establish clear protocols for AI tool usage
- Train staff on proper query formulation
- Regular review and updating of AI knowledge bases
- Maintain human oversight of critical decisions`,
        metadata: {
          source: 'sample',
          fileName: 'ai-tax-research-best-practices.pdf',
          section: 'Research Best Practices',
          chunkIndex: 0,
          totalChunks: 1,
          fileType: 'pdf',
          uploadedAt: new Date().toISOString()
        }
      },
      {
        content: `Section 199A Qualified Business Income Deduction:

Overview:
- 20% deduction for qualified business income (QBI)
- Available for pass-through entities (partnerships, S corporations, sole proprietorships)
- Reduces effective tax rate on business income

Qualified Business Income:
- Net income from qualified trades or businesses
- Excludes investment income, capital gains, and certain other items
- Must be from a U.S. trade or business

Limitations:
1. W-2 Wage Limitation: 50% of W-2 wages paid by the business
2. Capital Limitation: 25% of W-2 wages plus 2.5% of unadjusted basis of qualified property
3. Specified Service Trade or Business (SSTB) Limitation: Phase-out for high-income taxpayers

Specified Service Trades or Businesses:
- Health, law, accounting, actuarial science, performing arts, consulting, athletics, financial services, brokerage services, or any trade or business where the principal asset is the reputation or skill of employees

Phase-out Range:
- For 2024: $191,950 to $241,950 (single), $383,900 to $483,900 (married filing jointly)
- Complete phase-out for SSTBs above the upper threshold

Calculation Example:
- QBI: $100,000
- W-2 Wages: $50,000
- Deduction: Lesser of 20% of QBI ($20,000) or 50% of W-2 wages ($25,000) = $20,000

Tax Impact:
- Reduces effective tax rate on business income
- Particularly beneficial for high-income taxpayers
- Requires careful planning to maximize benefit`,
        metadata: {
          source: 'sample',
          fileName: 'section-199a-qbi-deduction.pdf',
          section: 'QBI Deduction Rules',
          chunkIndex: 0,
          totalChunks: 1,
          fileType: 'pdf',
          uploadedAt: new Date().toISOString()
        }
      },
      {
        content: `Latest Changes to International Tax Regulations (GILTI):

Global Intangible Low-Taxed Income (GILTI):
- Applies to U.S. shareholders of controlled foreign corporations (CFCs)
- Designed to prevent profit shifting to low-tax jurisdictions
- Effective tax rate of 10.5% (13.125% after 2025)

Key Changes in Recent Legislation:

1. Foreign-Derived Intangible Income (FDII):
- Reduced deduction rate from 37.5% to 21.875% (2022-2025)
- Further reduction to 15.625% after 2025
- Encourages U.S. exports and intellectual property development

2. Base Erosion and Anti-Abuse Tax (BEAT):
- Increased rates from 10% to 12.5% (2026)
- Expanded scope to include more transactions
- Strengthened anti-avoidance measures

3. Subpart F Income:
- Updated definitions for digital services
- Enhanced reporting requirements
- Stricter controlled foreign corporation rules

4. Transfer Pricing:
- Increased documentation requirements
- Enhanced penalty provisions
- More aggressive enforcement of arm's length standards

5. Digital Services Taxes:
- International coordination on digital taxation
- OECD Pillar 1 and Pillar 2 implementation
- Country-by-country reporting requirements

Compliance Requirements:
- Enhanced reporting on Form 5471
- Country-by-country reporting for large multinationals
- Increased documentation for transfer pricing
- Real-time monitoring of international transactions

Impact on Multinational Corporations:
- Increased compliance burden
- Higher effective tax rates
- Need for sophisticated tax planning
- Enhanced documentation and reporting requirements`,
        metadata: {
          source: 'sample',
          fileName: 'international-tax-regulations-2024.pdf',
          section: 'GILTI and International Tax',
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
    
    const { data, error } = await supabase
      .from('documents')
      .insert(documentsWithEmbeddings)
      .select()
    
    if (error) {
      console.error('Insert error:', error)
      throw error
    }
    
    console.log(`✅ Successfully added ${data?.length || 0} sample documents`)
    return data
    
  } catch (error) {
    console.error('❌ Error adding sample content:', error)
    throw error
  }
}