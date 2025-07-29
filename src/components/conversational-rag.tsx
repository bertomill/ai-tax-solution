"use client"

import React, { useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Sparkles, RefreshCw, FileText } from 'lucide-react'
import { ChatMessage, type Message } from '@/components/ui/chat-message'
import { ChatInput } from '@/components/ui/chat-input'
import { AIPrompt } from '@/components/kokonutui/ai-prompt'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AILoadingState } from '@/components/ui/ai-loading-state'
import { nanoid } from 'nanoid'

export function ConversationalRAG() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showWelcome, setShowWelcome] = React.useState(true)
  
  const {
    messages,
    input,
    handleInputChange,
    isLoading,
    stop,
    reload,
    setMessages,
    append
  } = useChat({
    api: '/api/chat',
    id: 'tax-research-chat',
    initialMessages: [],
    onFinish: () => {
      // Hide welcome screen after first interaction
      if (showWelcome) {
        setShowWelcome(false)
      }
    }
  })

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Convert useChat messages to our Message type
  const chatMessages: Message[] = messages.map(msg => ({
    id: msg.id || nanoid(),
    role: msg.role as 'user' | 'assistant',
    content: msg.content,
    createdAt: new Date()
  }))

  // Smart suggestions for tax research
  const welcomeSuggestions = [
    "What are the current corporate tax rates for different income brackets?",
    "How do depreciation rules work for business equipment and property?", 
    "What are the key differences between Schedule C and Schedule K-1 income?",
    "Can you explain the Section 199A qualified business income deduction?",
    "What are the latest changes to international tax regulations like GILTI?"
  ]

  const followUpSuggestions = [
    "Can you elaborate on that?",
    "What are the next steps?",
    "Are there any related considerations?",
    "How would you implement this?",
    "What are the potential challenges?"
  ]

  const handleClearChat = () => {
    setMessages([])
    setShowWelcome(true)
  }

  const handleCustomSubmit = async (value: string) => {
    if (!value.trim()) return
    
    // Use the append method directly
    await append({
      role: 'user',
      content: value.trim()
    })
  }

  return (
    <div className="w-full h-[85vh] flex flex-col">
      {/* Action Buttons */}
      {messages.length > 0 && (
        <motion.div
          className="flex items-center justify-center gap-2 py-3 border-b border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => reload()}
            disabled={isLoading}
            className="text-xs"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Regenerate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearChat}
            disabled={isLoading}
            className="text-xs"
          >
            <FileText className="w-3 h-3 mr-1" />
            New Chat
          </Button>
        </motion.div>
      )}

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
        <AnimatePresence mode="wait">
          {showWelcome && messages.length === 0 ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="h-full flex items-center justify-center p-4"
            >
              <Card className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200/50">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-blue-700 dark:text-blue-300">
                    <Sparkles className="w-5 h-5" />
                    Welcome to Your AI Tax Research Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    I&apos;m here to help you research tax law, regulations, and compliance requirements. 
                    Ask me anything about tax codes, deductions, filing procedures, or specific tax scenarios.
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                      Popular questions to get started:
                    </h4>
                    <div className="grid gap-2">
                      {welcomeSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleCustomSubmit(suggestion)}
                          disabled={isLoading}
                          className="text-left p-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 rounded-lg text-sm text-blue-700 dark:text-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg p-3 border border-blue-200/50">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 text-sm mb-1">
                      💡 How this works:
                    </h4>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      I search through comprehensive tax code documentation and regulatory materials to provide 
                      accurate, contextual answers. I maintain conversation history so you can ask follow-up questions naturally.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-0.5"
            >
              {chatMessages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              ))}
              
              {/* Loading indicator for streaming response */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    key="ai-loading"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-center my-4"
                  >
                    <AILoadingState />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div ref={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
        <AIPrompt
          value={input}
          onChange={(value) => handleInputChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>)}
          onSubmit={handleCustomSubmit}
          isLoading={isLoading}
          placeholder={messages.length === 0 ? "Ask about tax codes, deductions, filing requirements, or specific tax scenarios..." : "Ask a follow-up question..."}
        />
        
        {/* Follow-up suggestions */}
        {messages.length > 0 && followUpSuggestions.length > 0 && !input && (
          <div className="flex flex-wrap gap-2 mt-2">
            {followUpSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleCustomSubmit(suggestion)}
                disabled={isLoading}
                className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 