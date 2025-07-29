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
  Search
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-300">
              AI Tax Use Cases
            </h1>
            <p className="text-base text-black dark:text-gray-300">
              Whiteboarding Interview Preparation Dashboard
            </p>
            <p className="text-black dark:text-gray-300 max-w-4xl">
              Navigate through the interview preparation sections using the sidebar or the cards below. 
              Each section provides detailed information to help you prepare for the collaborative whiteboarding session.
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

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-200/50">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
                Preparation Tools
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/search">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3">
                    <Search className="w-4 h-4 mr-2" />
                    AI-Powered Search
                  </Button>
                </Link>
                <Link href="/documentation">
                  <Button variant="outline" className="px-6 py-3">
                    <FileText className="w-4 h-4 mr-2" />
                    Documentation
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