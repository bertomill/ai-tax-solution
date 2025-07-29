import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('🔍 Testing database connection...')
    
    // Test 1: Basic connection
    const { error: connectionError } = await supabase
      .from('_dummy_')
      .select('*')
      .limit(1)
    
    console.log('Connection test result:', { connectionError })
    
    // Test 2: Check if documents table exists
    const { data: tableTest, error: tableError } = await supabase
      .from('documents')
      .select('id')
      .limit(1)
    
    console.log('Table test result:', { tableError, data: tableTest })
    
    if (tableError && tableError.code === '42P01') {
      return NextResponse.json({
        status: 'table_missing',
        message: 'Documents table does not exist',
        error: tableError.message,
        solution: 'Run the SQL setup in Supabase dashboard'
      })
    }
    
    if (tableError) {
      return NextResponse.json({
        status: 'table_error',
        message: 'Error accessing documents table',
        error: tableError.message
      })
    }
    
    // Test 3: Try to count existing documents
    const { count } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true })
    
    return NextResponse.json({
      status: 'success',
      message: 'Database is working correctly',
      tableExists: true,
      documentCount: count || 0,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not configured',
      hasApiKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    })

  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Database test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not configured',
      hasApiKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    })
  }
} 