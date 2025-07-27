"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  Target, 
  Users, 
  Settings, 
  FileText, 
  Bell, 
  Search, 
  Menu, 
  X,
  TrendingUp,
  Activity,
  Lightbulb,
  Calendar,
  MessageSquare,
  Star,
  ArrowRight,
  Plus,
  Zap,
  BarChart3,
  CheckCircle,
  Clock,
  Award
} from 'lucide-react'
import AutomationChart from '@/components/ui/automation-chart'

interface SidebarItem {
  icon: React.ReactNode
  label: string
  href: string
  badge?: string
  section?: string
}

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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const sidebarItems: SidebarItem[] = [
    { 
      icon: <FileText className="w-5 h-5" />, 
      label: 'Overview', 
      href: 'overview',
      section: 'Assignment Context'
    },
    { 
      icon: <Calendar className="w-5 h-5" />, 
      label: 'Interview Format', 
      href: 'format',
      section: 'Assignment Context'
    },
    { 
      icon: <Target className="w-5 h-5" />, 
      label: 'What We\'re Looking For', 
      href: 'expectations',
      section: 'Assignment Context'
    },
    { 
      icon: <Lightbulb className="w-5 h-5" />, 
      label: 'Problem Identification', 
      href: 'problem',
      section: 'Our Approach',
      badge: 'New'
    },
    { 
      icon: <Settings className="w-5 h-5" />, 
      label: 'Solution Design', 
      href: 'solution',
      section: 'Our Approach'
    },
    { 
      icon: <Zap className="w-5 h-5" />, 
      label: 'AI Integration', 
      href: 'ai-integration',
      section: 'Our Approach'
    },
    { 
      icon: <BarChart3 className="w-5 h-5" />, 
      label: 'MVP Strategy', 
      href: 'mvp',
      section: 'Our Approach'
    },
    { 
      icon: <Search className="w-5 h-5" />, 
      label: 'RAG Search', 
      href: 'rag',
      section: 'AI Tools'
    }
  ]

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

  const groupedSidebarItems = sidebarItems.reduce((acc, item) => {
    if (!acc[item.section!]) {
      acc[item.section!] = []
    }
    acc[item.section!].push(item)
    return acc
  }, {} as Record<string, SidebarItem[]>)

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200/50 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Tax Use Cases</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Interview Prep</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex-1 px-4 py-6 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search sections..."
              className="pl-10 bg-gray-50/50 border-gray-200/50"
            />
          </div>

          {/* Navigation */}
          <nav className="space-y-6">
            {Object.entries(groupedSidebarItems).map(([section, items]) => (
              <div key={section} className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3">
                  {section}
                </h3>
                <div className="space-y-1">
                  {items.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => setActiveTab(item.href)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        activeTab === item.href
                          ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-sm'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50/50 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Logo */}
        <div className="p-4 border-t border-gray-200/50">
          <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">N</span>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Assignment Context</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/avatars/user.png" alt="User" />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white text-sm">JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
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
                        {interviewSteps.map((step, index) => (
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
                        {expectations.map((item, index) => (
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
      </div>
    </div>
  )
}

export default ModernHomepage 