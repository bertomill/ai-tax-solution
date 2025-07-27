"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AutomationOpportunity {
  id: string
  name: string
  volume: number
  complexity: number
  category: 'high-priority' | 'medium-priority' | 'low-priority'
  description: string
}

const automationOpportunities: AutomationOpportunity[] = [
  {
    id: '1',
    name: 'Daily Cash Position Reports',
    volume: 85,
    complexity: 25,
    category: 'high-priority',
    description: 'Automated generation of daily cash position reports from multiple banking systems'
  },
  {
    id: '2',
    name: 'Tax Document Classification',
    volume: 90,
    complexity: 35,
    category: 'high-priority',
    description: 'AI-powered classification and routing of incoming tax documents'
  },
  {
    id: '3',
    name: 'Regulatory Filing Validation',
    volume: 75,
    complexity: 45,
    category: 'high-priority',
    description: 'Automated validation of regulatory tax filings before submission'
  },
  {
    id: '4',
    name: 'Interest Calculation Verification',
    volume: 80,
    complexity: 30,
    category: 'high-priority',
    description: 'Automated verification of interest calculations across loan portfolios'
  },
  {
    id: '5',
    name: 'Expense Categorization',
    volume: 70,
    complexity: 20,
    category: 'high-priority',
    description: 'AI-driven categorization of business expenses for tax purposes'
  },
  {
    id: '6',
    name: 'Transaction Monitoring',
    volume: 95,
    complexity: 40,
    category: 'high-priority',
    description: 'Real-time monitoring of transactions for tax compliance issues'
  },
  {
    id: '7',
    name: 'Quarterly Report Generation',
    volume: 40,
    complexity: 55,
    category: 'medium-priority',
    description: 'Automated generation of quarterly tax reports with AI insights'
  },
  {
    id: '8',
    name: 'Audit Trail Creation',
    volume: 65,
    complexity: 35,
    category: 'medium-priority',
    description: 'Automated creation and maintenance of audit trails for tax purposes'
  },
  {
    id: '9',
    name: 'Depreciation Calculations',
    volume: 50,
    complexity: 60,
    category: 'medium-priority',
    description: 'Complex asset depreciation calculations with multiple methodologies'
  },
  {
    id: '10',
    name: 'Cross-Border Tax Analysis',
    volume: 30,
    complexity: 85,
    category: 'low-priority',
    description: 'Complex analysis of cross-border transactions for tax implications'
  },
  {
    id: '11',
    name: 'Customer Data Validation',
    volume: 85,
    complexity: 15,
    category: 'high-priority',
    description: 'Automated validation of customer tax information and documentation'
  },
  {
    id: '12',
    name: 'Compliance Reporting',
    volume: 60,
    complexity: 50,
    category: 'medium-priority',
    description: 'Automated generation of compliance reports for various jurisdictions'
  }
]

const AutomationChart: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<AutomationOpportunity | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const handleMouseEnter = (opportunity: AutomationOpportunity, event: React.MouseEvent) => {
    setHoveredPoint(opportunity)
    
    // Calculate position relative to the chart container
    const chartContainer = event.currentTarget.closest('.relative') as HTMLElement
    const rect = chartContainer.getBoundingClientRect()
    
    // Calculate the data point position within the chart
    const x = 6 + (opportunity.volume / 100) * (100 - 12)
    const y = 6 + ((100 - opportunity.complexity) / 100) * (100 - 12)
    
    // Convert percentage to pixels
    const chartWidth = rect.width
    const chartHeight = rect.height
    const pixelX = (x / 100) * chartWidth
    const pixelY = (y / 100) * chartHeight
    
    // Determine optimal tooltip position to avoid edge overflow
    const tooltipWidth = 320 // estimated tooltip width
    const tooltipHeight = 150 // estimated tooltip height
    const padding = 15
    
    let finalX = rect.left + pixelX + padding
    let finalY = rect.top + pixelY - tooltipHeight / 2
    
    // Adjust if tooltip would go off right edge of screen
    if (finalX + tooltipWidth > window.innerWidth) {
      finalX = rect.left + pixelX - tooltipWidth - padding
    }
    
    // Adjust if tooltip would go off top/bottom edge
    if (finalY < 0) {
      finalY = rect.top + pixelY + padding
    } else if (finalY + tooltipHeight > window.innerHeight) {
      finalY = rect.top + pixelY - tooltipHeight - padding
    }
    
    setTooltipPosition({ 
      x: finalX,
      y: finalY
    })
  }

  const handleMouseLeave = () => {
    setHoveredPoint(null)
  }

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
                  <div
                    key={opportunity.id}
                    className={`absolute w-3 h-3 rounded-full border-2 ${getCategoryColor(opportunity.category)} transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-150 transition-transform duration-200 z-10`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                    }}
                    onMouseEnter={(e) => handleMouseEnter(opportunity, e)}
                    onMouseLeave={handleMouseLeave}
                  />
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

            {/* Tooltip */}
            {hoveredPoint && (
              <div
                className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 pointer-events-none"
                style={{
                  left: tooltipPosition.x,
                  top: tooltipPosition.y
                }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 text-sm">{hoveredPoint.name}</h4>
                    <div className={`w-3 h-3 rounded-full ${getCategoryColor(hoveredPoint.category)}`} />
                  </div>
                  <p className="text-xs text-gray-600">{hoveredPoint.description}</p>
                  <div className="flex space-x-3 text-xs">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium text-gray-700">Volume:</span>
                      <Badge variant="secondary" className="text-xs">{hoveredPoint.volume}%</Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium text-gray-700">Complexity:</span>
                      <Badge variant="outline" className="text-xs">{hoveredPoint.complexity}%</Badge>
                    </div>
                  </div>
                  <div className="pt-1 border-t border-gray-100">
                    <Badge variant="secondary" className="text-xs">
                      {getCategoryBadge(hoveredPoint.category)}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Legend and Opportunities List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Legend */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Legend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-600"></div>
              <span className="text-sm">High Volume, Low Complexity</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-yellow-600"></div>
              <span className="text-sm">Medium Priority</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-red-600"></div>
              <span className="text-sm">Low Volume, High Complexity</span>
            </div>
          </CardContent>
        </Card>

        {/* High Priority Opportunities */}
        <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>High Priority Opportunities</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Best candidates for AI automation</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {automationOpportunities
                .filter(op => op.category === 'high-priority')
                .slice(0, 6)
                .map((opportunity) => (
                  <div key={opportunity.id} className="flex items-start justify-between p-3 bg-green-50/50 rounded-lg border border-green-200/50">
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
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AutomationChart