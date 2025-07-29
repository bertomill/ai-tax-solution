"use client"

import React, { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import Image from 'next/image'


import { 
  CheckCircle,
  ExternalLink,
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
    { id: 'practical-lessons', title: 'Practical Lessons' },
    { id: 'ai-tools', title: 'AI Tools Used' },
    { id: 'automation-vs-ai', title: 'Automation vs AI Framework' }
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

  const insightsSection = sections.find(s => s.category === 'insights')
  const practicalLessonsSection = sections.find(s => s.category === 'practical-lessons')

  const createSectionContent = (section: DocumentationSection) => {
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
                        <h4 className="font-semibold text-gray-900">
                          AI Integration Selections
                        </h4>
                        <ul className="space-y-3">
                          <li className="text-gray-700">
                            <strong>Natural Language Processing:</strong> Advanced semantic search and conversational chat interfaces for tax research
                          </li>
                          <li className="text-gray-700">
                            <strong>Machine Learning:</strong> Embedding models for document similarity and retrieval-augmented generation (RAG)
                          </li>
                          <li className="text-gray-700">
                            <strong>Expert Systems:</strong> Rule-based automation for categorizing tax opportunities and compliance workflows
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">
                          Strategic AI Positioning
                        </h4>
                        <ul className="space-y-3">
                          <li className="text-gray-700">
                            <strong>Beyond ChatGPT:</strong> Multi-modal AI approach combining text, document, and structured data processing
                          </li>
                          <li className="text-gray-700">
                            <strong>Domain-Specific Intelligence:</strong> Specialized models trained on tax and regulatory content for professional accuracy
                          </li>
                          <li className="text-gray-700">
                            <strong>Human-AI Collaboration:</strong> Professional-mediated architecture ensuring compliance and maintaining expert oversight
                          </li>
                        </ul>
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
                        <h4 className="font-semibold text-gray-900">
                          Technical Advantages
                        </h4>
                        <ul className="space-y-3">
                          <li className="text-gray-700">
                            <strong>Source Attribution:</strong> Every answer includes references to specific tax documents and sections
                          </li>
                          <li className="text-gray-700">
                            <strong>Dynamic Knowledge Base:</strong> Easily updated with new tax regulations and professional firm knowledge
                          </li>
                          <li className="text-gray-700">
                            <strong>Context Preservation:</strong> Maintains conversation history for follow-up questions and clarifications
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">
                          Best Practices for Users
                        </h4>
                        <ul className="space-y-3">
                          <li className="text-gray-700">
                            <strong>Specific Questions:</strong> Ask about specific tax codes, regulations, or compliance requirements
                          </li>
                          <li className="text-gray-700">
                            <strong>Natural Language:</strong> Use conversational language - the system understands context and synonyms
                          </li>
                          <li className="text-gray-700">
                            <strong>Document Expansion:</strong> Upload firm-specific documents to enhance the knowledge base
                          </li>
                        </ul>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      Tax law requires precise, verifiable information with clear source attribution. Our RAG implementation 
                      ensures that every answer is grounded in authoritative tax documentation, providing the accuracy and 
                      traceability that tax professionals need for client advice and compliance work.
                    </p>
                </div>
              </motion.section>

              {/* Existing Documentation Sections */}
              <div className="space-y-12">
                {/* Efficiency Section */}
                <motion.section
                  id="efficiency"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <section className="mb-16">
                    <div className="mb-6">
                      <h2 className="flex items-center space-x-3 text-2xl font-bold text-gray-900">
                        <span>Efficiency Gains</span>
                        <Badge variant="outline" className="text-xs ml-2">
                          efficiency
                        </Badge>
                      </h2>
                      <p className="text-gray-600 mt-2">
                        How AI transforms tax workflows and unlocks productivity improvements
                      </p>
                    </div>
                    
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        AI can significantly improve efficiency in tax functions by automating repetitive tasks, 
                        accelerating research processes, and reducing manual data entry. This allows tax professionals 
                        to focus on higher-value activities like strategic planning and client consultation.
                      </p>
                    </div>
                    
                    <Separator className="my-8" />
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Key Efficiency Benefits</h4>
                      <ul className="space-y-3">
                        <li className="text-gray-700">
                          <strong>Automated Research:</strong> AI quickly finds relevant tax information across multiple sources
                        </li>
                        <li className="text-gray-700">
                          <strong>Document Processing:</strong> Intelligent extraction and categorization of tax documents
                        </li>
                        <li className="text-gray-700">
                          <strong>Compliance Monitoring:</strong> Automated tracking of regulatory changes and deadlines
                        </li>
                        <li className="text-gray-700">
                          <strong>Client Communication:</strong> Faster response times and more accurate information delivery
                        </li>
                      </ul>
                    </div>
                  </section>
                </motion.section>

                {/* Insights Section */}
                <motion.section
                  id="insights"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <section className="mb-16">
                    <div className="mb-6">
                      <h2 className="flex items-center space-x-3 text-2xl font-bold text-gray-900">
                        <span>Strategic Insights</span>
                        <Badge variant="outline" className="text-xs ml-2">
                          insights
                        </Badge>
                      </h2>
                      <p className="text-gray-600 mt-2">
                        Key findings and strategic observations from AI implementation in tax environments
                      </p>
                    </div>
                    
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        AI implementation in tax functions reveals critical insights about technology adoption, 
                        workflow optimization, and the future of professional services. These observations help 
                        guide strategic decisions and implementation approaches.
                      </p>
                    </div>
                    
                    <Separator className="my-8" />
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Key Strategic Insights</h4>
                      <ul className="space-y-3">
                        <li className="text-gray-700">
                          <strong>Technology Integration:</strong> Successful AI adoption requires careful integration with existing workflows and systems
                        </li>
                        <li className="text-gray-700">
                          <strong>Professional Oversight:</strong> AI enhances rather than replaces professional judgment and expertise
                        </li>
                        <li className="text-gray-700">
                          <strong>Data Quality:</strong> The effectiveness of AI solutions directly correlates with the quality and organization of underlying data
                        </li>
                        <li className="text-gray-700">
                          <strong>Change Management:</strong> Successful implementation requires addressing both technical and human factors
                        </li>
                        <li className="text-gray-700">
                          <strong>ROI Measurement:</strong> Clear metrics and measurement frameworks are essential for demonstrating value and guiding improvements
                        </li>
                      </ul>
                    </div>
                  </section>
                </motion.section>

                {/* Practical Lessons Section */}
                <motion.section
                  id="practical-lessons"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <section className="mb-16">
                    <div className="mb-6">
                      <h2 className="flex items-center space-x-3 text-2xl font-bold text-gray-900">
                        <span>Practical Lessons</span>
                        <Badge variant="outline" className="text-xs ml-2">
                          lessons-learned
                        </Badge>
                      </h2>
                      <p className="text-gray-600 mt-2">
                        Real-world lessons and best practices from AI implementation in tax environments
                      </p>
                    </div>
                    
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        Implementing AI in tax functions provides valuable lessons about technology adoption, 
                        user experience design, and organizational change. These practical insights help inform 
                        future implementations and avoid common pitfalls.
                      </p>
                    </div>
                    
                    <Separator className="my-8" />
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Key Practical Lessons</h4>
                      <ul className="space-y-3">
                        <li className="text-gray-700">
                          <strong>Start Small:</strong> Begin with focused use cases and expand gradually based on success and user feedback
                        </li>
                        <li className="text-gray-700">
                          <strong>User-Centric Design:</strong> Design solutions around actual user workflows rather than technology capabilities
                        </li>
                        <li className="text-gray-700">
                          <strong>Training and Support:</strong> Invest in comprehensive training and ongoing support to ensure successful adoption
                        </li>
                        <li className="text-gray-700">
                          <strong>Iterative Improvement:</strong> Continuously gather feedback and refine solutions based on real-world usage
                        </li>
                        <li className="text-gray-700">
                          <strong>Change Communication:</strong> Clear communication about benefits and changes helps overcome resistance and build enthusiasm
                        </li>
                      </ul>
                    </div>

                    <Separator className="my-8" />

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Real-World Implementation Experience</h4>
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                        <p className="text-gray-700 leading-relaxed">
                          From my experience in leading the rollout of CIBC&apos;s flagship AI use case, there were several key lessons learned such as buy vs build decisions, training programs, creating a network of champions, adapting the tools to different end users, and complying with strict financial industry regulations.
                        </p>
                        <div className="mt-3">
                          <a 
                            href="https://www.cibc.com/en/about-cibc/future-banking/ai/enterprise-generative-ai.html" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                          >
                            Read more about CIBC&apos;s Enterprise Generative AI journey →
                          </a>
                        </div>
                      </div>
                    </div>
                  </section>
                </motion.section>
              </div>

              {/* AI Tools Used Section */}
              <motion.section
                id="ai-tools"
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <section className="mb-16">
                  <div className="mb-6">
                    <h2 className="flex items-center space-x-3 text-2xl font-bold text-gray-900">
                      <span>AI Tools Used</span>
                      <Badge variant="outline" className="text-xs ml-2">
                        tools
                      </Badge>
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Key AI technologies and tools utilized in this tax automation research
                    </p>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 rounded-lg">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">
                            Tool
                          </th>
                          <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">
                            Description
                          </th>
                          <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">
                            Use Case
                          </th>
                          <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">
                            OpenAI GPT-4
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                            Advanced language model for natural language processing and text generation
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                            Chat interface and content generation
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm">
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              Active
                            </Badge>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">
                            Supabase Vector Search
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                            Vector database for semantic search and document retrieval
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                            RAG implementation and document search
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm">
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              Active
                            </Badge>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">
                            OpenAI Embeddings
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                            Text embedding model for converting documents to vector representations
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                            Document indexing and similarity search
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm">
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              Active
                            </Badge>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">
                            PDF Processing
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                            Document extraction and text processing from PDF files
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                            Tax document ingestion and analysis
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm">
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              Implemented
                            </Badge>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">
                            Next.js AI SDK
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                            React framework with AI integration capabilities
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                            Frontend development and AI integration
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-sm">
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              Active
                            </Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </motion.section>

              {/* Automation vs AI Strategic Decision Framework */}
              <motion.section
                id="automation-vs-ai"
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Automation vs AI: Strategic Decision Framework
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Strategic analysis of when to use traditional automation versus AI based on input predictability and output flexibility requirements
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Traditional Automation Guidelines */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Traditional Automation</h3>
                    <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                      <div>
                        <strong>Use when:</strong> Inputs and outputs are predictable and structured
                      </div>
                      <div>
                        <strong>Best for:</strong> Rule-based processes with clear logic
                      </div>
                      <div>
                        <strong>Advantage:</strong> Reliable, cost-effective, and currently working well
                      </div>
                    </div>
                  </div>

                  {/* AI Guidelines */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Solutions</h3>
                    <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                      <div>
                        <strong>Use when:</strong> Inputs/outputs are unpredictable and require flexibility
                      </div>
                      <div>
                        <strong>Best for:</strong> Research, interpretation, and human-like interaction
                      </div>
                      <div>
                        <strong>Advantage:</strong> Handles unstructured data and complex reasoning
                      </div>
                    </div>
                  </div>
                </div>

                {/* Solutions Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Traditional Automation Solutions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Traditional Automation Solutions
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Structured, rule-based processes with predictable patterns
                    </p>
                    <div className="space-y-4">
                      <div className="border-b border-gray-200 pb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-2">Tax Document Processing</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                          Automated extraction and categorization of structured tax documents with consistent formats
                        </p>
                        <div className="space-y-2">
                          <p className="text-xs text-gray-700 dark:text-gray-300">
                            <strong>Why Automation:</strong> Documents follow predictable patterns and require consistent processing
                          </p>
                          <p className="text-xs text-gray-700 dark:text-gray-300">
                            <strong>Business Value:</strong> Reduces manual data entry by 80% and improves accuracy
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">OCR Processing</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Data Extraction</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Validation</span>
                        </div>
                      </div>

                      <div className="border-b border-gray-200 pb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-2">Compliance Monitoring</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                          Automated tracking of filing deadlines and regulatory requirements across jurisdictions
                        </p>
                        <div className="space-y-2">
                          <p className="text-xs text-gray-700 dark:text-gray-300">
                            <strong>Why Automation:</strong> Clear rules and predictable calendar-based requirements
                          </p>
                          <p className="text-xs text-gray-700 dark:text-gray-300">
                            <strong>Business Value:</strong> Prevents missed deadlines and reduces compliance risk
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Deadline Tracking</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Alert System</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Reporting</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Solutions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      AI-Powered Solutions
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Complex reasoning, research, and flexible interpretation tasks
                    </p>
                    <div className="space-y-4">
                      <div className="border-b border-gray-200 pb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-2">Tax Research Assistant</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                          AI-powered research tool that processes complex tax queries and provides contextual answers
                        </p>
                        <div className="space-y-2">
                          <p className="text-xs text-gray-700 dark:text-gray-300">
                            <strong>Why AI:</strong> Requires understanding of complex tax concepts and flexible interpretation
                          </p>
                          <p className="text-xs text-gray-700 dark:text-gray-300">
                            <strong>Business Value:</strong> Accelerates research by 90% and improves answer quality
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Semantic Search</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Context Analysis</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Source Attribution</span>
                        </div>
                      </div>

                      <div className="border-b border-gray-200 pb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-2">Business User Tax Advisor</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                          Conversational interface that provides expert tax guidance through natural language interaction
                        </p>
                        <div className="space-y-2">
                          <p className="text-xs text-gray-700 dark:text-gray-300">
                            <strong>Why AI:</strong> Requires natural language understanding and flexible response generation
                          </p>
                          <p className="text-xs text-gray-700 dark:text-gray-300">
                            <strong>Business Value:</strong> Democratizes access to tax expertise and reduces consultation time
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Natural Language</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Expert Knowledge</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Conversational</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key AI Use Cases Highlight */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Highlighted AI Use Cases for Tax Functions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Tax Research Assistant</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        AI processes vast volumes of tax regulations, case law, and guidance documents to provide instant, 
                        contextualized research answers. Perfect for handling unpredictable research queries that require 
                        flexible interpretation and reasoning.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Regulation Analysis</span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Case Law Research</span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Contextual Answers</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Business User Tax Advisor</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Conversational AI interface that connects business users directly with tax expertise through 
                        natural language. Eliminates the need to search through massive document repositories, 
                        providing instant expert-level guidance.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Natural Language</span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Expert Knowledge</span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Instant Access</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
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