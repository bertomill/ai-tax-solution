"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Lightbulb, 
  Brain, 
  Users, 
  Settings, 
  ArrowRight 
} from 'lucide-react'
import Footer from '@/components/ui/footer'

interface InterviewStep {
  number: string
  title: string
  description: string
  duration: string
  icon: React.ReactNode
}

export default function InterviewFormatPage() {
  const interviewSteps: InterviewStep[] = [
    {
      number: '1',
      title: 'Problem Presentation',
      description: 'Present your identified tax problem and why it&apos;s worth solving',
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Interview Format
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              5-Step Collaborative Process
            </p>
          </div>

          {/* Content Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
            <CardContent className="p-6">
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
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
} 