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
  Search,
  Check,
  MessageSquare,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import { HoverEffect } from '@/components/ui/card-hover-effect'

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



          {/* Interview Sections Navigation */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">
              Interview Preparation Sections
            </h2>
            <HoverEffect 
              items={interviewSections.map(section => ({
                title: section.title,
                description: section.description,
                link: section.url,
                icon: section.icon
              }))}
            />
          </div>

          {/* AI Tools Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">
              AI Tools & Solutions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">
              Explore our suite of AI-powered tools designed specifically for tax professionals
            </p>
            <HoverEffect 
              items={aiTools.map(tool => ({
                title: tool.title,
                description: tool.description,
                link: tool.url,
                icon: tool.icon,
                badge: tool.badge
              }))}
            />
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