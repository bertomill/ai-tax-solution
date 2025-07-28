"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Target, 
  Lightbulb, 
  MessageSquare, 
  Activity 
} from 'lucide-react'
import Footer from '@/components/ui/footer'

interface Expectation {
  title: string
  description: string
  icon: React.ReactNode
}

export default function ExpectationsPage() {
  const expectations: Expectation[] = [
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
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              What We&apos;re Looking For
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Key Skills & Expectations
            </p>
          </div>

          {/* Content Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  What We&apos;re Looking For
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
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
} 