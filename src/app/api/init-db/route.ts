import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('🚀 Initializing database...')
    
    // Enable vector extension
    const { error: extensionError } = await supabase.rpc('exec_sql', {
      sql: 'CREATE EXTENSION IF NOT EXISTS vector;'
    })
    
    if (extensionError) {
      console.log('Vector extension note:', extensionError.message)
      // Continue anyway as it might already be enabled
    }

    // Create documents table with proper schema
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS documents (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        content TEXT NOT NULL,
        metadata JSONB NOT NULL,
        embedding vector(1536),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `

    const { error: tableError } = await supabase.rpc('exec_sql', {
      sql: createTableSQL
    })

    if (tableError) {
      console.error('Table creation error:', tableError)
      // Try alternative approach using raw SQL
      const { error: altError } = await supabase
        .from('documents') // This will fail but give us info
        .select('id')
        .limit(1)

      if (altError && altError.code === '42P01') {
        // Table doesn't exist, try to create it directly
        return NextResponse.json({
          success: false,
          error: 'Database table needs to be created. Please run the SQL setup manually.',
          sql: createTableSQL,
          instructions: [
            '1. Go to your Supabase dashboard',
            '2. Open the SQL editor',
            '3. Run the provided SQL commands',
            '4. Try uploading again'
          ]
        }, { status: 500 })
      }
    }

    // Create indexes for better performance
    const indexSQL = `
      CREATE INDEX IF NOT EXISTS documents_embedding_idx 
      ON documents USING ivfflat (embedding vector_cosine_ops) 
      WITH (lists = 100);
      
      CREATE INDEX IF NOT EXISTS documents_metadata_idx 
      ON documents USING GIN (metadata);
    `

    const { error: indexError } = await supabase.rpc('exec_sql', {
      sql: indexSQL
    })

    if (indexError) {
      console.log('Index creation note:', indexError.message)
      // Indexes are optional, continue
    }

    // Test the table by doing a simple query
    const { data: testData, error: testError } = await supabase
      .from('documents')
      .select('id')
      .limit(1)

    if (testError) {
      throw new Error(`Table test failed: ${testError.message}`)
    }

    console.log('✅ Database initialized successfully')
    
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      tableExists: true,
      recordCount: testData?.length || 0
    })

  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Database initialization failed',
      suggestion: 'Please check your Supabase configuration and ensure the database is accessible'
    }, { status: 500 })
  }
} 