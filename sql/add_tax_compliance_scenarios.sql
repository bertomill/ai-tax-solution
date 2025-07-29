-- Add Tax Compliance Scenarios opportunity to the automation chart
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
  'Tax Compliance Scenarios',
  82, -- High value/time savings (positioned in high-value area)
  18, -- Low complexity/risk (positioned in low-risk area)
  'high-priority',
  'AI-powered analysis of tax cases to identify risks and compliance considerations through structured scenario modeling and regulatory framework analysis.',
  'ai',
  'Rule-based analysis combined with natural language processing enables systematic evaluation of tax scenarios, identification of compliance risks, and generation of structured recommendations based on established tax regulations and precedents.'
);

-- Verify the insertion
SELECT 
  name,
  volume,
  complexity,
  category,
  solution_type
FROM automation_opportunities 
WHERE name = 'Tax Compliance Scenarios'
ORDER BY created_at DESC
LIMIT 1; 