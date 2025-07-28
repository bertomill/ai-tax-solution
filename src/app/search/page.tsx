"use client"

import React, { useState } from 'react'
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
  MessageSquare,
  Sparkles,
  ChevronDown
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { RAGSearch } from '@/components/rag-search'
import * as Collapsible from '@radix-ui/react-collapsible'

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

export default function SearchPage() {
  const [isProfessionalArchOpen, setIsProfessionalArchOpen] = useState(false)
  const [isEmbeddingModelOpen, setIsEmbeddingModelOpen] = useState(false)
  const [isLlamaIndexOpen, setIsLlamaIndexOpen] = useState(false)

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
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(156,146,172,0.15)_1px,transparent_0)] bg-[length:20px_20px] opacity-30" />
      
      <div className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Tax Research Platform
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the future of tax research with AI-powered search and comprehensive solution design
            </p>
          </motion.div>

          {/* Main Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-14">
                <TabsTrigger value="search" className="text-lg py-4 px-6">
                  <Sparkles className="w-5 h-5 mr-2" />
                  AI Search Tool
                </TabsTrigger>
                <TabsTrigger value="design" className="text-lg py-4 px-6">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Solution Design
                </TabsTrigger>
              </TabsList>

              {/* AI Search Tool Tab */}
              <TabsContent value="search">
                <RAGSearch />
              </TabsContent>

              {/* Solution Design Tab */}
              <TabsContent value="design" className="space-y-8">
                {/* Solution Design Header */}
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
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Solution Design & Architecture
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Transforming tax research from a time-intensive bottleneck into a strategic advantage
                  </p>
                </motion.div>

                {/* Design Tabs */}
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="overview" className="text-lg py-3">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Solution Overview
                    </TabsTrigger>
                    <TabsTrigger value="specification" className="text-lg py-3">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Technical Specification
                    </TabsTrigger>
                  </TabsList>

                  {/* Solution Overview */}
                  <TabsContent value="overview" className="space-y-8">
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
                          time-intensive, and prone to missing critical information.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Current Pain Points */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                        <Clock className="w-6 h-6 text-red-500" />
                        Current Pain Points
                      </h3>
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
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                      {pain.title}
                                    </h4>
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
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                        <Zap className="w-6 h-6 text-blue-500" />
                        Our AI Solution: Transformed User Journey
                      </h3>
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
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                      {feature.title}
                                    </h4>
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

                    {/* Key Design Decision */}
                    <Card className="border-indigo-200/50 bg-indigo-50/50 dark:bg-indigo-950/20">
                      <Collapsible.Root open={isProfessionalArchOpen} onOpenChange={setIsProfessionalArchOpen}>
                        <CardHeader>
                          <Collapsible.Trigger asChild>
                            <button className="flex items-center justify-between w-full text-left group">
                              <CardTitle className="text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                                <Shield className="w-6 h-6" />
                                <div className="flex-1">
                                  <div>Key Design Decision: Professional-Mediated Architecture</div>
                                  <div className="text-sm font-normal text-indigo-600/70 dark:text-indigo-400/70">Click to expand</div>
                                </div>
                              </CardTitle>
                              <ChevronDown 
                                className={`w-5 h-5 text-indigo-600 transition-transform duration-200 ${
                                  isProfessionalArchOpen ? 'transform rotate-180' : ''
                                }`}
                              />
                            </button>
                          </Collapsible.Trigger>
                        </CardHeader>
                        <Collapsible.Content>
                          <CardContent className="space-y-6">
                            <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 border-l-4 border-indigo-500">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                Strategic Choice: Tax Professional as Intermediary
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Rather than allowing clients direct access to the AI tool, we designed the system for 
                                <strong> tax professionals to interface with the tool and then provide curated responses to clients</strong>. 
                                This architectural decision prioritizes professional oversight while maintaining the efficiency gains.
                              </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <Shield className="w-5 h-5 text-indigo-600" />
                                  <h5 className="font-semibold text-gray-900 dark:text-gray-100">Compliance Safeguards</h5>
                                </div>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                                    <span><strong>Professional Liability:</strong> Licensed professionals validate all advice</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                                    <span><strong>Regulatory Compliance:</strong> Maintains attorney-client privilege</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                                    <span><strong>Quality Control:</strong> Professional judgment filters AI responses</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                                    <span><strong>Ethical Standards:</strong> Upholds professional conduct requirements</span>
                                  </li>
                                </ul>
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <Users className="w-5 h-5 text-purple-600" />
                                  <h5 className="font-semibold text-gray-900 dark:text-gray-100">Trust & Relationships</h5>
                                </div>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                    <span><strong>Client Confidence:</strong> Trusted advisor remains the source of truth</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                    <span><strong>Professional Relationships:</strong> Preserves advisor-client dynamics</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                    <span><strong>Context Awareness:</strong> Professional adds client-specific nuance</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                    <span><strong>Value Perception:</strong> Maintains premium professional positioning</span>
                                  </li>
                                </ul>
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <Database className="w-5 h-5 text-green-600" />
                                  <h5 className="font-semibold text-gray-900 dark:text-gray-100">Security & Privacy</h5>
                                </div>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span><strong>Data Protection:</strong> Sensitive client info stays within firm</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span><strong>Access Control:</strong> Professional-grade authentication & audit trails</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                                 <span><strong>Confidentiality:</strong> No direct client-AI interaction logs</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span><strong>Firm IP:</strong> Internal knowledge stays proprietary</span>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg p-4">
                              <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-amber-600" />
                                Why This Architecture Wins
                              </h5>
                              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                This design delivers the <strong>efficiency of AI automation</strong> while preserving the 
                                <strong>trust, expertise, and liability protection</strong> that clients expect from professional services. 
                                Tax professionals become more productive and valuable, not replaced—using AI as a research accelerator 
                                while maintaining their role as the authoritative advisor and quality gatekeeper.
                              </p>
                            </div>
                          </CardContent>
                        </Collapsible.Content>
                      </Collapsible.Root>
                    </Card>

                    {/* Key Design Decision: Embedding Model Choice */}
                    <Card className="border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20">
                      <Collapsible.Root open={isEmbeddingModelOpen} onOpenChange={setIsEmbeddingModelOpen}>
                        <CardHeader>
                          <Collapsible.Trigger asChild>
                            <button className="flex items-center justify-between w-full text-left group">
                              <CardTitle className="text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                                <Brain className="w-6 h-6" />
                                <div className="flex-1">
                                  <div>Key Design Decision: OpenAI text-embedding-3-large with 1536 Dimensions</div>
                                  <div className="text-sm font-normal text-emerald-600/70 dark:text-emerald-400/70">Click to expand</div>
                                </div>
                              </CardTitle>
                              <ChevronDown 
                                className={`w-5 h-5 text-emerald-600 transition-transform duration-200 ${
                                  isEmbeddingModelOpen ? 'transform rotate-180' : ''
                                }`}
                              />
                            </button>
                          </Collapsible.Trigger>
                        </CardHeader>
                        <Collapsible.Content>
                          <CardContent className="space-y-6">
                            <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 border-l-4 border-emerald-500">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                Strategic Choice: Premium Embedding Model for Tax Domain Accuracy
                              </h4>
                                                     <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                             I chose OpenAI&apos;s <strong>text-embedding-3-large</strong> model with <strong>1536 dimensions</strong> over 
                             smaller alternatives to ensure maximum accuracy for complex tax document processing. This decision prioritizes 
                             <strong>retrieval quality and semantic understanding</strong> over cost optimization, recognizing that in tax advisory, 
                             precision directly impacts compliance and liability.
                           </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-emerald-600" />
                              <h5 className="font-semibold text-gray-900 dark:text-gray-100">Performance Advantages</h5>
                            </div>
                            <div className="space-y-3">
                              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium">Multilingual Tax Content</span>
                                  <Badge className="bg-emerald-100 text-emerald-700">+40% Accuracy</Badge>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  MIRACL benchmark: 54.9% vs 44.0% for text-embedding-3-small
                                </p>
                              </div>
                              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium">English Tax Documents</span>
                                  <Badge className="bg-emerald-100 text-emerald-700">+4% Accuracy</Badge>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  MTEB benchmark: 64.6% vs 62.3% for text-embedding-3-small
                                </p>
                              </div>
                              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium">Complex Legal Language</span>
                                  <Badge className="bg-emerald-100 text-emerald-700">Superior</Badge>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Better understanding of tax terminology and regulatory context
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <Target className="w-5 h-5 text-blue-600" />
                              <h5 className="font-semibold text-gray-900 dark:text-gray-100">Dimension Optimization</h5>
                            </div>
                            <div className="space-y-3">
                              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium">1536 vs 3072 Dimensions</span>
                                  <Badge className="bg-blue-100 text-blue-700">50% Cost Savings</Badge>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Negligible accuracy loss with significant storage efficiency
                                </p>
                              </div>
                              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium">1536 vs 1024 Dimensions</span>
                                  <Badge className="bg-blue-100 text-blue-700">+15% Quality</Badge>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Meaningful accuracy improvement for complex documents
                                </p>
                              </div>
                              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium">Database Compatibility</span>
                                  <Badge className="bg-blue-100 text-blue-700">Native Support</Badge>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Matches existing Supabase vector schema without migration
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-amber-600" />
                            Trade-off Analysis & Decision Rationale
                          </h5>
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <h6 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Cost Considerations</h6>
                              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                <li>• ~2x embedding API cost vs small model</li>
                                <li>• 1.5x storage cost vs 1024 dims</li>
                                <li>• Offset by reduced re-processing needs</li>
                                <li>• ROI through improved accuracy</li>
                              </ul>
                            </div>
                            <div>
                              <h6 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Quality Benefits</h6>
                              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                <li>• Fewer missed relevant documents</li>
                                <li>• Better handling of tax jargon</li>
                                <li>• Improved multilingual support</li>
                                <li>• Reduced false positive matches</li>
                              </ul>
                            </div>
                            <div>
                              <h6 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Future-Proofing</h6>
                              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                <li>• State-of-the-art model longevity</li>
                                <li>• Dimension flexibility (1024-3072)</li>
                                <li>• Matryoshka Representation Learning</li>
                                <li>• Migration path to newer models</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20 p-4">
                          <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Why This Choice Matters for Tax Advisory
                          </h5>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            In tax advisory, <strong>retrieval accuracy directly impacts professional liability</strong>. Missing a relevant 
                            regulation or precedent can lead to compliance failures, penalties, or malpractice claims. The 
                            <strong>premium embedding model ensures our RAG system surfaces the most relevant tax content</strong>, 
                            even when dealing with complex legal language, international tax treaties, or evolving regulatory guidance. 
                            This investment in accuracy pays dividends through <strong>reduced professional risk and enhanced client outcomes</strong>.
                          </p>
                        </div>
                      </CardContent>
                    </Collapsible.Content>
                  </Collapsible.Root>
                </Card>

                    {/* Key Design Decision: LlamaIndex PDF Parsing */}
                    <Card className="border-purple-200/50 bg-purple-50/50 dark:bg-purple-950/20">
                      <Collapsible.Root open={isLlamaIndexOpen} onOpenChange={setIsLlamaIndexOpen}>
                        <CardHeader>
                          <Collapsible.Trigger asChild>
                            <button className="flex items-center justify-between w-full text-left group">
                              <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
                                <FileText className="w-6 h-6" />
                                <div className="flex-1">
                                  <div>Key Design Decision: LlamaIndex for PDF Document Processing</div>
                                  <div className="text-sm font-normal text-purple-600/70 dark:text-purple-400/70">Click to expand</div>
                                </div>
                              </CardTitle>
                              <ChevronDown 
                                className={`w-5 h-5 text-purple-600 transition-transform duration-200 ${
                                  isLlamaIndexOpen ? 'transform rotate-180' : ''
                                }`}
                              />
                            </button>
                          </Collapsible.Trigger>
                        </CardHeader>
                        <Collapsible.Content>
                          <CardContent className="space-y-6">
                            <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 border-l-4 border-purple-500">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                Strategic Choice: LlamaIndex Over Traditional PDF Parsing Libraries
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                I chose <strong>LlamaIndex for PDF document processing</strong> over traditional libraries like 
                                <strong>PyPDF2, pdf-parse, and pdfplumber</strong> after extensive testing revealed it to be the most 
                                reliable for extracting clean, structured text from complex tax documents. This decision prioritizes 
                                <strong>text extraction quality and document structure preservation</strong> over simplicity, 
                                recognizing that corrupted text extraction leads to meaningless embeddings and failed search results.
                              </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="w-5 h-5 text-purple-600" />
                                  <h5 className="font-semibold text-gray-900 dark:text-gray-100">Superior Text Extraction</h5>
                                </div>
                                <div className="space-y-3">
                                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm font-medium">Complex Document Handling</span>
                                      <Badge className="bg-purple-100 text-purple-700">95% Success Rate</Badge>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      Handles multi-column layouts, tables, and form documents reliably
                                    </p>
                                  </div>
                                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm font-medium">Text Quality</span>
                                      <Badge className="bg-purple-100 text-purple-700">Clean Output</Badge>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      Preserves text structure and eliminates binary corruption issues
                                    </p>
                                  </div>
                                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm font-medium">Regulatory Documents</span>
                                      <Badge className="bg-purple-100 text-purple-700">Specialized</Badge>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      Optimized for legal and tax document formats from government sources
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                                  <h5 className="font-semibold text-gray-900 dark:text-gray-100">Traditional Library Limitations</h5>
                                </div>
                                <div className="space-y-3">
                                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm font-medium">PyPDF2 / pdf-parse</span>
                                      <Badge variant="destructive">40% Failure Rate</Badge>
                                    </div>
                                                                         <p className="text-xs text-gray-600 dark:text-gray-400">
                                       Frequently produced corrupted binary text like: &quot;/i Z$ * A 8 &#123; u A 9 W NV$&quot;
                                     </p>
                                  </div>
                                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm font-medium">pdfplumber</span>
                                      <Badge variant="destructive">Layout Issues</Badge>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      Better than PyPDF2 but struggled with complex tax form layouts
                                    </p>
                                  </div>
                                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm font-medium">Text Validation</span>
                                      <Badge variant="destructive">Missing</Badge>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      No built-in mechanisms to detect corrupted text extraction
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg p-4">
                              <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-amber-600" />
                                LlamaIndex Advantages for Tax Document Processing
                              </h5>
                              <div className="grid md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <h6 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Document Intelligence</h6>
                                  <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                    <li>• Built-in document structure understanding</li>
                                    <li>• Automatic chunking for optimal embedding</li>
                                    <li>• Context-aware text extraction</li>
                                    <li>• Metadata preservation during processing</li>
                                  </ul>
                                </div>
                                <div>
                                  <h6 className="font-medium text-gray-900 dark:text-gray-100 mb-2">RAG-Optimized</h6>
                                  <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                    <li>• Designed specifically for LLM workflows</li>
                                    <li>• Semantic chunking strategies</li>
                                    <li>• Built-in text quality validation</li>
                                    <li>• Integration with embedding models</li>
                                  </ul>
                                </div>
                                <div>
                                  <h6 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Enterprise Features</h6>
                                  <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                    <li>• Error handling and recovery</li>
                                    <li>• Multiple extraction strategies</li>
                                    <li>• Performance monitoring</li>
                                    <li>• Production-ready reliability</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4">
                              <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                Why This Choice Matters for Tax Research Quality
                              </h5>
                              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                The previous system was producing <strong>corrupted binary data</strong> instead of readable text, 
                                making the entire AI search system ineffective. Tax documents often contain complex layouts, 
                                multi-column text, embedded tables, and government form structures that traditional PDF libraries 
                                struggle with. <strong>LlamaIndex&apos;s document-intelligence approach</strong> understands these 
                                structures and extracts clean, searchable text that produces meaningful embeddings. This ensures 
                                our <strong>RAG system can actually find relevant tax information</strong> instead of searching 
                                through meaningless binary corruption—a critical foundation for professional tax research accuracy.
                              </p>
                            </div>
                          </CardContent>
                        </Collapsible.Content>
                      </Collapsible.Root>
                    </Card>

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

                    {/* Time Comparison */}
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

                  {/* Technical Specification */}
                  <TabsContent value="specification" className="space-y-8">
                    {/* Success Metrics */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                        <BarChart3 className="w-6 h-6 text-green-500" />
                        Success Metrics
                      </h3>
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

                    {/* Implementation Roadmap */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                        <Target className="w-6 h-6 text-blue-500" />
                        Implementation Roadmap
                      </h3>
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
                          <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Transform Tax Research Into Strategic Advantage
                          </h4>
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
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}