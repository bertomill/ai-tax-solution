"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, Sparkles, MessageSquare, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AIPromptInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
  placeholder?: string
  disabled?: boolean
  isLoading?: boolean
  suggestions?: string[]
  className?: string
}

export function AIPromptInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Ask me anything...",
  disabled = false,
  isLoading = false,
  suggestions = [],
  className
}: AIPromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim() && !disabled && !isLoading) {
      onSubmit(value.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion)
    setShowSuggestions(false)
    textareaRef.current?.focus()
  }

  return (
    <div className={cn("relative w-full", className)}>
      {/* Main Input Container */}
      <div className={cn(
        "relative overflow-hidden rounded-2xl border-2 transition-all duration-200 bg-white/80 backdrop-blur-sm",
        isFocused 
          ? "border-blue-400 shadow-lg shadow-blue-100/50" 
          : "border-gray-200 shadow-sm",
        disabled && "opacity-50 cursor-not-allowed"
      )}>
        <form onSubmit={handleSubmit} className="flex items-end">
          {/* Input Area */}
          <div className="flex-1 relative">
            <div className="flex items-center px-4 pt-4 pb-2">
              <Sparkles className={cn(
                "w-5 h-5 mr-3 transition-colors",
                isFocused ? "text-blue-500" : "text-gray-400"
              )} />
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  setIsFocused(true)
                  setShowSuggestions(suggestions.length > 0 && !value)
                }}
                onBlur={() => {
                  setIsFocused(false)
                  // Delay hiding suggestions to allow clicks
                  setTimeout(() => setShowSuggestions(false), 150)
                }}
                placeholder={placeholder}
                disabled={disabled}
                rows={1}
                className={cn(
                  "w-full resize-none bg-transparent border-0 outline-none text-gray-900 placeholder:text-gray-500",
                  "text-base leading-relaxed py-1 min-h-[24px] max-h-32 overflow-y-auto",
                  "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                )}
                style={{ fieldSizing: 'content' } as React.CSSProperties}
              />
            </div>
            
            {/* Character Hint */}
            {value.length > 0 && (
              <div className="px-4 pb-2">
                <span className="text-xs text-gray-400">
                  {value.length} characters • Press Enter to send, Shift+Enter for new line
                </span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="p-3">
            <Button
              type="submit"
              size="sm"
              disabled={!value.trim() || disabled || isLoading}
              className={cn(
                "rounded-xl h-10 w-10 p-0 transition-all duration-200",
                "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
                "disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed",
                value.trim() && !disabled && !isLoading 
                  ? "scale-100 opacity-100" 
                  : "scale-95 opacity-60"
              )}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg backdrop-blur-sm bg-white/95 overflow-hidden">
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  Suggested prompts
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors text-sm text-gray-700 border-b border-gray-50 last:border-b-0 flex items-start gap-3"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 