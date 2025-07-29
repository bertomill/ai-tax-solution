import React from 'react'
import { cn } from '@/lib/utils'
import { Bot, User, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion } from 'framer-motion'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt?: Date
}

interface ChatMessageProps {
  message: Message
  isLoading?: boolean
  onSpeak?: () => void
  speechSupported?: boolean
}

export function ChatMessage({ message, isLoading, onSpeak, speechSupported }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex w-full gap-3 p-3',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow-sm',
          isUser 
            ? 'bg-blue-700 text-white border-blue-300' 
            : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-300'
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          'flex flex-col space-y-2 w-full',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        {/* Message Bubble */}
        <div
          className={cn(
            'rounded-2xl px-3 py-2 shadow-sm',
            isUser
              ? 'bg-blue-700 text-white'
              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100'
          )}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed">{message.content}</p>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2">
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                  <span className="text-sm text-gray-500">AI is thinking...</span>
                </div>
              ) : (
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => {
                      // Convert children to string to process citations
                      const text = React.Children.toArray(children).join('')
                      
                      // Split text by citation pattern and process
                      const parts = text.split(/(\[Source \d+\])/)
                      const processedParts = parts.map((part, index) => {
                        const citationMatch = part.match(/\[Source (\d+)\]/)
                        if (citationMatch) {
                          const sourceNum = citationMatch[1]
                          return (
                            <span
                              key={index}
                              className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mx-0.5 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                              title={`Click to see source details`}
                            >
                              [Source {sourceNum}]
                            </span>
                          )
                        }
                        return part
                      })
                      
                      return <p className="mb-2 last:mb-0">{processedParts}</p>
                    },
                    ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="text-sm">{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold text-blue-600 dark:text-blue-400">{children}</strong>,
                    code: ({ children }) => (
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg overflow-x-auto text-xs">
                        {children}
                      </pre>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-2 px-2">
          {/* Timestamp */}
          {message.createdAt && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {message.createdAt.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          )}
          
          {/* Speak Button for Assistant Messages */}
          {!isUser && onSpeak && speechSupported && !isLoading && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSpeak}
              className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title="Read aloud"
            >
              <Volume2 className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
} 