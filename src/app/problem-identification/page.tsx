"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
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
  Shield,
  ChevronDown
} from 'lucide-react'
import AutomationChart from '@/components/ui/automation-chart'
import * as Collapsible from '@radix-ui/react-collapsible'

interface OnThisPageSection {
  id: string
  title: string
}

interface OnThisPageSidebarProps {
  className?: string
}

function OnThisPageSidebar({ className }: OnThisPageSidebarProps) {
  const [activeSection, setActiveSection] = useState('')

  const sections: OnThisPageSection[] = [
    { id: 'problem-identification', title: 'Problem Identification' },
    { id: 'user-analysis', title: 'User Analysis' },
    { id: 'mvp-strategy', title: 'MVP Strategy' },
    { id: 'ai-implementation', title: 'AI Implementation' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id)
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`${className} bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg p-4 max-h-[calc(100vh-4rem)] overflow-y-auto shadow-lg`}>
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <FileText className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">On this page</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Navigate approach sections</p>
        </div>
      </div>
      
      <nav className="space-y-1">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`block px-3 py-2 text-sm rounded-md transition-all duration-200 ${
              activeSection === section.id
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {section.title}
          </a>
        ))}
      </nav>
    </div>
  )
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


  // Scroll to top on mount
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      {/* Page Header */}
      <div className="py-8 px-4">
        <div className="max-w-6xl space-y-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-blue-300">
            Approach
          </h1>
          <p className="text-base text-black dark:text-gray-300">
            Comprehensive Problem Analysis & Solution Strategy
          </p>
        </div>
      </div>


      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-6xl xl:mr-80 space-y-12">
          
          {/* Problem Identification Section */}
          <section id="problem-identification" className="space-y-6 scroll-mt-32">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Problem Identification
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Research Analysis & Automation Opportunities
              </p>
            </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Comprehensive Day-to-Day Tax Function Research
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      I did a deep dive into tax operations, through web research and talking to my colleagues who work in tax and analyzing workflows to understand 
                      their daily tasks. Through this research, I identified and catalogued <strong>30+ specific day-to-day activities </strong> 
                      performed across tax departments, ranging from routine data processing to complex analytical work. The comprehensive analysis 
                      below maps each task by volume and complexity to determine the optimal automation approach - whether traditional rule-based 
                      automation or AI-powered solutions.
                    </p>

                    {/* Collapsible Research Methodology */}
                    <Collapsible.Root>
                      <div className="bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 rounded-lg mb-6">
                        <Collapsible.Trigger asChild>
                          <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors rounded-t-lg">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                Research Methodology
                              </h4>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-500 transition-transform ui-state-open:rotate-180" />
                          </button>
                        </Collapsible.Trigger>
                        
                        <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                          <div className="border-t border-gray-200/50 p-4">
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-300">
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Workflow Analysis</h5>
                                <p>Mapped end-to-end processes from document intake to compliance reporting</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Professional Interviews</h5>
                                <p>Spoke with tax analysts, managers, and directors across multiple institutions</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">GenAI Research Reports</h5>
                                <p>Conducted deep research reports with GenAI (OpenAI, Google) for industry insights</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Volume & Complexity Scoring</h5>
                                <p>Quantified each task on frequency (volume) and skill requirements (complexity)</p>
                              </div>
                            </div>
                          </div>
                        </Collapsible.Content>
                      </div>
                    </Collapsible.Root>

                    {/* Collapsible Raw Task List */}
                    <Collapsible.Root>
                      <div className="bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 rounded-lg mb-6">
                        <Collapsible.Trigger asChild>
                          <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors rounded-t-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-blue-600" />
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                List of Day-to-Day Tax Tasks
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                33 tasks identified
                              </Badge>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-500 transition-transform ui-state-open:rotate-180" />
                          </button>
                        </Collapsible.Trigger>
                        
                        <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                          <div className="border-t border-gray-200/50 p-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              Below is the list of tax activities I documented through my research and conversations with tax professionals. 
                              This raw data formed the foundation for the volume/complexity analysis and automation opportunity identification.
                            </p>
                            
                            <div className="max-h-80 overflow-y-auto border border-gray-200/50 rounded-lg">
                              <table className="w-full text-sm">
                                <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800 border-b border-gray-200/50">
                                  <tr>
                                    <th className="text-xs font-medium text-gray-600 dark:text-gray-300 px-3 py-2 text-left w-12">#</th>
                                    <th className="text-xs font-medium text-gray-600 dark:text-gray-300 px-3 py-2 text-left">Task Description</th>
                                    <th className="text-xs font-medium text-gray-600 dark:text-gray-300 px-3 py-2 text-left w-24">Department</th>
                                    <th className="text-xs font-medium text-gray-600 dark:text-gray-300 px-3 py-2 text-left w-20">Frequency</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">01</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Daily cash position reconciliation and tax allocation reporting</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Operations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Daily</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">02</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">State and local tax filing preparation and submission</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Compliance</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Monthly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">03</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Federal tax provision calculations and journal entry preparation</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Accounting</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Monthly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">04</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Quarterly estimated tax payment calculations and remittance</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Treasury</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Quarterly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">05</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Regulatory capital tax adjustment calculations (Basel III)</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Risk</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Monthly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">06</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Transfer pricing documentation review and update</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Annual</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">07</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Municipal bond interest income tax exemption tracking</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Operations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Daily</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">08</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Foreign tax credit limitation calculations and optimization</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Quarterly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">09</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Intercompany transaction tax implications analysis</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Weekly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">10</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">FDIC premium tax deduction calculations and reporting</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Compliance</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Quarterly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">11</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">State tax nexus monitoring and filing requirement assessment</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Compliance</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Monthly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">12</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Loan loss provision tax vs. book difference reconciliation</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Accounting</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Monthly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">13</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Securities gain/loss tax characterization and reporting</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Operations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Daily</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">14</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Tax-exempt entity relationship compliance monitoring</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Compliance</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Ongoing</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">15</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Branch vs. subsidiary tax election impact analysis</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Annual</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">16</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">State income tax apportionment factor calculations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Annual</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">17</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Federal excise tax compliance on financial services</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Compliance</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Monthly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">18</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Derivative instrument tax characterization and reporting</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Operations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Daily</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">19</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Tax audit response preparation and documentation</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Ad-hoc</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">20</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Cross-border transaction withholding tax compliance</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Operations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Daily</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">21</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Alternative Minimum Tax (AMT) preference item tracking</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Annual</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">22</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">State tax credit utilization optimization and planning</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Quarterly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">23</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">REIT qualification testing and distribution requirements</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Quarterly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">24</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Financial institution specific deduction calculations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Annual</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">25</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Consolidated return elimination adjustment preparation</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Annual</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">26</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">State tax legislative change impact assessment</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Ongoing</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">27</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Tax accounting method change requests and filings</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Annual</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">28</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Multi-state tax compliance workflow coordination</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Operations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Monthly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">29</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Ensuring consistency across multiple tax jurisdictions</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Ongoing</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">30</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Rapidly analyzing vast amounts of tax literature and case law</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Ad-hoc</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">31</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Identifying relevant precedents and regulations more efficiently</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Weekly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">32</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Providing clients with instant answers to common tax queries</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Operations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Daily</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">33</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Allowing for rapid scenario modeling and tax impact assessments</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Weekly</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            
                            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg p-3">
                            </div>
                          </div>
                        </Collapsible.Content>
                      </div>
                    </Collapsible.Root>
                  </div>

                  {/* Collapsible Banking Tax Automation Opportunities Chart */}
                  <Collapsible.Root>
                    <div className="bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 rounded-lg mb-6">
                      <Collapsible.Trigger asChild>
                        <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors rounded-t-lg">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                              Banking Tax Automation Opportunities Analysis
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              Volume vs Complexity Chart
                            </Badge>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-500 transition-transform ui-state-open:rotate-180" />
                        </button>
                      </Collapsible.Trigger>
                      
                      <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                        <div className="border-t border-gray-200/50 p-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Interactive analysis showing the relationship between task volume and complexity, with strategic categorization 
                            into traditional automation vs. AI-powered solutions. Click any data point for detailed analysis.
                          </p>
                          <AutomationChart />
                        </div>
                      </Collapsible.Content>
                    </div>
                  </Collapsible.Root>

                  {/* Collapsible Key Research Findings */}
                  <Collapsible.Root>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200/50 rounded-lg">
                      <Collapsible.Trigger asChild>
                        <button className="w-full flex items-center justify-between p-6 text-left hover:bg-blue-100/50 dark:hover:bg-blue-900/20 transition-colors rounded-t-lg">
                          <div className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-blue-600" />
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                              Key Research Findings
                            </h4>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-500 transition-transform ui-state-open:rotate-180" />
                        </button>
                      </Collapsible.Trigger>
                      
                      <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                        <div className="border-t border-blue-200/50 p-6">
                          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                            <li className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span><strong>33 comprehensive tax activities</strong> identified and analyzed across banking operations and strategic functions</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span><strong>Strategic categorization</strong> applied: operational tasks for traditional automation, knowledge-intensive tasks for AI solutions</span>
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
                      </Collapsible.Content>
                    </div>
                  </Collapsible.Root>
                </div>
          </section>

          {/* User Analysis Section */}
          <section id="user-analysis" className="space-y-6 scroll-mt-32">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                User Analysis
              </h2>
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
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-3 bg-gradient-to-r ${persona.color} rounded-lg text-white`}>
                      {persona.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{persona.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{persona.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
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
                  </div>
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
      
      {/* Fixed On This Page Sidebar */}
      <OnThisPageSidebar className="fixed top-8 right-8 z-50 w-64 hidden xl:block" />
    </div>
  )
} 