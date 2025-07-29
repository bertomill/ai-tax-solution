"use client"

import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Building2, FileText, Mail, ExternalLink } from 'lucide-react'
import Image from 'next/image'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30 border-t border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Navigation</h4>
            <div className="space-y-2">
              <a href="#overview" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Assignment Overview
              </a>
              <a href="#format" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Interview Format
              </a>
              <a href="#problem" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Problem Identification
              </a>
              <a href="/documentation" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Documentation
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Resources</h4>
            <div className="space-y-2">
              <a href="#ai-integration" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                AI Integration
              </a>
              <a href="#solution-design" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Solution Design
              </a>
              <a href="#mvp-strategy" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                MVP Strategy
              </a>
              <a href="#rag-search" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
                RAG Search
              </a>
            </div>
          </div>

          {/* Contact & Tools */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Tools & Technologies</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>Next.js & React</span>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src="/favicon.svg"
                  alt="Supabase Database"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span>Supabase Database</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>TypeScript</span>
              </div>
              <div className="flex items-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>Tailwind CSS</span>
              </div>
            </div>
          </div>

        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-500">
            © 2025 AI-Tax-Solutions. Built for interview preparation and strategic analysis.
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <span>Whiteboarding Interview Session</span>
            <span>•</span>
            <a 
              href="/about" 
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer font-medium"
            >
              About Robert
            </a>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Mail className="w-3 h-3" />
              <span>Tax Solutions Analysis</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer