"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Brain, 
  Target, 
  Users,
  FileText,
  ArrowRight,
  Clock,
  Search,
  Zap,
  Check,
  MessageSquare,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

interface StatCard {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  color: string
}

interface InterviewSection {
  title: string
  description: string
  icon: React.ReactNode
  url: string
  color: string
}

interface AITool {
  title: string
  description: string
  icon: React.ReactNode
  url: string
  color: string
  badge?: string
}

const ModernHomepage: React.FC = () => {
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

  const interviewSections: InterviewSection[] = [
    {
      title: 'Assignment Overview',
      description: 'Learn about the whiteboarding interview session and what to expect',
      icon: <FileText className="w-6 h-6" />,
      url: '/assignment-overview',
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Interview Format',
      description: 'Understand the 5-step collaborative process and timing',
      icon: <Users className="w-6 h-6" />,
      url: '/interview-format',
      color: 'from-green-500 to-blue-600'
    },
    {
      title: 'What We&apos;re Looking For',
      description: 'Key skills and expectations we evaluate during the interview',
      icon: <Target className="w-6 h-6" />,
      url: '/expectations',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Problem Identification',
      description: 'Research analysis and automation opportunities in tax functions',
      icon: <Brain className="w-6 h-6" />,
      url: '/problem-identification',
      color: 'from-orange-500 to-red-600'
    }
  ]

  const aiTools: AITool[] = [
    {
      title: 'AI Document Search',
      description: 'Search through tax documents, regulations, and case law with AI-powered semantic search',
      icon: <Search className="w-6 h-6" />,
      url: '/search',
      color: 'from-blue-500 to-cyan-600',
      badge: 'Search'
    },
    {
      title: 'Market Research Agent',
      description: 'AI-powered market research and competitive analysis for tax technology solutions',
      icon: <TrendingUp className="w-6 h-6" />,
      url: '/market-research',
      color: 'from-green-500 to-emerald-600',
      badge: 'Research'
    },
    {
      title: 'Tax Compliance Simulator',
      description: 'Simulate tax compliance scenarios and identify potential risks and opportunities',
      icon: <Check className="w-6 h-6" />,
      url: '/tax-research',
      color: 'from-purple-500 to-violet-600',
      badge: 'Compliance'
    },
    {
      title: 'Communication Drafting',
      description: 'AI-assisted drafting of client communications and tax letters with compliance checking',
      icon: <MessageSquare className="w-6 h-6" />,
      url: '/client-communications',
      color: 'from-orange-500 to-red-600',
      badge: 'Drafting'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-blue-300">
              Exploring AI Use Cases in the Tax Space
            </h1>
            <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400">
              Whiteboarding Excercise Dashboard
            </h2>
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

          {/* Interview Sections Navigation */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">
              Interview Preparation Sections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interviewSections.map((section, index) => (
                <Link key={index} href={section.url}>
                  <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${section.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                          {section.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 transition-colors">
                            {section.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {section.description}
                          </p>
                          <div className="mt-3 flex items-center text-blue-600 text-sm font-medium">
                            Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* AI Tools Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">
              AI Tools & Solutions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">
              Explore our suite of AI-powered tools designed specifically for tax professionals
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiTools.map((tool, index) => (
                <Link key={index} href={tool.url}>
                  <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${tool.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                          {tool.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
                              {tool.title}
                            </h3>
                            {tool.badge && (
                              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                {tool.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {tool.description}
                          </p>
                          <div className="mt-3 flex items-center text-blue-600 text-sm font-medium">
                            Try it now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-200/50">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
                Additional Resources
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/documentation">
                  <Button variant="outline" className="px-6 py-3">
                    <FileText className="w-4 h-4 mr-2" />
                    Documentation
                  </Button>
                </Link>
                <Link href="/problem-identification">
                  <Button variant="outline" className="px-6 py-3">
                    <Brain className="w-4 h-4 mr-2" />
                    Automation Chart
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default ModernHomepage