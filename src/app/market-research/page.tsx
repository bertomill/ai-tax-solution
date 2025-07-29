"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'

import { 
  Search, 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign,
  Lightbulb,
  BarChart3,
  Globe,
  Clock,
  CheckCircle,
  AlertCircle,
  Building2,
  Briefcase,
  X,
  Edit3,
  Save
} from 'lucide-react'

interface MarketInsight {
  id: string
  category: 'trend' | 'competitor' | 'opportunity' | 'risk'
  title: string
  description: string
  confidence: 'high' | 'medium' | 'low'
  impact: 'high' | 'medium' | 'low'
  sources: string[]
  timestamp: string
  firm?: string
  theme?: string
}

interface TaxFirm {
  id: string
  name: string
  description: string
  size: 'Big 4' | 'National' | 'Regional'
}

interface ResearchTheme {
  id: string
  name: string
  description: string
  keywords: string[]
}

const TOP_TAX_FIRMS: TaxFirm[] = [
  { id: 'pwc', name: 'PwC', description: 'PricewaterhouseCoopers - Global tax and advisory services', size: 'Big 4' },
  { id: 'ey', name: 'EY', description: 'Ernst & Young - Professional services and tax consulting', size: 'Big 4' },
  { id: 'deloitte', name: 'Deloitte', description: 'Deloitte Tax LLP - Tax consulting and compliance', size: 'Big 4' },
  { id: 'kpmg', name: 'KPMG', description: 'KPMG Tax - Global tax advisory services', size: 'Big 4' },
  { id: 'rsm', name: 'RSM', description: 'RSM US - Middle market tax and advisory services', size: 'National' },
  { id: 'bdo', name: 'BDO', description: 'BDO USA - Tax, assurance and advisory services', size: 'National' }
]

const RESEARCH_THEMES: ResearchTheme[] = [
  {
    id: 'ai-tax-use-cases',
    name: 'AI Tax Use Cases',
    description: 'Artificial intelligence applications in tax preparation, compliance, and advisory services',
    keywords: ['AI tax software', 'machine learning tax', 'automated tax compliance', 'tax AI tools', 'intelligent tax processing']
  },
  {
    id: 'compliance-standards',
    name: 'New Compliance Standards',
    description: 'Emerging tax compliance requirements, regulations, and reporting standards',
    keywords: ['tax compliance updates', 'new tax regulations', 'reporting standards', 'tax law changes', 'compliance requirements']
  }
]

const MarketResearchAgent: React.FC = () => {
  // State management for the research configuration
  const [selectedFirms, setSelectedFirms] = useState<string[]>([])
  const [selectedTheme, setSelectedTheme] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [insights, setInsights] = useState<MarketInsight[]>([])
  const [activeTab, setActiveTab] = useState<'research' | 'analysis' | 'inbox'>('research')
  const [email, setEmail] = useState('')
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleTime, setScheduleTime] = useState('')
  const [isScheduling, setIsScheduling] = useState(false)
  const [scheduleSuccess, setScheduleSuccess] = useState(false)
  
  // NEW: State for the right-side drawer and prompt editing functionality
  const [showPrompt, setShowPrompt] = useState(false) // Controls whether the drawer is open
  const [isEditingPrompt, setIsEditingPrompt] = useState(false) // Toggles between preview and edit modes
  const [customPrompt, setCustomPrompt] = useState('') // Stores the user's custom prompt text

  const handleFirmSelection = (firmId: string, checked: boolean) => {
    if (checked) {
      setSelectedFirms(prev => [...prev, firmId])
    } else {
      setSelectedFirms(prev => prev.filter(id => id !== firmId))
    }
  }

  const handleResearch = async () => {
    if (selectedFirms.length === 0 || !selectedTheme) {
      alert('Please select at least one firm and a research theme')
      return
    }
    
    setIsAnalyzing(true)
    
    try {
      const response = await fetch('/api/market-research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firms: selectedFirms,
          theme: selectedTheme,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to conduct market research')
      }

      const data = await response.json()
      setInsights(data.insights)
    } catch (error) {
      console.error('Error conducting market research:', error)
      alert('Failed to conduct market research. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleScheduleResearch = async () => {
    if (selectedFirms.length === 0 || !selectedTheme) {
      alert('Please select at least one firm and a research theme')
      return
    }

    if (!email || !scheduleDate || !scheduleTime) {
      alert('Please fill in all fields: email, date, and time')
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address')
      return
    }

    // Validate date is in the future
    const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`)
    const now = new Date()
    if (scheduledDateTime <= now) {
      alert('Please select a future date and time')
      return
    }

    setIsScheduling(true)
    
    try {
      const response = await fetch('/api/market-research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firms: selectedFirms,
          theme: selectedTheme,
          email: email,
          scheduledFor: scheduledDateTime.toISOString(),
          schedule: true,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to schedule market research')
      }

      setScheduleSuccess(true)
      setEmail('')
      setScheduleDate('')
      setScheduleTime('')
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setScheduleSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Error scheduling market research:', error)
      alert('Failed to schedule market research. Please try again.')
    } finally {
      setIsScheduling(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'trend': return <TrendingUp className="w-4 h-4" />
      case 'competitor': return <Users className="w-4 h-4" />
      case 'opportunity': return <Target className="w-4 h-4" />
      case 'risk': return <AlertCircle className="w-4 h-4" />
      default: return <Lightbulb className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'trend': return 'bg-blue-100 text-blue-700'
      case 'competitor': return 'bg-purple-100 text-purple-700'
      case 'opportunity': return 'bg-green-100 text-green-700'
      case 'risk': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  /**
   * Generates the research prompt that will be sent to the AI agent
   * This function creates a comprehensive prompt based on the selected firms and theme
   * If the user has created a custom prompt, it uses that instead of the default one
   */
  const generateResearchPrompt = () => {
    const selectedFirmNames = selectedFirms.map(id => TOP_TAX_FIRMS.find(f => f.id === id)?.name).filter(Boolean)
    const selectedThemeData = RESEARCH_THEMES.find(t => t.id === selectedTheme)
    
    // This is the default prompt template that gets populated with the user's selections
    const basePrompt = `Conduct comprehensive market research on the following:

RESEARCH SCOPE:
- Target Firms: ${selectedFirmNames.join(', ')}
- Research Theme: ${selectedThemeData?.name}
- Theme Description: ${selectedThemeData?.description}
- Keywords: ${selectedThemeData?.keywords.join(', ')}

RESEARCH OBJECTIVES:
1. Analyze recent developments, announcements, and strategic initiatives by the selected firms
2. Identify emerging trends and patterns related to the research theme
3. Assess market opportunities and potential risks
4. Evaluate competitive positioning and market dynamics
5. Provide actionable insights for tax automation and AI implementation

DELIVERABLE FORMAT:
For each insight, provide:
- Category (trend/competitor/opportunity/risk)
- Title and description
- Confidence level (high/medium/low)
- Impact assessment (high/medium/low)
- Data sources and references
- Timestamp

Please conduct thorough research across multiple sources including company websites, press releases, industry reports, and recent news to provide comprehensive market intelligence.`

    // If the user has created a custom prompt, use that instead of the default one
    // This allows users to fine-tune the research instructions to their specific needs
    return customPrompt || basePrompt
  }

  /**
   * Saves the user's custom prompt and switches back to preview mode
   * This function is called when the user clicks the "Save Changes" button
   */
  const handleSaveCustomPrompt = () => {
    setCustomPrompt(customPrompt) // Store the custom prompt
    setIsEditingPrompt(false) // Switch back to preview mode
  }

  /**
   * Resets the custom prompt back to empty and switches to preview mode
   * This function is called when the user clicks the "Reset to Default" button
   */
  const handleResetPrompt = () => {
    setCustomPrompt('') // Clear any custom prompt
    setIsEditingPrompt(false) // Switch back to preview mode
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Market Research Agent</h1>
        <p className="text-gray-600">AI-powered market intelligence and competitive analysis for tax automation solutions</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('research')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'research'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Research Query
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'analysis'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Market Analysis
        </button>
        <button
          onClick={() => setActiveTab('inbox')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'inbox'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Send to Inbox
        </button>
      </div>

      {activeTab === 'research' && (
        <div className="space-y-6">
          {/* Firm Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Select Tax/Accounting Firms to Follow
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TOP_TAX_FIRMS.map((firm) => (
                  <div 
                    key={firm.id} 
                    className={`flex items-start space-x-3 p-3 border rounded-lg transition-colors cursor-pointer ${
                      selectedFirms.includes(firm.id) 
                        ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleFirmSelection(firm.id, !selectedFirms.includes(firm.id))}
                  >
                    <input
                      type="checkbox"
                      id={firm.id}
                      checked={selectedFirms.includes(firm.id)}
                      onChange={(e) => e.stopPropagation()} // Prevent double-triggering
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <Image
                            src={`/${firm.id}-logo.png`}
                            alt={`${firm.name} logo`}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              {firm.name}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {firm.size}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{firm.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Theme Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Select Market Trend Theme
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {RESEARCH_THEMES.map((theme) => (
                  <div 
                    key={theme.id} 
                    className={`flex items-start space-x-3 p-3 border rounded-lg transition-colors cursor-pointer ${
                      selectedTheme === theme.id 
                        ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedTheme(theme.id)}
                  >
                    <input
                      type="radio"
                      id={theme.id}
                      name="theme"
                      value={theme.id}
                      checked={selectedTheme === theme.id}
                      onChange={(e) => e.stopPropagation()} // Prevent double-triggering
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block">
                        {theme.name}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">{theme.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {theme.keywords.slice(0, 3).map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Research Button */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-3">
                <Button 
                  onClick={handleResearch}
                  disabled={selectedFirms.length === 0 || !selectedTheme || isAnalyzing}
                  className="flex-1 h-12"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Conducting Market Research...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Start Agentic Market Research
                    </>
                  )}
                </Button>
                {/* RIGHT-SIDE DRAWER: This creates a sliding panel that opens from the right side of the screen */}
                {/* Instead of a modal that covers the entire screen, this drawer slides in from the right */}
                {/* This provides a better user experience as it doesn't block the main content completely */}
                <Sheet open={showPrompt} onOpenChange={setShowPrompt}>
                  {/* SheetTrigger: This is the button that opens the drawer when clicked */}
                  <SheetTrigger asChild>
                    <Button
                      disabled={selectedFirms.length === 0 || !selectedTheme}
                      variant="outline"
                      className="h-12 px-4"
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      View Research Prompt
                    </Button>
                  </SheetTrigger>
                  {/* SheetContent: This is the actual drawer content that slides in from the right */}
                  {/* side="right": Specifies that the drawer opens from the right side of the screen */}
                  {/* className: Sets the width and responsive behavior of the drawer */}
                  <SheetContent side="right" className="w-full sm:max-w-2xl">
                    {/* SheetHeader: The header section of the drawer with title and action buttons */}
                    <SheetHeader className="pb-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        {/* SheetTitle: The main title of the drawer */}
                        <SheetTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          Research Prompt Preview
                        </SheetTitle>
                        {/* Action buttons: Edit/Preview toggle and Close button */}
                        <div className="flex items-center gap-2">
                          {/* EDIT BUTTON: Toggles between preview and edit modes */}
                          {/* When clicked, it switches between showing the prompt as text or as an editable textarea */}
                          <Button
                            onClick={() => setIsEditingPrompt(!isEditingPrompt)}
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3"
                          >
                            <Edit3 className="w-4 h-4 mr-1" />
                            {isEditingPrompt ? 'Preview' : 'Edit'}
                          </Button>
                          {/* CLOSE BUTTON: Closes the drawer and returns to the main interface */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setShowPrompt(false)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </SheetHeader>
                    {/* Main content area of the drawer */}
                    <div className="py-6 space-y-6">
                      {/* CONDITIONAL RENDERING: Shows different content based on whether user is editing or previewing */}
                      {isEditingPrompt ? (
                        /* EDIT MODE: Shows an editable textarea where users can customize the research prompt */
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Customize Research Prompt:
                            </h4>
                            {/* TEXTAREA: A large text input box where users can edit the research prompt */}
                            {/* value: Shows either the custom prompt or the default generated prompt */}
                            {/* onChange: Updates the customPrompt state as the user types */}
                            {/* placeholder: Shows helpful text when the textarea is empty */}
                            {/* className: Styles the textarea with monospace font and minimum height */}
                            <Textarea
                              value={customPrompt || generateResearchPrompt()}
                              onChange={(e) => setCustomPrompt(e.target.value)}
                              placeholder="Enter your custom research prompt..."
                              className="min-h-[400px] text-sm font-mono"
                            />
                          </div>
                          {/* ACTION BUTTONS: Save changes or reset to default */}
                          <div className="flex justify-end gap-2">
                            {/* RESET BUTTON: Clears any custom changes and returns to the default prompt */}
                            <Button variant="outline" onClick={handleResetPrompt}>
                              Reset to Default
                            </Button>
                            {/* SAVE BUTTON: Saves the custom prompt and switches back to preview mode */}
                            <Button onClick={handleSaveCustomPrompt}>
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      ) : (
                        /* PREVIEW MODE: Shows the research prompt as read-only text for review */
                        <div className="space-y-4">
                          {/* PROMPT PREVIEW: Displays the research prompt in a formatted, read-only view */}
                          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              What the AI Agent Will Research:
                            </h4>
                            {/* PRE TAG: Preserves formatting and shows the prompt exactly as it will be sent to the AI */}
                            <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono">
                              {generateResearchPrompt()}
                            </pre>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                              Research Configuration:
                            </h4>
                            <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                              {selectedFirms.length > 0 && (
                                <div>
                                  <strong>Target Firms:</strong> {selectedFirms.map(id => TOP_TAX_FIRMS.find(f => f.id === id)?.name).join(', ')}
                                </div>
                              )}
                              {selectedTheme && (
                                <div>
                                  <strong>Research Theme:</strong> {RESEARCH_THEMES.find(t => t.id === selectedTheme)?.name}
                                </div>
                              )}
                              <div>
                                <strong>Expected Output:</strong> Structured insights with categories, confidence levels, and impact assessments
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          This prompt will be sent to the AI agent to conduct comprehensive market research.
                        </p>
                        <Button
                          onClick={() => {
                            setShowPrompt(false)
                            handleResearch()
                          }}
                          disabled={isAnalyzing}
                        >
                          <Search className="w-4 h-4 mr-2" />
                          Start Research Now
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              {(selectedFirms.length > 0 || selectedTheme) && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Research Configuration:</strong>
                    {selectedFirms.length > 0 && (
                      <div className="block mt-1">
                        <span>• Following {selectedFirms.length} firm{selectedFirms.length > 1 ? 's' : ''}:</span>
                        <div className="flex items-center gap-2 mt-1">
                          {selectedFirms.map(id => {
                            const firm = TOP_TAX_FIRMS.find(f => f.id === id)
                            return firm ? (
                              <div key={id} className="flex items-center gap-1">
                                <Image
                                  src={`/${firm.id}-logo.png`}
                                  alt={`${firm.name} logo`}
                                  width={16}
                                  height={16}
                                  className="object-contain"
                                />
                                <span className="text-xs">{firm.name}</span>
                              </div>
                            ) : null
                          })}
                        </div>
                      </div>
                    )}
                    {selectedTheme && (
                      <span className="block mt-1">• Theme: {RESEARCH_THEMES.find(t => t.id === selectedTheme)?.name}</span>
                    )}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Research Results */}
          {insights.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Market Insights</h3>
              {insights.map((insight) => (
                <Card key={insight.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(insight.category)}
                        <Badge className={getCategoryColor(insight.category)}>
                          {insight.category.toUpperCase()}
                        </Badge>
                        {insight.firm && (
                          <div className="flex items-center gap-2">
                            <Image
                              src={`/${insight.firm.toLowerCase()}-logo.png`}
                              alt={`${insight.firm} logo`}
                              width={20}
                              height={20}
                              className="object-contain"
                            />
                            <Badge variant="outline" className="text-xs">
                              {insight.firm}
                            </Badge>
                          </div>
                        )}
                        {insight.theme && (
                          <Badge variant="secondary" className="text-xs">
                            {insight.theme}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Globe className="w-3 h-3" />
                        <Clock className="w-3 h-3" />
                        {new Date(insight.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                    <p className="text-gray-600 mb-4">{insight.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">Confidence:</span>
                          <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                            {insight.confidence.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">Impact:</span>
                          <span className={`text-xs font-medium ${getConfidenceColor(insight.impact)}`}>
                            {insight.impact.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">Sources:</span>
                        <span className="text-xs text-gray-700">{insight.sources.length} web sources</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="space-y-6">
          {/* Market Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Market Size</p>
                    <p className="text-2xl font-bold text-gray-900">$2.4B</p>
                    <p className="text-xs text-gray-500">Tax Tech Industry</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Growth Rate</p>
                    <p className="text-2xl font-bold text-gray-900">23%</p>
                    <p className="text-xs text-gray-500">YoY AI Adoption</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Opportunity Score</p>
                    <p className="text-2xl font-bold text-gray-900">8.7/10</p>
                    <p className="text-xs text-gray-500">AI Document Search</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Competitive Landscape */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Competitive Landscape
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Document AI Integration</h4>
                    <p className="text-sm text-gray-600">Current market gap in tax-specific document processing</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">High Opportunity</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">SMB Market Penetration</h4>
                    <p className="text-sm text-gray-600">Limited solutions targeting small-medium businesses</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">Medium Opportunity</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Enterprise Solutions</h4>
                    <p className="text-sm text-gray-600">Saturated market with established players</p>
                  </div>
                  <Badge className="bg-red-100 text-red-700">Low Opportunity</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'inbox' && (
        <div className="space-y-6">
          {/* Email Scheduling Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Schedule Market Research Report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500">
                  Market research report will be sent to this email address
                </p>
              </div>

              {/* Date and Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="time" className="text-sm font-medium text-gray-700">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Schedule Button */}
              <Button 
                onClick={handleScheduleResearch}
                disabled={selectedFirms.length === 0 || !selectedTheme || !email || !scheduleDate || !scheduleTime || isScheduling}
                className="w-full h-12"
                size="lg"
              >
                {isScheduling ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Scheduling Research...
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4 mr-2" />
                    Schedule Market Research Report
                  </>
                )}
              </Button>

              {/* Success Message */}
              {scheduleSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Research Scheduled Successfully!
                      </p>
                      <p className="text-xs text-green-600">
                        Your market research report will be sent to your email at the scheduled time.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Configuration Summary */}
              {(selectedFirms.length > 0 || selectedTheme) && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>Research Configuration:</strong>
                  </p>
                  {selectedFirms.length > 0 && (
                    <div className="mb-2">
                      <span className="text-xs text-blue-700">• Following {selectedFirms.length} firm{selectedFirms.length > 1 ? 's' : ''}:</span>
                      <div className="flex items-center gap-2 mt-1">
                        {selectedFirms.map(id => {
                          const firm = TOP_TAX_FIRMS.find(f => f.id === id)
                          return firm ? (
                            <div key={id} className="flex items-center gap-1">
                                                             <Image
                                 src={`/${firm.id}-logo.png`}
                                 alt={`${firm.name} logo`}
                                 width={16}
                                 height={16}
                                 className="object-contain"
                               />
                              <span className="text-xs">{firm.name}</span>
                            </div>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                  {selectedTheme && (
                    <p className="text-xs text-blue-700">
                      • Theme: {RESEARCH_THEMES.find(t => t.id === selectedTheme)?.name}
                    </p>
                  )}
                  {email && (
                    <p className="text-xs text-blue-700">
                      • Email: {email}
                    </p>
                  )}
                  {scheduleDate && scheduleTime && (
                    <p className="text-xs text-blue-700">
                      • Scheduled for: {new Date(`${scheduleDate}T${scheduleTime}`).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">1</span>
                  </div>
                  <p>Select the tax firms you want to monitor and choose a research theme</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">2</span>
                  </div>
                  <p>Enter your email address and choose when you want the report delivered</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">3</span>
                  </div>
                  <p>Our AI agent will conduct the research at the scheduled time and email you a comprehensive report</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}


    </div>
  )
}

export default MarketResearchAgent