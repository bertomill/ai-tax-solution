"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Lightbulb, 
  Brain, 
  Users, 
  Settings, 
  ArrowRight,
  Clock,
  Target,
  MessageSquare,
  Activity,
  FileText,
  CheckCircle
} from 'lucide-react'

interface InterviewStep {
  number: string
  title: string
  description: string
  duration: string
  icon: React.ReactNode
}

interface Expectation {
  title: string
  description: string
  icon: React.ReactNode
}

export default function InterviewFormatPage() {

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

  const expectations: Expectation[] = [
    {
      title: 'Strategic Problem Framing',
      description: 'Ability to identify and articulate meaningful problems in the tax space',
      icon: <Target className="w-4 h-4" />
    },
    {
      title: 'User Understanding',
      description: 'Clear identification of who the users are and the specific problems they face',
      icon: <Users className="w-4 h-4" />
    },
    {
      title: 'MVP Definition',
      description: 'Thoughtful approach to what a minimum viable product could look like',
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      title: 'AI & Data Integration',
      description: 'Understanding of how the solution might leverage AI and data effectively',
      icon: <Brain className="w-4 h-4" />
    },
    {
      title: 'Phased Rollout Vision',
      description: 'Strategic thinking about implementation phases and long-term vision',
      icon: <ArrowRight className="w-4 h-4" />
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
      {/* Page Header */}
      <div className="text-left py-8 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
          Interview Format
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          Complete Interview Guide & Expectations
        </p>
      </div>



      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Assignment Overview Section */}
          <section id="assignment-overview" className="space-y-6 scroll-mt-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Assignment Overview
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Whiteboarding Interview Session Details
              </p>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Whiteboarding Interview Session
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                      This round will be a collaborative whiteboarding session—a chance for us to work together like colleagues exploring a new idea.
                      You&apos;ll come prepared with a problem you believe is worth solving in the Tax space—and one or more AI-powered solution ideas to address it.
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
              </CardContent>
            </Card>
          </section>

          {/* Interview Process Section */}
          <section id="interview-process" className="space-y-6 scroll-mt-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Users className="w-6 h-6 text-purple-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Interview Process
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                5-Step Collaborative Process
              </p>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Interview Process - 5-Step Process
                  </h3>

                  <div className="space-y-4">
                    {interviewSteps.map((step, index) => (
                      <motion.div
                        key={step.number}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="bg-white/60 backdrop-blur-sm border-gray-200/50 hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <Badge className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold flex items-center justify-center">
                                  {step.number}
                                </Badge>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                    {step.icon}
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
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Expectations Section */}
          <section id="expectations" className="space-y-6 scroll-mt-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Target className="w-6 h-6 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  What We&apos;re Looking For
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Key Skills & Expectations
              </p>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    What We&apos;re Looking For
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {expectations.map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 border-purple-200/50 hover:shadow-md transition-all duration-200 hover:scale-[1.02] h-full">
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
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
} 