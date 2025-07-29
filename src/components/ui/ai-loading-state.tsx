"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, FileText, CheckCircle2, Brain } from 'lucide-react'

interface LoadingStep {
  text: string
  icon: React.ReactNode
}

const loadingSteps: LoadingStep[] = [
  {
    text: "Analyzing results...",
    icon: <Sparkles className="w-4 h-4" />
  },
  {
    text: "Generating summary...",
    icon: <Brain className="w-4 h-4" />
  },
  {
    text: "Checking for relevant information...",
    icon: <FileText className="w-4 h-4" />
  },
  {
    text: "Refining analysis...",
    icon: <CheckCircle2 className="w-4 h-4" />
  }
]

export function AILoadingState() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1
        }
        return 0 // Loop back to start
      })
    }, 1500) // Change step every 1.5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center min-h-[120px] p-6"
    >
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-6 max-w-md w-full">
        {/* Main loading indicator */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 rounded-full border-2 border-blue-200 dark:border-blue-800 border-t-blue-500 dark:border-t-blue-400"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            </motion.div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            AI Processing
          </h3>
        </div>

        {/* Loading steps */}
        <div className="space-y-3">
          {loadingSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.3 }}
              animate={{ 
                opacity: index <= currentStep ? 1 : 0.3,
                x: index === currentStep ? 4 : 0
              }}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-3 text-sm ${
                index <= currentStep 
                  ? 'text-gray-900 dark:text-gray-100' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <div className={`flex items-center justify-center transition-colors ${
                index < currentStep 
                  ? 'text-green-600 dark:text-green-400'
                  : index === currentStep
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}>
                {index < currentStep ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  step.icon
                )}
              </div>
              <span className={index === currentStep ? 'font-medium' : ''}>
                {step.text}
              </span>
              {index === currentStep && (
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="flex space-x-1"
                >
                  <div className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full" />
                  <div className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full" />
                  <div className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  )
}