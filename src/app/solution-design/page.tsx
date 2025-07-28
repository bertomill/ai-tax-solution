"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Clock, 
  TrendingUp, 
  Shield, 
  Zap, 
  Target, 
  FileText, 
  Search,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Users,
  DollarSign,
  Lightbulb,
  ArrowRight,
  Database,
  MessageSquare
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface PainPoint {
  title: string
  description: string
  timeImpact: string
  icon: React.ReactNode
}

interface SolutionFeature {
  title: string
  description: string
  timeSaved: string
  icon: React.ReactNode
  color: string
}

interface Metric {
  category: string
  items: { label: string; value: string; improvement?: string }[]
  icon: React.ReactNode
  color: string
}

export default function SolutionDesignPage() {
  const currentPainPoints: PainPoint[] = [
    {
      title: "Time-Intensive Research Process",
      description: "Tax professionals spend 4-6 hours researching complex questions that should take 30 minutes",
      timeImpact: "4-6 hours per question",
      icon: <Clock className="w-5 h-5" />
    },
    {
      title: "Information Overload & Fragmentation",
      description: "Tax code spans 70,000+ pages with constant updates across multiple systems",
      timeImpact: "2-4 hours multi-source searching",
      icon: <Database className="w-5 h-5" />
    },
    {
      title: "High Risk of Missing Critical Information",
      description: "Regulatory changes happen frequently with limited notification",
      timeImpact: "30-60 minutes quality review",
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      title: "Inefficient Knowledge Transfer",
      description: "Senior professionals' expertise isn't captured systematically",
      timeImpact: "1-2 hours documentation",
      icon: <Users className="w-5 h-5" />
    }
  ]

  const solutionFeatures: SolutionFeature[] = [
    {
      title: "Intelligent Query Processing",
      description: "Natural language AI understands complex tax questions instantly",
      timeSaved: "30 minutes → Instant",
      icon: <Brain className="w-5 h-5" />,
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Unified Knowledge Search",
      description: "Single search across all authoritative sources simultaneously",
      timeSaved: "2-4 hours → 5 minutes",
      icon: <Search className="w-5 h-5" />,
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Context-Aware Results",
      description: "AI provides jurisdiction-specific, entity-specific guidance",
      timeSaved: "1-2 hours → Immediate",
      icon: <Target className="w-5 h-5" />,
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Professional Documentation",
      description: "AI generates client-ready memos with proper legal formatting",
      timeSaved: "1-2 hours → 10 minutes",
      icon: <FileText className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600"
    }
  ]

  const successMetrics: Metric[] = [
    {
      category: "Efficiency Gains",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-green-600",
      items: [
        { label: "Research time reduction", value: "75-85%" },
        { label: "Client response time", value: "Same day", improvement: "vs. 3-5 days" },
        { label: "Questions handled per professional", value: "3-5x increase" }
      ]
    },
    {
      category: "Quality Improvements",
      icon: <Shield className="w-5 h-5" />,
      color: "text-blue-600",
      items: [
        { label: "Source comprehensiveness", value: "95%", improvement: "vs. 60-70%" },
        { label: "Regulatory change detection", value: "Real-time", improvement: "vs. weeks/months delay" },
        { label: "Error reduction", value: "60-80%", improvement: "fewer missed considerations" }
      ]
    },
    {
      category: "Business Impact",
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-purple-600",
      items: [
        { label: "Billable hour optimization", value: "40-60%", improvement: "more advisory time" },
        { label: "Client satisfaction", value: "Higher", improvement: "faster, comprehensive responses" },
        { label: "Staff efficiency", value: "Junior = Senior", improvement: "research quality" }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Tax Research Tool
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transforming tax research from a time-intensive bottleneck into a strategic advantage
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Tabs defaultValue="solution" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="solution" className="text-lg py-3">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Solution Overview
                </TabsTrigger>
                <TabsTrigger value="design" className="text-lg py-3">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Design Specification
                </TabsTrigger>
              </TabsList>

              {/* Solution Overview Tab */}
              <TabsContent value="solution" className="space-y-8">
                {/* Problem Statement */}
                <Card className="border-red-200/50 bg-red-50/50 dark:bg-red-950/20">
                  <CardHeader>
                    <CardTitle className="text-red-700 dark:text-red-300 flex items-center gap-2">
                      <AlertTriangle className="w-6 h-6" />
                      The Core Problem
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      Tax professionals spend <strong>60-80% of their time</strong> on research and compliance tasks 
                      rather than strategic advisory work. The current tax research process is fragmented, 
                      time-intensive, and prone to missing critical information. <strong>Tax experts cannot predict 
                      the questions they will be asked</strong> and must navigate through <strong>vast volumes of 
                      complex textual information</strong> across multiple regulatory sources, case law, and guidance 
                      documents to arrive at robust, defensible tax analysis. This unpredictable, research-intensive 
                      workflow creates significant bottlenecks in client service delivery.
                    </p>
                  </CardContent>
                </Card>

                {/* Current Pain Points */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-red-500" />
                    Current Pain Points
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {currentPainPoints.map((pain, index) => (
                      <motion.div
                        key={pain.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                                {pain.icon}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                  {pain.title}
                                </h3>
                                <Badge variant="destructive" className="mb-3">
                                  {pain.timeImpact}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {pain.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* AI Solution */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-blue-500" />
                    Our AI Solution: Transformed User Journey
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {solutionFeatures.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-shadow border-green-200/50">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-3 mb-3">
                              <div className={`p-2 bg-gradient-to-r ${feature.color} rounded-lg text-white`}>
                                {feature.icon}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                  {feature.title}
                                </h3>
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mb-3">
                                  {feature.timeSaved}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {feature.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Value Proposition */}
                <Card className="border-blue-200/50 bg-blue-50/50 dark:bg-blue-950/20">
                  <CardHeader>
                    <CardTitle className="text-blue-700 dark:text-blue-300 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6" />
                      Value Proposition
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">For Tax Professionals</h4>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span><strong>10x Faster Research:</strong> Reduce 5-8 hour process to 15-30 minutes</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Higher Accuracy:</strong> AI catches changes humans miss</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Strategic Focus:</strong> More time for advisory work</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Consistent Quality:</strong> Junior staff access senior-level research</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">For Tax Firms</h4>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Increased Capacity:</strong> Handle 3-5x more client questions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Improved Margins:</strong> Convert research to advisory hours</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Risk Reduction:</strong> Comprehensive search reduces failures</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Knowledge Scaling:</strong> Firm expertise becomes accessible</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">For Clients</h4>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Faster Responses:</strong> Answers during meetings</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Lower Costs:</strong> Reduced research time</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Better Outcomes:</strong> More thorough research</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Proactive Guidance:</strong> AI identifies opportunities</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Time Investment Comparison */}
                <Card className="border-amber-200/50 bg-amber-50/50 dark:bg-amber-950/20">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-8 mb-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">5-8 Hours</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Current Process</div>
                        </div>
                        <ArrowRight className="w-8 h-8 text-gray-400" />
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">15-30 Minutes</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">AI Solution</div>
                        </div>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800 text-lg px-4 py-2">
                        90%+ Time Reduction
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Design Specification Tab */}
              <TabsContent value="design" className="space-y-8">
                {/* Success Metrics */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-green-500" />
                    Success Metrics
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {successMetrics.map((metric, index) => (
                      <motion.div
                        key={metric.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card className="h-full">
                          <CardHeader>
                            <CardTitle className={`${metric.color} flex items-center gap-2`}>
                              {metric.icon}
                              {metric.category}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {metric.items.map((item, i) => (
                              <div key={i} className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900 dark:text-gray-100">{item.label}</div>
                                  {item.improvement && (
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.improvement}</div>
                                  )}
                                </div>
                                <Badge variant="outline" className="ml-2">
                                  {item.value}
                                </Badge>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Implementation Approach */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                    <Target className="w-6 h-6 text-blue-500" />
                    Implementation Approach
                  </h2>
                  <div className="space-y-6">
                    <Card className="border-blue-200/50">
                      <CardHeader>
                        <CardTitle className="text-blue-700 dark:text-blue-300 flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                          Phase 1: Core Research Engine
                          <Badge className="bg-blue-100 text-blue-700">Month 1-3</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>Deploy AI-powered search across federal tax authorities</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>Enable natural language querying for common tax questions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>Provide authoritative source citations and confidence scoring</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200/50">
                      <CardHeader>
                        <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
                          <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                          Phase 2: Advanced Features
                          <Badge className="bg-purple-100 text-purple-700">Month 4-6</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span>Add state and international tax coverage</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span>Implement professional memo generation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span>Enable firm-specific knowledge integration</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200/50">
                      <CardHeader>
                        <CardTitle className="text-green-700 dark:text-green-300 flex items-center gap-2">
                          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                          Phase 3: Strategic Advisory
                          <Badge className="bg-green-100 text-green-700">Month 7-12</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Develop proactive compliance monitoring</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Add tax planning scenario analysis</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Create client-facing research interfaces</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Final Value Statement */}
                <Card className="border-gradient-to-r from-blue-200 to-purple-200 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Transform Tax Research Into Strategic Advantage
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        This solution transforms tax research from a time-intensive bottleneck into a strategic advantage, 
                        enabling tax professionals to focus on high-value advisory work while delivering faster, 
                        more comprehensive client service.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  )
} 