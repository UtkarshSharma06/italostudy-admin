-- Migration: Add exact regional prices (INR/PKR/BDT) to plan cycles
-- Date: 2026-07-09
-- Prices set by admin:
--   India (INR):      549 / month,  1499 / 3 months
--   Pakistan (PKR):  1499 / month,  3999 / 3 months
--   Bangladesh (BDT): 799 / month,  2199 / 3 months
--   Other (EUR):       10 / month,    24 / 3 months

UPDATE public.system_settings
SET value = (
    SELECT jsonb_set(
        value,
        '{plans}',
        (
            SELECT jsonb_agg(
                CASE
                    WHEN plan ? 'cycles' THEN
                        jsonb_set(
                            plan,
                            '{cycles}',
                            (
                                SELECT jsonb_agg(
                                    jsonb_set(
                                        jsonb_set(
                                            cycle,
                                            '{price}',
                                            CASE
                                                WHEN cycle->>'id' ILIKE '%monthly%' THEN '10'::jsonb
                                                WHEN cycle->>'id' ILIKE '%quarterly%' THEN '24'::jsonb
                                                ELSE COALESCE(cycle->'price', '0'::jsonb)
                                            END
                                        ),
                                        '{regionalPrices}',
                                        COALESCE(cycle->'regionalPrices', '{}'::jsonb)
                                        ||
                                        CASE
                                            -- Monthly cycle: set monthly prices
                                            WHEN cycle->>'id' ILIKE '%monthly%' THEN
                                                jsonb_build_object(
                                                    'INR', 549,
                                                    'PKR', 1499,
                                                    'BDT', 799
                                                )
                                            -- Quarterly cycle: set 3-month prices
                                            WHEN cycle->>'id' ILIKE '%quarterly%' THEN
                                                jsonb_build_object(
                                                    'INR', 1499,
                                                    'PKR', 3999,
                                                    'BDT', 2199
                                                )
                                            -- Any other cycle duration: no change
                                            ELSE '{}'::jsonb
                                        END
                                    )
                                )
                                FROM jsonb_array_elements(plan->'cycles') AS cycle
                            )
                        )
                    ELSE plan
                END
            )
            FROM jsonb_array_elements(value->'plans') AS plan
        )
    )
    FROM public.system_settings s2
    WHERE s2.key = 'pricing_plans'
)
WHERE key = 'pricing_plans';
