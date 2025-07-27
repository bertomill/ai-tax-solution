-- Enable the vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB NOT NULL,
  embedding vector(1536), -- OpenAI embeddings are 1536 dimensions
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on the embedding column for faster similarity search
CREATE INDEX IF NOT EXISTS documents_embedding_idx ON documents 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create an index on metadata for filtering
CREATE INDEX IF NOT EXISTS documents_metadata_idx ON documents USING GIN (metadata);

-- Function to create documents table (for RPC call)
CREATE OR REPLACE FUNCTION create_documents_table()
RETURNS BOOLEAN AS $$
BEGIN
  -- Table creation is handled above, this just returns success
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to enable vector extension (for RPC call)
CREATE OR REPLACE FUNCTION enable_vector_extension()
RETURNS BOOLEAN AS $$
BEGIN
  -- Extension creation is handled above, this just returns success
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to search for similar documents
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.8,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
  ORDER BY documents.embedding <=> query_embedding
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE documents TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;