import { supabase } from './supabase'

export interface AutomationOpportunity {
  id: string
  name: string
  volume: number
  complexity: number
  category: 'high-priority' | 'medium-priority' | 'low-priority'
  description: string
  solution_type: 'ai' | 'automation'
  solution_reasoning: string
  created_at?: string
  updated_at?: string
}

export interface TaxSolution {
  id: string
  name: string
  type: 'automation' | 'ai'
  category: 'rule-based' | 'predictable' | 'research' | 'expert-interface'
  reasoning: string
  description: string
  key_features: string[]
  business_value: string
  created_at?: string
  updated_at?: string
}

export async function getAutomationOpportunities(): Promise<AutomationOpportunity[]> {
  try {
    const { data, error } = await supabase
      .from('automation_opportunities')
      .select('*')
      .order('volume', { ascending: false })

    if (error) {
      console.error('Error fetching automation opportunities:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getAutomationOpportunities:', error)
    return []
  }
}

export async function getTaxSolutions(): Promise<TaxSolution[]> {
  try {
    const { data, error } = await supabase
      .from('tax_solutions')
      .select('*')
      .order('type', { ascending: true })

    if (error) {
      console.error('Error fetching tax solutions:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getTaxSolutions:', error)
    return []
  }
}

export async function getAutomationSolutions(): Promise<TaxSolution[]> {
  try {
    const { data, error } = await supabase
      .from('tax_solutions')
      .select('*')
      .eq('type', 'automation')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching automation solutions:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getAutomationSolutions:', error)
    return []
  }
}

export async function getAISolutions(): Promise<TaxSolution[]> {
  try {
    const { data, error } = await supabase
      .from('tax_solutions')
      .select('*')
      .eq('type', 'ai')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching AI solutions:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getAISolutions:', error)
    return []
  }
}

// Optional: Functions to add new data
export async function addAutomationOpportunity(opportunity: Omit<AutomationOpportunity, 'id' | 'created_at' | 'updated_at'>): Promise<AutomationOpportunity | null> {
  try {
    const { data, error } = await supabase
      .from('automation_opportunities')
      .insert([opportunity])
      .select()
      .single()

    if (error) {
      console.error('Error adding automation opportunity:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in addAutomationOpportunity:', error)
    return null
  }
}

export async function addTaxSolution(solution: Omit<TaxSolution, 'id' | 'created_at' | 'updated_at'>): Promise<TaxSolution | null> {
  try {
    const { data, error } = await supabase
      .from('tax_solutions')
      .insert([solution])
      .select()
      .single()

    if (error) {
      console.error('Error adding tax solution:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in addTaxSolution:', error)
    return null
  }
}

// Add AI Document Search opportunity
export async function addAIDocumentSearchOpportunity(): Promise<AutomationOpportunity | null> {
  const opportunity: Omit<AutomationOpportunity, 'id' | 'created_at' | 'updated_at'> = {
    name: 'AI Document Search',
    volume: 85, // High value/time savings
    complexity: 25, // Low complexity/risk
    category: 'high-priority',
    description: 'AI-powered search and retrieval across tax documents, regulations, and case law for rapid information access.',
    solution_type: 'ai',
    solution_reasoning: 'Natural language processing enables intuitive search queries while vector embeddings provide accurate semantic matching across large document repositories.'
  }

  return await addAutomationOpportunity(opportunity)
}

// Add Tax Trends Market Research opportunity
export async function addTaxTrendsMarketResearchOpportunity(): Promise<AutomationOpportunity | null> {
  const opportunity: Omit<AutomationOpportunity, 'id' | 'created_at' | 'updated_at'> = {
    name: 'Tax Trends Market Research',
    volume: 88, // Very high value/time savings
    complexity: 20, // Very low complexity/risk
    category: 'high-priority',
    description: 'AI-powered analysis of tax trends, market developments, and regulatory changes to provide strategic insights for tax planning and compliance.',
    solution_type: 'ai',
    solution_reasoning: 'Natural language processing and data analysis capabilities enable automated monitoring of tax trends, regulatory updates, and market developments across multiple sources, providing valuable strategic insights with minimal manual effort.'
  }

  return await addAutomationOpportunity(opportunity)
}

// Add Communication Drafting opportunity
export async function addCommunicationDraftingOpportunity(): Promise<AutomationOpportunity | null> {
  const opportunity: Omit<AutomationOpportunity, 'id' | 'created_at' | 'updated_at'> = {
    name: 'Communication Drafting',
    volume: 75, // High value/time savings
    complexity: 15, // Very low complexity/risk
    category: 'high-priority',
    description: 'AI-assisted drafting of client communications, tax letters, and regulatory responses with automated tone adjustment and compliance checking.',
    solution_type: 'ai',
    solution_reasoning: 'Natural language generation and template-based systems enable rapid creation of professional communications while ensuring consistency, compliance, and appropriate tone for different audiences.'
  }

  return await addAutomationOpportunity(opportunity)
}

// Add Tax Compliance Scenarios opportunity
export async function addTaxComplianceScenariosOpportunity(): Promise<AutomationOpportunity | null> {
  const opportunity: Omit<AutomationOpportunity, 'id' | 'created_at' | 'updated_at'> = {
    name: 'Tax Compliance Scenarios',
    volume: 82, // High value/time savings
    complexity: 18, // Low complexity/risk
    category: 'high-priority',
    description: 'AI-powered analysis of tax cases to identify risks and compliance considerations through structured scenario modeling and regulatory framework analysis.',
    solution_type: 'ai',
    solution_reasoning: 'Rule-based analysis combined with natural language processing enables systematic evaluation of tax scenarios, identification of compliance risks, and generation of structured recommendations based on established tax regulations and precedents.'
  }

  return await addAutomationOpportunity(opportunity)
}

// Add Internal AI Search opportunity
export async function addInternalAISearchOpportunity(): Promise<AutomationOpportunity | null> {
  const opportunity: Omit<AutomationOpportunity, 'id' | 'created_at' | 'updated_at'> = {
    name: 'Internal AI Search',
    volume: 82, // High value/time savings
    complexity: 28, // Low complexity/risk
    category: 'high-priority',
    description: 'AI-powered search and retrieval across internal tax documents, templates, procedures, and knowledge bases for rapid information access and knowledge sharing.',
    solution_type: 'ai',
    solution_reasoning: 'Natural language processing and vector embeddings enable intuitive search queries across internal document repositories, providing quick access to organizational knowledge and reducing time spent searching for relevant information.'
  }

  return await addAutomationOpportunity(opportunity)
}

// Add Tax Compliance Simulation opportunity
export async function addTaxComplianceSimulationOpportunity(): Promise<AutomationOpportunity | null> {
  const opportunity: Omit<AutomationOpportunity, 'id' | 'created_at' | 'updated_at'> = {
    name: 'Tax Compliance Simulation',
    volume: 76, // High value/time savings
    complexity: 32, // Medium complexity/risk
    category: 'high-priority',
    description: 'AI-powered simulation and modeling of tax compliance scenarios to predict outcomes, identify risks, and optimize tax strategies before implementation.',
    solution_type: 'ai',
    solution_reasoning: 'Machine learning and predictive modeling enable sophisticated simulation of tax scenarios, allowing for risk assessment and strategy optimization before actual implementation, reducing compliance risks and improving decision-making.'
  }

  return await addAutomationOpportunity(opportunity)
}