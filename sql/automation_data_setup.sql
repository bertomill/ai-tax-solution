-- Create tables for automation opportunities and tax solutions
-- Run this in your Supabase SQL editor

-- Create automation_opportunities table
CREATE TABLE IF NOT EXISTS automation_opportunities (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  volume INTEGER NOT NULL CHECK (volume >= 0 AND volume <= 100),
  complexity INTEGER NOT NULL CHECK (complexity >= 0 AND complexity <= 100),
  category TEXT NOT NULL CHECK (category IN ('high-priority', 'medium-priority', 'low-priority')),
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tax_solutions table
CREATE TABLE IF NOT EXISTS tax_solutions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('automation', 'ai')),
  category TEXT NOT NULL CHECK (category IN ('rule-based', 'predictable', 'research', 'expert-interface')),
  reasoning TEXT NOT NULL,
  description TEXT NOT NULL,
  key_features TEXT[] NOT NULL,
  business_value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert automation opportunities data
INSERT INTO automation_opportunities (name, volume, complexity, category, description) VALUES
('Daily Cash Position Reports', 85, 25, 'high-priority', 'Automated generation of daily cash position reports from multiple banking systems'),
('Tax Document Classification', 90, 35, 'high-priority', 'AI-powered classification and routing of incoming tax documents'),
('Regulatory Filing Validation', 75, 45, 'high-priority', 'Automated validation of regulatory tax filings before submission'),
('Interest Calculation Verification', 80, 30, 'high-priority', 'Automated verification of interest calculations across loan portfolios'),
('Expense Categorization', 70, 20, 'high-priority', 'AI-driven categorization of business expenses for tax purposes'),
('Transaction Monitoring', 95, 40, 'high-priority', 'Real-time monitoring of transactions for tax compliance issues'),
('Quarterly Report Generation', 40, 55, 'medium-priority', 'Automated generation of quarterly tax reports with AI insights'),
('Audit Trail Creation', 65, 35, 'medium-priority', 'Automated creation and maintenance of audit trails for tax purposes'),
('Depreciation Calculations', 50, 60, 'medium-priority', 'Complex asset depreciation calculations with multiple methodologies'),
('Cross-Border Tax Analysis', 30, 85, 'low-priority', 'Complex analysis of cross-border transactions for tax implications'),
('Customer Data Validation', 85, 15, 'high-priority', 'Automated validation of customer tax information and documentation'),
('Compliance Reporting', 60, 50, 'medium-priority', 'Automated generation of compliance reports for various jurisdictions');

-- Insert tax solutions data
INSERT INTO tax_solutions (name, type, category, reasoning, description, key_features, business_value) VALUES
('Daily Cash Position Reports', 'automation', 'rule-based', 'Highly structured data with predictable inputs and outputs. Current automation likely working well.', 'Automated generation of daily cash position reports from multiple banking systems', ARRAY['Scheduled data extraction', 'Standardized formatting', 'Automated distribution'], 'Consistent, timely reporting with zero human intervention'),

('Interest Calculation Verification', 'automation', 'rule-based', 'Mathematical calculations with clear rules. Automation provides accuracy and speed.', 'Automated verification of interest calculations across loan portfolios', ARRAY['Rule-based validation', 'Exception reporting', 'Audit trail generation'], 'Error reduction and compliance assurance'),

('Customer Data Validation', 'automation', 'predictable', 'Structured validation rules with predictable patterns. Automation handles repetitive checks efficiently.', 'Automated validation of customer tax information and documentation', ARRAY['Field validation', 'Format checking', 'Completeness verification'], 'Data quality improvement and processing speed'),

('Expense Categorization', 'automation', 'predictable', 'While some variability exists, most expense categorization follows predictable patterns.', 'Rule-based categorization of business expenses for tax purposes', ARRAY['Pattern matching', 'Historical learning', 'Exception handling'], 'Consistent categorization and time savings'),

('Tax Research Assistant', 'ai', 'research', 'Requires analysis of vast volumes of textual information with unpredictable queries and flexible responses.', 'AI-powered research through tax regulations, case law, and guidance documents', ARRAY['Natural language processing', 'Context understanding', 'Reasoning capabilities'], 'Faster research with comprehensive, contextualized answers'),

('Tax Document Classification', 'ai', 'predictable', 'Documents vary in format and content. AI can handle unstructured data and edge cases better than rules.', 'AI-powered classification and routing of incoming tax documents', ARRAY['OCR integration', 'Content analysis', 'Adaptive learning'], 'Improved accuracy for diverse document types'),

('Business User Tax Advisor', 'ai', 'expert-interface', 'Connects business users with tax expertise through natural conversation without document searching.', 'Conversational AI interface for business users to get tax guidance', ARRAY['Natural language interface', 'Context retention', 'Expert knowledge synthesis'], 'Democratized access to tax expertise across the organization'),

('Cross-Border Tax Analysis', 'ai', 'research', 'Complex, jurisdiction-specific analysis requiring interpretation of multiple regulatory frameworks.', 'AI analysis of cross-border transactions for tax implications', ARRAY['Multi-jurisdiction analysis', 'Regulatory interpretation', 'Risk assessment'], 'Comprehensive analysis of complex international tax scenarios'),

('Regulatory Filing Intelligence', 'ai', 'research', 'Regulations change frequently and require interpretation. AI can adapt to new requirements and edge cases.', 'AI-enhanced validation and optimization of regulatory tax filings', ARRAY['Regulation monitoring', 'Compliance checking', 'Optimization suggestions'], 'Proactive compliance with evolving regulatory landscape');

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_automation_opportunities_category ON automation_opportunities(category);
CREATE INDEX IF NOT EXISTS idx_automation_opportunities_volume ON automation_opportunities(volume);
CREATE INDEX IF NOT EXISTS idx_automation_opportunities_complexity ON automation_opportunities(complexity);

CREATE INDEX IF NOT EXISTS idx_tax_solutions_type ON tax_solutions(type);
CREATE INDEX IF NOT EXISTS idx_tax_solutions_category ON tax_solutions(category);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE automation_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_solutions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust as needed for your security requirements)
CREATE POLICY "Enable read access for all users" ON automation_opportunities FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON tax_solutions FOR SELECT USING (true);