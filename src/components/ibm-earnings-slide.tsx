"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  TrendingUp, 
  Brain, 
  Server, 
  DollarSign, 
  BarChart3,
  Zap,
  Globe,
  Users,
  Building2,
  Target
} from 'lucide-react'

const IBMEarningsSlide: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
              IBM Q2 2025: Strategic AI & Hybrid Cloud Investments Drive Strong Performance
            </h1>
            <Badge variant="outline" className="mt-2 px-4 py-1">
              Enterprise Innovation Analysis
            </Badge>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg p-6 shadow-sm">
          <p className="text-lg text-gray-700 leading-relaxed">
            IBM delivered strong second-quarter 2025 results, with <strong className="text-green-600">8% year-over-year revenue growth to $16.98 billion</strong> and adjusted EPS of <strong className="text-green-600">$2.80</strong>, driven by an accelerating <strong className="text-blue-600">generative AI book of business exceeding $7.5 billion</strong> and a <strong className="text-purple-600">robust infrastructure segment</strong>, leading to raised <strong className="text-orange-600">full-year free cash flow guidance above $13.5 billion</strong>.
          </p>
        </div>
      </div>

      {/* Three Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Section 1: AI Growth */}
        <Card className="bg-white/90 backdrop-blur-sm border-green-200/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-green-700">
              <Brain className="w-6 h-6" />
              <span>Accelerating Generative AI Across the Portfolio</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span>Rapid Expansion of AI Book of Business</span>
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>IBM's generative AI book of business has <strong>accelerated to over $7.5 billion</strong> inception-to-date, up from over $2 billion a year prior</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Strong demand for <strong>AI agents and assistants</strong> alongside open-source <strong>Granite AI models</strong></span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Consulting segment's generative AI reached <strong>over $1 billion</strong> in Q2, contributing <strong>17% to backlog and over 20% to bookings</strong></span>
                </li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>Advanced AI Integration in Products</span>
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>New <strong>AI-focused z17 mainframe</strong> delivering <strong>over 450 billion AI inference operations per day</strong> with millisecond latency</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Watson x Orchestra</strong> expanded to include <strong>over 150 domain-specific agents</strong> (HR, sales, procurement, IT)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>New offerings like <strong>Watson x Code Assistant for z</strong> and <strong>Watson x Assistant for z</strong> as unique market differentiators</span>
                </li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <Target className="w-4 h-4 text-purple-600" />
                <span>Strategic AI Impact and Growth Drivers</span>
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>AI driving <strong>7% rise in Data revenue</strong> and scaling across <strong>more than 70 workflows</strong> internally</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Expected to contribute <strong>$4.5 billion in annual run rate savings by end of 2025</strong></span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Strategic acquisitions: <strong>Hakkoda</strong> (AI consulting) and <strong>DataStax</strong> (real-time scalable data)</span>
                </li>
              </ul>
            </div>

          </CardContent>
        </Card>

        {/* Section 2: Infrastructure Performance */}
        <Card className="bg-white/90 backdrop-blur-sm border-blue-200/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-blue-700">
              <Server className="w-6 h-6" />
              <span>Robust Hybrid Cloud and Infrastructure Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-green-600" />
                <span>Outperformance in Infrastructure Segment</span>
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Infrastructure segment sales grew <strong>14% to $4.14 billion</strong> in Q2 2025, outperforming analyst forecasts of $3.76 billion</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>IBM z (mainframe) revenue surged 67%</strong> reflecting early success of z17 program</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Over <strong>70% of IBM Z clients continue to expand or maintain capacity</strong> on the platform</span>
                </li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>Accelerated Hybrid Cloud Adoption with Red Hat</span>
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Red Hat revenue increased 14%</strong> in Q2 2025, showing sequential acceleration</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>OpenShift revenue grew over 20%</strong>, with ARR reaching <strong>$1.7 billion</strong></span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Overall hybrid cloud revenue showed <strong>16% growth</strong></span>
                </li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <Zap className="w-4 h-4 text-purple-600" />
                <span>Strategic Automation and Cloud Integration</span>
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Automation revenue rose 14%</strong> benefiting from early HashiCorp acquisition integration</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>2x increase in HashiCorp annual bookings</strong> under IBM with <strong>3x pipeline increase</strong> for H2</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>New <strong>Power Eleven</strong> platform and <strong>Rise with SAP on Power Eleven</strong> announcements</span>
                </li>
              </ul>
            </div>

          </CardContent>
        </Card>

        {/* Section 3: Financial Performance */}
        <Card className="bg-white/90 backdrop-blur-sm border-orange-200/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-orange-700">
              <DollarSign className="w-6 h-6" />
              <span>Strong Financial Performance and Optimistic Macro Outlook</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span>Exceeding Financial Expectations</span>
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>$16.98 billion in revenue</strong> (vs. $16.59B expected) and <strong>$2.80 adjusted EPS</strong> (vs. $2.64 expected)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Adjusted EBITDA grew <strong>16% to $4.7 billion</strong> with <strong>200 basis points of margin expansion</strong></span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Generated <strong>$4.8 billion in free cash flow</strong> in H1 2025, up $300M year-over-year</span>
                </li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span>Raised Guidance and Shareholder Returns</span>
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Raised full-year 2025 free cash flow guidance to exceed $13.5 billion</strong></span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span><strong>Software now constitutes approximately 45%</strong> of overall business as of H1 2025</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>ARR growing <strong>10% to $22.7 billion</strong> with <strong>80% of software book being recurring revenue</strong></span>
                </li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                <Globe className="w-4 h-4 text-purple-600" />
                <span>Positive Macro Environment & Strategic Positioning</span>
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>CEO expresses <strong>"optimism around the macro environment"</strong> with enterprise tech demand growth expected in <strong>5-7% range</strong></span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Strong growth pockets: Japan (reindustrializing), South Asia (>10% growth), Middle East (Saudi/UAE)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Consolidated backlog stands at <strong>$32 billion, up over 8%</strong> at current exchange rates</span>
                </li>
              </ul>
            </div>

          </CardContent>
        </Card>

      </div>

      {/* Footer with References */}
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900">IBM Corporation</h3>
              <p className="text-sm text-gray-600">Enterprise Innovation Analysis</p>
            </div>
          </div>
          <Badge variant="outline" className="px-4 py-2">
            Q2 2025 Earnings Analysis
          </Badge>
        </div>
        
        <Separator className="my-4" />
        
        <div className="text-xs text-gray-500 space-y-1">
          <p className="font-medium">References:</p>
          <ul className="space-y-0.5">
            <li>• Excerpts from "IBM Earnings: AI Fuels Growth, Software Lags, Stock Slides" - investors.com</li>
            <li>• Excerpts from "IBM Earnings: Strong Results Amidst Software Revenue Miss" - cnbc.com</li>
            <li>• Excerpts from "IBM Q2 2025 Earnings Call Highlights" - fool.com</li>
            <li>• Excerpts from "IBM beats on revenue and earnings, raises guidance" - CNBC Television YouTube</li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default IBMEarningsSlide