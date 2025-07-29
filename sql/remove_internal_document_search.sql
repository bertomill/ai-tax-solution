-- Remove Internal Document Search opportunity from the automation chart
-- Execute this SQL command in your Supabase SQL editor

-- First, let's see what we're about to delete
SELECT 
  id,
  name,
  volume,
  complexity,
  category,
  solution_type,
  created_at
FROM automation_opportunities 
WHERE name = 'Internal Document Search';

-- Delete the Internal Document Search opportunity
DELETE FROM automation_opportunities 
WHERE name = 'Internal Document Search';

-- Verify the deletion
SELECT 
  name,
  volume,
  complexity,
  category,
  solution_type
FROM automation_opportunities 
WHERE name = 'Internal Document Search';

-- Show remaining opportunities count
SELECT 
  COUNT(*) as total_opportunities,
  category,
  COUNT(*) as count_by_category
FROM automation_opportunities 
GROUP BY category 
ORDER BY category; 