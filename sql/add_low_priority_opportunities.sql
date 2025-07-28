-- Migration script to add more low volume, high complexity automation opportunities
-- Run this in your Supabase SQL editor to add additional low-priority opportunities

-- Add new low-priority automation opportunities
INSERT INTO automation_opportunities (name, volume, complexity, category, description) VALUES
('Tax Treaty Interpretation', 15, 90, 'low-priority', 'Complex interpretation of tax treaties for specific transaction scenarios'),
('Transfer Pricing Documentation', 25, 80, 'low-priority', 'Detailed analysis and documentation for transfer pricing compliance'),
('Tax Provision Analysis', 20, 75, 'low-priority', 'Complex quarterly tax provision calculations with multiple variables'),
('Advanced Tax Planning Scenarios', 10, 95, 'low-priority', 'Sophisticated tax planning for complex corporate structures'),
('Multi-Jurisdiction Audit Defense', 18, 88, 'low-priority', 'Complex audit defense strategies across multiple tax jurisdictions'),
('Derivative Instrument Tax Analysis', 12, 92, 'low-priority', 'Tax treatment analysis for complex derivative financial instruments');

-- Add corresponding AI solutions for these complex scenarios
INSERT INTO tax_solutions (name, type, category, reasoning, description, key_features, business_value) VALUES
('Tax Treaty Analysis', 'ai', 'research', 'Complex interpretation requiring deep understanding of multiple treaty provisions and their interactions.', 'AI-powered analysis of tax treaty applications for specific scenarios', ARRAY['Treaty interpretation', 'Precedent analysis', 'Multi-treaty comparison'], 'Expert-level treaty analysis with comprehensive reasoning'),

('Transfer Pricing Intelligence', 'ai', 'research', 'Requires analysis of economic substance, market conditions, and regulatory requirements across jurisdictions.', 'AI-enhanced transfer pricing analysis and documentation', ARRAY['Economic analysis', 'Benchmarking', 'Documentation generation'], 'Sophisticated transfer pricing analysis with regulatory compliance'),

('Tax Provision Modeling', 'ai', 'expert-interface', 'Complex calculations requiring interpretation of accounting standards and tax regulations.', 'AI-assisted quarterly tax provision calculations and analysis', ARRAY['Multi-variable modeling', 'Scenario analysis', 'Audit support'], 'Enhanced accuracy in complex tax provision scenarios');

-- Verify the data was inserted correctly
SELECT 
    category,
    COUNT(*) as count,
    AVG(volume) as avg_volume,
    AVG(complexity) as avg_complexity
FROM automation_opportunities 
GROUP BY category 
ORDER BY category;

-- Migration script to add solution type categorization to automation opportunities
-- Run this if you already have the automation_opportunities table

-- Add new columns for AI vs Traditional Automation categorization
ALTER TABLE automation_opportunities 
ADD COLUMN IF NOT EXISTS solution_type TEXT CHECK (solution_type IN ('ai', 'automation'));

ALTER TABLE automation_opportunities 
ADD COLUMN IF NOT EXISTS solution_reasoning TEXT;

-- Update existing data with solution types and reasoning
UPDATE automation_opportunities SET 
  solution_type = 'automation',
  solution_reasoning = 'Highly structured data with predictable inputs/outputs. Rule-based process with clear formatting requirements.'
WHERE name = 'Daily Cash Position Reports';

UPDATE automation_opportunities SET 
  solution_type = 'ai',
  solution_reasoning = 'Unstructured documents requiring content analysis and interpretation. AI handles document variability better than rules.'
WHERE name = 'Tax Document Classification';

UPDATE automation_opportunities SET 
  solution_type = 'ai',
  solution_reasoning = 'Complex validation requiring interpretation of evolving regulations and edge cases. AI adapts to regulatory changes.'
WHERE name = 'Regulatory Filing Validation';

UPDATE automation_opportunities SET 
  solution_type = 'automation',
  solution_reasoning = 'Mathematical calculations with clear validation rules. Traditional automation provides accuracy and reliability.'
WHERE name = 'Interest Calculation Verification';

UPDATE automation_opportunities SET 
  solution_type = 'automation',
  solution_reasoning = 'Most expenses follow predictable categorization patterns. Rule-based approach handles majority of cases efficiently.'
WHERE name = 'Expense Categorization';

UPDATE automation_opportunities SET 
  solution_type = 'ai',
  solution_reasoning = 'Pattern recognition and anomaly detection in transaction data. AI excels at identifying suspicious patterns.'
WHERE name = 'Transaction Monitoring';

UPDATE automation_opportunities SET 
  solution_type = 'automation',
  solution_reasoning = 'Structured validation rules with predictable data formats. Traditional automation handles field validation efficiently.'
WHERE name = 'Customer Data Validation';

UPDATE automation_opportunities SET 
  solution_type = 'ai',
  solution_reasoning = 'Requires data interpretation and insight generation beyond simple formatting. AI adds analytical value.'
WHERE name = 'Quarterly Report Generation';

UPDATE automation_opportunities SET 
  solution_type = 'automation',
  solution_reasoning = 'Systematic data logging and trail creation follows predictable patterns. Rule-based approach ensures consistency.'
WHERE name = 'Audit Trail Creation';

UPDATE automation_opportunities SET 
  solution_type = 'automation',
  solution_reasoning = 'Mathematical calculations following established formulas. Rules-based approach ensures accuracy and auditability.'
WHERE name = 'Depreciation Calculations';

UPDATE automation_opportunities SET 
  solution_type = 'ai',
  solution_reasoning = 'Multi-jurisdiction analysis requiring interpretation of complex regulatory frameworks and their interactions.'
WHERE name = 'Cross-Border Tax Analysis';

UPDATE automation_opportunities SET 
  solution_type = 'ai',
  solution_reasoning = 'Regulatory interpretation and adaptive reporting requirements. AI handles jurisdiction-specific variations.'
WHERE name = 'Compliance Reporting';

UPDATE automation_opportunities SET 
  solution_type = 'ai',
  solution_reasoning = 'Deep understanding and interpretation of complex legal documents requiring human-like reasoning.'
WHERE name = 'Tax Treaty Interpretation';

UPDATE automation_opportunities SET 
  solution_type = 'ai',
  solution_reasoning = 'Economic analysis and regulatory interpretation requiring sophisticated reasoning and benchmarking.'
WHERE name = 'Transfer Pricing Documentation';

UPDATE automation_opportunities SET 
  solution_type = 'ai',
  solution_reasoning = 'Multi-variable modeling with interpretation of accounting standards requiring sophisticated analysis.'
WHERE name = 'Tax Provision Analysis';

UPDATE automation_opportunities SET 
  solution_type = 'ai',
  solution_reasoning = 'Strategic analysis requiring deep expertise synthesis and scenario modeling beyond rule-based approaches.'
WHERE name = 'Advanced Tax Planning Scenarios';

UPDATE automation_opportunities SET 
  solution_type = 'ai',
  solution_reasoning = 'Strategic planning and argumentation requiring expert-level reasoning and jurisdiction-specific knowledge.'
WHERE name = 'Multi-Jurisdiction Audit Defense';

UPDATE automation_opportunities SET 
  solution_type = 'ai',
  solution_reasoning = 'Highly complex financial analysis requiring interpretation of evolving regulations and market conditions.'
WHERE name = 'Derivative Instrument Tax Analysis';

-- Make the columns NOT NULL after populating data
ALTER TABLE automation_opportunities 
ALTER COLUMN solution_type SET NOT NULL;

ALTER TABLE automation_opportunities 
ALTER COLUMN solution_reasoning SET NOT NULL;