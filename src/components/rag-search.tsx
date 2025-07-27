"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Loader2, MessageSquare, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ModernBadge } from '@/components/ui/modern-badge'

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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!query.trim()) return

    setIsSearching(true)
    setError(null)
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: query.trim(),
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
        <p className="text-gray-600 dark:text-gray-300">
          Search through the interview preparation content using AI-powered semantic search
        </p>
      </motion.div>

      {/* Search Form */}
      <motion.form
        onSubmit={handleSearch}
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Ask about the interview format, expectations, or any preparation tips..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-lg py-6 px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl"
              disabled={isSearching}
            />
          </div>
          <Button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold text-lg"
          >
            {isSearching ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </Button>
        </div>
      </motion.form>

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

      {/* Example Queries */}
      {!searchResponse && (
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Try asking about:
          </h3>
          <div className="grid gap-2 md:grid-cols-2">
            {[
              "What is the interview format?",
              "What are you looking for in candidates?",
              "How long is the whiteboarding session?",
              "What should I prepare for the interview?"
            ].map((example, index) => (
              <motion.button
                key={example}
                onClick={() => setQuery(example)}
                className="text-left p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors text-sm text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                {example}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}