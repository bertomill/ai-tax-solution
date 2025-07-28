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