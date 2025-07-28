import React, { useRef, useEffect } from 'react'
import Textarea from 'react-textarea-autosize'
import { Button } from '@/components/ui/button'
import { Send, Square } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  onSubmit: (value: string) => Promise<void>
  isLoading: boolean
  disabled?: boolean
  placeholder?: string
  suggestions?: string[]
  onStop?: () => void
}

export function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
  disabled = false,
  placeholder = "Ask a follow-up question...",
  suggestions = [],
  onStop
}: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (inputRef.current && !isLoading) {
      inputRef.current.focus()
    }
  }, [isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || disabled) return
    
    const message = input.trim()
    setInput('')
    await onSubmit(message)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    inputRef.current?.focus()
  }

  return (
    <div className="space-y-4">
      {/* Suggestions */}
      {suggestions.length > 0 && !input && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 transition-colors"
              disabled={disabled || isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Chat Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus-within:shadow-md transition-shadow">
          <Textarea
            ref={inputRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            spellCheck={false}
            disabled={disabled || isLoading}
            className={cn(
              "min-h-[60px] w-full resize-none bg-transparent px-4 py-3 pr-16 focus:outline-none",
              "text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            maxRows={6}
          />
          
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {isLoading ? (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={onStop}
                className="h-8 w-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full"
              >
                <Square className="h-4 w-4" />
                <span className="sr-only">Stop generating</span>
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || disabled}
                className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            )}
          </div>
        </div>

        {/* Helper Text */}
        <div className="px-2 pt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </form>
    </div>
  )
} 