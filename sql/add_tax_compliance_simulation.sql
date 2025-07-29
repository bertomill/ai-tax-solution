-- Add Tax Compliance Simulation opportunity to the automation chart
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
  'Tax Compliance Simulation',
  76, -- High value/time savings (positioned in high-value area)
  32, -- Medium complexity/risk (positioned in medium-risk area)
  'high-priority',
  'AI-powered simulation and modeling of tax compliance scenarios to predict outcomes, identify risks, and optimize tax strategies before implementation.',
  'ai',
  'Machine learning and predictive modeling enable sophisticated simulation of tax scenarios, allowing for risk assessment and strategy optimization before actual implementation, reducing compliance risks and improving decision-making.'
);

-- Verify the insertion
SELECT 
  name,
  volume,
  complexity,
  category,
  solution_type
FROM automation_opportunities 
WHERE name = 'Tax Compliance Simulation'
ORDER BY created_at DESC
LIMIT 1; 