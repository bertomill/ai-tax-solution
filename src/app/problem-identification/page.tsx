"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Lightbulb, CheckCircle } from 'lucide-react'
import AutomationChart from '@/components/ui/automation-chart'
import Footer from '@/components/ui/footer'

export default function ProblemIdentificationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Problem Identification
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Research Analysis & Automation Opportunities
            </p>
          </div>

          {/* Content Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Problem Identification & Research Analysis
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    Through comprehensive research into banking tax functions, I&apos;ve identified key automation opportunities based on volume and complexity analysis. 
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
                      <span>Focus on junior-level tasks that don&apos;t require SME review for optimal ROI</span>
                    </li>
                  </ul>
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