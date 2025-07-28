"use client"

import React, { useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Sparkles, RefreshCw, FileText } from 'lucide-react'
import { ChatMessage, type Message } from '@/components/ui/chat-message'
import { ChatInput } from '@/components/ui/chat-input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    "What is the interview format and how long does it last?",
    "How should I prepare for the whiteboarding session?", 
    "What AI solutions work best for tax document processing?",
    "Can you explain the automation vs AI decision framework?",
    "What are the key success factors for this interview?"
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
    <div className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col">
      {/* Header */}
      <motion.div
        className="text-center py-6 border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Tax Research Assistant
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Ask questions about interview preparation, tax automation, and AI implementation strategies
        </p>
        
        {/* Action Buttons */}
        {messages.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-4">
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
          </div>
        )}
      </motion.div>

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
              className="h-full flex items-center justify-center p-6"
            >
              <Card className="max-w-2xl w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200/50">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-blue-700 dark:text-blue-300">
                    <Sparkles className="w-5 h-5" />
                    Welcome to Your AI Tax Research Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    I&apos;m here to help you prepare for your interview and understand tax automation opportunities. 
                    Ask me anything about the interview format, technical implementations, or strategic considerations.
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
                      I search through your comprehensive interview documentation and technical materials to provide 
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
              className="space-y-1"
            >
              {chatMessages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              ))}
              
              {/* Loading indicator for streaming response */}
              {isLoading && (
                <ChatMessage
                  message={{
                    id: 'loading',
                    role: 'assistant',
                    content: '',
                    createdAt: new Date()
                  }}
                  isLoading={true}
                />
              )}
              
              <div ref={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <ChatInput
          input={input}
          setInput={(value) => handleInputChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>)}
          onSubmit={handleCustomSubmit}
          isLoading={isLoading}
          placeholder={messages.length === 0 ? "Ask about the interview format, preparation tips, or technical questions..." : "Ask a follow-up question..."}
          suggestions={messages.length === 0 ? [] : followUpSuggestions}
          onStop={stop}
        />
      </div>
    </div>
  )
} 