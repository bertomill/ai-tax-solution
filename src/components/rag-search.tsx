"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Loader2, MessageSquare, Sparkles, Info, ChevronDown, ChevronUp, Brain, Zap, Database, Network, Upload, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ModernBadge } from '@/components/ui/modern-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AIPromptInput } from '@/components/ui/ai-prompt-input'
import { DocumentUpload } from '@/components/ui/document-upload'

interface SearchResult {
  id: string
  content: string
  metadata: {
    source: string
    section: string
    page_title?: string
    chunk_index: number
    total_chunks: number
  }
  similarity: number
}

interface SearchResponse {
  query: string
  results: SearchResult[]
  response: string
  totalResults: number
}

export function RAGSearch() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showRAGInfo, setShowRAGInfo] = useState(false)
  const [showDocumentUpload, setShowDocumentUpload] = useState(false)

  // Smart suggestions for interview preparation
  const searchSuggestions = [
    "What is the interview format and how long does it last?",
    "What are you looking for in candidates during the interview?",
    "How should I prepare for the whiteboarding session?",
    "What types of problems should I expect to solve?",
    "Can you explain the collaborative discussion phase?",
    "What AI-powered solutions should I consider for tax problems?",
    "How do I identify high-volume, low-complexity automation opportunities?",
    "What technical considerations should I think about for implementation?",
    "How should I structure my solution presentation?",
    "What are the key success factors for this interview?"
  ]

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setError(null)
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: searchQuery.trim(),
          options: {
            matchThreshold: 0.7,
            matchCount: 5
          }
        }),
      })

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`)
      }

      const data: SearchResponse = await response.json()
      setSearchResponse(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during search')
      console.error('Search error:', err)
    } finally {
      setIsSearching(false)
    }
  }

  const handleUploadSuccess = () => {
    // Optionally refresh search or show a success message
    console.log('Document uploaded successfully!')
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI-Powered Search
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Search through the interview preparation content using AI-powered semantic search
        </p>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Button
            variant="outline"
            onClick={() => setShowRAGInfo(!showRAGInfo)}
            className="group hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <Info className="w-4 h-4 mr-2 text-blue-600" />
            About RAG Technology
            {showRAGInfo ? (
              <ChevronUp className="w-4 h-4 ml-2 group-hover:text-blue-600" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-2 group-hover:text-blue-600" />
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowDocumentUpload(!showDocumentUpload)}
            className="group hover:bg-green-50 hover:border-green-300 transition-colors"
          >
            <Upload className="w-4 h-4 mr-2 text-green-600" />
            Upload Documents
            {showDocumentUpload ? (
              <ChevronUp className="w-4 h-4 ml-2 group-hover:text-green-600" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-2 group-hover:text-green-600" />
            )}
          </Button>
        </div>
      </motion.div>

      {/* Document Upload Section */}
      <AnimatePresence>
        {showDocumentUpload && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mb-8 overflow-hidden"
          >
            <DocumentUpload 
              userId="demo-user"
              onUploadSuccess={handleUploadSuccess}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* RAG Information Section */}
      <AnimatePresence>
        {showRAGInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mb-8 overflow-hidden"
          >
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Brain className="w-6 h-6" />
                  What is RAG (Retrieval-Augmented Generation)?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  RAG combines the power of retrieval systems with generative AI to provide accurate, contextual answers. 
                  Instead of relying solely on pre-trained knowledge, RAG retrieves relevant information from your specific 
                  documents and uses that context to generate precise, source-backed responses.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-white/60 dark:bg-gray-800/60 border-blue-200/30">
                    <CardContent className="p-4 text-center">
                      <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Document Retrieval</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Searches through indexed interview preparation content to find the most relevant information
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/60 dark:bg-gray-800/60 border-purple-200/30">
                    <CardContent className="p-4 text-center">
                      <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">AI Generation</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Uses advanced language models to synthesize retrieved information into coherent answers
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/60 dark:bg-gray-800/60 border-green-200/30">
                    <CardContent className="p-4 text-center">
                      <Network className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Contextual Responses</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Provides specific, source-referenced answers tailored to your interview preparation needs
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 border border-blue-200/50">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    How This RAG System Works
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-start gap-2">
                      <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                      <span>Your question is processed using semantic search to understand intent and context</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                      <span>Relevant sections from interview documentation are retrieved and ranked by relevance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                      <span>AI generates a comprehensive answer using the retrieved context and sources</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                      <span>Source documents are provided for verification and deeper exploration</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg p-4 border border-blue-300/50">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Pro Tips for Better Results:</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Ask specific questions about interview format, expectations, or preparation strategies</li>
                    <li>• Use natural language - the system understands context and synonyms</li>
                    <li>• Review source documents to dive deeper into topics that interest you</li>
                    <li>• Try different phrasings if you don&apos;t get the exact answer you&apos;re looking for</li>
                    <li>• Upload your own documents to expand the knowledge base with relevant content</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Search Input */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <AIPromptInput
          value={query}
          onChange={setQuery}
          onSubmit={handleSearch}
          placeholder="Ask about the interview format, expectations, or any preparation tips..."
          disabled={isSearching}
          isLoading={isSearching}
          suggestions={searchSuggestions}
          className="w-full"
        />
      </motion.div>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="mb-6 p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-red-600 dark:text-red-400 font-medium">
              {error}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Results */}
      <AnimatePresence>
        {searchResponse && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {/* AI Response */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  AI Response
                </h3>
                <ModernBadge variant="info" size="sm">
                  {searchResponse.totalResults} sources
                </ModernBadge>
              </div>
              <div className="prose prose-blue dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                  {searchResponse.response}
                </div>
              </div>
            </div>

            {/* Source Documents */}
            {searchResponse.results.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Source Documents
                </h3>
                
                <div className="grid gap-4">
                  {searchResponse.results.map((result, index) => (
                    <motion.div
                      key={result.id}
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-5 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <ModernBadge variant="modern" size="sm">
                            {index + 1}
                          </ModernBadge>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                            {result.metadata.section}
                          </h4>
                        </div>
                        <ModernBadge variant="success" size="sm">
                          {(result.similarity * 100).toFixed(1)}% match
                        </ModernBadge>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {result.content}
                      </p>
                      
                      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                        Chunk {result.metadata.chunk_index + 1} of {result.metadata.total_chunks}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}