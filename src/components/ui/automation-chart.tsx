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
  Info
} from 'lucide-react'
import AutomationVsAIAnalysis from './automation-vs-ai-analysis'
import { getAutomationOpportunities, type AutomationOpportunity } from '@/lib/automation-data'

const AutomationChart: React.FC = () => {
  const [automationOpportunities, setAutomationOpportunities] = useState<AutomationOpportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('high-priority')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const opportunities = await getAutomationOpportunities()
        setAutomationOpportunities(opportunities)
        setError(null)
      } catch (err) {
        console.error('Error fetching automation opportunities:', err)
        setError('Failed to load automation opportunities')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])


  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'high-priority':
        return 'bg-green-500 border-green-600'
      case 'medium-priority':
        return 'bg-yellow-500 border-yellow-600'
      case 'low-priority':
        return 'bg-red-500 border-red-600'
      default:
        return 'bg-gray-500 border-gray-600'
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'high-priority':
        return 'High Volume, Low Complexity'
      case 'medium-priority':
        return 'Medium Priority'
      case 'low-priority':
        return 'Low Volume, High Complexity'
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
      <div className="space-y-4 max-w-80">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-3">
              <h4 className="font-bold text-gray-900 text-base leading-tight">{opportunity.name}</h4>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{opportunity.description}</p>
            </div>
            <div className={`w-4 h-4 rounded-full ${getCategoryColor(opportunity.category)} shadow-sm`} />
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-3 border border-blue-200/30">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-gray-700">Volume</span>
            </div>
            <div className="text-xl font-bold text-blue-700">{opportunity.volume}%</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-3 border border-purple-200/30">
            <div className="flex items-center space-x-2 mb-1">
              <Target className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-medium text-gray-700">Complexity</span>
            </div>
            <div className="text-xl font-bold text-purple-700">{opportunity.complexity}%</div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-200/30">
          <div className="flex items-center space-x-2 mb-2">
            {recommendation.icon}
            <span className={`font-semibold ${recommendation.color}`}>{recommendation.type}</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{recommendation.description}</p>
        </div>

        {/* ROI & Timeline */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Estimated ROI</span>
            </div>
            <Badge variant="secondary" className="text-green-700 bg-green-100">
              {roi.value}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">ROI Timeline</span>
            </div>
            <span className="text-sm text-gray-600">{roi.timeline}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">Implementation</span>
            </div>
            <Badge variant="outline" className={
              effort.level === 'Low' ? 'text-green-700 border-green-300' :
              effort.level === 'Medium' ? 'text-yellow-700 border-yellow-300' :
              'text-red-700 border-red-300'
            }>
              {effort.level} ({effort.timeline})
            </Badge>
          </div>
        </div>

        {/* Implementation Details */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-xl p-4 border border-blue-200/30">
          <div className="flex items-center space-x-2 mb-2">
            <Info className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-blue-700">Implementation Approach</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{effort.description}</p>
        </div>

        {/* Category Badge */}
        <div className="pt-2 border-t border-gray-200">
          <Badge className={`${getCategoryColor(opportunity.category)} text-white border-0`}>
            {getCategoryBadge(opportunity.category)}
          </Badge>
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
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-xl font-semibold">Banking Tax Automation Opportunities</span>
            <Badge variant="outline" className="text-sm">
              Research Analysis
            </Badge>
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Volume vs Complexity analysis of potential AI automation opportunities in banking tax functions
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-xs text-blue-600 font-medium">Click on any data point for detailed analysis</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Chart Container */}
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 rounded-lg p-6">
              {/* Axes */}
              <div className="absolute bottom-6 left-6 right-6 h-px bg-gray-300"></div>
              <div className="absolute bottom-6 left-6 top-6 w-px bg-gray-300"></div>
              
              {/* Axis Labels */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700">
                Volume →
              </div>
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-gray-700">
                Complexity →
              </div>

              {/* Quadrant Labels */}
              <div className="absolute top-8 right-8 text-xs text-gray-500 font-medium">
                High Volume<br/>High Complexity
              </div>
              <div className="absolute top-8 left-8 text-xs text-gray-500 font-medium">
                Low Volume<br/>High Complexity
              </div>
              <div className="absolute bottom-8 left-8 text-xs text-gray-500 font-medium">
                Low Volume<br/>Low Complexity
              </div>
              <div className="absolute bottom-8 right-8 text-xs text-gray-500 font-medium">
                High Volume<br/>Low Complexity
              </div>

              {/* Data Points */}
              {automationOpportunities.map((opportunity) => {
                const x = 6 + (opportunity.volume / 100) * (100 - 12)
                const y = 6 + ((100 - opportunity.complexity) / 100) * (100 - 12)
                
                return (
                  <Popover key={opportunity.id}>
                    <PopoverTrigger asChild>
                      <button
                        className={`absolute w-4 h-4 rounded-full border-2 ${getCategoryColor(opportunity.category)} transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-110`}
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
        </CardContent>
      </Card>

      {/* Legend and Opportunities List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Legend */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Legend</CardTitle>
            <p className="text-sm text-gray-600">Click to view opportunities</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <button
              onClick={() => setSelectedCategory('high-priority')}
              className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 hover:bg-green-50 ${
                selectedCategory === 'high-priority' ? 'bg-green-100 border border-green-200' : ''
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-600"></div>
              <span className="text-sm font-medium">High Volume, Low Complexity</span>
            </button>
            <button
              onClick={() => setSelectedCategory('medium-priority')}
              className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 hover:bg-yellow-50 ${
                selectedCategory === 'medium-priority' ? 'bg-yellow-100 border border-yellow-200' : ''
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-yellow-600"></div>
              <span className="text-sm font-medium">Medium Priority</span>
            </button>
            <button
              onClick={() => setSelectedCategory('low-priority')}
              className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 hover:bg-red-50 ${
                selectedCategory === 'low-priority' ? 'bg-red-100 border border-red-200' : ''
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-red-600"></div>
              <span className="text-sm font-medium">Low Volume, High Complexity</span>
            </button>
          </CardContent>
        </Card>

        {/* Dynamic Opportunities List */}
        <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getCategoryDisplayData(selectedCategory).dotColor}`}></div>
              <span>{getCategoryDisplayData(selectedCategory).title}</span>
            </CardTitle>
            <p className="text-sm text-gray-600">{getCategoryDisplayData(selectedCategory).subtitle}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {automationOpportunities
                .filter(op => op.category === selectedCategory)
                .slice(0, 6)
                .map((opportunity) => {
                  const displayData = getCategoryDisplayData(selectedCategory)
                  return (
                    <div key={opportunity.id} className={`flex items-start justify-between p-3 ${displayData.bgColor} rounded-lg border ${displayData.borderColor}`}>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{opportunity.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">{opportunity.description}</p>
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
          </CardContent>
        </Card>
      </div>

      {/* Automation vs AI Analysis */}
      <AutomationVsAIAnalysis />
    </div>
  )
}

export default AutomationChart