"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'

import { 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Target, 
  DollarSign,
  Lightbulb,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
  Briefcase,
  X,
  Edit3,
  Save,
  Shield,
  FileText,
  Calculator,
  TrendingUp,
  Users
} from 'lucide-react'

interface ComplianceScenario {
  id: string
  category: 'risk' | 'opportunity' | 'compliance' | 'optimization'
  title: string
  description: string
  riskLevel: 'high' | 'medium' | 'low'
  impact: 'high' | 'medium' | 'low'
  complexity: 'simple' | 'moderate' | 'complex'
  estimatedSavings?: string
  estimatedRisk?: string
  recommendations: string[]
  timestamp: string
  jurisdiction?: string
  businessType?: string
}

interface TaxJurisdiction {
  id: string
  name: string
  description: string
  complexity: 'low' | 'medium' | 'high'
}

interface BusinessType {
  id: string
  name: string
  description: string
  taxConsiderations: string[]
}

const TAX_JURISDICTIONS: TaxJurisdiction[] = [
  { id: 'federal', name: 'Federal (Canada)', description: 'Canadian federal tax regulations and requirements', complexity: 'high' },
  { id: 'ontario', name: 'Ontario', description: 'Ontario provincial tax and business regulations', complexity: 'medium' },
  { id: 'quebec', name: 'Quebec', description: 'Quebec provincial tax system and requirements', complexity: 'high' },
  { id: 'bc', name: 'British Columbia', description: 'BC provincial tax and business regulations', complexity: 'medium' },
  { id: 'alberta', name: 'Alberta', description: 'Alberta provincial tax and business regulations', complexity: 'low' },
  { id: 'us-federal', name: 'US Federal', description: 'United States federal tax regulations', complexity: 'high' }
]

const BUSINESS_TYPES: BusinessType[] = [
  {
    id: 'corporation',
    name: 'Corporation',
    description: 'General corporation with standard tax obligations',
    taxConsiderations: ['Corporate income tax', 'GST/HST', 'Payroll taxes', 'Annual filings']
  },
  {
    id: 'partnership',
    name: 'Partnership',
    description: 'Partnership structure with flow-through taxation',
    taxConsiderations: ['Partnership returns', 'Partner allocations', 'GST/HST', 'Payroll taxes']
  },
  {
    id: 'sole-proprietor',
    name: 'Sole Proprietor',
    description: 'Individual business owner with personal tax implications',
    taxConsiderations: ['Personal income tax', 'GST/HST', 'Business expenses', 'Home office deductions']
  },
  {
    id: 'non-profit',
    name: 'Non-Profit Organization',
    description: 'Tax-exempt organization with specific compliance requirements',
    taxConsiderations: ['Tax-exempt status', 'Annual information returns', 'GST/HST', 'Donation receipts']
  }
]

const TaxComplianceSimulator: React.FC = () => {
  // State management for the compliance simulation
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>([])
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [scenarios, setScenarios] = useState<ComplianceScenario[]>([])
  const [activeTab, setActiveTab] = useState<'simulation' | 'analysis' | 'reports'>('simulation')
  
  // State for the right-side drawer and prompt editing functionality
  const [showPrompt, setShowPrompt] = useState(false)
  const [isEditingPrompt, setIsEditingPrompt] = useState(false)
  const [customPrompt, setCustomPrompt] = useState('')

  const handleJurisdictionSelection = (jurisdictionId: string, checked: boolean) => {
    if (checked) {
      setSelectedJurisdictions(prev => [...prev, jurisdictionId])
    } else {
      setSelectedJurisdictions(prev => prev.filter(id => id !== jurisdictionId))
    }
  }

  const handleSimulation = async () => {
    if (selectedJurisdictions.length === 0 || !selectedBusinessType) {
      alert('Please select at least one jurisdiction and a business type')
      return
    }
    
    setIsAnalyzing(true)
    
    try {
      const response = await fetch('/api/tax-compliance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jurisdictions: selectedJurisdictions,
          businessType: selectedBusinessType,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to run compliance simulation')
      }

      const data = await response.json()
      setScenarios(data.scenarios)
    } catch (error) {
      console.error('Error running compliance simulation:', error)
      alert('Failed to run compliance simulation. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'risk': return <AlertTriangle className="w-4 h-4" />
      case 'opportunity': return <Target className="w-4 h-4" />
      case 'compliance': return <CheckCircle className="w-4 h-4" />
      case 'optimization': return <TrendingUp className="w-4 h-4" />
      default: return <Lightbulb className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'risk': return 'bg-red-100 text-red-700'
      case 'opportunity': return 'bg-green-100 text-green-700'
      case 'compliance': return 'bg-blue-100 text-blue-700'
      case 'optimization': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'complex': return 'text-red-600'
      case 'moderate': return 'text-yellow-600'
      case 'simple': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const generateCompliancePrompt = () => {
    const selectedJurisdictionNames = selectedJurisdictions.map(id => TAX_JURISDICTIONS.find(j => j.id === id)?.name).filter(Boolean)
    const selectedBusinessTypeData = BUSINESS_TYPES.find(b => b.id === selectedBusinessType)
    
    const basePrompt = `Conduct comprehensive tax compliance analysis for the following scenario:

COMPLIANCE SCOPE:
- Jurisdictions: ${selectedJurisdictionNames.join(', ')}
- Business Type: ${selectedBusinessTypeData?.name}
- Business Description: ${selectedBusinessTypeData?.description}
- Tax Considerations: ${selectedBusinessTypeData?.taxConsiderations.join(', ')}

ANALYSIS OBJECTIVES:
1. Identify potential compliance risks and regulatory requirements
2. Assess tax optimization opportunities within legal boundaries
3. Evaluate complexity and resource requirements for compliance
4. Provide actionable recommendations for risk mitigation
5. Calculate potential savings and risk exposure

DELIVERABLE FORMAT:
For each scenario, provide:
- Category (risk/opportunity/compliance/optimization)
- Title and detailed description
- Risk level assessment (high/medium/low)
- Impact assessment (high/medium/low)
- Complexity rating (simple/moderate/complex)
- Estimated savings or risk exposure
- Specific recommendations
- Jurisdiction-specific considerations

Please conduct thorough analysis considering current tax laws, recent changes, and best practices for the specified business type and jurisdictions.`

    return customPrompt || basePrompt
  }

  const handleSaveCustomPrompt = () => {
    setCustomPrompt(customPrompt)
    setIsEditingPrompt(false)
  }

  const handleResetPrompt = () => {
    setCustomPrompt('')
    setIsEditingPrompt(false)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Tax Compliance Simulator</h1>
        <p className="text-gray-600">AI-powered compliance scenario analysis and risk assessment for tax functions</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('simulation')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'simulation'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Compliance Simulation
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'analysis'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Risk Analysis
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'reports'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Compliance Reports
        </button>
      </div>

      {activeTab === 'simulation' && (
        <div className="space-y-6">
          {/* Jurisdiction Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">Select Tax Jurisdictions</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TAX_JURISDICTIONS.map((jurisdiction) => (
                  <div 
                    key={jurisdiction.id} 
                    className={`flex items-start space-x-3 p-3 border rounded-lg transition-colors cursor-pointer ${
                      selectedJurisdictions.includes(jurisdiction.id) 
                        ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleJurisdictionSelection(jurisdiction.id, !selectedJurisdictions.includes(jurisdiction.id))}
                  >
                    <input
                      type="checkbox"
                      id={jurisdiction.id}
                      checked={selectedJurisdictions.includes(jurisdiction.id)}
                      onChange={(e) => e.stopPropagation()}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-900">
                            {jurisdiction.name}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">{jurisdiction.description}</p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            jurisdiction.complexity === 'high' ? 'border-red-200 text-red-700' :
                            jurisdiction.complexity === 'medium' ? 'border-yellow-200 text-yellow-700' :
                            'border-green-200 text-green-700'
                          }`}
                        >
                          {jurisdiction.complexity} complexity
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Business Type Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-gray-900">Select Business Type</h3>
            </div>
            <div className="space-y-3">
                {BUSINESS_TYPES.map((businessType) => (
                  <div 
                    key={businessType.id} 
                    className={`flex items-start space-x-3 p-3 border rounded-lg transition-colors cursor-pointer ${
                      selectedBusinessType === businessType.id 
                        ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedBusinessType(businessType.id)}
                  >
                    <input
                      type="radio"
                      id={businessType.id}
                      name="businessType"
                      value={businessType.id}
                      checked={selectedBusinessType === businessType.id}
                      onChange={(e) => e.stopPropagation()}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block">
                        {businessType.name}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">{businessType.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {businessType.taxConsiderations.map((consideration, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {consideration}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Simulation Button */}
          <div className="space-y-4">
              <div className="flex gap-3">
                <Button 
                  onClick={handleSimulation}
                  disabled={selectedJurisdictions.length === 0 || !selectedBusinessType || isAnalyzing}
                  className="flex-1 h-12"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Running Compliance Analysis...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Start Compliance Simulation
                    </>
                  )}
                </Button>
                <Sheet open={showPrompt} onOpenChange={setShowPrompt}>
                  <SheetTrigger asChild>
                    <Button
                      disabled={selectedJurisdictions.length === 0 || !selectedBusinessType}
                      variant="outline"
                      className="h-12 px-4"
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      View Analysis Prompt
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-2xl">
                    <SheetHeader className="pb-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <SheetTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          Compliance Analysis Prompt
                        </SheetTitle>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => setIsEditingPrompt(!isEditingPrompt)}
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3"
                          >
                            <Edit3 className="w-4 h-4 mr-1" />
                            {isEditingPrompt ? 'Preview' : 'Edit'}
                          </Button>
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
                    <div className="py-6 space-y-6">
                      {isEditingPrompt ? (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Customize Analysis Prompt:
                            </h4>
                            <Textarea
                              value={customPrompt || generateCompliancePrompt()}
                              onChange={(e) => setCustomPrompt(e.target.value)}
                              placeholder="Enter your custom compliance analysis prompt..."
                              className="min-h-[400px] text-sm font-mono"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={handleResetPrompt}>
                              Reset to Default
                            </Button>
                            <Button onClick={handleSaveCustomPrompt}>
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              What the AI Will Analyze:
                            </h4>
                            <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono">
                              {generateCompliancePrompt()}
                            </pre>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                              Analysis Configuration:
                            </h4>
                            <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                              {selectedJurisdictions.length > 0 && (
                                <div>
                                  <strong>Jurisdictions:</strong> {selectedJurisdictions.map(id => TAX_JURISDICTIONS.find(j => j.id === id)?.name).join(', ')}
                                </div>
                              )}
                              {selectedBusinessType && (
                                <div>
                                  <strong>Business Type:</strong> {BUSINESS_TYPES.find(b => b.id === selectedBusinessType)?.name}
                                </div>
                              )}
                              <div>
                                <strong>Expected Output:</strong> Compliance scenarios with risk assessments, opportunities, and recommendations
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          This prompt will be sent to the AI to conduct comprehensive compliance analysis.
                        </p>
                        <Button
                          onClick={() => {
                            setShowPrompt(false)
                            handleSimulation()
                          }}
                          disabled={isAnalyzing}
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Start Analysis Now
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              {(selectedJurisdictions.length > 0 || selectedBusinessType) && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Analysis Configuration:</strong>
                    {selectedJurisdictions.length > 0 && (
                      <span className="block mt-1">• Jurisdictions: {selectedJurisdictions.map(id => TAX_JURISDICTIONS.find(j => j.id === id)?.name).join(', ')}</span>
                    )}
                    {selectedBusinessType && (
                      <span className="block mt-1">• Business Type: {BUSINESS_TYPES.find(b => b.id === selectedBusinessType)?.name}</span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Simulation Results */}
          {scenarios.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Compliance Scenarios</h3>
              {scenarios.map((scenario) => (
                <Card key={scenario.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(scenario.category)}
                        <Badge className={getCategoryColor(scenario.category)}>
                          {scenario.category.toUpperCase()}
                        </Badge>
                        {scenario.jurisdiction && (
                          <Badge variant="outline" className="text-xs">
                            {scenario.jurisdiction}
                          </Badge>
                        )}
                        {scenario.businessType && (
                          <Badge variant="secondary" className="text-xs">
                            {scenario.businessType}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {new Date(scenario.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">{scenario.title}</h4>
                    <p className="text-gray-600 mb-4">{scenario.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">Risk Level:</span>
                        <span className={`text-xs font-medium ${getRiskLevelColor(scenario.riskLevel)}`}>
                          {scenario.riskLevel.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">Impact:</span>
                        <span className={`text-xs font-medium ${getRiskLevelColor(scenario.impact)}`}>
                          {scenario.impact.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">Complexity:</span>
                        <span className={`text-xs font-medium ${getComplexityColor(scenario.complexity)}`}>
                          {scenario.complexity.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500">Est. Savings:</span>
                        <span className="text-xs font-medium text-green-600">
                          {scenario.estimatedSavings || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {scenario.recommendations.length > 0 && (
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-gray-900">Recommendations:</h5>
                        <ul className="space-y-1">
                          {scenario.recommendations.map((recommendation, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <CheckCircle2 className="w-3 h-3 mt-0.5 text-green-600 flex-shrink-0" />
                              {recommendation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="space-y-6">
          {/* Risk Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">High Risk Items</p>
                    <p className="text-2xl font-bold text-red-600">3</p>
                    <p className="text-xs text-gray-500">Require Immediate Attention</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Optimization Opportunities</p>
                    <p className="text-2xl font-bold text-green-600">7</p>
                    <p className="text-xs text-gray-500">Potential Tax Savings</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Compliance Score</p>
                    <p className="text-2xl font-bold text-blue-600">92%</p>
                    <p className="text-xs text-gray-500">Overall Compliance Health</p>
                  </div>
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Matrix */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Risk Assessment Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-red-50">
                  <div>
                    <h4 className="font-medium text-red-900">Federal Tax Filing Deadline</h4>
                    <p className="text-sm text-red-700">Critical compliance requirement with high penalties</p>
                  </div>
                  <Badge className="bg-red-100 text-red-700">High Risk</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
                  <div>
                    <h4 className="font-medium text-yellow-900">GST/HST Registration</h4>
                    <p className="text-sm text-yellow-700">Required for businesses exceeding threshold</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700">Medium Risk</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                  <div>
                    <h4 className="font-medium text-green-900">Tax Loss Carryforward</h4>
                    <p className="text-sm text-green-700">Optimization opportunity for future tax savings</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Low Risk</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          {/* Compliance Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Generate Compliance Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Calculator className="w-6 h-6" />
                  <span>Tax Calculation Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  <span>Risk Assessment Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <CheckCircle className="w-6 h-6" />
                  <span>Compliance Checklist</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <TrendingUp className="w-6 h-6" />
                  <span>Optimization Report</span>
                </Button>
              </div>
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
                  <p>Select the tax jurisdictions and business type for your scenario</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">2</span>
                  </div>
                  <p>Run the compliance simulation to identify risks and opportunities</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">3</span>
                  </div>
                  <p>Review detailed scenarios with risk assessments and recommendations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default TaxComplianceSimulator 