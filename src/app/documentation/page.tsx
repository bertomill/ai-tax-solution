"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { 
  Brain, 
  TrendingUp, 
  Lightbulb, 
  Target, 
  CheckCircle,
  Eye,
  Rocket,
  ExternalLink,
  Database,
  Network,
  Zap,
  FileText
} from 'lucide-react'
import { getDocumentationSections, type DocumentationSection } from '@/lib/documentation-data'

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
    { id: 'ai-forms', title: 'Different Forms of AI' },
    { id: 'rag-technology', title: 'RAG Technology' },
    { id: 'efficiency', title: 'Efficiency Gains' },
    { id: 'insights', title: 'Strategic Insights' },
    { id: 'practical-lessons', title: 'Practical Lessons' }
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
    <div className={`${className} bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg p-4 sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto`}>
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <FileText className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">On this page</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Navigate documentation sections</p>
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

const DocumentationPage: React.FC = () => {
  const [sections, setSections] = useState<DocumentationSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await getDocumentationSections()
        setSections(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching documentation:', err)
        setError('Failed to load documentation')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const efficiencySection = sections.find(s => s.category === 'efficiency')
  const insightsSection = sections.find(s => s.category === 'insights')
  const practicalLessonsSection = sections.find(s => s.category === 'practical-lessons')

  const createSectionContent = (section: DocumentationSection, colorTheme: 'green' | 'purple' | 'orange', icon: React.ReactElement) => {
    if (!section) return null
    
    return (
      <section className="mb-16">
        <div className="mb-6">
          <h2 className="flex items-center space-x-3 text-2xl font-bold text-gray-900">
            <span>{section.title}</span>
            <Badge variant="outline" className="text-xs ml-2">
              {section.category}
            </Badge>
          </h2>
          <p className="text-gray-600 mt-2">{section.description}</p>
        </div>
        
        <div className="prose prose-sm max-w-none">
          <div dangerouslySetInnerHTML={{ __html: section.content }} />
        </div>
        
        <Separator className="my-8" />
        
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">{section.title}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.key_points?.map((point: string, index: number) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50/80 rounded-lg">
                <CheckCircle className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm text-gray-600">{point}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Documentation</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(156,146,172,0.15)_1px,transparent_0)] bg-[length:20px_20px] opacity-30" />
      
      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Header Section */}
              <motion.div 
                id="overview"
                className="text-left mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                                  <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      Documentation & Resources
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Comprehensive documentation, AI landscape overview, and key insights from my research
                    </p>
                  </div>
              </motion.div>

              {/* Different Forms of AI Section */}
              <motion.section
                id="ai-forms"
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="mb-6">
                  <h2 className="flex items-center space-x-3 text-2xl font-bold text-gray-900">
                    <span>Different Forms of AI</span>
                    <Badge variant="outline" className="text-xs ml-2">
                      ai-landscape
                    </Badge>
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Understanding the broader AI ecosystem and where our tax research solution fits within the artificial intelligence landscape
                  </p>
                </div>
                <div className="space-y-6">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        While ChatGPT has captured most attention, it represents just one specific area within the vast field of Artificial Intelligence. 
                        The following solutions leverage multiple AI disciplines including <strong>Natural Language Processing (NLP)</strong>, 
                        <strong>Machine Learning (ML)</strong>, and <strong>Knowledge Representation</strong> to deliver comprehensive solutions.
                      </p>
                    </div>

                    {/* AI Landscape Image */}
                    <div className="relative w-full">
                      <Image
                        src="/different-forms-of-ai.png"
                        alt="The Complete Map of Artificial Intelligence showing various AI domains and technologies"
                        width={1200}
                        height={800}
                        className="w-full h-auto rounded-lg"
                        priority
                      />
                    </div>
                      
                      {/* Citation */}
                      <p className="text-sm text-gray-600 flex items-center gap-2 mt-4">
                        <ExternalLink className="w-4 h-4" />
                        <span>
                          Image source: <a 
                            href="https://newsletter.techworld-with-milan.com/p/chatgpt-is-not-ai" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline font-medium"
                          >
                            &quot;ChatGPT is not AI&quot; by Dr Milan Milanović - Tech World With Milan Newsletter
                          </a>
                        </span>
                      </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Target className="w-5 h-5 text-blue-600" />
                          Our Platform&apos;s AI Integration
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3 p-3 bg-blue-50/80 rounded-lg">
                            <CheckCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="font-medium text-gray-900">Natural Language Processing</h5>
                              <p className="text-sm text-gray-600 mt-1">
                                Advanced semantic search and conversational chat interfaces for tax research
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 bg-blue-50/80 rounded-lg">
                            <CheckCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="font-medium text-gray-900">Machine Learning</h5>
                              <p className="text-sm text-gray-600 mt-1">
                                Embedding models for document similarity and retrieval-augmented generation (RAG)
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 bg-blue-50/80 rounded-lg">
                            <CheckCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="font-medium text-gray-900">Expert Systems</h5>
                              <p className="text-sm text-gray-600 mt-1">
                                Rule-based automation for categorizing tax opportunities and compliance workflows
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-purple-600" />
                          Strategic AI Positioning
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3 p-3 bg-purple-50/80 rounded-lg">
                            <CheckCircle className="size-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="font-medium text-gray-900">Beyond ChatGPT</h5>
                              <p className="text-sm text-gray-600 mt-1">
                                Multi-modal AI approach combining text, document, and structured data processing
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 bg-purple-50/80 rounded-lg">
                            <CheckCircle className="size-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="font-medium text-gray-900">Domain-Specific Intelligence</h5>
                              <p className="text-sm text-gray-600 mt-1">
                                Specialized models trained on tax and regulatory content for professional accuracy
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 bg-purple-50/80 rounded-lg">
                            <CheckCircle className="size-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="font-medium text-gray-900">Human-AI Collaboration</h5>
                              <p className="text-sm text-gray-600 mt-1">
                                Professional-mediated architecture ensuring compliance and maintaining expert oversight
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                </div>
              </motion.section>

              {/* RAG Technology Section */}
              <motion.section
                id="rag-technology"
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <div className="mb-6">
                  <h2 className="flex items-center space-x-3 text-2xl font-bold text-gray-900">
                    <span>Retrieval-Augmented Generation (RAG)</span>
                    <Badge variant="outline" className="text-xs ml-2">
                      core-technology
                    </Badge>
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Advanced AI search technology that combines semantic understanding with authoritative sources for accurate tax research
                  </p>
                </div>
                <div className="space-y-6">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        Our platform leverages <strong>Retrieval-Augmented Generation (RAG)</strong> to provide accurate, 
                        source-backed answers to complex tax questions. Unlike general-purpose AI chatbots, our RAG system 
                        searches through verified tax documentation to ensure professional-grade accuracy and compliance.
                      </p>
                    </div>

                    <ul className="space-y-3">
                      <li className="text-gray-700">
                        <strong><a href="https://cloud.google.com/discover/what-is-semantic-search?hl=en" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-700 underline">Semantic Search</a>:</strong> Finds relevant information based on meaning and context, not just keywords
                      </li>
                      <li className="text-gray-700">
                        <strong>AI Generation:</strong> Uses advanced language models to synthesize retrieved information into coherent answers
                      </li>
                      <li className="text-gray-700">
                        <strong>Contextual Responses:</strong> Provides specific, source-referenced answers tailored to your tax research and compliance needs
                      </li>
                    </ul>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        How Our RAG System Works
                      </h4>
                      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex items-start gap-2">
                          <span className="text-gray-900 font-bold">1.</span>
                          <span>Your question is processed using semantic search to understand intent and context</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-900 font-bold">2.</span>
                          <span>Relevant sections from tax code documentation are retrieved and ranked by relevance</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-900 font-bold">3.</span>
                          <span>AI generates a comprehensive answer using the retrieved context and sources</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-900 font-bold">4.</span>
                          <span>Source documents are provided for verification and deeper exploration</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          Technical Advantages
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3 p-3 bg-green-50/80 rounded-lg">
                            <CheckCircle className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="font-medium text-gray-900">Source Attribution</h5>
                              <p className="text-sm text-gray-600 mt-1">
                                Every answer includes references to specific tax documents and sections
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 bg-green-50/80 rounded-lg">
                            <CheckCircle className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="font-medium text-gray-900">Dynamic Knowledge Base</h5>
                              <p className="text-sm text-gray-600 mt-1">
                                Easily updated with new tax regulations and professional firm knowledge
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 bg-green-50/80 rounded-lg">
                            <CheckCircle className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="font-medium text-gray-900">Context Preservation</h5>
                              <p className="text-sm text-gray-600 mt-1">
                                Maintains conversation history for follow-up questions and clarifications
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-blue-600" />
                          Best Practices for Users
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3 p-3 bg-blue-50/80 rounded-lg">
                            <CheckCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="font-medium text-gray-900">Specific Questions</h5>
                              <p className="text-sm text-gray-600 mt-1">
                                Ask about specific tax codes, regulations, or compliance requirements
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 bg-blue-50/80 rounded-lg">
                            <CheckCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="font-medium text-gray-900">Natural Language</h5>
                              <p className="text-sm text-gray-600 mt-1">
                                Use conversational language - the system understands context and synonyms
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 bg-blue-50/80 rounded-lg">
                            <CheckCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="font-medium text-gray-900">Document Expansion</h5>
                              <p className="text-sm text-gray-600 mt-1">
                                Upload firm-specific documents to enhance the knowledge base
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-lg p-4 border border-green-300/50">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Why RAG is Essential for Tax Research
                      </h4>
                      <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
                        Tax law requires precise, verifiable information with clear source attribution. Our RAG implementation 
                        ensures that every answer is grounded in authoritative tax documentation, providing the accuracy and 
                        traceability that tax professionals need for client advice and compliance work.
                      </p>
                    </div>
                </div>
              </motion.section>

              {/* Existing Documentation Sections */}
              <div className="space-y-12">
                {/* Efficiency Section */}
                {efficiencySection && (
                  <motion.section
                    id="efficiency"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {createSectionContent(efficiencySection, 'green', <TrendingUp className="size-6" />)}
                  </motion.section>
                )}

                {/* Insights Section */}
                {insightsSection && (
                  <motion.section
                    id="insights"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {createSectionContent(insightsSection, 'purple', <Eye className="size-6" />)}
                  </motion.section>
                )}

                {/* Practical Lessons Section */}
                {practicalLessonsSection && (
                  <motion.section
                    id="practical-lessons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {createSectionContent(practicalLessonsSection, 'orange', <Lightbulb className="size-6" />)}
                  </motion.section>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <OnThisPageSidebar className="lg:block hidden" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentationPage