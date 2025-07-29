"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, ChevronDown, Paperclip, Sparkles, Brain, Zap, Mic, MicOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAutoResizeTextarea } from '@/hooks/use-auto-resize-textarea'

interface AIModel {
  id: string
  name: string
  icon: React.ReactNode
  color: string
}

const aiModels: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    icon: <Sparkles className="w-4 h-4" />,
    color: 'text-green-600'
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: <Brain className="w-4 h-4" />,
    color: 'text-orange-600'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: <Zap className="w-4 h-4" />,
    color: 'text-blue-600'
  }
]

interface AIPromptProps {
  onSubmit: (message: string) => void
  placeholder?: string
  isLoading?: boolean
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function AIPrompt({
  onSubmit,
  placeholder = "Ask about tax codes, deductions, or compliance...",
  isLoading = false,
  value = '',
  onChange,
  className
}: AIPromptProps) {
  const [input, setInput] = useState(value)
  const [selectedModel, setSelectedModel] = useState(aiModels[0])
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const textareaRef = useAutoResizeTextarea(input)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Check for speech recognition support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      setSpeechSupported(!!SpeechRecognition)
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'en-US'
        
        recognition.onresult = (event) => {
          let transcript = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript
          }
          
          if (transcript.trim()) {
            setInput(transcript)
            onChange?.(transcript)
          }
        }
        
        recognition.onend = () => {
          setIsRecording(false)
        }
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error)
          setIsRecording(false)
        }
        
        recognitionRef.current = recognition
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [onChange])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setInput(newValue)
    onChange?.(newValue)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSubmit(input.trim())
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleMicrophoneClick = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge for voice input.')
      return
    }

    if (isRecording) {
      // Stop recording
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      setIsRecording(false)
    } else {
      // Start recording
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start()
          setIsRecording(true)
        } catch (error) {
          console.error('Error starting speech recognition:', error)
        }
      }
    }
  }

  return (
    <div className={cn("relative", className)}>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Input Area */}
        <div className="relative">
          <div className="flex items-end gap-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-colors">
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={isLoading}
                className="w-full resize-none border-0 bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none"
                rows={1}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleMicrophoneClick}
                disabled={!speechSupported}
                title={speechSupported ? (isRecording ? 'Stop recording' : 'Start voice input') : 'Voice input not supported in this browser'}
                className={cn(
                  "h-8 w-8 p-0 transition-colors",
                  !speechSupported 
                    ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                    : isRecording 
                      ? "text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-950/20" 
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                )}
              >
                {isRecording ? (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <MicOff className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </Button>
              
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* AI Model Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
          >
            <div className={selectedModel.color}>
              {selectedModel.icon}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {selectedModel.name}
            </span>
            <ChevronDown className={cn(
              "w-4 h-4 text-gray-500 transition-transform",
              isModelDropdownOpen && "rotate-180"
            )} />
          </button>

          <AnimatePresence>
            {isModelDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-full left-0 mb-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
              >
                {aiModels.map((model) => (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => {
                      setSelectedModel(model)
                      setIsModelDropdownOpen(false)
                    }}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors first:rounded-t-lg last:rounded-b-lg",
                      selectedModel.id === model.id && "bg-gray-50 dark:bg-gray-750"
                    )}
                  >
                    <div className={model.color}>
                      {model.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {model.name}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  )
}