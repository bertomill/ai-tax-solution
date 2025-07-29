-- Add Communication Drafting opportunity to the automation chart
-- Execute this SQL command in your Supabase SQL editor

INSERT INTO automation_opportunities (
  name, 
  volume, 
  complexity, 
  category, 
  description, 
  solution_type, 
  solution_reasoning
) VALUES (
  'Communication Drafting',
  75, -- High value/time savings (positioned in high-value area)
  15, -- Very low complexity/risk (positioned in low-risk area)
  'high-priority',
  'AI-assisted drafting of client communications, tax letters, and regulatory responses with automated tone adjustment and compliance checking.',
  'ai',
  'Natural language generation and template-based systems enable rapid creation of professional communications while ensuring consistency, compliance, and appropriate tone for different audiences.'
);

-- Verify the insertion
SELECT 
  name,
  volume,
  complexity,
  category,
  solution_type
FROM automation_opportunities 
WHERE name = 'Communication Drafting'
ORDER BY created_at DESC
LIMIT 1; 