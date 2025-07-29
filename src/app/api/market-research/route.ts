import { NextRequest, NextResponse } from 'next/server'

// Tavily API configuration
const TAVILY_API_KEY = process.env.TAVILY_API_KEY
const TAVILY_API_URL = 'https://api.tavily.com/search'

// OpenAI configuration for AI agents
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

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

interface ResearchData {
  rawResults: TavilySearchResult[]
  searchQueries: string[]
  metadata: {
    firms: string[]
    theme: string
    timestamp: string
  }
}

interface AnalysisReport {
  insights: MarketInsight[]
  executiveSummary: string
  keyFindings: string[]
  recommendations: string[]
  methodology: string
  dataQuality: 'excellent' | 'good' | 'fair' | 'poor'
}

interface ReviewFeedback {
  approved: boolean
  feedback: string[]
  suggestedImprovements: string[]
  confidenceScore: number
  qualityAssessment: string
}

interface MultiAgentResponse {
  researchData: ResearchData
  analysisReport: AnalysisReport
  reviewFeedback: ReviewFeedback
  workflowStatus: {
    researchCompleted: boolean
    analysisCompleted: boolean
    reviewCompleted: boolean
    totalTime: number
  }
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

// Agent 1: Research Agent - Gathers raw data
class ResearchAgent {
  async gatherData(firms: string[], theme: string): Promise<ResearchData> {
    console.log('🔍 Research Agent: Starting data collection...')
    
    const queries = this.generateSearchQueries(firms, theme)
    const searchPromises = queries.map(query => this.searchTavily(query))
    const searchResults = await Promise.all(searchPromises)
    
    const allResults: TavilySearchResult[] = []
    searchResults.forEach(result => {
      if (result?.results) {
        allResults.push(...result.results)
      }
    })

    console.log(`🔍 Research Agent: Collected ${allResults.length} results from ${queries.length} queries`)
    
    return {
      rawResults: allResults,
      searchQueries: queries,
      metadata: {
        firms,
        theme,
        timestamp: new Date().toISOString()
      }
    }
  }

  private generateSearchQueries(firmIds: string[], themeId: string): string[] {
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

    return queries.slice(0, 12)
  }

  private async searchTavily(query: string): Promise<TavilyResponse | null> {
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
}

// Agent 2: Analysis Agent - Processes data and creates report
class AnalysisAgent {
  async analyzeData(researchData: ResearchData): Promise<AnalysisReport> {
    console.log('📊 Analysis Agent: Processing research data...')
    
    const insights = this.generateInsights(researchData.rawResults, researchData.metadata.firms, researchData.metadata.theme)
    const executiveSummary = this.generateExecutiveSummary(insights, researchData.metadata)
    const keyFindings = this.extractKeyFindings(insights)
    const recommendations = this.generateRecommendations(insights, researchData.metadata)
    const methodology = this.documentMethodology(researchData)
    const dataQuality = this.assessDataQuality(researchData.rawResults)

    console.log(`📊 Analysis Agent: Generated ${insights.length} insights and ${recommendations.length} recommendations`)

    return {
      insights,
      executiveSummary,
      keyFindings,
      recommendations,
      methodology,
      dataQuality
    }
  }

  private generateInsights(results: TavilySearchResult[], firms: string[], theme: string): MarketInsight[] {
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

    return insights.slice(0, 8)
  }

  private generateExecutiveSummary(insights: MarketInsight[], metadata: { firms: string[], theme: string }): string {
    const highImpactInsights = insights.filter(i => i.impact === 'high')
    const trendInsights = insights.filter(i => i.category === 'trend')
    const opportunityInsights = insights.filter(i => i.category === 'opportunity')

    return `Market research analysis for ${metadata.firms.join(', ')} in ${RESEARCH_THEMES[metadata.theme as keyof typeof RESEARCH_THEMES]?.name} reveals ${insights.length} key insights. ${highImpactInsights.length} high-impact findings identified, with ${trendInsights.length} emerging trends and ${opportunityInsights.length} market opportunities. Analysis based on ${insights.length} validated sources.`
  }

  private extractKeyFindings(insights: MarketInsight[]): string[] {
    return insights
      .filter(insight => insight.confidence === 'high' || insight.impact === 'high')
      .map(insight => `${insight.category.toUpperCase()}: ${insight.title}`)
      .slice(0, 5)
  }

  private generateRecommendations(insights: MarketInsight[], metadata: { firms: string[], theme: string }): string[] {
    const recommendations: string[] = []
    
    const highImpactInsights = insights.filter(i => i.impact === 'high')
    const opportunityInsights = insights.filter(i => i.category === 'opportunity')
    const riskInsights = insights.filter(i => i.category === 'risk')

    if (highImpactInsights.length > 0) {
      recommendations.push('Prioritize monitoring of high-impact market developments identified in research')
    }
    
    if (opportunityInsights.length > 0) {
      recommendations.push('Develop strategic initiatives to capitalize on identified market opportunities')
    }
    
    if (riskInsights.length > 0) {
      recommendations.push('Implement risk mitigation strategies for identified market challenges')
    }

    recommendations.push('Establish ongoing market intelligence program for continuous monitoring')
    recommendations.push('Share findings with key stakeholders to inform strategic decision-making')

    return recommendations
  }

  private documentMethodology(researchData: ResearchData): string {
    return `Research methodology involved ${researchData.searchQueries.length} targeted web searches using Tavily API, focusing on ${researchData.metadata.firms.join(', ')} and ${RESEARCH_THEMES[researchData.metadata.theme as keyof typeof RESEARCH_THEMES]?.name}. Searches conducted across ${researchData.rawResults.length} sources with advanced depth analysis. Data collected on ${researchData.metadata.timestamp}.`
  }

  private assessDataQuality(results: TavilySearchResult[]): 'excellent' | 'good' | 'fair' | 'poor' {
    if (results.length === 0) return 'poor'
    
    const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length
    const recentResults = results.filter(r => r.published_date && new Date(r.published_date) > new Date('2024-01-01'))
    
    if (avgScore > 0.8 && recentResults.length > results.length * 0.7) return 'excellent'
    if (avgScore > 0.6 && recentResults.length > results.length * 0.5) return 'good'
    if (avgScore > 0.4) return 'fair'
    return 'poor'
  }
}

// Agent 3: Review Agent - Reviews and validates the report
class ReviewAgent {
  async reviewReport(analysisReport: AnalysisReport, researchData: ResearchData): Promise<ReviewFeedback> {
    console.log('🔍 Review Agent: Reviewing analysis report...')
    
    const feedback: string[] = []
    const suggestedImprovements: string[] = []
    let confidenceScore = 0.8 // Base confidence

    // Review data quality
    if (analysisReport.dataQuality === 'poor') {
      feedback.push('Data quality assessment indicates poor source reliability')
      suggestedImprovements.push('Consider expanding search queries or using additional data sources')
      confidenceScore -= 0.2
    }

    // Review insights quality
    const highConfidenceInsights = analysisReport.insights.filter(i => i.confidence === 'high')
    if (highConfidenceInsights.length < analysisReport.insights.length * 0.5) {
      feedback.push('Low proportion of high-confidence insights may affect report reliability')
      suggestedImprovements.push('Consider additional validation of low-confidence insights')
      confidenceScore -= 0.1
    }

    // Review recommendations
    if (analysisReport.recommendations.length < 3) {
      feedback.push('Limited number of actionable recommendations provided')
      suggestedImprovements.push('Expand recommendations with more specific strategic guidance')
    }

    // Review methodology
    if (!analysisReport.methodology.includes('Tavily API')) {
      feedback.push('Methodology documentation appears incomplete')
      suggestedImprovements.push('Enhance methodology documentation with technical details')
    }

    // Positive feedback for good aspects
    if (analysisReport.dataQuality === 'excellent') {
      feedback.push('Excellent data quality with high-reliability sources')
      confidenceScore += 0.1
    }

    if (highConfidenceInsights.length > analysisReport.insights.length * 0.7) {
      feedback.push('Strong proportion of high-confidence insights')
      confidenceScore += 0.1
    }

    const approved = confidenceScore >= 0.6 && analysisReport.dataQuality !== 'poor'
    
    console.log(`🔍 Review Agent: Review completed with ${confidenceScore.toFixed(2)} confidence score`)

    return {
      approved,
      feedback,
      suggestedImprovements,
      confidenceScore: Math.max(0, Math.min(1, confidenceScore)),
      qualityAssessment: this.generateQualityAssessment(confidenceScore, analysisReport.dataQuality)
    }
  }

  private generateQualityAssessment(confidenceScore: number, dataQuality: string): string {
    if (confidenceScore >= 0.8 && dataQuality === 'excellent') {
      return 'Excellent quality report with high confidence and reliable data sources'
    } else if (confidenceScore >= 0.6 && dataQuality !== 'poor') {
      return 'Good quality report with acceptable confidence and data quality'
    } else if (confidenceScore >= 0.4) {
      return 'Fair quality report with some concerns about data reliability'
    } else {
      return 'Poor quality report requiring significant improvements before use'
    }
  }
}

// Multi-Agent Orchestrator
class MarketResearchOrchestrator {
  private researchAgent: ResearchAgent
  private analysisAgent: AnalysisAgent
  private reviewAgent: ReviewAgent

  constructor() {
    this.researchAgent = new ResearchAgent()
    this.analysisAgent = new AnalysisAgent()
    this.reviewAgent = new ReviewAgent()
  }

  async executeResearch(firms: string[], theme: string): Promise<MultiAgentResponse> {
    const startTime = Date.now()
    console.log('🚀 Starting multi-agent market research workflow...')

    try {
      // Step 1: Research Agent gathers data
      console.log('📋 Step 1: Research Agent gathering data...')
      const researchData = await this.researchAgent.gatherData(firms, theme)
      
      if (researchData.rawResults.length === 0) {
        throw new Error('No research data collected')
      }

      // Step 2: Analysis Agent processes data
      console.log('📋 Step 2: Analysis Agent processing data...')
      const analysisReport = await this.analysisAgent.analyzeData(researchData)

      // Step 3: Review Agent validates report
      console.log('📋 Step 3: Review Agent reviewing report...')
      const reviewFeedback = await this.reviewAgent.reviewReport(analysisReport, researchData)

      const totalTime = Date.now() - startTime
      console.log(`✅ Multi-agent workflow completed in ${totalTime}ms`)

      return {
        researchData,
        analysisReport,
        reviewFeedback,
        workflowStatus: {
          researchCompleted: true,
          analysisCompleted: true,
          reviewCompleted: true,
          totalTime
        }
      }

    } catch (error) {
      console.error('❌ Multi-agent workflow failed:', error)
      throw error
    }
  }
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

    // Initialize and execute multi-agent workflow
    const orchestrator = new MarketResearchOrchestrator()
    const result = await orchestrator.executeResearch(firms, theme)

    return NextResponse.json(result)

  } catch (error) {
    console.error('Error in multi-agent market research API:', error)
    
    // Return fallback response if workflow fails
    return NextResponse.json({
      researchData: {
        rawResults: [],
        searchQueries: [],
        metadata: {
          firms: [],
          theme: '',
          timestamp: new Date().toISOString()
        }
      },
      analysisReport: {
        insights: [{
          id: 'fallback-1',
          category: 'trend' as const,
          title: 'Market Research Workflow Error',
          description: 'The multi-agent research workflow encountered an error. Please try again or contact support.',
          confidence: 'low' as const,
          impact: 'medium' as const,
          sources: ['Multi-Agent System'],
          timestamp: new Date().toISOString(),
          theme: 'Unknown Theme'
        }],
        executiveSummary: 'Research workflow encountered technical difficulties.',
        keyFindings: ['System error occurred during research process'],
        recommendations: ['Retry the research request', 'Check system configuration'],
        methodology: 'Multi-agent workflow failed to complete successfully',
        dataQuality: 'poor' as const
      },
      reviewFeedback: {
        approved: false,
        feedback: ['Workflow execution failed'],
        suggestedImprovements: ['Check API configurations', 'Verify network connectivity'],
        confidenceScore: 0,
        qualityAssessment: 'Unable to assess quality due to workflow failure'
      },
      workflowStatus: {
        researchCompleted: false,
        analysisCompleted: false,
        reviewCompleted: false,
        totalTime: 0
      }
    })
  }
}