"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  Users, 
  Target, 
  Brain,
  Zap,
  FileText,
  TrendingUp,
  Database,
  Building,
  UserCheck,
  Layers,
  Shield,
  ChevronDown,
  X,
  Eye
} from 'lucide-react'
import AutomationChart from '@/components/ui/automation-chart'
import * as Collapsible from '@radix-ui/react-collapsible'

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
    { id: 'problem-identification', title: 'Problem Identification' },
    { id: 'user-analysis', title: 'User Analysis' },
    { id: 'mvp-strategy', title: 'Development Strategy' },
    { id: 'enterprise-rollout', title: 'Enterprise Scale Rollout' }
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
    <div className={`${className} bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg p-4 max-h-[calc(100vh-4rem)] overflow-y-auto shadow-lg`}>
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <FileText className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">On this page</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Navigate approach sections</p>
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

interface UserPersona {
  title: string
  description: string
  painPoints: string[]
  currentProcess: string
  icon: React.ReactNode
  color: string
}

interface MVPFeature {
  title: string
  description: string
  priority: string
  timeframe: string
  icon: React.ReactNode
}



interface TaskDetail {
  id: string
  title: string
  description: string
  user: string
  userJourney: string[]
  department: string
  frequency: string
  aiClassification: string
}

export default function ProblemIdentificationPage() {


  const userPersonas: UserPersona[] = [
    {
      title: "Tax Compliance Manager",
      description: "Senior professional responsible for ensuring regulatory compliance across multiple jurisdictions",
      painPoints: [
        "Manually tracking regulatory changes across 15+ jurisdictions",
        "3-4 hours daily spent on compliance status reporting",
        "Risk of missing critical deadline notifications",
        "Difficulty prioritizing conflicting compliance requirements"
      ],
      currentProcess: "Email alerts + manual spreadsheet tracking + quarterly reviews",
      icon: <Shield className="w-5 h-5" />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Tax Research Analyst",
      description: "Junior to mid-level professional conducting detailed tax research and analysis",
      painPoints: [
        "5-8 hours per research question across multiple sources",
        "Inconsistent access to current regulatory guidance",
        "Manual document review and cross-referencing",
        "Difficulty validating research completeness"
      ],
      currentProcess: "Multiple database searches + manual document review + senior validation",
      icon: <FileText className="w-5 h-5" />,
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Banking Operations Director",
      description: "Executive overseeing tax operations and looking for efficiency improvements",
      painPoints: [
        "Limited visibility into team productivity metrics",
        "High cost per research hour ($150-300/hr)",
        "Difficulty scaling expertise across regions",
        "Inconsistent quality in research outputs"
      ],
      currentProcess: "Monthly team reviews + client billing analysis + manual quality checks",
      icon: <Building className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600"
    }
  ]

  const mvpFeatures: MVPFeature[] = [
    {
      title: "AI-Powered Tax Research Engine",
      description: "Natural language search across federal tax authorities with intelligent results ranking",
      priority: "P0 - Core",
      timeframe: "Month 1-2",
      icon: <Brain className="w-5 h-5" />
    },
    {
      title: "Document Processing Pipeline",
      description: "Automated ingestion and indexing of PDF tax documents with text extraction",
      priority: "P0 - Core", 
      timeframe: "Month 1-2",
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: "Professional Dashboard",
      description: "Clean interface for tax professionals to conduct research and review results",
      priority: "P0 - Core",
      timeframe: "Month 2-3",
      icon: <UserCheck className="w-5 h-5" />
    },
    {
      title: "Basic Analytics & Tracking",
      description: "Simple metrics on search patterns, time saved, and user engagement",
      priority: "P1 - Important",
      timeframe: "Month 3",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      title: "Team Collaboration Features",
      description: "Shared research projects and annotation capabilities for team workflows",
      priority: "P2 - Nice to Have",
      timeframe: "Month 4+",
      icon: <Users className="w-5 h-5" />
    }
  ]



  const taskDetails: TaskDetail[] = [
    {
      id: "01",
      title: "Daily cash position reconciliation and tax allocation reporting",
      description: "Reconcile daily cash positions across all accounts and allocate tax implications for various financial instruments and transactions. This involves analyzing cash flows, identifying tax-sensitive items, and preparing reports for management review.",
      user: "Tax Operations Analyst",
      userJourney: [
        "Retrieve daily cash position data from treasury systems",
        "Identify tax-sensitive transactions and instruments",
        "Calculate tax allocations based on current regulations",
        "Prepare reconciliation reports for management review",
        "Submit final reports to accounting and compliance teams"
      ],
      department: "Operations",
      frequency: "Daily",
      aiClassification: "Transformation"
    },
    {
      id: "02",
      title: "State and local tax filing preparation and submission",
      description: "Prepare and submit state and local tax returns across multiple jurisdictions. This includes gathering supporting documentation, calculating tax liabilities, and ensuring compliance with varying state regulations.",
      user: "State Tax Specialist",
      userJourney: [
        "Review state tax filing requirements and deadlines",
        "Gather supporting documentation and financial data",
        "Calculate state tax liabilities using tax software",
        "Prepare state tax returns and supporting schedules",
        "Submit returns electronically and maintain filing records"
      ],
      department: "Compliance",
      frequency: "Monthly",
      aiClassification: "Content Generation"
    },
    {
      id: "03",
      title: "Federal tax provision calculations and journal entry preparation",
      description: "Calculate federal tax provisions for financial reporting and prepare corresponding journal entries. This involves analyzing temporary and permanent differences between book and tax accounting.",
      user: "Tax Accountant",
      userJourney: [
        "Review financial statements and identify book-tax differences",
        "Calculate deferred tax assets and liabilities",
        "Determine current and deferred tax provisions",
        "Prepare journal entries for tax provisions",
        "Document calculations and maintain supporting workpapers"
      ],
      department: "Accounting",
      frequency: "Monthly",
      aiClassification: "Transformation"
    },
    {
      id: "04",
      title: "Quarterly estimated tax payment calculations and remittance",
      description: "Calculate quarterly estimated tax payments based on projected annual income and ensure timely remittance to tax authorities. This helps avoid penalties and ensures proper cash flow management.",
      user: "Tax Manager",
      userJourney: [
        "Review year-to-date financial results and projections",
        "Calculate estimated tax liability for the quarter",
        "Determine required estimated tax payment amount",
        "Prepare payment documentation and authorization",
        "Submit payment and maintain payment records"
      ],
      department: "Treasury",
      frequency: "Quarterly",
      aiClassification: "Transformation"
    },
    {
      id: "05",
      title: "Regulatory capital tax adjustment calculations (Basel III)",
      description: "Calculate tax adjustments required for regulatory capital reporting under Basel III requirements. This involves analyzing the tax impact on capital ratios and ensuring compliance with banking regulations.",
      user: "Regulatory Reporting Specialist",
      userJourney: [
        "Review regulatory capital calculations and requirements",
        "Identify tax adjustments needed for Basel III compliance",
        "Calculate tax impact on capital ratios",
        "Prepare adjustment documentation and workpapers",
        "Submit adjusted calculations to regulatory authorities"
      ],
      department: "Risk",
      frequency: "Monthly",
      aiClassification: "Transformation"
    },
    {
      id: "06",
      title: "Transfer pricing documentation review and update",
      description: "Review and update transfer pricing documentation to ensure compliance with international tax regulations and maintain proper documentation for intercompany transactions.",
      user: "International Tax Specialist",
      userJourney: [
        "Review existing transfer pricing documentation",
        "Analyze intercompany transactions and pricing",
        "Update documentation with current year data",
        "Ensure compliance with OECD guidelines",
        "Prepare documentation for tax authority review"
      ],
      department: "Tax",
      frequency: "Annual",
      aiClassification: "Content Generation"
    },
    {
      id: "07",
      title: "Municipal bond interest income tax exemption tracking",
      description: "Track and monitor municipal bond interest income to ensure proper tax exemption treatment and compliance with state and federal regulations.",
      user: "Fixed Income Analyst",
      userJourney: [
        "Monitor municipal bond portfolio holdings",
        "Track interest income from municipal bonds",
        "Verify tax-exempt status of bond issuers",
        "Calculate tax-exempt income amounts",
        "Report tax-exempt income for tax filings"
      ],
      department: "Operations",
      frequency: "Daily",
      aiClassification: "Classification"
    },
    {
      id: "08",
      title: "Foreign tax credit limitation calculations and optimization",
      description: "Calculate foreign tax credit limitations and optimize credit utilization to minimize double taxation while maximizing tax efficiency.",
      user: "International Tax Manager",
      userJourney: [
        "Review foreign income and taxes paid",
        "Calculate foreign tax credit limitations",
        "Analyze credit utilization opportunities",
        "Optimize credit allocation across categories",
        "Prepare foreign tax credit documentation"
      ],
      department: "Tax",
      frequency: "Quarterly",
      aiClassification: "Transformation"
    },
    {
      id: "09",
      title: "Intercompany transaction tax implications analysis",
      description: "Analyze tax implications of intercompany transactions and ensure proper transfer pricing and documentation for tax compliance.",
      user: "Transfer Pricing Specialist",
      userJourney: [
        "Review intercompany transaction documentation",
        "Analyze tax implications of transactions",
        "Ensure proper transfer pricing methodology",
        "Prepare supporting documentation",
        "Monitor compliance with tax regulations"
      ],
      department: "Tax",
      frequency: "Weekly",
      aiClassification: "Reasoning"
    },
    {
      id: "10",
      title: "FDIC premium tax deduction calculations and reporting",
      description: "Calculate FDIC premium tax deductions and prepare required reporting for federal tax compliance and regulatory requirements.",
      user: "Regulatory Tax Specialist",
      userJourney: [
        "Review FDIC premium payments and calculations",
        "Calculate allowable tax deductions",
        "Prepare deduction documentation",
        "Submit required regulatory reports",
        "Maintain compliance records"
      ],
      department: "Compliance",
      frequency: "Quarterly",
      aiClassification: "Transformation"
    },
    {
      id: "11",
      title: "State tax nexus monitoring and filing requirement assessment",
      description: "Monitor state tax nexus requirements and assess filing obligations across multiple jurisdictions to ensure compliance with state tax laws.",
      user: "State Tax Manager",
      userJourney: [
        "Review business activities in each state",
        "Analyze nexus thresholds and requirements",
        "Assess filing obligations and deadlines",
        "Update compliance tracking systems",
        "Prepare nexus analysis reports"
      ],
      department: "Compliance",
      frequency: "Monthly",
      aiClassification: "Classification"
    },
    {
      id: "12",
      title: "Loan loss provision tax vs. book difference reconciliation",
      description: "Reconcile differences between tax and book loan loss provisions and prepare supporting documentation for tax compliance.",
      user: "Tax Accountant",
      userJourney: [
        "Review loan loss provision calculations",
        "Identify book vs. tax differences",
        "Calculate tax adjustments required",
        "Prepare reconciliation workpapers",
        "Document supporting calculations"
      ],
      department: "Accounting",
      frequency: "Monthly",
      aiClassification: "Transformation"
    },
    {
      id: "13",
      title: "Securities gain/loss tax characterization and reporting",
      description: "Characterize securities gains and losses for tax purposes and prepare required reporting for tax compliance.",
      user: "Securities Tax Specialist",
      userJourney: [
        "Review securities transactions and dispositions",
        "Characterize gains/losses as capital or ordinary",
        "Calculate holding periods and tax implications",
        "Prepare tax reporting documentation",
        "Submit required tax forms and schedules"
      ],
      department: "Operations",
      frequency: "Daily",
      aiClassification: "Classification"
    },
    {
      id: "14",
      title: "Tax-exempt entity relationship compliance monitoring",
      description: "Monitor compliance with tax-exempt entity relationship requirements and ensure proper documentation and reporting.",
      user: "Compliance Specialist",
      userJourney: [
        "Review tax-exempt entity relationships",
        "Monitor compliance requirements",
        "Update documentation and records",
        "Prepare compliance reports",
        "Maintain audit trail for relationships"
      ],
      department: "Compliance",
      frequency: "Ongoing",
      aiClassification: "Classification"
    },
    {
      id: "15",
      title: "Branch vs. subsidiary tax election impact analysis",
      description: "Analyze the tax implications of branch vs. subsidiary structures and evaluate optimal tax election strategies.",
      user: "International Tax Manager",
      userJourney: [
        "Review current entity structure",
        "Analyze branch vs. subsidiary implications",
        "Evaluate tax election options",
        "Calculate tax impact of different structures",
        "Prepare recommendation reports"
      ],
      department: "Tax",
      frequency: "Quarterly",
      aiClassification: "Reasoning"
    },
    {
      id: "16",
      title: "Deferred tax asset/liability calculation and tracking",
      description: "Calculate and track deferred tax assets and liabilities for financial reporting and tax planning purposes.",
      user: "Tax Accountant",
      userJourney: [
        "Review temporary differences between book and tax",
        "Calculate deferred tax assets and liabilities",
        "Assess realizability of deferred tax assets",
        "Update tracking systems and records",
        "Prepare deferred tax reporting"
      ],
      department: "Accounting",
      frequency: "Monthly",
      aiClassification: "Transformation"
    },
    {
      id: "17",
      title: "Research and development tax credit calculation and documentation",
      description: "Calculate research and development tax credits and prepare required documentation for tax compliance.",
      user: "R&D Tax Specialist",
      userJourney: [
        "Review R&D activities and expenditures",
        "Calculate qualified research expenses",
        "Determine applicable tax credit amounts",
        "Prepare supporting documentation",
        "Submit tax credit claims and forms"
      ],
      department: "Tax",
      frequency: "Annual",
      aiClassification: "Transformation"
    },
    {
      id: "18",
      title: "Alternative minimum tax calculation and planning",
      description: "Calculate alternative minimum tax and develop strategies to minimize AMT impact through tax planning.",
      user: "Tax Manager",
      userJourney: [
        "Review regular tax calculations",
        "Calculate alternative minimum tax",
        "Identify AMT preference items",
        "Develop tax planning strategies",
        "Prepare AMT analysis and recommendations"
      ],
      department: "Tax",
      frequency: "Quarterly",
      aiClassification: "Transformation"
    },
    {
      id: "19",
      title: "Tax basis tracking and calculation for investments",
      description: "Track and calculate tax basis for various investment positions and ensure accurate gain/loss calculations.",
      user: "Investment Tax Specialist",
      userJourney: [
        "Track investment purchases and sales",
        "Calculate tax basis adjustments",
        "Monitor wash sale rules and limitations",
        "Update basis tracking systems",
        "Prepare basis calculation reports"
      ],
      department: "Operations",
      frequency: "Daily",
      aiClassification: "Transformation"
    },
    {
      id: "20",
      title: "Tax return review and quality assurance",
      description: "Review completed tax returns for accuracy and completeness and perform quality assurance procedures.",
      user: "Tax Manager",
      userJourney: [
        "Review completed tax return calculations",
        "Verify supporting documentation",
        "Check for completeness and accuracy",
        "Perform quality assurance procedures",
        "Approve final tax returns for filing"
      ],
      department: "Tax",
      frequency: "Monthly",
      aiClassification: "Classification"
    },
    {
      id: "21",
      title: "Tax audit support and documentation preparation",
      description: "Prepare documentation and provide support for tax audits, including responding to information requests and defending tax positions.",
      user: "Tax Manager",
      userJourney: [
        "Review audit requests and requirements",
        "Gather and organize supporting documentation",
        "Prepare responses to information requests",
        "Coordinate with audit team and management",
        "Maintain audit file and correspondence"
      ],
      department: "Tax",
      frequency: "As needed",
      aiClassification: "Content Generation"
    },
    {
      id: "22",
      title: "Tax law change impact analysis and implementation",
      description: "Analyze the impact of new tax laws and regulations and implement necessary changes to tax processes and systems.",
      user: "Tax Policy Specialist",
      userJourney: [
        "Monitor new tax legislation and regulations",
        "Analyze impact on current tax positions",
        "Develop implementation strategies",
        "Update tax processes and systems",
        "Train staff on new requirements"
      ],
      department: "Tax",
      frequency: "As needed",
      aiClassification: "Reasoning"
    },
    {
      id: "23",
      title: "Tax calendar management and deadline tracking",
      description: "Manage tax calendar and track important deadlines for filings, payments, and compliance requirements.",
      user: "Tax Coordinator",
      userJourney: [
        "Maintain comprehensive tax calendar",
        "Track filing and payment deadlines",
        "Send reminder notifications to team",
        "Update calendar with new requirements",
        "Coordinate with external advisors"
      ],
      department: "Operations",
      frequency: "Daily",
      aiClassification: "Classification"
    },
    {
      id: "24",
      title: "Tax software maintenance and updates",
      description: "Maintain and update tax software systems, including data validation, system testing, and user training.",
      user: "Tax Systems Specialist",
      userJourney: [
        "Monitor tax software updates and patches",
        "Test system functionality and accuracy",
        "Validate data integrity and calculations",
        "Train users on new features",
        "Maintain system documentation"
      ],
      department: "Operations",
      frequency: "Monthly",
      aiClassification: "Transformation"
    },
    {
      id: "25",
      title: "Tax data validation and quality control",
      description: "Validate tax data for accuracy and completeness and perform quality control procedures to ensure data integrity.",
      user: "Tax Data Analyst",
      userJourney: [
        "Review source data for completeness",
        "Validate calculations and formulas",
        "Perform quality control checks",
        "Identify and resolve data issues",
        "Document validation procedures"
      ],
      department: "Operations",
      frequency: "Weekly",
      aiClassification: "Classification"
    },
    {
      id: "26",
      title: "Tax reporting automation and process improvement",
      description: "Develop and implement automated tax reporting processes to improve efficiency and reduce manual errors.",
      user: "Tax Process Specialist",
      userJourney: [
        "Analyze current reporting processes",
        "Identify automation opportunities",
        "Design automated workflows",
        "Test and validate new processes",
        "Implement and monitor improvements"
      ],
      department: "Operations",
      frequency: "Ongoing",
      aiClassification: "Transformation"
    },
    {
      id: "27",
      title: "Tax risk assessment and mitigation planning",
      description: "Assess tax risks and develop mitigation strategies to minimize exposure and ensure compliance.",
      user: "Tax Risk Manager",
      userJourney: [
        "Identify potential tax risks and exposures",
        "Assess likelihood and impact of risks",
        "Develop risk mitigation strategies",
        "Monitor risk indicators and trends",
        "Prepare risk assessment reports"
      ],
      department: "Risk",
      frequency: "Quarterly",
      aiClassification: "Reasoning"
    },
    {
      id: "28",
      title: "Tax training and knowledge management",
      description: "Develop and deliver tax training programs and maintain knowledge management systems for tax team.",
      user: "Tax Training Specialist",
      userJourney: [
        "Assess training needs and requirements",
        "Develop training materials and programs",
        "Deliver training sessions to staff",
        "Maintain knowledge management systems",
        "Evaluate training effectiveness"
      ],
      department: "Operations",
      frequency: "Monthly",
      aiClassification: "Content Generation"
    },
    {
      id: "29",
      title: "Tax document management and archiving",
      description: "Manage tax document storage, organization, and archiving to ensure compliance with retention requirements.",
      user: "Tax Document Specialist",
      userJourney: [
        "Organize and categorize tax documents",
        "Implement document retention policies",
        "Maintain secure document storage",
        "Archive documents according to schedule",
        "Ensure compliance with retention requirements"
      ],
      department: "Operations",
      frequency: "Weekly",
      aiClassification: "Classification"
    },
    {
      id: "30",
      title: "Tax communication and stakeholder management",
      description: "Manage communication with tax stakeholders including management, auditors, and regulatory authorities.",
      user: "Tax Communications Manager",
      userJourney: [
        "Prepare tax communications and reports",
        "Coordinate with internal stakeholders",
        "Manage external communications",
        "Maintain communication records",
        "Ensure timely and accurate reporting"
      ],
      department: "Operations",
      frequency: "Weekly",
      aiClassification: "Content Generation"
    },
    {
      id: "31",
      title: "Tax technology evaluation and implementation",
      description: "Evaluate new tax technologies and implement solutions to improve efficiency and accuracy.",
      user: "Tax Technology Manager",
      userJourney: [
        "Research new tax technology solutions",
        "Evaluate potential benefits and costs",
        "Develop implementation plans",
        "Coordinate system integration",
        "Monitor performance and ROI"
      ],
      department: "Operations",
      frequency: "Quarterly",
      aiClassification: "Reasoning"
    },
    {
      id: "32",
      title: "Tax compliance monitoring and reporting",
      description: "Monitor tax compliance across all jurisdictions and prepare comprehensive compliance reports.",
      user: "Tax Compliance Manager",
      userJourney: [
        "Monitor compliance across jurisdictions",
        "Track filing and payment status",
        "Identify compliance issues and risks",
        "Prepare compliance reports",
        "Coordinate remediation efforts"
      ],
      department: "Compliance",
      frequency: "Monthly",
      aiClassification: "Classification"
    },
    {
      id: "33",
      title: "Tax strategy development and planning",
      description: "Develop comprehensive tax strategies and planning initiatives to optimize tax position and minimize liabilities.",
      user: "Tax Strategy Director",
      userJourney: [
        "Analyze current tax position and opportunities",
        "Develop strategic tax planning initiatives",
        "Evaluate alternative tax strategies",
        "Prepare strategy recommendations",
        "Monitor implementation and results"
      ],
      department: "Tax",
      frequency: "Quarterly",
      aiClassification: "Reasoning"
    }
  ]

  const [selectedTask, setSelectedTask] = useState<TaskDetail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openTaskModal = (task: TaskDetail) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const closeTaskModal = () => {
    setIsModalOpen(false)
    setSelectedTask(null)
  }

  // Scroll to top on mount
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      {/* Page Header */}
      <div className="py-8 px-4">
        <div className="max-w-6xl space-y-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-blue-300">
            Approach
          </h1>
          <p className="text-base text-black dark:text-gray-300">
            Comprehensive Problem Analysis & Solution Strategy
          </p>
        </div>
      </div>


      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-6xl xl:mr-80 space-y-12">
          
          {/* Problem Identification Section */}
          <section id="problem-identification" className="space-y-6 scroll-mt-32">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Problem Identification
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Research Analysis & Automation Opportunities
              </p>
            </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Comprehensive Day-to-Day Tax Function Research
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      I did a deep dive into tax operations, through web research and talking to my colleagues who work in tax and analyzing workflows to understand 
                      their daily tasks. Through this research, I identified and catalogued <strong>30+ specific day-to-day activities </strong> 
                      performed across tax departments, ranging from routine data processing to complex analytical work. The comprehensive analysis 
                      below maps each task by volume and complexity to determine the optimal automation approach - whether traditional rule-based 
                      automation or AI-powered solutions.
                    </p>

                    {/* Collapsible Research Methodology */}
                    <Collapsible.Root>
                      <div className="bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 rounded-lg mb-12">
                        <Collapsible.Trigger asChild>
                          <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors rounded-t-lg">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                Research Methodology
                              </h4>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-500 transition-transform ui-state-open:rotate-180" />
                          </button>
                        </Collapsible.Trigger>
                        
                        <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                          <div className="border-t border-gray-200/50 p-4">
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-300">
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Workflow Analysis</h5>
                                <p>Documented several day-to-day tax tasks</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">User Interviews</h5>
                                <p>Spoke with my colleagues who work in tax</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Market Research</h5>
                                <p>Conducted research on the market for tax automation tools and services</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Volume & Complexity Scoring</h5>
                                <p>Quantified each task in terms of volume and complexity</p>
                              </div>
                            </div>
                          </div>
                        </Collapsible.Content>
                      </div>
                    </Collapsible.Root>

                    {/* User Analysis Section */}
                    <section id="user-analysis" className="space-y-6 scroll-mt-32 mb-12">
                      <Collapsible.Root>
                        <div className="bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 rounded-lg">
                          <Collapsible.Trigger asChild>
                            <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors rounded-t-lg">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                  User Analysis
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  Understanding Our Users & Their Pain Points
                                </p>
                              </div>
                              <ChevronDown className="w-4 h-4 text-gray-500 transition-transform ui-state-open:rotate-180" />
                            </button>
                          </Collapsible.Trigger>
                          
                          <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                            <div className="border-t border-gray-200/50 p-4">
                              <div className="space-y-6">
                                {userPersonas.map((persona, index) => (
                                  <motion.div
                                    key={persona.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="space-y-4"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className={`p-3 bg-gradient-to-r ${persona.color} rounded-lg text-white`}>
                                        {persona.icon}
                                      </div>
                                      <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{persona.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{persona.description}</p>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                                          <CheckCircle className="w-4 h-4 text-red-500" />
                                          Current Pain Points
                                        </h4>
                                        <ul className="space-y-1">
                                          {persona.painPoints.map((pain, i) => (
                                            <li key={i} className="text-gray-600 dark:text-gray-300 text-sm ml-6">
                                              • {pain}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                                        <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1 text-sm">Current Process:</h5>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{persona.currentProcess}</p>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </Collapsible.Content>
                        </div>
                      </Collapsible.Root>
                    </section>

                    {/* Collapsible Raw Task List */}
                    <Collapsible.Root>
                      <div className="bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 rounded-lg mb-12">
                        <Collapsible.Trigger asChild>
                          <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors rounded-t-lg">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                List of Day-to-Day Tax Tasks
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                33 tasks identified
                              </Badge>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-500 transition-transform ui-state-open:rotate-180" />
                          </button>
                        </Collapsible.Trigger>
                        
                        <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                          <div className="border-t border-gray-200/50 p-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              Below is the list of tax activities I documented through my research and conversations with tax professionals. 
                              This raw data formed the foundation for the volume/complexity analysis and automation opportunity identification.
                            </p>
                            
                            <div className="max-h-80 overflow-y-auto border border-gray-200/50 rounded-lg">
                              <table className="w-full text-sm">
                                <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800 border-b border-gray-200/50">
                                  <tr>
                                    <th className="text-xs font-medium text-gray-600 dark:text-gray-300 px-3 py-2 text-left w-12">#</th>
                                    <th className="text-xs font-medium text-gray-600 dark:text-gray-300 px-3 py-2 text-left">Task Description</th>
                                    <th className="text-xs font-medium text-gray-600 dark:text-gray-300 px-3 py-2 text-left w-24">Department</th>
                                    <th className="text-xs font-medium text-gray-600 dark:text-gray-300 px-3 py-2 text-left w-20">Frequency</th>
                                    <th className="text-xs font-medium text-gray-600 dark:text-gray-300 px-3 py-2 text-left w-12"></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50 cursor-pointer group" onClick={() => openTaskModal(taskDetails[0])}>
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">01</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Daily cash position reconciliation and tax allocation reporting</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Operations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Daily</td>
                                    <td className="px-3 py-2">
                                      <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
                                    </td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50 cursor-pointer group" onClick={() => openTaskModal(taskDetails[1])}>
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">02</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">State and local tax filing preparation and submission</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Compliance</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Monthly</td>
                                    <td className="px-3 py-2">
                                      <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
                                    </td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50 cursor-pointer group" onClick={() => openTaskModal(taskDetails[2])}>
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">03</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Federal tax provision calculations and journal entry preparation</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Accounting</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Monthly</td>
                                    <td className="px-3 py-2">
                                      <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
                                    </td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50 cursor-pointer group" onClick={() => openTaskModal(taskDetails[3])}>
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">04</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Quarterly estimated tax payment calculations and remittance</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Treasury</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Quarterly</td>
                                    <td className="px-3 py-2">
                                      <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
                                    </td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50 cursor-pointer group" onClick={() => openTaskModal(taskDetails[4])}>
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">05</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Regulatory capital tax adjustment calculations (Basel III)</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Risk</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Monthly</td>
                                    <td className="px-3 py-2">
                                      <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
                                    </td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50 cursor-pointer group" onClick={() => openTaskModal(taskDetails[5])}>
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">06</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Transfer pricing documentation review and update</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Annual</td>
                                    <td className="px-3 py-2">
                                      <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
                                    </td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50 cursor-pointer group" onClick={() => openTaskModal(taskDetails[6])}>
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">07</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Municipal bond interest income tax exemption tracking</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Operations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Daily</td>
                                    <td className="px-3 py-2">
                                      <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
                                    </td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50 cursor-pointer group" onClick={() => openTaskModal(taskDetails[7])}>
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">08</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Foreign tax credit limitation calculations and optimization</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Quarterly</td>
                                    <td className="px-3 py-2">
                                      <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
                                    </td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50 cursor-pointer group" onClick={() => openTaskModal(taskDetails[8])}>
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">09</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Intercompany transaction tax implications analysis</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Weekly</td>
                                    <td className="px-3 py-2">
                                      <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
                                    </td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50 cursor-pointer group" onClick={() => openTaskModal(taskDetails[9])}>
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">10</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FDIC premium tax deduction calculations and reporting</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Compliance</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Quarterly</td>
                                    <td className="px-3 py-2">
                                      <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
                                    </td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">11</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">State tax nexus monitoring and filing requirement assessment</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Compliance</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Monthly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">12</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Loan loss provision tax vs. book difference reconciliation</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Accounting</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Monthly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">13</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Securities gain/loss tax characterization and reporting</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Operations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Daily</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">14</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Tax-exempt entity relationship compliance monitoring</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Compliance</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Ongoing</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">15</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Branch vs. subsidiary tax election impact analysis</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Annual</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">16</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">State income tax apportionment factor calculations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Annual</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">17</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Federal excise tax compliance on financial services</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Compliance</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Monthly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">18</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Derivative instrument tax characterization and reporting</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Operations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Daily</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">19</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Tax audit response preparation and documentation</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Ad-hoc</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">20</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Cross-border transaction withholding tax compliance</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Operations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Daily</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">21</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Alternative Minimum Tax (AMT) preference item tracking</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Annual</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">22</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">State tax credit utilization optimization and planning</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Quarterly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">23</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">REIT qualification testing and distribution requirements</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Quarterly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">24</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Financial institution specific deduction calculations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Annual</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">25</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Consolidated return elimination adjustment preparation</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Annual</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">26</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">State tax legislative change impact assessment</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Ongoing</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">27</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Tax accounting method change requests and filings</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Annual</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">28</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Multi-state tax compliance workflow coordination</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Operations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Monthly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">29</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Ensuring consistency across multiple tax jurisdictions</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Ongoing</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">30</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Rapidly analyzing vast amounts of tax literature and case law</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Ad-hoc</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">31</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Identifying relevant precedents and regulations more efficiently</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Weekly</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 border-b border-gray-100/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">32</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Providing clients with instant answers to common tax queries</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Operations</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Daily</td>
                                  </tr>
                                  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50">
                                    <td className="font-mono text-xs text-gray-500 px-3 py-2">33</td>
                                    <td className="text-xs text-gray-700 dark:text-gray-300 px-3 py-2">Allowing for rapid scenario modeling and tax impact assessments</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Tax</td>
                                    <td className="text-xs text-gray-600 dark:text-gray-400 px-3 py-2">Weekly</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            
                            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg p-3">
                            </div>
                          </div>
                        </Collapsible.Content>
                      </div>
                    </Collapsible.Root>
                  </div>
                  {/* Collapsible Tax Automation Opportunities Chart */}
                  <Collapsible.Root>
                    <div className="bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 rounded-lg mb-12">
                      <Collapsible.Trigger asChild>
                        <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors rounded-t-lg">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                              Tax Automation Opportunities Analysis
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              Value vs Risk Chart
                            </Badge>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-500 transition-transform ui-state-open:rotate-180" />
                        </button>
                      </Collapsible.Trigger>
                      
                      <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                        <div className="border-t border-gray-200/50 p-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Interactive analysis showing the relationship between task volume and complexity, with strategic categorization 
                            into traditional automation vs. AI-powered solutions. Click any data point for detailed analysis.
                          </p>
                          <AutomationChart />
                        </div>
                      </Collapsible.Content>
                    </div>
                  </Collapsible.Root>


                </div>
          </section>



          {/* MVP Strategy Section */}
          <section id="mvp-strategy" className="space-y-6 scroll-mt-32 mb-12">
            <Collapsible.Root>
              <div className="bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 rounded-lg">
                <Collapsible.Trigger asChild>
                  <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors rounded-t-lg">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        Development Strategy
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Phased Approach to Product Development
                      </p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500 transition-transform ui-state-open:rotate-180" />
                  </button>
                </Collapsible.Trigger>
                
                <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  <div className="border-t border-gray-200/50 p-4">
                    <div className="space-y-6">
                      <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50 rounded-lg p-6">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          MVP Goal: Prove 75% Time Reduction in Tax Research
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Launch with 3 core features that deliver immediate value to tax professionals
                        </p>
                      </div>

                      <div className="grid gap-4">
                        {mvpFeatures.map((feature, index) => (
                          <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className={`border-l-4 ${
                              feature.priority === 'P0 - Core' ? 'border-l-green-500' :
                              feature.priority === 'P1 - Important' ? 'border-l-yellow-500' :
                              'border-l-gray-400'
                            } hover:shadow-md transition-all duration-200`}>
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-3 flex-1">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                      {feature.icon}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                        {feature.title}
                                      </h4>
                                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                        {feature.description}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <Badge 
                                      className={
                                        feature.priority === 'P0 - Core' ? 'bg-green-100 text-green-700' :
                                        feature.priority === 'P1 - Important' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-gray-100 text-gray-700'
                                      }
                                    >
                                      {feature.priority}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {feature.timeframe}
                                    </Badge>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Collapsible.Content>
              </div>
            </Collapsible.Root>
          </section>

          {/* Enterprise Scale Rollout Section */}
          <section id="enterprise-rollout" className="space-y-6 scroll-mt-32 mb-12">
            <Collapsible.Root>
              <div className="bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 rounded-lg">
                <Collapsible.Trigger asChild>
                  <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors rounded-t-lg">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        Enterprise Scale Rollout
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Strategic Deployment & Adoption Framework
                      </p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500 transition-transform ui-state-open:rotate-180" />
                  </button>
                </Collapsible.Trigger>
                <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  <div className="border-t border-gray-200/50 p-4">
                    <div className="space-y-6">
                      
                      {/* Rollout Strategy Overview */}
                      <div className="space-y-4">
                        <h5 className="font-semibold text-gray-900 dark:text-gray-100">
                          Multi-Phase Enterprise Deployment Strategy
                        </h5>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          Our enterprise rollout strategy focuses on systematic adoption, risk mitigation, and value demonstration across large-scale tax operations. The approach ensures smooth integration while maximizing ROI and user adoption.
                        </p>
                      </div>

                      {/* Rollout Phases */}
                      <div className="space-y-4">
                        <h5 className="font-semibold text-gray-900 dark:text-gray-100">
                          Phase 1: Foundation & Pilot (Months 1-3)
                        </h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h6 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Infrastructure Setup</h6>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              <li>• Deploy enterprise-grade infrastructure</li>
                              <li>• Implement security & compliance frameworks</li>
                              <li>• Establish data governance protocols</li>
                              <li>• Set up monitoring & analytics systems</li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h6 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Pilot Program</h6>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              <li>• Select 2-3 high-impact departments</li>
                              <li>• Train 50-100 power users</li>
                              <li>• Implement feedback collection system</li>
                              <li>• Measure initial ROI metrics</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h5 className="font-semibold text-gray-900 dark:text-gray-100">
                          Phase 2: Departmental Expansion (Months 4-8)
                        </h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h6 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Scaling Strategy</h6>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              <li>• Roll out to 5-8 additional departments</li>
                              <li>• Implement advanced features & integrations</li>
                              <li>• Establish center of excellence</li>
                              <li>• Develop internal training programs</li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h6 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Change Management</h6>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              <li>• Deploy change management framework</li>
                              <li>• Conduct leadership workshops</li>
                              <li>• Establish user communities</li>
                              <li>• Monitor adoption metrics</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h5 className="font-semibold text-gray-900 dark:text-gray-100">
                          Phase 3: Enterprise-Wide Deployment (Months 9-12)
                        </h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h6 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Full Scale Rollout</h6>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              <li>• Deploy across all tax departments</li>
                              <li>• Integrate with enterprise systems</li>
                              <li>• Implement advanced analytics</li>
                              <li>• Establish governance committees</li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h6 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Optimization</h6>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              <li>• Performance optimization & scaling</li>
                              <li>• Advanced feature deployment</li>
                              <li>• Continuous improvement programs</li>
                              <li>• ROI measurement & reporting</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Success Metrics */}
                      <div className="space-y-4">
                        <h5 className="font-semibold text-gray-900 dark:text-gray-100">
                          Success Metrics & KPIs
                        </h5>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                            <h6 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-2">Adoption Metrics</h6>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              <li>• 90%+ user adoption rate</li>
                              <li>• 70%+ daily active users</li>
                              <li>• 50%+ feature utilization</li>
                              <li>• 95%+ user satisfaction score</li>
                            </ul>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                            <h6 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-2">Efficiency Gains</h6>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              <li>• 60%+ time savings on tasks</li>
                              <li>• 40%+ reduction in errors</li>
                              <li>• 30%+ faster processing</li>
                              <li>• 25%+ cost reduction</li>
                            </ul>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                            <h6 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-2">Business Impact</h6>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              <li>• 3x ROI within 12 months</li>
                              <li>• 50%+ compliance improvement</li>
                              <li>• 35%+ productivity increase</li>
                              <li>• 90%+ audit readiness</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Risk Mitigation */}
                      <div className="space-y-4">
                        <h5 className="font-semibold text-gray-900 dark:text-gray-100">
                          Risk Mitigation & Governance
                        </h5>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h6 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Technical Risks</h6>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              <li>• Comprehensive testing protocols</li>
                              <li>• Rollback procedures & backup systems</li>
                              <li>• Performance monitoring & alerting</li>
                              <li>• Security audits & penetration testing</li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h6 className="font-medium text-gray-900 dark:text-gray-100 text-sm">Organizational Risks</h6>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                              <li>• Executive sponsorship & change champions</li>
                              <li>• Comprehensive training programs</li>
                              <li>• Clear communication strategies</li>
                              <li>• Regular feedback & iteration cycles</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </Collapsible.Content>
              </div>
            </Collapsible.Root>
          </section>

        </div>
      </main>
      
      {/* Fixed On This Page Sidebar */}
      <OnThisPageSidebar className="fixed top-8 right-8 z-50 w-64 hidden xl:block" />

      {/* Task Detail Modal */}
      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Task #{selectedTask.id}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedTask.department} • {selectedTask.frequency}
                  </p>
                </div>
                <button
                  onClick={closeTaskModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {selectedTask.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {selectedTask.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                      Primary User
                    </h5>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {selectedTask.user}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                      Department
                    </h5>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {selectedTask.department}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                      AI Classification
                    </h5>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {selectedTask.aiClassification}
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                    User Journey ({selectedTask.userJourney.length} steps)
                  </h5>
                  <div className="space-y-2">
                    {selectedTask.userJourney.map((step, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex-shrink-0 w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 