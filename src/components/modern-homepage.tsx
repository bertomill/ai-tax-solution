"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { 
  Brain, 
  Target, 
  Users, 
  Settings, 
  FileText, 
  Activity,
  Lightbulb,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Clock
} from 'lucide-react'
import AutomationChart from '@/components/ui/automation-chart'
import Footer from '@/components/ui/footer'

interface StatCard {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  color: string
}

interface InterviewStep {
  number: string
  title: string
  description: string
  duration: string
  icon: React.ReactNode
}

const ModernHomepage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const stats: StatCard[] = [
    {
      title: 'Session Duration',
      value: '90 minutes',
      description: 'Broken into two parts',
      icon: <Clock className="w-4 h-4" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Format Type',
      value: 'Collaborative',
      description: 'Real working session',
      icon: <Users className="w-4 h-4" />,
      color: 'bg-green-500'
    },
    {
      title: 'Focus Areas',
      value: '4 Key Areas',
      description: 'Strategic problem framing',
      icon: <Target className="w-4 h-4" />,
      color: 'bg-purple-500'
    },
    {
      title: 'AI Integration',
      value: 'Required',
      description: 'AI-powered solutions',
      icon: <Brain className="w-4 h-4" />,
      color: 'bg-orange-500'
    }
  ]

  const interviewSteps: InterviewStep[] = [
    {
      number: '1',
      title: 'Problem Presentation',
      description: 'Present your identified tax problem and why it\'s worth solving',
      duration: '15-20 min',
      icon: <Lightbulb className="w-4 h-4" />
    },
    {
      number: '2',
      title: 'Solution Ideation',
      description: 'Share your AI-powered solution ideas and approach',
      duration: '20-25 min',
      icon: <Brain className="w-4 h-4" />
    },
    {
      number: '3',
      title: 'Collaborative Discussion',
      description: 'Work together to expand and refine the ideas',
      duration: '25-30 min',
      icon: <Users className="w-4 h-4" />
    },
    {
      number: '4',
      title: 'Technical Deep Dive',
      description: 'Explore implementation details and technical considerations',
      duration: '15-20 min',
      icon: <Settings className="w-4 h-4" />
    },
    {
      number: '5',
      title: 'Next Steps',
      description: 'Discuss MVP strategy and phased rollout approach',
      duration: '10-15 min',
      icon: <ArrowRight className="w-4 h-4" />
    }
  ]

  const expectations = [
    {
      title: 'Strategic Problem Framing',
      description: 'Ability to identify and articulate meaningful problems in the tax space',
      icon: <Target className="w-4 h-4" />
    },
    {
      title: 'Creative Thinking',
      description: 'Innovative approach to solution design and problem-solving',
      icon: <Lightbulb className="w-4 h-4" />
    },
    {
      title: 'Clear Communication',
      description: 'Effective presentation and collaborative communication skills',
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      title: 'Comfort with Ambiguity',
      description: 'Ability to iterate and adapt in live collaborative settings',
      icon: <Activity className="w-4 h-4" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              AI Tax Use Cases
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Whiteboarding Interview Preparation
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                    Assignment Overview
                  </TabsTrigger>
                  <TabsTrigger value="format" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                    Interview Format
                  </TabsTrigger>
                  <TabsTrigger value="expectations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                    What We're Looking For
                  </TabsTrigger>
                  <TabsTrigger value="problem" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                    Problem Identification
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Whiteboarding Interview Session
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        This round will be a collaborative whiteboarding session—a chance for us to work together like colleagues exploring a new idea.
                        You'll come prepared with a problem you believe is worth solving in the Tax space—and one or more AI-powered solution ideas to address it.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-200/50">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <span>Session Duration</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 dark:text-gray-300">Approximately 90 minutes, broken into two parts</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50 border-green-200/50">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Users className="w-5 h-5 text-green-600" />
                            <span>Format</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 dark:text-gray-300">Real working session, not a pitch - collaborative exploration</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="format" className="mt-6">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Interview Format - 5-Step Process
                    </h3>

                    <div className="space-y-4">
                      {interviewSteps.map((step) => (
                        <Card key={step.number} className="bg-white/60 backdrop-blur-sm border-gray-200/50 hover:shadow-md transition-shadow duration-200">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <Badge className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold flex items-center justify-center">
                                  {step.number}
                                </Badge>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                    {step.title}
                                  </h4>
                                  <Badge variant="outline" className="text-xs">
                                    {step.duration}
                                  </Badge>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="expectations" className="mt-6">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      What We're Looking For
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {expectations.map((item) => (
                        <Card key={item.title} className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 border-purple-200/50 hover:shadow-md transition-shadow duration-200">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              {item.icon}
                              <span>{item.title}</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 dark:text-gray-300">
                              {item.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="problem" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Problem Identification & Research Analysis
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        Through comprehensive research into banking tax functions, I've identified key automation opportunities based on volume and complexity analysis. 
                        The chart below shows 12 potential areas where AI can create significant value by automating high-volume, low-complexity tasks.
                      </p>
                    </div>

                    <AutomationChart />

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200/50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center space-x-2">
                        <Lightbulb className="w-5 h-5 text-blue-600" />
                        <span>Key Insights from Analysis</span>
                      </h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>6 high-priority opportunities identified in the optimal automation zone (high volume, low complexity)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Daily processes like cash position reports and document classification show highest automation potential</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Transaction monitoring and expense categorization represent immediate value opportunities</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Focus on junior-level tasks that don't require SME review for optimal ROI</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ModernHomepage