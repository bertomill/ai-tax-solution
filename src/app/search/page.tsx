"use client"

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowRight,
  ChevronDown,
  Shield,
  Lock,
  CheckCircle,
  Brain
} from 'lucide-react'
import { RAGSearch } from '@/components/rag-search'
import { DocumentSidebar } from '@/components/document-sidebar'
import * as Collapsible from '@radix-ui/react-collapsible'

interface PainPoint {
  title: string
  description: string
  timeImpact: string
}

interface SolutionFeature {
  title: string
  description: string
  timeSaved: string
}

interface Metric {
  category: string
  items: { label: string; value: string; improvement?: string }[]
}

interface OnThisPageSection {
  id: string
  title: string
  subsections?: { id: string; title: string }[]
}

interface OnThisPageSidebarProps {
  className?: string
}

function OnThisPageSidebar({ className }: OnThisPageSidebarProps) {
  const [activeSection, setActiveSection] = useState('')

  const sections: OnThisPageSection[] = [
    { id: 'core-problem', title: 'The Core Problem' },
    { id: 'pain-points', title: 'Current Pain Points' },
    { id: 'ai-solution', title: 'Our AI Solution' },
    { id: 'professional-architecture', title: 'Professional-Mediated Architecture' },
    { id: 'embedding-model', title: 'Embedding Model Choice' },
    { id: 'pdf-processing', title: 'PDF Document Processing' },
    { id: 'value-proposition', title: 'Value Proposition' },
    { id: 'success-metrics', title: 'Success Metrics' },
    { id: 'implementation-roadmap', title: 'Implementation Roadmap' },
    { id: 'security-by-design', title: 'Security by Design' }
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
  }, [sections])

  return (
    <div className={`${className} bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg p-4 sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto`}>
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200/50 dark:border-gray-700/50">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">On this page</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Navigate solution sections</p>
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

function SearchPageContent() {
  const searchParams = useSearchParams()
  const [isProfessionalArchOpen, setIsProfessionalArchOpen] = useState(false)
  const [isEmbeddingModelOpen, setIsEmbeddingModelOpen] = useState(false)
  const [isLlamaIndexOpen, setIsLlamaIndexOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('search')

  // Handle URL tab parameter
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'design') {
      setActiveTab('design')
    } else {
      setActiveTab('search')
    }
  }, [searchParams])

  // Subtle scroll up animation when component mounts
  React.useEffect(() => {
    const currentScroll = window.scrollY
    if (currentScroll > 100) {
      window.scrollTo({ top: currentScroll - 80, behavior: 'smooth' })
    }
  }, [])

  const currentPainPoints: PainPoint[] = [
    {
      title: "Time-Intensive Research Process",
      description: "Tax professionals spend 4-6 hours researching complex questions that should take 30 minutes",
      timeImpact: "4-6 hours per question"
    },
    {
      title: "Information Overload & Fragmentation",
      description: "Tax code spans 70,000+ pages with constant updates across multiple systems",
      timeImpact: "2-4 hours multi-source searching"
    },
    {
      title: "High Risk of Missing Critical Information",
      description: "Regulatory changes happen frequently with limited notification",
      timeImpact: "30-60 minutes quality review"
    },
    {
      title: "Inefficient Knowledge Transfer",
      description: "Senior professionals' expertise isn't captured systematically",
      timeImpact: "1-2 hours documentation"
    }
  ]

  const solutionFeatures: SolutionFeature[] = [
    {
      title: "Intelligent Query Processing",
      description: "Natural language AI understands complex tax questions instantly",
      timeSaved: "30 minutes → Instant"
    },
    {
      title: "Unified Knowledge Search",
      description: "Single search across all authoritative sources simultaneously",
      timeSaved: "2-4 hours → 5 minutes"
    },
    {
      title: "Context-Aware Results",
      description: "AI provides jurisdiction-specific, entity-specific guidance",
      timeSaved: "1-2 hours → Immediate"
    },
    {
      title: "Professional Documentation",
      description: "AI generates client-ready memos with proper legal formatting",
      timeSaved: "1-2 hours → 10 minutes"
    }
  ]

  const successMetrics: Metric[] = [
    {
      category: "Efficiency Gains",
      items: [
        { label: "Research time reduction", value: "75-85%" },
        { label: "Client response time", value: "Same day", improvement: "vs. 3-5 days" },
        { label: "Questions handled per professional", value: "3-5x increase" }
      ]
    },
    {
      category: "Quality Improvements",
      items: [
        { label: "Source comprehensiveness", value: "95%", improvement: "vs. 60-70%" },
        { label: "Regulatory change detection", value: "Real-time", improvement: "vs. weeks/months delay" },
        { label: "Error reduction", value: "60-80%", improvement: "fewer missed considerations" }
      ]
    },
    {
      category: "Business Impact",
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
      
      <div className="relative z-10 pt-4 pb-8">
        <div className="w-full px-4">
          {/* Main Layout - Two Columns */}
          <div className="flex gap-6 min-h-screen">
            {/* Left Column - Main Content */}
            <div className="flex-1 min-w-0">
              {/* Content based on active tab */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                {activeTab === 'search' && (
                  <div className="mt-6 w-full">
                    <RAGSearch />
                  </div>
                )}

                {activeTab === 'design' && (
                  <div className="space-y-8 mt-6">
                {/* Solution Design Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6"
                >
                  <div className="mb-2">
                    <h2 className="text-2xl font-bold text-black dark:text-gray-100">
                      AI Tax Research Platform
                    </h2>
                  </div>
                  <p className="text-base text-black dark:text-gray-300">
                    Transforming tax research from a time-intensive bottleneck into a strategic advantage
                  </p>
                </motion.div>

                {/* Solution Overview */}
                <div className="space-y-8">
                    {/* Problem Statement */}
                    <div id="core-problem" className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        The Core Problem
                      </h3>
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Tax professionals spend <strong>60-80% of their time</strong> on research and compliance tasks 
                        rather than strategic advisory work. The current tax research process is fragmented, 
                        time-intensive, and prone to missing critical information.
                      </p>
                    </div>

                    {/* Current Pain Points */}
                    <div id="pain-points" className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Current Pain Points
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {currentPainPoints.map((pain, index) => (
                          <motion.div
                            key={pain.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="space-y-3"
                          >
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                {pain.title}
                              </h4>
                              <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                {pain.timeImpact}
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {pain.description}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* AI Solution */}
                    <div id="ai-solution" className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Our AI Solution: Transformed User Journey
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {solutionFeatures.map((feature, index) => (
                          <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="space-y-3"
                          >
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                {feature.title}
                              </h4>
                              <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                {feature.timeSaved}
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {feature.description}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Key Design Decision */}
                    <div id="professional-architecture" className="space-y-6">
                      <Collapsible.Root open={isProfessionalArchOpen} onOpenChange={setIsProfessionalArchOpen}>
                        <div>
                          <Collapsible.Trigger asChild>
                            <button className="flex items-center justify-between w-full text-left group">
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                Key Design Decision: Professional-Mediated Architecture
                              </h3>
                              <ChevronDown 
                                className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                                  isProfessionalArchOpen ? 'transform rotate-180' : ''
                                }`}
                              />
                            </button>
                          </Collapsible.Trigger>
                        </div>
                        <Collapsible.Content>
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
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
                                <h5 className="font-semibold text-gray-900 dark:text-gray-100">Compliance Safeguards</h5>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                  <li><strong>Professional Liability:</strong> Licensed professionals validate all advice</li>
                                  <li><strong>Regulatory Compliance:</strong> Maintains attorney-client privilege</li>
                                  <li><strong>Quality Control:</strong> Professional judgment filters AI responses</li>
                                  <li><strong>Ethical Standards:</strong> Upholds professional conduct requirements</li>
                                </ul>
                              </div>

                              <div className="space-y-3">
                                <h5 className="font-semibold text-gray-900 dark:text-gray-100">Trust & Relationships</h5>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                  <li><strong>Client Confidence:</strong> Trusted advisor remains the source of truth</li>
                                  <li><strong>Professional Relationships:</strong> Preserves advisor-client dynamics</li>
                                  <li><strong>Context Awareness:</strong> Professional adds client-specific nuance</li>
                                  <li><strong>Value Perception:</strong> Maintains premium professional positioning</li>
                                </ul>
                              </div>

                              <div className="space-y-3">
                                <h5 className="font-semibold text-gray-900 dark:text-gray-100">Security & Privacy</h5>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                  <li><strong>Data Protection:</strong> Sensitive client info stays within firm</li>
                                  <li><strong>Access Control:</strong> Professional-grade authentication & audit trails</li>
                                  <li><strong>Confidentiality:</strong> No direct client-AI interaction logs</li>
                                  <li><strong>Firm IP:</strong> Internal knowledge stays proprietary</li>
                                </ul>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h5 className="font-semibold text-gray-900 dark:text-gray-100">
                                Why This Architecture Wins
                              </h5>
                              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                This design delivers the <strong>efficiency of AI automation</strong> while preserving the 
                                <strong>trust, expertise, and liability protection</strong> that clients expect from professional services. 
                                Tax professionals become more productive and valuable, not replaced—using AI as a research accelerator 
                                while maintaining their role as the authoritative advisor and quality gatekeeper.
                              </p>
                            </div>
                          </div>
                        </Collapsible.Content>
                      </Collapsible.Root>
                    </div>

                    {/* Key Design Decision: Embedding Model Choice */}
                    <div id="embedding-model" className="space-y-6">
                      <Collapsible.Root open={isEmbeddingModelOpen} onOpenChange={setIsEmbeddingModelOpen}>
                        <div>
                          <Collapsible.Trigger asChild>
                            <button className="flex items-center justify-between w-full text-left group">
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                Key Design Decision: OpenAI text-embedding-3-large with 1536 Dimensions
                              </h3>
                              <ChevronDown 
                                className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                                  isEmbeddingModelOpen ? 'transform rotate-180' : ''
                                }`}
                              />
                            </button>
                          </Collapsible.Trigger>
                        </div>
                        <Collapsible.Content>
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
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
                            <h5 className="font-semibold text-gray-900 dark:text-gray-100">Performance Advantages</h5>
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">Multilingual Tax Content</span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">+40% Accuracy</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  MIRACL benchmark: 54.9% vs 44.0% for text-embedding-3-small
                                </p>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">English Tax Documents</span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">+4% Accuracy</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  MTEB benchmark: 64.6% vs 62.3% for text-embedding-3-small
                                </p>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">Complex Legal Language</span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">Superior</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Better understanding of tax terminology and regulatory context
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h5 className="font-semibold text-gray-900 dark:text-gray-100">Dimension Optimization</h5>
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">1536 vs 3072 Dimensions</span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">50% Cost Savings</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Negligible accuracy loss with significant storage efficiency
                                </p>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">1536 vs 1024 Dimensions</span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">+15% Quality</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Meaningful accuracy improvement for complex documents
                                </p>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">Database Compatibility</span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">Native Support</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Matches existing Supabase vector schema without migration
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h5 className="font-semibold text-gray-900 dark:text-gray-100">
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

                        <div className="space-y-4">
                          <h5 className="font-semibold text-gray-900 dark:text-gray-100">
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
                      </div>
                    </Collapsible.Content>
                  </Collapsible.Root>
                </div>

                    {/* Key Design Decision: LlamaIndex PDF Parsing */}
                    <div id="pdf-processing" className="space-y-6">
                      <Collapsible.Root open={isLlamaIndexOpen} onOpenChange={setIsLlamaIndexOpen}>
                        <div>
                          <Collapsible.Trigger asChild>
                            <button className="flex items-center justify-between w-full text-left group">
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                Key Design Decision: LlamaIndex for PDF Document Processing
                              </h3>
                              <ChevronDown 
                                className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                                  isLlamaIndexOpen ? 'transform rotate-180' : ''
                                }`}
                              />
                            </button>
                          </Collapsible.Trigger>
                        </div>
                        <Collapsible.Content>
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
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
                                <h5 className="font-semibold text-gray-900 dark:text-gray-100">Superior Text Extraction</h5>
                                <div className="space-y-3">
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-medium">Complex Document Handling</span>
                                      <span className="text-sm text-gray-500 dark:text-gray-400">95% Success Rate</span>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      Handles multi-column layouts, tables, and form documents reliably
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-medium">Text Quality</span>
                                      <span className="text-sm text-gray-500 dark:text-gray-400">Clean Output</span>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      Preserves text structure and eliminates binary corruption issues
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-medium">Regulatory Documents</span>
                                      <span className="text-sm text-gray-500 dark:text-gray-400">Specialized</span>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      Optimized for legal and tax document formats from government sources
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h5 className="font-semibold text-gray-900 dark:text-gray-100">Traditional Library Limitations</h5>
                                <div className="space-y-3">
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-medium">PyPDF2 / pdf-parse</span>
                                      <span className="text-sm text-red-500 dark:text-red-400">40% Failure Rate</span>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      Frequently produced corrupted binary text like: &quot;/i Z$ * A 8 &#123; u A 9 W NV$&quot;
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-medium">pdfplumber</span>
                                      <span className="text-sm text-red-500 dark:text-red-400">Layout Issues</span>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      Better than PyPDF2 but struggled with complex tax form layouts
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-medium">Text Validation</span>
                                      <span className="text-sm text-red-500 dark:text-red-400">Missing</span>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                      No built-in mechanisms to detect corrupted text extraction
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h5 className="font-semibold text-gray-900 dark:text-gray-100">
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

                            <div className="space-y-4">
                              <h5 className="font-semibold text-gray-900 dark:text-gray-100">
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
                          </div>
                        </Collapsible.Content>
                      </Collapsible.Root>
                    </div>

                    {/* In-Market Examples */}
                    <div id="in-market-examples" className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        In-Market Examples
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Several established players are already demonstrating the value of AI-powered tax research and document search. 
                        These solutions validate the market demand and show the transformative potential of AI in tax services.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                              <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">BJ</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Blue J</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">AI-Powered Tax Research Platform</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Blue J offers a generative AI solution for tax research that transforms how tax professionals work. 
                              Their platform provides conversational AI research capabilities with verifiable answers from trusted tax sources.
                            </p>
                            
                            <div className="space-y-2">
                              <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Key Features:</h5>
                              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                <li>• Conversational AI research interface</li>
                                <li>• Curated database of trusted tax resources</li>
                                <li>• Automated drafting of emails and memos</li>
                                <li>• Human oversight by experienced legal research team</li>
                                <li>• Used by leading firms including RSM, KPMG, Crowe</li>
                              </ul>
                            </div>
                            
                            <div className="pt-2">
                              <a 
                                href="https://www.bluej.com/ca" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium inline-flex items-center gap-1"
                              >
                                Visit Blue J →
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                              <span className="text-green-600 dark:text-green-400 font-bold text-lg">BT</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Bloomberg Tax AI</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Intelligent Tax Research & Analysis</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                             Bloomberg Tax&apos;s AI technology enhances their comprehensive tax research platform with intelligent 
                               search capabilities and automated analysis tools for tax professionals.
                            </p>
                            
                            <div className="space-y-2">
                              <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Key Features:</h5>
                              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                <li>• AI-powered search across Bloomberg Tax content</li>
                                <li>• Automated tax analysis and insights</li>
                                <li>• Integration with Bloomberg&apos;s extensive tax database</li>
                                <li>• Professional-grade research tools</li>
                                <li>• Enterprise-level security and compliance</li>
                              </ul>
                            </div>
                            
                            <div className="pt-2">
                              <a 
                                href="https://pro.bloombergtax.com/products/ai-and-bloomberg-tax/#technology" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium inline-flex items-center gap-1"
                              >
                                Learn More →
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                          Market Validation
                        </h4>
                        <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                          The success of platforms like Blue J and Bloomberg Tax AI demonstrates strong market demand for 
                          AI-powered tax research solutions. These established players have proven that tax professionals 
                          are ready to adopt AI tools that enhance their research capabilities while maintaining professional 
                          standards and accuracy.
                        </p>
                      </div>
                    </div>

                    {/* Value Proposition */}
                    <div id="value-proposition" className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Value Proposition
                      </h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">For Tax Professionals</h4>
                          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li><strong>10x Faster Research:</strong> Reduce 5-8 hour process to 15-30 minutes</li>
                            <li><strong>Higher Accuracy:</strong> AI catches changes humans miss</li>
                            <li><strong>Strategic Focus:</strong> More time for advisory work</li>
                            <li><strong>Consistent Quality:</strong> Junior staff access senior-level research</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">For Tax Firms</h4>
                          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li><strong>Increased Capacity:</strong> Handle 3-5x more client questions</li>
                            <li><strong>Improved Margins:</strong> Convert research to advisory hours</li>
                            <li><strong>Risk Reduction:</strong> Comprehensive search reduces failures</li>
                            <li><strong>Knowledge Scaling:</strong> Firm expertise becomes accessible</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">For Clients</h4>
                          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li><strong>Faster Responses:</strong> Answers during meetings</li>
                            <li><strong>Lower Costs:</strong> Reduced research time</li>
                            <li><strong>Better Outcomes:</strong> More thorough research</li>
                            <li><strong>Proactive Guidance:</strong> AI identifies opportunities</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Time Comparison */}
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-8 mb-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">5-8 Hours</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Current Process</div>
                          </div>
                          <ArrowRight className="w-8 h-8 text-gray-400" />
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">15-30 Minutes</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">AI Solution</div>
                          </div>
                        </div>
                        <div className="text-lg text-gray-600 dark:text-gray-400">
                          90%+ Time Reduction
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technical Specification */}
                  <div className="space-y-8">
                    {/* Success Metrics */}
                    <div id="success-metrics" className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Success Metrics
                      </h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        {successMetrics.map((metric, index) => (
                          <motion.div
                            key={metric.category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="space-y-4"
                          >
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                {metric.category}
                              </h4>
                              <div className="space-y-3">
                                {metric.items.map((item, i) => (
                                  <div key={i} className="space-y-1">
                                    <div className="flex justify-between items-start">
                                      <div className="font-medium text-gray-900 dark:text-gray-100">{item.label}</div>
                                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.value}</div>
                                    </div>
                                    {item.improvement && (
                                      <div className="text-xs text-gray-500 dark:text-gray-400">{item.improvement}</div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Implementation Roadmap */}
                    <div id="implementation-roadmap" className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Implementation Roadmap
                      </h3>
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Phase 1: Core Research Engine</h4>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Month 1-3</div>
                          </div>
                          <ul className="space-y-2 text-gray-600 dark:text-gray-400 ml-11">
                            <li>Deploy AI-powered search across federal tax authorities</li>
                            <li>Conduct workdshops aroud the enterprise with partners and clients</li>
                            <li>Identify key areas for improvement</li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Phase 2: Advanced Features</h4>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Month 4-6</div>
                          </div>
                          <ul className="space-y-2 text-gray-600 dark:text-gray-400 ml-11">
                            <li>Allow users to create mulitple different projects</li>
                            <li>Implement professional memo generation</li>
                            <li>Enable memory and  search across projects</li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Phase 3: Strategic Advisory</h4>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Month 7-12</div>
                          </div>
                          <ul className="space-y-2 text-gray-600 dark:text-gray-400 ml-11">
                            <li>Develop training curiculum</li>
                            <li>Scale accessibility to full company</li>
                            <li>Create client-facing research interfaces</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Security by Design */}
                    <div id="security-by-design" className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Security by Design
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        Our AI tax research solution is built with security, accuracy, and traceability as foundational principles. 
                        We address the critical concerns of hallucination prevention, data security, and audit trail requirements 
                        that are essential for professional tax research and compliance work.
                      </p>
                      
                      <div className="space-y-8">
                        {/* Hallucination Prevention */}
                        <div className="space-y-4">
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            How does this solution prevent AI hallucination?
                          </h4>
                          <div className="space-y-4">
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Retrieval-Augmented Generation (RAG) Architecture</h5>
                              <p className="text-gray-600 dark:text-gray-400 mb-3">
                                Our system uses RAG technology to ensure every response is grounded in verified source documents. 
                                The AI cannot generate information that isn&apos;t present in the uploaded documentation, eliminating 
                                the risk of fabricating tax codes, rates, or procedures.
                              </p>
                              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <li>• All responses are generated from retrieved document chunks, not from the AI&apos;s training data</li>
                                <li>• Source citations are mandatory for every factual claim made by the system</li>
                                <li>• Confidence scoring indicates when information is uncertain or incomplete</li>
                                <li>• Fallback mechanisms prevent responses when insufficient source material is available</li>
                              </ul>
                            </div>
                            
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Document Verification & Validation</h5>
                              <p className="text-gray-600 dark:text-gray-400 mb-3">
                                Every document uploaded undergoes verification to ensure authenticity and relevance to tax research.
                              </p>
                              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <li>• File integrity checks prevent corrupted or tampered documents</li>
                                <li>• Content validation ensures documents contain relevant tax information</li>
                                <li>• Version control tracks document updates and changes</li>
                                <li>• Source attribution maintains clear lineage of information</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Data Security */}
                        <div className="space-y-4">
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            How is client data protected and secured?
                          </h4>
                          <div className="space-y-4">
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">End-to-End Encryption & Data Isolation</h5>
                              <p className="text-gray-600 dark:text-gray-400 mb-3">
                                Client data is protected through multiple layers of security measures designed for sensitive tax information.
                              </p>
                              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <li>• AES-256 encryption for all data at rest and in transit</li>
                                <li>• Client-specific data isolation with dedicated secure environments</li>
                                <li>• No cross-client data access or information leakage</li>
                                <li>• Secure API endpoints with rate limiting and DDoS protection</li>
                                <li>• Regular penetration testing and security audits</li>
                              </ul>
                            </div>
                            
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Compliance & Regulatory Adherence</h5>
                              <p className="text-gray-600 dark:text-gray-400 mb-3">
                                Our security framework meets the stringent requirements of tax professional services and regulatory bodies.
                              </p>
                              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <li>• SOC 2 Type II certification for security controls and data protection (security, availability, processing integrity, confidentiality, privacy)</li>
                                <li>• GDPR and PIPEDA compliance for Canadian tax data handling</li>
                                <li>• CRA security requirements for tax professional software</li>
                                <li>• ISO 27001 information security management standards</li>
                                <li>• Professional services industry security benchmarks</li>
                              </ul>
                            </div>
                            
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Access Control & Authentication</h5>
                              <p className="text-gray-600 dark:text-gray-400 mb-3">
                                Multi-layered access controls ensure only authorized personnel can access sensitive tax information.
                              </p>
                              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <li>• Multi-factor authentication (MFA) required for all user accounts</li>
                                <li>• Role-based access control (RBAC) with least privilege principles</li>
                                <li>• Single sign-on (SSO) integration with enterprise identity systems</li>
                                <li>• Session management with automatic timeout and activity monitoring</li>
                                <li>• Comprehensive audit logging for all user activities and data access</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Traceability */}
                        <div className="space-y-4">
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            How does the system ensure traceability and audit trails?
                          </h4>
                          <div className="space-y-4">
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Comprehensive Audit Logging</h5>
                              <p className="text-gray-600 dark:text-gray-400 mb-3">
                                Every action in the system is logged with detailed metadata for complete traceability.
                              </p>
                              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <li>• User authentication and session tracking with timestamps</li>
                                <li>• Document upload, processing, and access logs</li>
                                <li>• Search queries and AI response generation tracking</li>
                                <li>• Source citations and reference tracking for every response</li>
                                <li>• Data export and sharing activity monitoring</li>
                              </ul>
                            </div>
                            
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Source Attribution & Citation Tracking</h5>
                              <p className="text-gray-600 dark:text-gray-400 mb-3">
                                Every piece of information provided by the AI is traceable back to its original source document.
                              </p>
                              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <li>• Automatic source citation generation for all AI responses</li>
                                <li>• Document chunk-level tracking showing exact source locations</li>
                                <li>• Confidence scoring indicating reliability of information</li>
                                <li>• Version tracking for document updates and changes</li>
                                <li>• Exportable audit reports for compliance and review purposes</li>
                              </ul>
                            </div>
                            
                            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                              <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Professional Compliance Reporting</h5>
                              <p className="text-gray-600 dark:text-gray-400 mb-3">
                                Built-in reporting capabilities support professional standards and regulatory requirements.
                              </p>
                              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <li>• Automated compliance reports for tax professional standards</li>
                                <li>• Client-specific activity logs for billing and accountability</li>
                                <li>• Data retention and disposal tracking for regulatory compliance</li>
                                <li>• Integration with professional practice management systems</li>
                                <li>• Export capabilities for external audit and review processes</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Security Commitment */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg p-6 border border-blue-200/50 dark:border-blue-800/50">
                          <div className="text-center">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                              Our Security & Accuracy Commitment
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300">
                              We understand that tax research requires absolute accuracy, complete traceability, and ironclad security. 
                              Our solution is designed to prevent AI hallucination through RAG technology, protect sensitive client data 
                              through enterprise-grade security measures, and provide comprehensive audit trails that meet professional 
                              standards. This security-first approach enables confident adoption across your organization while maintaining 
                              the highest standards of professional integrity.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Final Value Statement */}
                    <div className="space-y-4">
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
                    </div>
                  </div>
                </div>
                )}
              </motion.div>
            </div>

            {/* Right Column - Context-aware sidebar */}
            {activeTab === 'search' ? (
              <DocumentSidebar className="w-72 flex-shrink-0" />
            ) : (
              <OnThisPageSidebar className="w-72 flex-shrink-0" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>}>
      <SearchPageContent />
    </Suspense>
  )
}