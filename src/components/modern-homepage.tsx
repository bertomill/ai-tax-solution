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
  TrendingUp,
  Sparkles
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
      title: 'Documentation',
      description: 'Comprehensive documentation, AI landscape overview, and key insights from research',
      icon: <FileText className="w-6 h-6" />,
      url: '/documentation',
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Session Format',
      description: 'Understand the 90-minute collaborative whiteboarding process and interview structure',
      icon: <Users className="w-6 h-6" />,
      url: '/interview-format',
      color: 'from-green-500 to-blue-600'
    },
    {
      title: 'Approach & Analysis',
      description: 'Explore tax automation opportunities and problem identification methodology',
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
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Interview Preparation
              </h2>
            </div>
            <HoverEffect 
              items={interviewSections.map(section => ({
                title: section.title,
                description: section.description,
                link: section.url,
                icon: section.icon
              }))}
              className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            />
          </div>

          {/* AI Tools Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gray-500" />
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                AI Tools & Solutions
              </h2>
            </div>
            <HoverEffect 
              items={aiTools.map(tool => ({
                title: tool.title,
                description: tool.description,
                link: tool.url,
                icon: tool.icon,
                badge: tool.badge
              }))}
              className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            />
          </div>


        </div>
      </main>
    </div>
  )
}

export default ModernHomepage