"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Zap, 
  DollarSign, 
  CheckCircle,
  AlertCircle,
  Info,
  FileText
} from 'lucide-react'
import AutomationVsAIAnalysis from './automation-vs-ai-analysis'

// **HARDCODED DATA**: This replaces the Supabase data fetching to work on networks that block external connections
// Each data point represents a tax automation/AI opportunity plotted by Volume (value/time savings) vs Complexity (risk/difficulty)
interface AutomationOpportunity {
  id: string
  name: string
  volume: number // Represents potential value/time savings (0-100%)
  complexity: number // Represents implementation complexity/risk (0-100%)
  category: 'high-priority' | 'medium-priority' | 'low-priority'
  description: string
  solution_type: 'ai' | 'automation'
  solution_reasoning: string
  created_at?: string
  updated_at?: string
}

// **HARDCODED AUTOMATION OPPORTUNITIES**: These data points are plotted on the chart
// High-priority opportunities (High Value, Low Risk) - Best candidates for implementation
// Medium-priority opportunities (Moderate value/risk balance)
// Low-priority opportunities (High Risk or Low Value) - Require careful evaluation
const HARDCODED_OPPORTUNITIES: AutomationOpportunity[] = [
  // HIGH PRIORITY OPPORTUNITIES (High Value, Low Risk - Bottom Right Quadrant)
  {
    id: '1',
    name: 'AI Document Search',
    volume: 85, // High value/time savings - saves hours of manual document searching
    complexity: 25, // Low complexity/risk - well-established AI technology
    category: 'high-priority',
    description: 'AI-powered search and retrieval across tax documents, regulations, and case law for rapid information access.',
    solution_type: 'ai',
    solution_reasoning: 'Natural language processing enables intuitive search queries while vector embeddings provide accurate semantic matching across large document repositories.'
  },
  {
    id: '2',
    name: 'Tax Trends Market Research',
    volume: 88, // Very high value - automates time-consuming research tasks
    complexity: 20, // Very low complexity - leverages existing AI capabilities
    category: 'high-priority',
    description: 'AI-powered analysis of tax trends, market developments, and regulatory changes to provide strategic insights for tax planning and compliance.',
    solution_type: 'ai',
    solution_reasoning: 'Natural language processing and data analysis capabilities enable automated monitoring of tax trends, regulatory updates, and market developments across multiple sources.'
  },
  {
    id: '3',
    name: 'Communication Drafting',
    volume: 75, // High value - automates routine communication tasks
    complexity: 15, // Very low complexity - template-based AI generation
    category: 'high-priority',
    description: 'AI-assisted drafting of client communications, tax letters, and regulatory responses with automated tone adjustment and compliance checking.',
    solution_type: 'ai',
    solution_reasoning: 'Natural language generation and template-based systems enable rapid creation of professional communications while ensuring consistency and compliance.'
  },
  {
    id: '4',
    name: 'Tax Compliance Scenarios',
    volume: 82, // High value - improves analysis speed and accuracy
    complexity: 18, // Low complexity - rule-based analysis
    category: 'high-priority',
    description: 'AI-powered analysis of tax cases to identify risks and compliance considerations through structured scenario modeling and regulatory framework analysis.',
    solution_type: 'ai',
    solution_reasoning: 'Rule-based analysis combined with natural language processing enables systematic evaluation of tax scenarios and identification of compliance risks.'
  },
  {
    id: '5',
    name: 'Internal AI Search',
    volume: 82, // High value - significantly improves knowledge access
    complexity: 28, // Low complexity - similar to document search but internal
    category: 'high-priority',
    description: 'AI-powered search and retrieval across internal tax documents, templates, procedures, and knowledge bases for rapid information access and knowledge sharing.',
    solution_type: 'ai',
    solution_reasoning: 'Natural language processing and vector embeddings enable intuitive search queries across internal document repositories, providing quick access to organizational knowledge.'
  },
  {
    id: '6',
    name: 'Tax Compliance Simulation',
    volume: 76, // High value - enables better decision making
    complexity: 32, // Medium complexity - requires predictive modeling
    category: 'high-priority',
    description: 'AI-powered simulation and modeling of tax compliance scenarios to predict outcomes, identify risks, and optimize tax strategies before implementation.',
    solution_type: 'ai',
    solution_reasoning: 'Machine learning and predictive modeling enable sophisticated simulation of tax scenarios, allowing for risk assessment and strategy optimization.'
  },
  {
    id: '7',
    name: 'Automated Tax Form Population',
    volume: 90, // Very high value - eliminates manual data entry
    complexity: 35, // Medium complexity - requires integration with multiple systems
    category: 'high-priority',
    description: 'Automated extraction and population of tax forms from client data sources, reducing manual data entry and improving accuracy.',
    solution_type: 'automation',
    solution_reasoning: 'Rule-based automation can systematically extract data from structured sources and populate standard tax forms, eliminating manual errors and saving significant time.'
  },
  {
    id: '8',
    name: 'Basic Tax Calculation Automation',
    volume: 80, // High value - eliminates repetitive calculations
    complexity: 20, // Low complexity - straightforward rule implementation
    category: 'high-priority',
    description: 'Automated calculation of standard tax computations including depreciation, deductions, and basic tax liability calculations.',
    solution_type: 'automation',
    solution_reasoning: 'Tax calculations follow well-defined rules that can be easily automated, providing consistent results and freeing up professional time for complex analysis.'
  },

  // MEDIUM PRIORITY OPPORTUNITIES (Balanced value/risk)
  {
    id: '9',
    name: 'Client Risk Assessment AI',
    volume: 70, // Good value - improves risk management
    complexity: 45, // Medium complexity - requires sophisticated modeling
    category: 'medium-priority',
    description: 'AI-powered assessment of client tax compliance risks based on historical data, industry patterns, and regulatory changes.',
    solution_type: 'ai',
    solution_reasoning: 'Machine learning algorithms can analyze patterns in client data and regulatory requirements to identify potential compliance risks and recommend preventive measures.'
  },
  {
    id: '10',
    name: 'Automated Deadline Tracking',
    volume: 65, // Moderate value - prevents missed deadlines
    complexity: 25, // Low complexity - calendar and notification system
    category: 'medium-priority',
    description: 'Automated tracking and notification system for tax deadlines, filing requirements, and compliance milestones across multiple jurisdictions.',
    solution_type: 'automation',
    solution_reasoning: 'Calendar-based automation with rule engines can track complex deadline requirements and send timely notifications, reducing the risk of missed deadlines.'
  },
  {
    id: '11',
    name: 'Tax Code Change Monitoring',
    volume: 72, // Good value - keeps team updated on changes
    complexity: 40, // Medium complexity - requires natural language processing
    category: 'medium-priority',
    description: 'Automated monitoring and summarization of tax code changes, new regulations, and court decisions relevant to client portfolios.',
    solution_type: 'ai',
    solution_reasoning: 'Natural language processing can monitor regulatory sources and identify relevant changes, automatically categorizing and summarizing impacts for different client types.'
  },
  {
    id: '12',
    name: 'Expense Categorization AI',
    volume: 68, // Moderate value - improves data processing efficiency
    complexity: 35, // Medium complexity - requires training on tax categories
    category: 'medium-priority',
    description: 'AI-powered categorization of business expenses into appropriate tax categories with confidence scoring and exception handling.',
    solution_type: 'ai',
    solution_reasoning: 'Machine learning models can learn from historical categorizations to automatically classify expenses, reducing manual review time while maintaining accuracy through confidence scoring.'
  },

  // LOW PRIORITY OPPORTUNITIES (High Risk or Lower Value)
  {
    id: '13',
    name: 'Complex Tax Strategy Optimization',
    volume: 85, // High potential value
    complexity: 90, // Very high complexity - requires expert-level AI
    category: 'low-priority',
    description: 'AI-powered optimization of complex multi-jurisdictional tax strategies considering regulatory constraints and business objectives.',
    solution_type: 'ai',
    solution_reasoning: 'While potentially valuable, complex tax strategy optimization requires sophisticated AI that can understand nuanced tax law interactions and business contexts, presenting significant implementation risks.'
  },
  {
    id: '14',
    name: 'Audit Defense Automation',
    volume: 60, // Moderate value - not frequent but important
    complexity: 80, // High complexity - requires expert knowledge
    category: 'low-priority',
    description: 'Automated preparation of audit defense documentation and response strategies based on historical audit outcomes and regulatory precedents.',
    solution_type: 'ai',
    solution_reasoning: 'Audit defense requires deep expertise and nuanced understanding of regulatory relationships, making full automation risky without significant human oversight.'
  },
  {
    id: '15',
    name: 'Tax Court Case Prediction',
    volume: 45, // Lower value - specialized use case
    complexity: 85, // Very high complexity - requires legal AI expertise
    category: 'low-priority',
    description: 'AI-powered prediction of tax court case outcomes based on case facts, historical precedents, and judge characteristics.',
    solution_type: 'ai',
    solution_reasoning: 'Legal outcome prediction requires sophisticated AI with deep understanding of legal precedents and judicial behavior, making it complex and risky to implement accurately.'
  },
  {
    id: '16',
    name: 'Basic Data Entry Automation',
    volume: 40, // Lower value - limited scope
    complexity: 15, // Low complexity - simple automation
    category: 'low-priority',
    description: 'Automated data entry for routine tax preparation tasks including basic client information and standard deductions.',
    solution_type: 'automation',
    solution_reasoning: 'While easy to implement, basic data entry automation provides limited value compared to more comprehensive solutions and may not justify investment costs.'
  },
  {
    id: '17',
    name: 'Client Interview Scheduling',
    volume: 35, // Lower value - administrative task
    complexity: 20, // Low complexity - standard scheduling automation
    category: 'low-priority',
    description: 'Automated scheduling system for client interviews and consultations with calendar integration and reminder notifications.',
    solution_type: 'automation',
    solution_reasoning: 'Scheduling automation is straightforward to implement but provides limited business value compared to core tax process improvements.'
  },
  {
    id: '18',
    name: 'Advanced AI Tax Advisory',
    volume: 95, // Very high potential value
    complexity: 95, // Extremely high complexity - essentially requires AI tax expert
    category: 'low-priority',
    description: 'Comprehensive AI tax advisor capable of providing strategic tax planning advice across complex scenarios and multiple jurisdictions.',
    solution_type: 'ai',
    solution_reasoning: 'While potentially transformative, creating an AI system capable of expert-level tax advisory requires breakthrough AI capabilities and presents significant liability and accuracy risks.'
  }
]

const AutomationChart: React.FC = () => {
  const [automationOpportunities, setAutomationOpportunities] = useState<AutomationOpportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('high-priority')

  // **LOAD HARDCODED DATA**: This simulates the async data loading but uses local data
  useEffect(() => {
    const loadHardcodedData = async () => {
      try {
        setLoading(true)
        // Simulate a brief loading time to maintain the user experience
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Load the hardcoded opportunities data
        setAutomationOpportunities(HARDCODED_OPPORTUNITIES)
        setError(null)
      } catch (err) {
        console.error('Error loading hardcoded opportunities:', err)
        setError('Failed to load automation opportunities')
      } finally {
        setLoading(false)
      }
    }

    loadHardcodedData()
  }, [])

  // **NOTE**: The following add functions are disabled since we're using hardcoded data
  // In a production environment with database access, these would allow adding new opportunities
  const handleAddDocumentSearch = async () => {
    alert('ℹ️ Using hardcoded data - add functionality disabled')
  }

  const handleAddTaxTrendsMarketResearch = async () => {
    alert('ℹ️ Using hardcoded data - add functionality disabled')
  }

  const handleAddCommunicationDrafting = async () => {
    alert('ℹ️ Using hardcoded data - add functionality disabled')
  }

  const handleAddTaxComplianceScenarios = async () => {
    alert('ℹ️ Using hardcoded data - add functionality disabled')
  }

  const handleAddInternalAISearch = async () => {
    alert('ℹ️ Using hardcoded data - add functionality disabled')
  }

  const handleAddTaxComplianceSimulation = async () => {
    alert('ℹ️ Using hardcoded data - add functionality disabled')
  }

  // **COLOR CODING**: Different colors represent different priority categories based on value vs complexity analysis
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'high-priority': // High value, low risk - green (go ahead)
        return 'bg-green-500 border-green-600'
      case 'medium-priority': // Balanced value/risk - yellow (proceed with caution)
        return 'bg-yellow-500 border-yellow-600'
      case 'low-priority': // High risk or low value - red (careful evaluation needed)
        return 'bg-red-500 border-red-600'
      default:
        return 'bg-gray-500 border-gray-600'
    }
  }

  // **CATEGORY LABELS**: Human-readable descriptions of what each priority level means
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'high-priority':
        return 'High Volume, Low Complexity' // Best automation candidates
      case 'medium-priority':
        return 'Medium Priority' // Moderate automation potential
      case 'low-priority':
        return 'Low Volume, High Complexity' // Requires careful evaluation
      default:
        return 'Unknown'
    }
  }

  const getCategoryDisplayData = (category: string) => {
    switch (category) {
      case 'high-priority':
        return {
          title: 'High Priority Opportunities',
          subtitle: 'Best candidates for AI automation',
          bgColor: 'bg-green-50/50',
          borderColor: 'border-green-200/50',
          dotColor: 'bg-green-500',
          colorClass: 'bg-green-500 border-green-600'
        }
      case 'medium-priority':
        return {
          title: 'Medium Priority Opportunities',
          subtitle: 'Moderate automation potential',
          bgColor: 'bg-yellow-50/50',
          borderColor: 'border-yellow-200/50',
          dotColor: 'bg-yellow-500',
          colorClass: 'bg-yellow-500 border-yellow-600'
        }
      case 'low-priority':
        return {
          title: 'Low Priority Opportunities',
          subtitle: 'Complex processes requiring careful evaluation',
          bgColor: 'bg-red-50/50',
          borderColor: 'border-red-200/50',
          dotColor: 'bg-red-500',
          colorClass: 'bg-red-500 border-red-600'
        }
      default:
        return {
          title: 'Unknown Category',
          subtitle: '',
          bgColor: 'bg-gray-50/50',
          borderColor: 'border-gray-200/50',
          dotColor: 'bg-gray-500',
          colorClass: 'bg-gray-500 border-gray-600'
        }
    }
  }

  const getAutomationRecommendation = (opportunity: AutomationOpportunity) => {
    const { volume, complexity } = opportunity
    
    if (volume >= 70 && complexity <= 30) {
      return {
        type: 'Immediate Implementation',
        icon: <CheckCircle className="w-4 h-4 text-green-600" />,
        color: 'text-green-600',
        description: 'Perfect candidate for AI automation. High volume with low complexity ensures quick ROI.'
      }
    } else if (volume >= 50 && complexity <= 50) {
      return {
        type: 'High Priority',
        icon: <TrendingUp className="w-4 h-4 text-blue-600" />,
        color: 'text-blue-600',
        description: 'Strong automation candidate. Consider implementing in Phase 1 of automation rollout.'
      }
    } else if (volume >= 30 && complexity <= 70) {
      return {
        type: 'Medium Priority',
        icon: <Clock className="w-4 h-4 text-yellow-600" />,
        color: 'text-yellow-600',
        description: 'Moderate automation potential. May require more sophisticated AI solutions.'
      }
    } else {
      return {
        type: 'Low Priority',
        icon: <AlertCircle className="w-4 h-4 text-red-600" />,
        color: 'text-red-600',
        description: 'Complex process with lower volume. Consider human-AI collaboration instead.'
      }
    }
  }

  const getEstimatedROI = (opportunity: AutomationOpportunity) => {
    const { volume, complexity } = opportunity
    const baseROI = (volume / 10) * (1 - complexity / 100)
    
    if (baseROI >= 7) return { value: '300-500%', timeline: '6-12 months' }
    if (baseROI >= 5) return { value: '200-300%', timeline: '9-15 months' }
    if (baseROI >= 3) return { value: '150-250%', timeline: '12-18 months' }
    return { value: '100-150%', timeline: '18+ months' }
  }

  const getImplementationEffort = (complexity: number) => {
    if (complexity <= 30) return { level: 'Low', timeline: '2-4 weeks', description: 'Simple rule-based automation' }
    if (complexity <= 60) return { level: 'Medium', timeline: '6-12 weeks', description: 'Moderate AI model training required' }
    return { level: 'High', timeline: '3-6 months', description: 'Complex AI solution with extensive training' }
  }

  const DetailedPopoverContent = ({ opportunity }: { opportunity: AutomationOpportunity }) => {
    const recommendation = getAutomationRecommendation(opportunity)
    const roi = getEstimatedROI(opportunity)
    const effort = getImplementationEffort(opportunity.complexity)

    return (
      <div className="space-y-3 max-w-80">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-3">
              <h4 className="font-semibold text-gray-900 text-sm leading-tight">{opportunity.name}</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{opportunity.description}</p>
            </div>
            <div className={`w-3 h-3 rounded-full ${getCategoryColor(opportunity.category)}`} />
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-gray-700">Volume</span>
            <span className="font-bold text-blue-700">{opportunity.volume}%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-gray-700">Complexity</span>
            <span className="font-bold text-purple-700">{opportunity.complexity}%</span>
          </div>
        </div>

        {/* Recommendation */}
        <div className="space-y-2">
          <span className={`text-xs font-semibold ${recommendation.color}`}>{recommendation.type}</span>
          <p className="text-xs text-gray-600 leading-relaxed">{recommendation.description}</p>
        </div>

        {/* ROI & Timeline */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-gray-700">Estimated ROI</span>
            <span className="text-green-700 font-medium">{roi.value}</span>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-gray-700">ROI Timeline</span>
            <span className="text-gray-600">{roi.timeline}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-gray-700">Implementation</span>
            <span className={
              effort.level === 'Low' ? 'text-green-700' :
              effort.level === 'Medium' ? 'text-yellow-700' :
              'text-red-700'
            }>
              {effort.level} ({effort.timeline})
            </span>
          </div>
        </div>

        {/* Implementation Details */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-blue-700">Implementation Approach</span>
          <p className="text-xs text-gray-600 leading-relaxed">{effort.description}</p>
        </div>

        {/* Category Badge */}
        <div className="pt-2 border-t border-gray-200">
          <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(opportunity.category)} text-white`}>
            {getCategoryBadge(opportunity.category)}
          </span>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading automation opportunities...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card className="bg-white/80 backdrop-blur-sm border-red-200/50 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <p className="text-red-600 mb-2">{error}</p>
                <p className="text-gray-600 text-sm">Please check your Supabase connection and try again.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">Tax AI Opportunities</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
            Potential Value/Time Savings vs Complexity/Risk analysis of AI opportunities in tax functions
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Click on any data point for detailed analysis</span>
          </div>
          
        </div>
        <div>
          <div className="relative">
            {/* Chart Container */}
            <div className="relative w-full h-96 rounded-lg p-6">
              {/* Axes */}
              <div className="absolute bottom-6 left-6 right-6 h-px bg-gray-300"></div>
              <div className="absolute bottom-6 left-6 top-6 w-px bg-gray-300"></div>
              
              {/* Axis Labels */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700">
                Potential Value/Time Savings →
              </div>
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-gray-700">
                Complexity/Risk →
              </div>

              {/* Quadrant Labels */}
              <div className="absolute top-8 right-8 text-xs text-gray-500 font-medium">
                High Value<br/>High Risk
              </div>
              <div className="absolute top-8 left-8 text-xs text-gray-500 font-medium">
                Low Value<br/>High Risk
              </div>
              <div className="absolute bottom-8 left-8 text-xs text-gray-500 font-medium">
                Low Value<br/>Low Risk
              </div>
              <div className="absolute bottom-8 right-8 text-xs text-gray-500 font-medium">
                High Value<br/>Low Risk
              </div>

              {/* Data Points */}
              {automationOpportunities.map((opportunity) => {
                const x = 6 + (opportunity.volume / 100) * (100 - 12)
                const y = 6 + ((100 - opportunity.complexity) / 100) * (100 - 12)
                const isSelectedSolution = opportunity.name === 'AI Document Search'
                const isTaxTrendsResearch = opportunity.name === 'Tax Trends Market Research'
                const isCommunicationDrafting = opportunity.name === 'Communication Drafting'
                const isTaxComplianceScenarios = opportunity.name === 'Tax Compliance Scenarios'
                const isInternalAISearch = opportunity.name === 'Internal AI Search'
                const isTaxComplianceSimulation = opportunity.name === 'Tax Compliance Simulation'
                
                return (
                  <Popover key={opportunity.id}>
                    <PopoverTrigger asChild>
                      <button
                        className={`absolute w-4 h-4 rounded-full border-2 ${getCategoryColor(opportunity.category)} transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-110 ${
                          isSelectedSolution ? 'ring-4 ring-purple-400 ring-opacity-60 shadow-lg shadow-purple-200 animate-pulse' : ''
                        } ${
                          isTaxTrendsResearch ? 'ring-4 ring-blue-400 ring-opacity-60 shadow-lg shadow-blue-200 animate-pulse' : ''
                        } ${
                          isCommunicationDrafting ? 'ring-4 ring-emerald-400 ring-opacity-60 shadow-lg shadow-emerald-200 animate-pulse' : ''
                        } ${
                          isTaxComplianceScenarios ? 'ring-4 ring-orange-400 ring-opacity-60 shadow-lg shadow-orange-200 animate-pulse' : ''
                        } ${
                          isInternalAISearch ? 'ring-4 ring-indigo-400 ring-opacity-60 shadow-lg shadow-indigo-200 animate-pulse' : ''
                        } ${
                          isTaxComplianceSimulation ? 'ring-4 ring-teal-400 ring-opacity-60 shadow-lg shadow-teal-200 animate-pulse' : ''
                        }`}
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                        }}
                        aria-label={`View details for ${opportunity.name}`}
                      />
                    </PopoverTrigger>
                    <PopoverContent 
                      className="p-4 border border-gray-200/50 shadow-xl bg-white/95 backdrop-blur-sm"
                      align="start"
                      side="right"
                      sideOffset={15}
                    >
                      <DetailedPopoverContent opportunity={opportunity} />
                    </PopoverContent>
                  </Popover>
                )
              })}

              {/* Grid Lines */}
              <div className="absolute inset-6 pointer-events-none">
                {[25, 50, 75].map((percent) => (
                  <React.Fragment key={percent}>
                    <div 
                      className="absolute w-full h-px bg-gray-200/50"
                      style={{ top: `${100 - percent}%` }}
                    />
                    <div 
                      className="absolute h-full w-px bg-gray-200/50"
                      style={{ left: `${percent}%` }}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Legend and Opportunities List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Legend */}
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Legend</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Click to view opportunities</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100">Priority Categories</h5>
              <button
                onClick={() => setSelectedCategory('high-priority')}
                className={`w-full text-left p-1 text-xs transition-colors ${
                  selectedCategory === 'high-priority' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                High Value, Low Risk
              </button>
              <button
                onClick={() => setSelectedCategory('medium-priority')}
                className={`w-full text-left p-1 text-xs transition-colors ${
                  selectedCategory === 'medium-priority' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Medium Priority
              </button>
              <button
                onClick={() => setSelectedCategory('low-priority')}
                className={`w-full text-left p-1 text-xs transition-colors ${
                  selectedCategory === 'low-priority' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Low Value, High Risk
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Opportunities List */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getCategoryDisplayData(selectedCategory).dotColor}`}></div>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{getCategoryDisplayData(selectedCategory).title}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{getCategoryDisplayData(selectedCategory).subtitle}</p>
          </div>
          <div>
            <div className="space-y-3">
              {automationOpportunities
                .filter(op => op.category === selectedCategory)
                .slice(0, 12)
                .map((opportunity) => {
                  return (
                    <div key={opportunity.id} className="flex items-start justify-between p-2 border-b border-gray-200/50 last:border-b-0">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{opportunity.name}</h4>
                          <Badge 
                            className={`text-xs ${
                              opportunity.solution_type === 'ai' 
                                ? 'bg-purple-100 text-purple-700 hover:bg-purple-100' 
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                            }`}
                          >
                            {opportunity.solution_type === 'ai' ? 'AI' : 'Automation'}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-tight">{opportunity.description}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic leading-tight">{opportunity.solution_reasoning}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Badge variant="secondary" className="text-xs">
                          V: {opportunity.volume}%
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          C: {opportunity.complexity}%
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              {automationOpportunities.filter(op => op.category === selectedCategory).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No opportunities found for this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AutomationChart