"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ConversationalRAG } from '@/components/conversational-rag'

export function RAGSearch() {
  return (
    <div className="w-full p-4">
      {/* Header */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-1">
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