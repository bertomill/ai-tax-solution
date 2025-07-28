import { supabase } from './supabase'

export interface DocumentationSection {
  id: string
  title: string
  category: 'efficiency' | 'insights' | 'overview' | 'practical-lessons'
  description: string
  content: string
  key_points: string[]
  order_index: number
  created_at?: string
  updated_at?: string
}

export async function getDocumentationSections(): Promise<DocumentationSection[]> {
  try {
    const { data, error } = await supabase
      .from('documentation_sections')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching documentation sections:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getDocumentationSections:', error)
    return []
  }
}

export async function getDocumentationByCategory(category: string): Promise<DocumentationSection[]> {
  try {
    const { data, error } = await supabase
      .from('documentation_sections')
      .select('*')
      .eq('category', category)
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching documentation by category:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getDocumentationByCategory:', error)
    return []
  }
}

export async function addDocumentationSection(section: Omit<DocumentationSection, 'id' | 'created_at' | 'updated_at'>): Promise<DocumentationSection | null> {
  try {
    const { data, error } = await supabase
      .from('documentation_sections')
      .insert([section])
      .select()
      .single()

    if (error) {
      console.error('Error adding documentation section:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in addDocumentationSection:', error)
    return null
  }
}