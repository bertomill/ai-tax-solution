"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Lightbulb, 
  Brain, 
  Users, 
  Settings, 
  ArrowRight,
  Clock,
  Target,
  MessageSquare,
  Activity,
  FileText,
  CheckCircle
} from 'lucide-react'

interface OnThisPageSection {
  id: string
  title: string
}

interface OnThisPageSidebarProps {
  className?: string
}

function OnThisPageSidebar({ className }: OnThisPageSidebarProps) {
  const [activeSection, setActiveSection] = useState('')

  const sections: OnThisPageSection[] = [
    { id: 'assignment-overview', title: 'Assignment Overview' },
    { id: 'interview-process', title: 'Interview Process' },
    { id: 'expectations', title: 'Success Factors' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id)
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`${className} bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg p-4 sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto`}>
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <FileText className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">On this page</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Navigate interview sections</p>
        </div>
      </div>
      
      <nav className="space-y-1">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`block px-3 py-2 text-sm rounded-md transition-all duration-200 ${
              activeSection === section.id
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {section.title}
          </a>
        ))}
      </nav>
    </div>
  )
}

interface InterviewStep {
  number: string
  title: string
  description: string
  duration: string
  icon: React.ReactNode
}

interface Expectation {
  title: string
  description: string
  icon: React.ReactNode
}

export default function InterviewFormatPage() {

  const interviewSteps: InterviewStep[] = [
    {
      number: '1',
      title: 'Whiteboarding – Product Ideation',
      description: 'Collaborative problem-solving session with AI-powered solution ideas',
      duration: '30-45 min',
      icon: <Lightbulb className="w-4 h-4" />
    },
    {
      number: '2',
      title: 'Part 2 (Details TBD)',
      description: 'Second part of the interview session',
      duration: '45-60 min',
      icon: <Users className="w-4 h-4" />
    }
  ]

  const expectations: Expectation[] = [
    {
      title: 'Strategic Problem Framing',
      description: 'Ability to identify and articulate meaningful problems in the tax space',
      icon: <Target className="w-4 h-4" />
    },
    {
      title: 'User Understanding',
      description: 'Clear identification of who the users are and the specific problems they face',
      icon: <Users className="w-4 h-4" />
    },
    {
      title: 'MVP Definition',
      description: 'Thoughtful approach to what a minimum viable product could look like',
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      title: 'AI & Data Integration',
      description: 'Understanding of how the solution might leverage AI and data effectively',
      icon: <Brain className="w-4 h-4" />
    },
    {
      title: 'Phased Rollout Vision',
      description: 'Strategic thinking about implementation phases and long-term vision',
      icon: <ArrowRight className="w-4 h-4" />
    },
    {
      title: 'Creative Thinking',
      description: 'Innovative approach to solution design and problem-solving',
      icon: <Lightbulb className="w-4 h-4" />
    },
    {
      title: 'Clear Communication',
      description: 'Effective presentation and collaborative communication skills',
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      title: 'Comfort with Ambiguity',
      description: 'Ability to iterate and adapt in live collaborative settings',
      icon: <Activity className="w-4 h-4" />
    }
  ]



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      {/* Page Header */}
      <div className="py-8 px-4 max-w-7xl mx-auto">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-blue-300">
            Interview Format
          </h1>
          <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400">
            Complete Interview Guide & Expectations
          </h2>
        </div>
      </div>



      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-12">
          
          {/* Assignment Overview Section */}
          <section id="assignment-overview" className="space-y-6 scroll-mt-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Assignment Overview
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Whiteboarding Interview Session Details
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Whiteboarding Interview Session
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  This round will be a collaborative whiteboarding session—a chance for us to work together like colleagues exploring a new idea.
                  You&apos;ll come prepared with a problem you believe is worth solving in the Tax space—and one or more AI-powered solution ideas to address it.
                </p>
              </div>

              <ul className="space-y-3">
                <li className="text-gray-700">
                  <strong>Session Duration:</strong> Approximately 90 minutes, broken into two parts
                </li>
                <li className="text-gray-700">
                  <strong>Format:</strong> Real working session, not a pitch - collaborative exploration
                </li>
              </ul>
            </div>
          </section>

          {/* Interview Process Section */}
          <section id="interview-process" className="space-y-6 scroll-mt-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Interview Format
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                90-Minute Session in Two Parts
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Interview Format - 2-Part Process
              </h3>

              <div className="space-y-4">
                {interviewSteps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-4 p-4 border border-gray-200/50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center">
                          {step.number}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                            {step.title}
                          </h4>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Part 1: Whiteboarding Details */}
            <div className="space-y-6 mt-8">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Part 1: Whiteboarding – Product Ideation Details
              </h4>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  The candidate will come prepared with a problem they believe is worth solving in the Tax space—and one or more AI-powered solution ideas to address it.
                </p>
                
                <ul className="space-y-3">
                  <li className="text-gray-700">
                    <strong>Working Session Format:</strong> This will be treated like a real working session, not a pitch. The candidate will walk through their thinking, and together they&apos;ll collaborate, ask questions, and expand the idea.
                  </li>
                  <li className="text-gray-700">
                    <strong>Multiple Ideas:</strong> If the candidate brings more than one idea, they&apos;ll choose one to focus on together.
                  </li>
                  <li className="text-gray-700">
                    <strong>Visual Tools:</strong> The candidate is welcome to use the whiteboard, sketch, or talk through their thinking. If they&apos;d like to reference visuals, content, or examples, a screen will be available to bring them up during the session.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Expectations Section */}
          <section id="expectations" className="space-y-6 scroll-mt-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Success Factors
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Key Skills & Expectations
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Success Factors
              </h3>

              <ul className="space-y-4">
                {expectations.map((item, index) => (
                  <li key={item.title} className="text-gray-700">
                    <strong>{item.title}:</strong> {item.description}
                  </li>
                ))}
              </ul>
            </div>
          </section>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <OnThisPageSidebar className="lg:block hidden" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 