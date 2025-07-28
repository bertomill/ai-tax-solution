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