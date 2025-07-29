"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { ConversationalRAG } from '@/components/conversational-rag'

export function RAGSearch() {
  return (
    <div className="w-full p-6">
      {/* Header */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-black dark:text-gray-100">
            AI Tax Research Platform
          </h1>
        </div>
      </motion.div>

      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ConversationalRAG />
      </motion.div>
    </div>
  )
}