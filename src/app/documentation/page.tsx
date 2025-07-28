"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

import { 
  Brain, 
  TrendingUp, 
  Lightbulb, 
  BarChart3, 
  Zap, 
  Target, 
  ArrowLeft,
  Search,
  Clock,
  Users,
  CheckCircle,
  Eye,
  Rocket
} from 'lucide-react'
import Footer from '@/components/ui/footer'
import { getDocumentationSections, type DocumentationSection } from '@/lib/documentation-data'

const DocumentationPage: React.FC = () => {
  const [sections, setSections] = useState<DocumentationSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>('efficiency')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getDocumentationSections()
        setSections(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching documentation:', err)
        setError('Failed to load documentation')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const efficiencySection = sections.find(s => s.category === 'efficiency')
  const insightsSection = sections.find(s => s.category === 'insights')
  const practicalLessonsSection = sections.find(s => s.category === 'practical-lessons')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading documentation...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
      return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <p className="text-red-600 mb-2">{error}</p>
              <p className="text-gray-600 text-sm">Please check your connection and try again.</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        
        {/* Introduction */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Brain className="w-6 h-6 text-blue-600" />
              <span>What is AI in Tax?</span>
            </CardTitle>
            <p className="text-gray-600">
              Artificial Intelligence is transforming tax functions across organizations, offering unprecedented 
              opportunities for automation, insight generation, and strategic decision-making.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span>Core Applications</span>
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Process automation for repetitive tasks</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Advanced analytics and pattern recognition</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Regulatory compliance monitoring</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Risk assessment and forecasting</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span>Key Benefits</span>
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Significant time savings on routine tasks</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Users className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Enhanced accuracy and reduced human error</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Eye className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Real-time insights and decision support</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <BarChart3 className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Scalable solutions for growing organizations</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4">
          <Button
            variant={activeSection === 'efficiency' ? 'default' : 'outline'}
            onClick={() => setActiveSection('efficiency')}
            className="flex items-center space-x-2"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Efficiency</span>
          </Button>
          <Button
            variant={activeSection === 'insights' ? 'default' : 'outline'}
            onClick={() => setActiveSection('insights')}
            className="flex items-center space-x-2"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Insights</span>
          </Button>
          <Button
            variant={activeSection === 'practical-lessons' ? 'default' : 'outline'}
            onClick={() => setActiveSection('practical-lessons')}
            className="flex items-center space-x-2"
          >
            <Rocket className="w-4 h-4" />
            <span>Practical Lessons</span>
          </Button>
        </div>

        {/* Efficiency Section */}
        {activeSection === 'efficiency' && efficiencySection && (
          <Card className="bg-white/80 backdrop-blur-sm border-green-200/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-green-700">
                <TrendingUp className="w-6 h-6" />
                <span>{efficiencySection.title}</span>
              </CardTitle>
              <p className="text-gray-600">{efficiencySection.description}</p>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: efficiencySection.content }} />
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Key Benefits</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {efficiencySection.key_points?.map((point, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-green-50/50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Insights Section */}
        {activeSection === 'insights' && insightsSection && (
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-purple-700">
                <Lightbulb className="w-6 h-6" />
                <span>{insightsSection.title}</span>
              </CardTitle>
              <p className="text-gray-600">{insightsSection.description}</p>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: insightsSection.content }} />
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Key Benefits</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {insightsSection.key_points?.map((point, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-purple-50/50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Practical Lessons Section */}
        {activeSection === 'practical-lessons' && practicalLessonsSection && (
          <Card className="bg-white/80 backdrop-blur-sm border-orange-200/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-orange-700">
                <Rocket className="w-6 h-6" />
                <span>{practicalLessonsSection.title}</span>
              </CardTitle>
              <p className="text-gray-600">{practicalLessonsSection.description}</p>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: practicalLessonsSection.content }} />
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Key Implementation Tips</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {practicalLessonsSection.key_points?.map((point, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-orange-50/50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Navigation */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-blue-600" />
              <span>Explore More</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start" onClick={() => window.location.href = '/'}>
                <Brain className="w-4 h-4 mr-2" />
                Problem Analysis
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => window.location.href = '/#ai-integration'}>
                <Zap className="w-4 h-4 mr-2" />
                AI Integration
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => window.location.href = '/#rag'}>
                <Search className="w-4 h-4 mr-2" />
                RAG Search
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>

      <Footer />
    </div>
  )
}

export default DocumentationPage