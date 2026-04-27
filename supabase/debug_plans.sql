-- Debug: Check current pricing plans and their IDs
SELECT id, name, monthly_price, quarterly_price, is_visible 
FROM pricing_plans 
ORDER BY monthly_price;

-- Debug: Check your current profile plan
SELECT id, email, selected_plan, subscription_tier 
FROM profiles 
WHERE id = auth.uid();

-- Debug: Check recent transactions
SELECT id, plan_id, status, created_at 
FROM transactions 
WHERE user_id = auth.uid() 
ORDER BY created_at DESC 
LIMIT 5;
