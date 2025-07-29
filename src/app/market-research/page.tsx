"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

import { 
  Search, 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign,
  Lightbulb,
  BarChart3,
  Globe,
  Clock,
  CheckCircle,
  AlertCircle,
  Building2,
  Briefcase
} from 'lucide-react'

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

interface TaxFirm {
  id: string
  name: string
  description: string
  size: 'Big 4' | 'National' | 'Regional'
}

interface ResearchTheme {
  id: string
  name: string
  description: string
  keywords: string[]
}

const TOP_TAX_FIRMS: TaxFirm[] = [
  { id: 'pwc', name: 'PwC', description: 'PricewaterhouseCoopers - Global tax and advisory services', size: 'Big 4' },
  { id: 'ey', name: 'EY', description: 'Ernst & Young - Professional services and tax consulting', size: 'Big 4' },
  { id: 'deloitte', name: 'Deloitte', description: 'Deloitte Tax LLP - Tax consulting and compliance', size: 'Big 4' },
  { id: 'kpmg', name: 'KPMG', description: 'KPMG Tax - Global tax advisory services', size: 'Big 4' },
  { id: 'rst', name: 'RSM', description: 'RSM US - Middle market tax and advisory services', size: 'National' },
  { id: 'bdo', name: 'BDO', description: 'BDO USA - Tax, assurance and advisory services', size: 'National' }
]

const RESEARCH_THEMES: ResearchTheme[] = [
  {
    id: 'ai-tax-use-cases',
    name: 'AI Tax Use Cases',
    description: 'Artificial intelligence applications in tax preparation, compliance, and advisory services',
    keywords: ['AI tax software', 'machine learning tax', 'automated tax compliance', 'tax AI tools', 'intelligent tax processing']
  },
  {
    id: 'compliance-standards',
    name: 'New Compliance Standards',
    description: 'Emerging tax compliance requirements, regulations, and reporting standards',
    keywords: ['tax compliance updates', 'new tax regulations', 'reporting standards', 'tax law changes', 'compliance requirements']
  }
]

const MarketResearchAgent: React.FC = () => {
  const [selectedFirms, setSelectedFirms] = useState<string[]>([])
  const [selectedTheme, setSelectedTheme] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [insights, setInsights] = useState<MarketInsight[]>([])
  const [activeTab, setActiveTab] = useState<'research' | 'analysis'>('research')

  const handleFirmSelection = (firmId: string, checked: boolean) => {
    if (checked) {
      setSelectedFirms(prev => [...prev, firmId])
    } else {
      setSelectedFirms(prev => prev.filter(id => id !== firmId))
    }
  }

  const handleResearch = async () => {
    if (selectedFirms.length === 0 || !selectedTheme) {
      alert('Please select at least one firm and a research theme')
      return
    }
    
    setIsAnalyzing(true)
    
    try {
      const response = await fetch('/api/market-research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firms: selectedFirms,
          theme: selectedTheme,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to conduct market research')
      }

      const data = await response.json()
      setInsights(data.insights)
    } catch (error) {
      console.error('Error conducting market research:', error)
      alert('Failed to conduct market research. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'trend': return <TrendingUp className="w-4 h-4" />
      case 'competitor': return <Users className="w-4 h-4" />
      case 'opportunity': return <Target className="w-4 h-4" />
      case 'risk': return <AlertCircle className="w-4 h-4" />
      default: return <Lightbulb className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'trend': return 'bg-blue-100 text-blue-700'
      case 'competitor': return 'bg-purple-100 text-purple-700'
      case 'opportunity': return 'bg-green-100 text-green-700'
      case 'risk': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Market Research Agent</h1>
        <p className="text-gray-600">AI-powered market intelligence and competitive analysis for tax automation solutions</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('research')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'research'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Research Query
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'analysis'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Market Analysis
        </button>
      </div>

      {activeTab === 'research' && (
        <div className="space-y-6">
          {/* Firm Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Select Tax/Accounting Firms to Follow
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TOP_TAX_FIRMS.map((firm) => (
                  <div key={firm.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      id={firm.id}
                      checked={selectedFirms.includes(firm.id)}
                      onChange={(e) => handleFirmSelection(firm.id, e.target.checked)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <label htmlFor={firm.id} className="font-medium text-gray-900 cursor-pointer">
                          {firm.name}
                        </label>
                        <Badge variant="outline" className="text-xs">
                          {firm.size}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{firm.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Theme Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Select Market Trend Theme
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {RESEARCH_THEMES.map((theme) => (
                  <div key={theme.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      id={theme.id}
                      name="theme"
                      value={theme.id}
                      checked={selectedTheme === theme.id}
                      onChange={(e) => setSelectedTheme(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label htmlFor={theme.id} className="font-medium text-gray-900 cursor-pointer block">
                        {theme.name}
                      </label>
                      <p className="text-sm text-gray-600 mt-1">{theme.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {theme.keywords.slice(0, 3).map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Research Button */}
          <Card>
            <CardContent className="p-6">
              <Button 
                onClick={handleResearch}
                disabled={selectedFirms.length === 0 || !selectedTheme || isAnalyzing}
                className="w-full h-12"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Conducting Market Research...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Start Agentic Market Research
                  </>
                )}
              </Button>
              {(selectedFirms.length > 0 || selectedTheme) && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Research Configuration:</strong>
                    {selectedFirms.length > 0 && (
                      <span className="block mt-1">• Following {selectedFirms.length} firm{selectedFirms.length > 1 ? 's' : ''}: {selectedFirms.map(id => TOP_TAX_FIRMS.find(f => f.id === id)?.name).join(', ')}</span>
                    )}
                    {selectedTheme && (
                      <span className="block mt-1">• Theme: {RESEARCH_THEMES.find(t => t.id === selectedTheme)?.name}</span>
                    )}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Research Results */}
          {insights.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Market Insights</h3>
              {insights.map((insight) => (
                <Card key={insight.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(insight.category)}
                        <Badge className={getCategoryColor(insight.category)}>
                          {insight.category.toUpperCase()}
                        </Badge>
                        {insight.firm && (
                          <Badge variant="outline" className="text-xs">
                            {insight.firm}
                          </Badge>
                        )}
                        {insight.theme && (
                          <Badge variant="secondary" className="text-xs">
                            {insight.theme}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Globe className="w-3 h-3" />
                        <Clock className="w-3 h-3" />
                        {new Date(insight.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                    <p className="text-gray-600 mb-4">{insight.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">Confidence:</span>
                          <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                            {insight.confidence.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">Impact:</span>
                          <span className={`text-xs font-medium ${getConfidenceColor(insight.impact)}`}>
                            {insight.impact.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">Sources:</span>
                        <span className="text-xs text-gray-700">{insight.sources.length} web sources</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="space-y-6">
          {/* Market Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Market Size</p>
                    <p className="text-2xl font-bold text-gray-900">$2.4B</p>
                    <p className="text-xs text-gray-500">Tax Tech Industry</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Growth Rate</p>
                    <p className="text-2xl font-bold text-gray-900">23%</p>
                    <p className="text-xs text-gray-500">YoY AI Adoption</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Opportunity Score</p>
                    <p className="text-2xl font-bold text-gray-900">8.7/10</p>
                    <p className="text-xs text-gray-500">AI Document Search</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Competitive Landscape */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Competitive Landscape
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Document AI Integration</h4>
                    <p className="text-sm text-gray-600">Current market gap in tax-specific document processing</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">High Opportunity</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">SMB Market Penetration</h4>
                    <p className="text-sm text-gray-600">Limited solutions targeting small-medium businesses</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">Medium Opportunity</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Enterprise Solutions</h4>
                    <p className="text-sm text-gray-600">Saturated market with established players</p>
                  </div>
                  <Badge className="bg-red-100 text-red-700">Low Opportunity</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default MarketResearchAgent