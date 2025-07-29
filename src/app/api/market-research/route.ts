import { NextRequest, NextResponse } from 'next/server'

// Tavily API configuration
const TAVILY_API_KEY = process.env.TAVILY_API_KEY
const TAVILY_API_URL = 'https://api.tavily.com/search'

interface TavilySearchResult {
  title: string
  url: string
  content: string
  score: number
  published_date?: string
}

interface TavilyResponse {
  results: TavilySearchResult[]
  query: string
  response_time: number
}

interface MarketInsight {
  id: string
  category: 'trend' | 'competitor' | 'opportunity' | 'risk'
  title: string
  description: string
  confidence: 'high' | 'medium' | 'low'
  impact: 'high' | 'medium' | 'low'
  sources: string[]
  timestamp: string
  firm?: string
  theme?: string
}

const TOP_TAX_FIRMS = [
  { id: 'pwc', name: 'PwC', keywords: ['PwC', 'PricewaterhouseCoopers'] },
  { id: 'ey', name: 'EY', keywords: ['EY', 'Ernst & Young', 'Ernst and Young'] },
  { id: 'deloitte', name: 'Deloitte', keywords: ['Deloitte'] },
  { id: 'kpmg', name: 'KPMG', keywords: ['KPMG'] },
  { id: 'rst', name: 'RSM', keywords: ['RSM'] },
  { id: 'bdo', name: 'BDO', keywords: ['BDO'] }
]

const RESEARCH_THEMES = {
  'ai-tax-use-cases': {
    name: 'AI Tax Use Cases',
    keywords: ['AI tax software', 'machine learning tax', 'automated tax compliance', 'tax AI tools', 'intelligent tax processing']
  },
  'compliance-standards': {
    name: 'New Compliance Standards',
    keywords: ['tax compliance updates', 'new tax regulations', 'reporting standards', 'tax law changes', 'compliance requirements']
  }
}

async function searchTavily(query: string): Promise<TavilyResponse | null> {
  if (!TAVILY_API_KEY) {
    console.error('TAVILY_API_KEY not configured')
    return null
  }

  try {
    const response = await fetch(TAVILY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TAVILY_API_KEY}`
      },
      body: JSON.stringify({
        query,
        max_results: 10,
        search_depth: 'advanced',
        include_domains: ['tax.thomsonreuters.com', 'www.ey.com', 'www.pwc.com', 'www2.deloitte.com', 'kpmg.com', 'rsmus.com', 'bdo.com', 'taxnotes.com', 'www.accountingtoday.com'],
        exclude_domains: ['wikipedia.org']
      })
    })

    if (!response.ok) {
      throw new Error(`Tavily API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error calling Tavily API:', error)
    return null
  }
}

function generateSearchQueries(firmIds: string[], themeId: string): string[] {
  const firms = firmIds.map(id => TOP_TAX_FIRMS.find(f => f.id === id)).filter(Boolean)
  const theme = RESEARCH_THEMES[themeId as keyof typeof RESEARCH_THEMES]
  
  if (!theme) return []

  const queries: string[] = []

  // Generate firm-specific queries
  firms.forEach(firm => {
    if (firm) {
      theme.keywords.forEach(keyword => {
        queries.push(`${firm.name} ${keyword} 2024`)
      })
      
      // Add general firm queries
      queries.push(`${firm.name} technology innovation ${theme.name} 2024`)
      queries.push(`${firm.name} digital transformation tax 2024`)
    }
  })

  // Add general theme queries
  theme.keywords.forEach(keyword => {
    queries.push(`${keyword} big four accounting firms 2024`)
    queries.push(`${keyword} tax industry trends 2024`)
  })

  return queries.slice(0, 12) // Limit to prevent API overuse
}

function analyzeSearchResults(results: TavilySearchResult[], firms: string[], theme: string): MarketInsight[] {
  const insights: MarketInsight[] = []
  const processedContent = new Set<string>()

  results.forEach((result, index) => {
    // Skip duplicates
    const contentHash = result.title + result.content.substring(0, 100)
    if (processedContent.has(contentHash)) return
    processedContent.add(contentHash)

    // Determine category based on content analysis
    let category: 'trend' | 'competitor' | 'opportunity' | 'risk' = 'trend'
    const content = (result.title + ' ' + result.content).toLowerCase()

    if (content.includes('invest') || content.includes('launch') || content.includes('acquire')) {
      category = 'competitor'
    } else if (content.includes('opportunity') || content.includes('market') || content.includes('demand')) {
      category = 'opportunity'
    } else if (content.includes('risk') || content.includes('challenge') || content.includes('concern')) {
      category = 'risk'
    }

    // Determine confidence based on source and recency
    let confidence: 'high' | 'medium' | 'low' = 'medium'
    if (result.score > 0.8) confidence = 'high'
    if (result.score < 0.5) confidence = 'low'

    // Determine impact based on firm involvement
    let impact: 'high' | 'medium' | 'low' = 'medium'
    const involvesBigFour = firms.some(firmId => 
      ['pwc', 'ey', 'deloitte', 'kpmg'].includes(firmId) && 
      content.includes(TOP_TAX_FIRMS.find(f => f.id === firmId)?.name.toLowerCase() || '')
    )
    if (involvesBigFour) impact = 'high'

    // Find related firm
    const relatedFirm = firms.find(firmId => {
      const firm = TOP_TAX_FIRMS.find(f => f.id === firmId)
      return firm?.keywords.some(keyword => 
        content.includes(keyword.toLowerCase())
      )
    })

    insights.push({
      id: `insight-${index}`,
      category,
      title: result.title,
      description: result.content.substring(0, 200) + '...',
      confidence,
      impact,
      sources: [result.url],
      timestamp: new Date().toISOString(),
      firm: relatedFirm ? TOP_TAX_FIRMS.find(f => f.id === relatedFirm)?.name : undefined,
      theme: RESEARCH_THEMES[theme as keyof typeof RESEARCH_THEMES]?.name
    })
  })

  return insights.slice(0, 8) // Return top insights
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firms, theme } = body

    if (!Array.isArray(firms) || !theme) {
      return NextResponse.json(
        { error: 'Invalid request: firms array and theme are required' },
        { status: 400 }
      )
    }

    // Generate search queries
    const queries = generateSearchQueries(firms, theme)
    
    if (queries.length === 0) {
      return NextResponse.json(
        { error: 'No search queries generated' },
        { status: 400 }
      )
    }

    // Execute searches
    const searchPromises = queries.map(query => searchTavily(query))
    const searchResults = await Promise.all(searchPromises)
    
    // Combine all results
    const allResults: TavilySearchResult[] = []
    searchResults.forEach(result => {
      if (result?.results) {
        allResults.push(...result.results)
      }
    })

    if (allResults.length === 0) {
      return NextResponse.json({
        insights: [{
          id: 'fallback-1',
          category: 'trend' as const,
          title: 'Market Research In Progress',
          description: 'Web search completed but no specific insights found. This may be due to API limitations or content filtering.',
          confidence: 'low' as const,
          impact: 'medium' as const,
          sources: ['Market Research Agent'],
          timestamp: new Date().toISOString(),
          theme: RESEARCH_THEMES[theme as keyof typeof RESEARCH_THEMES]?.name
        }]
      })
    }

    // Analyze results to generate insights
    const insights = analyzeSearchResults(allResults, firms, theme)

    return NextResponse.json({
      insights,
      metadata: {
        queriesExecuted: queries.length,
        resultsFound: allResults.length,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Error in market research API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}