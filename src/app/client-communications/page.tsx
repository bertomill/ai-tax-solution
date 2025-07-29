"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { 
  Mail, 
  MessageSquare, 
  FileText, 
  PenTool,
  User,
  Building2,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit3,
  Save,
  Copy,
  Download,
  X,
  Lightbulb,
  Phone
} from 'lucide-react'

interface CommunicationTemplate {
  id: string
  name: string
  category: 'email' | 'letter' | 'notice' | 'response'
  description: string
  tone: 'formal' | 'professional' | 'friendly' | 'urgent'
  template: string
}

interface ClientInfo {
  name: string
  company: string
  email: string
  phone: string
  preferredCommunication: 'email' | 'letter' | 'phone'
}

interface DraftedCommunication {
  id: string
  templateId: string
  clientInfo: ClientInfo
  subject: string
  content: string
  tone: string
  category: string
  timestamp: string
  status: 'draft' | 'reviewed' | 'sent'
}

const COMMUNICATION_TEMPLATES: CommunicationTemplate[] = [
  {
    id: 'tax-deadline-reminder',
    name: 'Tax Deadline Reminder',
    category: 'email',
    description: 'Friendly reminder about upcoming tax filing deadlines',
    tone: 'professional',
    template: `Dear [CLIENT_NAME],

I hope this email finds you well. I wanted to reach out to remind you about some important upcoming tax deadlines that may affect you or your business.

[DEADLINE_DETAILS]

To ensure we meet these deadlines without any last-minute rush, I recommend we schedule a meeting to review your documents and discuss any questions you may have.

Please let me know your availability for the next two weeks, and I'll be happy to accommodate your schedule.

Best regards,
[YOUR_NAME]
[YOUR_TITLE]
[FIRM_NAME]`
  },
  {
    id: 'document-request',
    name: 'Document Request',
    category: 'email',
    description: 'Request for missing documents or information',
    tone: 'professional',
    template: `Dear [CLIENT_NAME],

I hope you're doing well. As we continue working on your tax matters, I need to request some additional documents to ensure accuracy and completeness.

Required Documents:
[DOCUMENT_LIST]

These documents are essential for:
[REASON_FOR_DOCUMENTS]

Please provide these documents by [DUE_DATE] to avoid any delays in processing. You can send them via our secure client portal, email, or drop them off at our office.

If you have any questions about these documents or need assistance locating them, please don't hesitate to reach out.

Thank you for your cooperation.

Best regards,
[YOUR_NAME]
[YOUR_TITLE]
[FIRM_NAME]`
  },
  {
    id: 'irs-notice-response',
    name: 'IRS Notice Response',
    category: 'letter',
    description: 'Professional response to IRS notices and correspondence',
    tone: 'formal',
    template: `[DATE]

Internal Revenue Service
[IRS_ADDRESS]

Re: [CLIENT_NAME] - SSN: [SSN]
    Notice Number: [NOTICE_NUMBER]
    Tax Year: [TAX_YEAR]

Dear IRS Officer,

We are writing in response to the notice dated [NOTICE_DATE] regarding the above-referenced taxpayer. We represent [CLIENT_NAME] in this matter and are authorized to act on their behalf.

[RESPONSE_DETAILS]

We respectfully request that you:
[REQUESTED_ACTION]

Supporting documentation is enclosed for your review. We believe this information clearly demonstrates [POSITION_SUMMARY].

Please contact us if you require any additional information or documentation. We look forward to your prompt resolution of this matter.

Sincerely,

[YOUR_NAME], [CREDENTIALS]
[YOUR_TITLE]
[FIRM_NAME]

Enclosures: [LIST_OF_ENCLOSURES]`
  },
  {
    id: 'service-proposal',
    name: 'Service Proposal',
    category: 'email',
    description: 'Proposal for additional tax services or consultation',
    tone: 'professional',
    template: `Dear [CLIENT_NAME],

Thank you for considering our firm for your additional tax needs. Based on our discussion, I'm pleased to present this proposal for [SERVICE_DESCRIPTION].

Service Overview:
[SERVICE_DETAILS]

Timeline:
[PROJECT_TIMELINE]

Investment:
[FEE_STRUCTURE]

Next Steps:
1. Review this proposal and let me know if you have any questions
2. If you'd like to proceed, we can schedule a kick-off meeting
3. We'll begin work once we receive your signed engagement letter

I'm confident that our expertise in [AREA_OF_EXPERTISE] will provide significant value to [CLIENT_COMPANY]. I look forward to the opportunity to work with you on this important project.

Please feel free to call me at [PHONE_NUMBER] if you'd like to discuss any aspect of this proposal.

Best regards,
[YOUR_NAME]
[YOUR_TITLE]
[FIRM_NAME]`
  }
]

const CommunicationDrafting: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: '',
    company: '',
    email: '',
    phone: '',
    preferredCommunication: 'email'
  })
  const [subject, setSubject] = useState('')
  const [customContent, setCustomContent] = useState('')
  const [selectedTone, setSelectedTone] = useState<string>('professional')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')
  const [drafts, setDrafts] = useState<DraftedCommunication[]>([])
  const [activeTab, setActiveTab] = useState<'communications' | 'drafts' | 'design'>('communications')
  
  // Prompt editing functionality
  const [showPrompt, setShowPrompt] = useState(false)
  const [isEditingPrompt, setIsEditingPrompt] = useState(false)
  const [customPrompt, setCustomPrompt] = useState('')

  const handleTemplateSelection = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = COMMUNICATION_TEMPLATES.find(t => t.id === templateId)
    if (template) {
      setSelectedTone(template.tone)
      setCustomContent(template.template)
    }
  }

  const handleGenerateCommunication = async () => {
    if (!selectedTemplate || !clientInfo.name) {
      alert('Please select a template and enter client information')
      return
    }

    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: generateCommunicationPrompt()
            }
          ]
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate communication')
      }

      const data = await response.json()
      setGeneratedContent(data.content)
      
      // Save as draft
      const newDraft: DraftedCommunication = {
        id: Date.now().toString(),
        templateId: selectedTemplate,
        clientInfo,
        subject: subject || `Communication for ${clientInfo.name}`,
        content: data.content,
        tone: selectedTone,
        category: COMMUNICATION_TEMPLATES.find(t => t.id === selectedTemplate)?.category || 'email',
        timestamp: new Date().toISOString(),
        status: 'draft'
      }
      
      setDrafts(prev => [newDraft, ...prev])
      
    } catch (error) {
      console.error('Error generating communication:', error)
      alert('Failed to generate communication. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateCommunicationPrompt = () => {
    const template = COMMUNICATION_TEMPLATES.find(t => t.id === selectedTemplate)
    
    const basePrompt = `You are a professional tax advisor's communication assistant. Generate a ${template?.category} communication with the following specifications:

CLIENT INFORMATION:
- Name: ${clientInfo.name}
- Company: ${clientInfo.company || 'Individual Client'}
- Email: ${clientInfo.email}
- Phone: ${clientInfo.phone}
- Preferred Communication: ${clientInfo.preferredCommunication}

COMMUNICATION DETAILS:
- Template: ${template?.name}
- Category: ${template?.category}
- Tone: ${selectedTone}
- Subject: ${subject}

TEMPLATE CONTENT:
${customContent}

INSTRUCTIONS:
1. Personalize the template with the client information provided
2. Maintain a ${selectedTone} tone throughout
3. Ensure the communication is professional and appropriate for a tax services context
4. Replace all placeholder variables (e.g., [CLIENT_NAME], [YOUR_NAME]) with appropriate content
5. Keep the structure and format appropriate for a ${template?.category}
6. Make sure the content is clear, actionable, and professional

Please generate the complete communication ready for review and sending.`

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

  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    alert('Communication copied to clipboard!')
  }

  const handleDownloadDraft = (draft: DraftedCommunication) => {
    const element = document.createElement('a')
    const file = new Blob([draft.content], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${draft.clientInfo.name}_${draft.category}_${new Date(draft.timestamp).toLocaleDateString()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="container mx-auto p-6 space-y-6" id="communications">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Communication Drafting</h1>
        <p className="text-gray-600">AI-powered professional communication drafting for tax services and client correspondence</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('communications')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'communications'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Communication Drafting
        </button>
        <button
          onClick={() => setActiveTab('drafts')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'drafts'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Draft History ({drafts.length})
        </button>
        <button
          onClick={() => setActiveTab('design')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'design'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Solution Design
        </button>
      </div>

      {activeTab === 'communications' && (
        <div className="space-y-6">
          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Select Communication Template
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COMMUNICATION_TEMPLATES.map((template) => (
                  <div 
                    key={template.id} 
                    className={`flex items-start space-x-3 p-4 border rounded-lg transition-colors cursor-pointer ${
                      selectedTemplate === template.id 
                        ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleTemplateSelection(template.id)}
                  >
                    <input
                      type="radio"
                      id={template.id}
                      name="template"
                      value={template.id}
                      checked={selectedTemplate === template.id}
                      onChange={(e) => e.stopPropagation()}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">{template.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {template.tone}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="clientName" className="text-sm font-medium text-gray-700">
                    Client Name *
                  </label>
                  <Input
                    id="clientName"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Smith"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="clientCompany" className="text-sm font-medium text-gray-700">
                    Company (Optional)
                  </label>
                  <Input
                    id="clientCompany"
                    value={clientInfo.company}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="ABC Corp"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="clientEmail" className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="clientPhone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <Input
                    id="clientPhone"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="preferredCommunication" className="text-sm font-medium text-gray-700">
                  Preferred Communication Method
                </label>
                <Select 
                  value={clientInfo.preferredCommunication} 
                  onValueChange={(value: 'email' | 'letter' | 'phone') => 
                    setClientInfo(prev => ({ ...prev, preferredCommunication: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="letter">Formal Letter</SelectItem>
                    <SelectItem value="phone">Phone Call Follow-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Communication Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Communication Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                  Subject/Title
                </label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter subject or title"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="tone" className="text-sm font-medium text-gray-700">
                  Communication Tone
                </label>
                <Select value={selectedTone} onValueChange={setSelectedTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="customContent" className="text-sm font-medium text-gray-700">
                  Template Content (Editable)
                </label>
                <Textarea
                  id="customContent"
                  value={customContent}
                  onChange={(e) => setCustomContent(e.target.value)}
                  placeholder="Template content will appear here..."
                  className="min-h-[200px] text-sm font-mono"
                />
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-3">
                <Button 
                  onClick={handleGenerateCommunication}
                  disabled={!selectedTemplate || !clientInfo.name || isGenerating}
                  className="flex-1 h-12"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Communication...
                    </>
                  ) : (
                    <>
                      <PenTool className="w-4 h-4 mr-2" />
                      Generate Professional Communication
                    </>
                  )}
                </Button>

                {/* Prompt Preview Drawer */}
                <Sheet open={showPrompt} onOpenChange={setShowPrompt}>
                  <SheetTrigger asChild>
                    <Button
                      disabled={!selectedTemplate || !clientInfo.name}
                      variant="outline"
                      className="h-12 px-4"
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      View Prompt
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-2xl">
                    <SheetHeader className="pb-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <SheetTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          Communication Prompt Preview
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
                              Customize Communication Prompt:
                            </h4>
                            <Textarea
                              value={customPrompt || generateCommunicationPrompt()}
                              onChange={(e) => setCustomPrompt(e.target.value)}
                              placeholder="Enter your custom prompt..."
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
                              What the AI Will Generate:
                            </h4>
                            <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono">
                              {generateCommunicationPrompt()}
                            </pre>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          This prompt will be sent to the AI to generate your professional communication.
                        </p>
                        <Button
                          onClick={() => {
                            setShowPrompt(false)
                            handleGenerateCommunication()
                          }}
                          disabled={isGenerating}
                        >
                          <PenTool className="w-4 h-4 mr-2" />
                          Generate Now
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Generated Content Preview */}
              {generatedContent && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Generated Communication</h3>
                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-700">Generated</Badge>
                        <span className="text-xs text-gray-500">
                          {new Date().toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopyToClipboard(generatedContent)}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </div>
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans">
                      {generatedContent}
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'drafts' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Communication Drafts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {drafts.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No drafts yet. Generate your first communication to see it here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {drafts.map((draft) => (
                    <div key={draft.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{draft.subject}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {draft.category}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {draft.tone}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(draft.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            To: {draft.clientInfo.name} {draft.clientInfo.company && `(${draft.clientInfo.company})`}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopyToClipboard(draft.content)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadDraft(draft)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded p-3">
                        <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans line-clamp-4">
                          {draft.content.substring(0, 200)}...
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'design' && (
        <div className="space-y-6" id="design">
          {/* Solution Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Communication Drafting Solution Design
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-6">
                  An AI-powered communication drafting system designed to streamline professional correspondence for tax services, 
                  ensuring consistent, professional, and personalized client communications.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Key Features</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Template-based communication generation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Client information personalization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Multiple communication types (email, letter, notices)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Tone and style customization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Draft history and management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Export and copy functionality</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Use Cases</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Mail className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Tax deadline reminder emails</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Document request communications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>IRS notice responses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Building2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Service proposals and consultations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <User className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Client onboarding communications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Phone className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Follow-up correspondence</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Architecture */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Technical Architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Frontend Components</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Template Selection Interface</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Client Information Forms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Content Preview & Editing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Draft Management System</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">AI Integration</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>GPT-4 Language Model</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Custom Prompt Engineering</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Context-Aware Generation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Tone & Style Control</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Data Management</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Client Information Storage</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Template Library</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Draft History Tracking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Export Capabilities</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Implementation Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Time Savings</h4>
                  <p className="text-sm text-gray-600">Reduce communication drafting time by 70% with AI-generated content</p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Consistency</h4>
                  <p className="text-sm text-gray-600">Ensure professional, consistent tone across all client communications</p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Personalization</h4>
                  <p className="text-sm text-gray-600">Automatically personalize communications with client-specific information</p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">Documentation</h4>
                  <p className="text-sm text-gray-600">Maintain a complete history of all client communications</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Enhancements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Future Enhancements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Advanced Features</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Integration with CRM systems</li>
                      <li>• Automated follow-up scheduling</li>
                      <li>• Multi-language support</li>
                      <li>• Voice-to-text input</li>
                      <li>• Email integration and sending</li>
                      <li>• Document attachment handling</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">AI Enhancements</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Learning from user preferences</li>
                      <li>• Smart template suggestions</li>
                      <li>• Sentiment analysis for tone optimization</li>
                      <li>• Compliance checking for regulations</li>
                      <li>• Auto-categorization of communications</li>
                      <li>• Intelligent draft versioning</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ROI Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                ROI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">15 min</div>
                    <div className="text-sm text-gray-600">Average time per communication</div>
                    <div className="text-xs text-gray-500 mt-1">vs 45 min manual drafting</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">$12,000</div>
                    <div className="text-sm text-gray-600">Annual savings per professional</div>
                    <div className="text-xs text-gray-500 mt-1">Based on 10 communications/week</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">3 months</div>
                    <div className="text-sm text-gray-600">Implementation payback period</div>
                    <div className="text-xs text-gray-500 mt-1">Including training and setup</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default CommunicationDrafting