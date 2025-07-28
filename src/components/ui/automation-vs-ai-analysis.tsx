"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Settings, 
  Brain, 
  FileText, 
  MessageSquare, 
  Search,
  CheckCircle,
  ArrowRight,
  Zap,
  BookOpen
} from 'lucide-react'
import { getTaxSolutions, type TaxSolution } from '@/lib/automation-data'

const AutomationVsAIAnalysis: React.FC = () => {
  const [taxSolutions, setTaxSolutions] = useState<TaxSolution[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const solutions = await getTaxSolutions()
        setTaxSolutions(solutions)
        setError(null)
      } catch (err) {
        console.error('Error fetching tax solutions:', err)
        setError('Failed to load tax solutions')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const automationSolutions = taxSolutions.filter(solution => solution.type === 'automation')
  const aiSolutions = taxSolutions.filter(solution => solution.type === 'ai')

  const getTypeIcon = (type: string) => {
    return type === 'automation' ? <Settings className="w-4 h-4" /> : <Brain className="w-4 h-4" />
  }

  const getTypeColor = (type: string) => {
    return type === 'automation' ? 'bg-blue-500' : 'bg-purple-500'
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'rule-based':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'predictable':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'research':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'expert-interface':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading automation vs AI analysis...</p>
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
      {/* Header with Decision Framework */}
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-xl font-semibold">Automation vs AI: Strategic Decision Framework</span>
            <Badge variant="outline" className="text-sm">
              Solution Design
            </Badge>
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Strategic analysis of when to use traditional automation versus AI based on input predictability and output flexibility requirements
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Automation Guidelines */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Traditional Automation</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Use when:</strong> Inputs and outputs are predictable and structured</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Best for:</strong> Rule-based processes with clear logic</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Advantage:</strong> Reliable, cost-effective, and currently working well</span>
                </div>
              </div>
            </div>

            {/* AI Guidelines */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">AI Solutions</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Use when:</strong> Inputs/outputs are unpredictable and require flexibility</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Best for:</strong> Research, interpretation, and human-like interaction</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Advantage:</strong> Handles unstructured data and complex reasoning</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Solutions Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Traditional Automation Solutions */}
        <Card className="bg-white/80 backdrop-blur-sm border-blue-200/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-blue-700">
              <Settings className="w-6 h-6" />
              <span>Traditional Automation Solutions</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Structured, rule-based processes with predictable patterns</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {automationSolutions.map((solution) => (
                <div key={solution.id} className="border border-blue-200/50 rounded-lg p-4 bg-blue-50/30">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{solution.name}</h4>
                    <Badge className={`text-xs border ${getCategoryColor(solution.category)}`}>
                      {solution.category.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-3">{solution.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Zap className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700"><strong>Why Automation:</strong> {solution.reasoning}</p>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <ArrowRight className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700"><strong>Business Value:</strong> {solution.businessValue}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex flex-wrap gap-1">
                    {solution.key_features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Solutions */}
        <Card className="bg-white/80 backdrop-blur-sm border-purple-200/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-purple-700">
              <Brain className="w-6 h-6" />
              <span>AI-Powered Solutions</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Complex reasoning, research, and flexible interpretation tasks</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiSolutions.map((solution) => (
                <div key={solution.id} className="border border-purple-200/50 rounded-lg p-4 bg-purple-50/30">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{solution.name}</h4>
                    <Badge className={`text-xs border ${getCategoryColor(solution.category)}`}>
                      {solution.category.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-3">{solution.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Brain className="w-3 h-3 text-purple-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700"><strong>Why AI:</strong> {solution.reasoning}</p>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <ArrowRight className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700"><strong>Business Value:</strong> {solution.businessValue}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex flex-wrap gap-1">
                    {solution.key_features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key AI Use Cases Highlight */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-purple-800">
            <MessageSquare className="w-6 h-6" />
            <span>Highlighted AI Use Cases for Tax Functions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tax Research Assistant */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-gray-900">Tax Research Assistant</h4>
              </div>
              <p className="text-sm text-gray-700">
                AI processes vast volumes of tax regulations, case law, and guidance documents to provide instant, 
                contextualized research answers. Perfect for handling unpredictable research queries that require 
                flexible interpretation and reasoning.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">Regulation Analysis</Badge>
                <Badge variant="outline" className="text-xs">Case Law Research</Badge>
                <Badge variant="outline" className="text-xs">Contextual Answers</Badge>
              </div>
            </div>

            {/* Business User Interface */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Business User Tax Advisor</h4>
              </div>
              <p className="text-sm text-gray-700">
                Conversational AI interface that connects business users directly with tax expertise through 
                natural language. Eliminates the need to search through massive document repositories, 
                providing instant expert-level guidance.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">Natural Language</Badge>
                <Badge variant="outline" className="text-xs">Expert Knowledge</Badge>
                <Badge variant="outline" className="text-xs">Instant Access</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AutomationVsAIAnalysis