"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Lightbulb, 
  CheckCircle, 
  Users, 
  Target, 
  Brain,
  Zap,
  FileText,
  TrendingUp,
  Database,
  Building,
  UserCheck,
  Layers,
  Shield
} from 'lucide-react'
import AutomationChart from '@/components/ui/automation-chart'
import Footer from '@/components/ui/footer'

interface TabItem {
  id: string
  label: string
  icon: React.ReactNode
}

interface UserPersona {
  title: string
  description: string
  painPoints: string[]
  currentProcess: string
  icon: React.ReactNode
  color: string
}

interface MVPFeature {
  title: string
  description: string
  priority: string
  timeframe: string
  icon: React.ReactNode
}

interface AIComponent {
  title: string
  description: string
  technology: string
  implementation: string
  icon: React.ReactNode
  color: string
}

export default function ProblemIdentificationPage() {
  const [activeTab, setActiveTab] = useState<string>('problem-identification')

  const tabs: TabItem[] = [
    {
      id: 'problem-identification',
      label: 'Problem Identification',
      icon: <Lightbulb className="w-4 h-4" />
    },
    {
      id: 'user-analysis',
      label: 'User Analysis',
      icon: <Users className="w-4 h-4" />
    },
    {
      id: 'mvp-strategy',
      label: 'MVP Strategy',
      icon: <Target className="w-4 h-4" />
    },
    {
      id: 'ai-implementation',
      label: 'AI Implementation',
      icon: <Brain className="w-4 h-4" />
    }
  ]

  const userPersonas: UserPersona[] = [
    {
      title: "Tax Compliance Manager",
      description: "Senior professional responsible for ensuring regulatory compliance across multiple jurisdictions",
      painPoints: [
        "Manually tracking regulatory changes across 15+ jurisdictions",
        "3-4 hours daily spent on compliance status reporting",
        "Risk of missing critical deadline notifications",
        "Difficulty prioritizing conflicting compliance requirements"
      ],
      currentProcess: "Email alerts + manual spreadsheet tracking + quarterly reviews",
      icon: <Shield className="w-5 h-5" />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Tax Research Analyst",
      description: "Junior to mid-level professional conducting detailed tax research and analysis",
      painPoints: [
        "5-8 hours per research question across multiple sources",
        "Inconsistent access to current regulatory guidance",
        "Manual document review and cross-referencing",
        "Difficulty validating research completeness"
      ],
      currentProcess: "Multiple database searches + manual document review + senior validation",
      icon: <FileText className="w-5 h-5" />,
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Banking Operations Director",
      description: "Executive overseeing tax operations and looking for efficiency improvements",
      painPoints: [
        "Limited visibility into team productivity metrics",
        "High cost per research hour ($150-300/hr)",
        "Difficulty scaling expertise across regions",
        "Inconsistent quality in research outputs"
      ],
      currentProcess: "Monthly team reviews + client billing analysis + manual quality checks",
      icon: <Building className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600"
    }
  ]

  const mvpFeatures: MVPFeature[] = [
    {
      title: "AI-Powered Tax Research Engine",
      description: "Natural language search across federal tax authorities with intelligent results ranking",
      priority: "P0 - Core",
      timeframe: "Month 1-2",
      icon: <Brain className="w-5 h-5" />
    },
    {
      title: "Document Processing Pipeline",
      description: "Automated ingestion and indexing of PDF tax documents with text extraction",
      priority: "P0 - Core", 
      timeframe: "Month 1-2",
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: "Professional Dashboard",
      description: "Clean interface for tax professionals to conduct research and review results",
      priority: "P0 - Core",
      timeframe: "Month 2-3",
      icon: <UserCheck className="w-5 h-5" />
    },
    {
      title: "Basic Analytics & Tracking",
      description: "Simple metrics on search patterns, time saved, and user engagement",
      priority: "P1 - Important",
      timeframe: "Month 3",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      title: "Team Collaboration Features",
      description: "Shared research projects and annotation capabilities for team workflows",
      priority: "P2 - Nice to Have",
      timeframe: "Month 4+",
      icon: <Users className="w-5 h-5" />
    }
  ]

  const aiComponents: AIComponent[] = [
    {
      title: "Embedding Model",
      description: "OpenAI text-embedding-3-large for high-quality semantic search across tax documents",
      technology: "OpenAI API",
      implementation: "1536-dimensional vectors stored in Supabase with pgvector",
      icon: <Database className="w-5 h-5" />,
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Document Processing",
      description: "LlamaIndex for reliable PDF text extraction and intelligent chunking strategies",
      technology: "LlamaIndex",
      implementation: "Python backend with async processing and quality validation",
      icon: <FileText className="w-5 h-5" />,
      color: "from-green-500 to-teal-600"
    },
    {
      title: "RAG System",
      description: "Retrieval-Augmented Generation for contextual responses with source attribution",
      technology: "OpenAI GPT-4",
      implementation: "Vector similarity search + context injection + response generation",
      icon: <Brain className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Real-time Updates",
      description: "Automated monitoring and ingestion of new regulatory publications",
      technology: "Scheduled Workers",
      implementation: "Daily crawlers + change detection + automatic reprocessing",
      icon: <Zap className="w-5 h-5" />,
      color: "from-orange-500 to-red-600"
    }
  ]

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 120 // Account for sticky header
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setActiveTab(sectionId)
  }

  // Handle scroll spy for active tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['problem-identification', 'user-analysis', 'mvp-strategy', 'ai-implementation']
      const scrollPosition = window.scrollY + 150

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      {/* Page Header */}
      <div className="text-center py-8 px-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
          Approach
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
          Comprehensive Problem Analysis & Solution Strategy
        </p>
      </div>

      {/* Sticky Tab Navigation */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-1 p-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-700 bg-blue-100'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-100 rounded-lg -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Problem Identification Section */}
          <section id="problem-identification" className="space-y-6 scroll-mt-32">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Lightbulb className="w-6 h-6 text-amber-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Problem Identification
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Research Analysis & Automation Opportunities
              </p>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Comprehensive Day-to-Day Tax Function Research
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      I conducted extensive research into banking tax operations, interviewing professionals and analyzing workflows to understand 
                      their daily tasks. Through this research, I identified and catalogued <strong>18+ specific day-to-day activities</strong> 
                      performed across tax departments, ranging from routine data processing to complex analytical work. The comprehensive analysis 
                      below maps each task by volume and complexity to determine the optimal automation approach - whether traditional rule-based 
                      automation or AI-powered solutions.
                    </p>

                    {/* Research Methodology */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200/50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        Research Methodology
                      </h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Workflow Analysis</h5>
                          <p>Mapped end-to-end processes from document intake to compliance reporting</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Professional Interviews</h5>
                          <p>Spoke with tax analysts, managers, and directors across multiple institutions</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Volume & Complexity Scoring</h5>
                          <p>Quantified each task on frequency (volume) and skill requirements (complexity)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <AutomationChart />

                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200/50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center space-x-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <span>Key Research Findings</span>
                    </h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>18+ day-to-day tax activities</strong> identified and analyzed across banking operations</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Strategic categorization</strong> applied: 6 tasks optimal for traditional automation, 12+ requiring AI solutions</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>High-volume, low-complexity zone</strong> contains 7 prime automation candidates with 75%+ volume scores</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>AI solutions dominate</strong> interpretive tasks: document classification, regulatory analysis, and transaction monitoring</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Traditional automation excels</strong> at structured tasks: calculations, data validation, and report generation</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span><strong>Research methodology</strong> included workflow analysis, professional interviews, and volume/complexity scoring</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* User Analysis Section */}
          <section id="user-analysis" className="space-y-6 scroll-mt-32">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Users className="w-6 h-6 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  User Analysis
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Understanding Our Users & Their Pain Points
              </p>
            </div>

            <div className="space-y-6">
              {userPersonas.map((persona, index) => (
                <motion.div
                  key={persona.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className={`p-3 bg-gradient-to-r ${persona.color} rounded-lg text-white`}>
                          {persona.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{persona.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 font-normal">{persona.description}</p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-red-500" />
                          Current Pain Points
                        </h4>
                        <ul className="space-y-1">
                          {persona.painPoints.map((pain, i) => (
                            <li key={i} className="text-gray-600 dark:text-gray-300 text-sm ml-6">
                              • {pain}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1 text-sm">Current Process:</h5>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{persona.currentProcess}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* MVP Strategy Section */}
          <section id="mvp-strategy" className="space-y-6 scroll-mt-32">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Target className="w-6 h-6 text-purple-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  MVP Strategy
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Phased Approach to Product Development
              </p>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      MVP Goal: Prove 75% Time Reduction in Tax Research
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Launch with 3 core features that deliver immediate value to tax professionals
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {mvpFeatures.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={`border-l-4 ${
                          feature.priority === 'P0 - Core' ? 'border-l-green-500' :
                          feature.priority === 'P1 - Important' ? 'border-l-yellow-500' :
                          'border-l-gray-400'
                        } hover:shadow-md transition-all duration-200`}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3 flex-1">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                  {feature.icon}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                    {feature.title}
                                  </h4>
                                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                    {feature.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <Badge 
                                  className={
                                    feature.priority === 'P0 - Core' ? 'bg-green-100 text-green-700' :
                                    feature.priority === 'P1 - Important' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-gray-100 text-gray-700'
                                  }
                                >
                                  {feature.priority}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {feature.timeframe}
                                </Badge>
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

          {/* AI Implementation Section */}
          <section id="ai-implementation" className="space-y-6 scroll-mt-32">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Brain className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  AI Implementation
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Technical Architecture & AI Integration Strategy
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {aiComponents.map((component, index) => (
                  <motion.div
                    key={component.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <div className={`p-3 bg-gradient-to-r ${component.color} rounded-lg text-white`}>
                            {component.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{component.title}</h3>
                            <Badge variant="outline" className="mt-1">{component.technology}</Badge>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {component.description}
                        </p>
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                          <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1 text-xs uppercase tracking-wide">
                            Implementation
                          </h5>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {component.implementation}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-200/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-600" />
                    System Architecture Overview
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Data Layer</h4>
                      <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                        <li>• Supabase PostgreSQL with pgvector</li>
                        <li>• 1536-dimensional embeddings storage</li>
                        <li>• Document metadata & versioning</li>
                        <li>• User activity & analytics tracking</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Processing Layer</h4>
                      <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                        <li>• LlamaIndex document processing</li>
                        <li>• OpenAI embedding generation</li>
                        <li>• Semantic search & ranking</li>
                        <li>• RAG response generation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Interface Layer</h4>
                      <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                        <li>• Next.js professional dashboard</li>
                        <li>• Real-time search interface</li>
                        <li>• Document upload & management</li>
                        <li>• Analytics & reporting tools</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
} 