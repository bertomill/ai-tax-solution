const { PrismaClient } = require('@prisma/client')
const { generateEmbeddings } = require('../src/lib/openai')

const prisma = new PrismaClient()

async function insertSampleContent() {
  try {
    console.log('🗑️ Clearing existing sample content...')
    await prisma.document.deleteMany({
      where: {
        metadata: {
          path: ['source'],
          equals: 'sample'
        }
      }
    })

    console.log('📄 Inserting sample content...')
    
    const sampleContent = [
      {
        content: `Canadian Corporate Tax Rates 2025-2026:

Federal Corporate Tax Rates:
- General corporate income: 15%
- Small business income (first $500,000): 9%

Provincial/Territorial Corporate Tax Rates (2025):
- Ontario: 11.5%
- Quebec: 11.6%
- British Columbia: 12%
- Alberta: 8%
- Manitoba: 12%
- Saskatchewan: 12%
- Nova Scotia: 14%
- New Brunswick: 14%
- Newfoundland and Labrador: 15%
- Prince Edward Island: 16%
- Northwest Territories: 11.5%
- Nunavut: 12%
- Yukon: 12%

Combined Federal and Provincial Rates:
- Ontario: 26.5% (15% federal + 11.5% provincial)
- Quebec: 26.6% (15% federal + 11.6% provincial)
- British Columbia: 27% (15% federal + 12% provincial)
- Alberta: 23% (15% federal + 8% provincial)

Small Business Deduction:
- Available for Canadian-controlled private corporations (CCPCs)
- First $500,000 of active business income taxed at 9% federal rate
- Provincial small business rates vary by province`,
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

    console.log(`📊 Generating embeddings for ${sampleContent.length} documents...`)
    const texts = sampleContent.map(doc => doc.content)
    const embeddings = await generateEmbeddings(texts)

    console.log('💾 Inserting documents with embeddings...')
    const documentsWithEmbeddings = sampleContent.map((doc, index) => ({
      content: doc.content,
      metadata: doc.metadata,
      embedding: JSON.stringify(embeddings[index])
    }))

    const result = await prisma.document.createMany({
      data: documentsWithEmbeddings
    })

    console.log(`✅ Successfully inserted ${result.count} sample documents`)
    
  } catch (error) {
    console.error('❌ Error inserting sample content:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the script
insertSampleContent() 