-- Fix: Rename elite plan to global for consistency
-- Date: 2026-02-04

-- Update pricing plans in system_settings
UPDATE system_settings
SET value = jsonb_set(
    value,
    '{plans}',
    (
        SELECT jsonb_agg(
            CASE 
                WHEN plan->>'id' = 'elite' THEN 
                    jsonb_set(plan, '{id}', '"global"')
                ELSE 
                    plan
            END
        )
        FROM jsonb_array_elements(value->'plans') AS plan
    )
)
WHERE key = 'pricing_plans';

-- Update existing users with elite plan to global
UPDATE profiles
SET selected_plan = 'global'
WHERE selected_plan = 'elite';

-- Verify the update
SELECT id, name, monthly_price, quarterly_price
FROM jsonb_to_recordset(
    (SELECT value->'plans' FROM system_settings WHERE key = 'pricing_plans')
) AS plans(id text, name text, monthly_price numeric, quarterly_price numeric);
