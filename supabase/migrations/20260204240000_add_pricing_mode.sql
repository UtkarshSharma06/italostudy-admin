-- Add mode field to pricing_plans configuration
-- Run this to switch between 'beta' (free) and 'live' (paid) modes

UPDATE system_settings
SET value = value || '{"mode": "beta"}'::jsonb
WHERE key = 'pricing_plans';

-- To switch to LIVE mode (enable payments), run:
-- UPDATE system_settings
-- SET value = jsonb_set(value, '{mode}', '"live"')
-- WHERE key = 'pricing_plans';

-- To switch back to BETA mode (free plans), run:
-- UPDATE system_settings
-- SET value = jsonb_set(value, '{mode}', '"beta"')
-- WHERE key = 'pricing_plans';

-- Verify current mode:
SELECT value->>'mode' as current_mode FROM system_settings WHERE key = 'pricing_plans';
