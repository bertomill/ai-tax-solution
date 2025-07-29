-- Add Tax Trends Market Research opportunity to the automation chart
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
  'Tax Trends Market Research',
  88, -- Very high value/time savings (positioned in high-value area)
  20, -- Very low complexity/risk (positioned in low-risk area)
  'high-priority',
  'AI-powered analysis of tax trends, market developments, and regulatory changes to provide strategic insights for tax planning and compliance.',
  'ai',
  'Natural language processing and data analysis capabilities enable automated monitoring of tax trends, regulatory updates, and market developments across multiple sources, providing valuable strategic insights with minimal manual effort.'
);

-- Verify the insertion
SELECT 
  name,
  volume,
  complexity,
  category,
  solution_type
FROM automation_opportunities 
WHERE name = 'Tax Trends Market Research'
ORDER BY created_at DESC
LIMIT 1; 