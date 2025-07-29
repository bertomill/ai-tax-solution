"use client";

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Brain, Check, MessageSquare, Search, Sparkles, Users, Zap } from 'lucide-react'
import Link from 'next/link'
import { GlowingEffect } from '@/components/ui/glowing-effect'

interface DashboardSection {
  title: string
  description: string
  icon: React.ReactNode
  url: string
  color: string
  badge?: string
  section: 'main' | 'ai-tools'
}

const GlowingDashboard: React.FC = () => {
  const mainSections: DashboardSection[] = [
    {
      title: 'Documentation',
      description: 'Comprehensive documentation, AI landscape overview, and key insights from research',
      icon: <BookOpen className="w-6 h-6" />,
      url: '/documentation',
      color: 'bg-slate-100 text-slate-700',
      section: 'main'
    },
    {
      title: 'Session Format',
      description: 'Understand the 90-minute collaborative whiteboarding process and interview structure',
      icon: <Users className="w-6 h-6" />,
      url: '/interview-format',
      color: 'bg-gray-100 text-gray-700',
      section: 'main'
    },
    {
      title: 'Approach',
      description: 'Explore tax automation opportunities and problem identification methodology',
      icon: <Brain className="w-6 h-6" />,
      url: '/problem-identification',
      color: 'bg-zinc-100 text-zinc-700',
      section: 'main'
    }
  ]

  const aiTools: DashboardSection[] = [
    {
      title: 'AI Search',
      description: 'Search through tax documents, regulations, and case law with AI-powered semantic search',
      icon: <Search className="w-6 h-6" />,
      url: '/search',
      color: 'bg-blue-50 text-blue-700',
      badge: 'Search',
      section: 'ai-tools'
    },
    {
      title: 'Market Research',
      description: 'AI-powered market research and competitive analysis for tax technology solutions',
      icon: <Zap className="w-6 h-6" />,
      url: '/market-research',
      color: 'bg-amber-50 text-amber-700',
      badge: 'Research',
      section: 'ai-tools'
    },
    {
      title: 'Tax Compliance',
      description: 'Simulate tax compliance scenarios and identify potential risks and opportunities',
      icon: <Check className="w-6 h-6" />,
      url: '/tax-research',
      color: 'bg-emerald-50 text-emerald-700',
      badge: 'Compliance',
      section: 'ai-tools'
    },
    {
      title: 'Comm. Drafting',
      description: 'AI-assisted drafting of client communications and tax letters with compliance checking',
      icon: <MessageSquare className="w-6 h-6" />,
      url: '/client-communications',
      color: 'bg-indigo-50 text-indigo-700',
      badge: 'Drafting',
      section: 'ai-tools'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-blue-300">
              Welcome to the AI for Tax Use Cases Whiteboarding Session
            </h1>
          </div>

          {/* Main Sections - First Row */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-500" />
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Resources
              </h2>
            </div>
            {/* First Row - 3 Main Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainSections.map((section, index) => (
                <DashboardCard key={index} section={section} />
              ))}
            </div>
          </div>

          {/* AI Tools Section - Second Row */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gray-500" />
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                AI Tools & Solutions
              </h2>
            </div>
            {/* Second Row - 4 AI Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiTools.map((section, index) => (
                <DashboardCard key={index} section={section} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

interface DashboardCardProps {
  section: DashboardSection
}

const DashboardCard: React.FC<DashboardCardProps> = ({ section }) => {
  return (
    <Link href={section.url} className="block group focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-2xl">
      <div className="relative group cursor-pointer">
        {/* Glowing Effect Container */}
        <div className="relative h-full rounded-2xl border border-gray-200 dark:border-gray-800 p-1 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700 group-hover:shadow-lg group-focus:shadow-lg">
          <GlowingEffect
            spread={30}
            glow={true}
            disabled={false}
            proximity={32}
            inactiveZone={0.3}
            movementDuration={1.5}
            borderWidth={1}
          />
          {/* Card Content */}
          <div className="relative h-full rounded-xl bg-white dark:bg-gray-900 p-6 transition-all duration-300 group-hover:shadow-lg dark:group-hover:shadow-gray-900/50">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${section.color} shadow-sm`}>
                  {section.icon}
                </div>
                {section.badge && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                    {section.badge}
                  </span>
                )}
              </div>
              {/* Content */}
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {section.description}
                </p>
              </div>
              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Button 
                  variant="ghost" 
                  className="w-full justify-between group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50 transition-colors pointer-events-none"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default GlowingDashboard; 