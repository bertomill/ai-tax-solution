-- Update Daily Cash Position Reports to Internal AI Search
-- Execute this SQL command in your Supabase SQL editor

-- First, let's see the current record
SELECT 
  id,
  name,
  volume,
  complexity,
  category,
  description,
  solution_type,
  solution_reasoning,
  created_at
FROM automation_opportunities 
WHERE name = 'Daily Cash Position Reports';

-- Update the record to Internal AI Search
UPDATE automation_opportunities 
SET 
  name = 'Internal AI Search',
  volume = 82, -- High value/time savings
  complexity = 28, -- Low complexity/risk
  category = 'high-priority',
  description = 'AI-powered search and retrieval across internal tax documents, templates, procedures, and knowledge bases for rapid information access and knowledge sharing.',
  solution_type = 'ai',
  solution_reasoning = 'Natural language processing and vector embeddings enable intuitive search queries across internal document repositories, providing quick access to organizational knowledge and reducing time spent searching for relevant information.',
  updated_at = NOW()
WHERE name = 'Daily Cash Position Reports';

-- Verify the update
SELECT 
  id,
  name,
  volume,
  complexity,
  category,
  description,
  solution_type,
  solution_reasoning,
  updated_at
FROM automation_opportunities 
WHERE name = 'Internal AI Search'
ORDER BY updated_at DESC
LIMIT 1;

-- Show all high-priority opportunities to confirm the change
SELECT 
  name,
  volume,
  complexity,
  category,
  solution_type
FROM automation_opportunities 
WHERE category = 'high-priority'
ORDER BY volume DESC; 