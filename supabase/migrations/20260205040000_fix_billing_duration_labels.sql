-- Migration: Fix Billing Duration Labels
-- Date: 2026-02-05
-- Purpose: Correct cycle names in system_settings for non-monthly plans

DO $$
DECLARE
    v_pricing JSONB;
    v_plans JSONB;
    v_plan JSONB;
    v_cycles JSONB;
    v_cycle JSONB;
    v_new_plans JSONB := '[]'::JSONB;
    v_new_cycles JSONB;
BEGIN
    SELECT value INTO v_pricing FROM system_settings WHERE key = 'pricing_plans';
    
    IF v_pricing IS NOT NULL AND v_pricing ? 'plans' THEN
        FOR v_plan IN SELECT * FROM jsonb_array_elements(v_pricing->'plans') LOOP
            -- If cycles are missing, generate them from monthly/quarterly prices
            IF NOT (v_plan ? 'cycles') THEN
                v_new_cycles := '[]'::JSONB;
                IF v_plan ? 'monthlyPrice' AND (v_plan->>'monthlyPrice')::DECIMAL > 0 THEN
                    v_new_cycles := v_new_cycles || jsonb_build_object(
                        'id', 'monthly',
                        'name', 'Monthly',
                        'price', (v_plan->>'monthlyPrice')::DECIMAL,
                        'durationValue', 1,
                        'durationUnit', 'months'
                    );
                END IF;
                IF v_plan ? 'quarterlyPrice' AND (v_plan->>'quarterlyPrice')::DECIMAL > 0 THEN
                    v_new_cycles := v_new_cycles || jsonb_build_object(
                        'id', 'quarterly',
                        'name', 'Quarterly',
                        'price', (v_plan->>'quarterlyPrice')::DECIMAL,
                        'durationValue', 3,
                        'durationUnit', 'months'
                    );
                END IF;
                v_plan := v_plan || jsonb_build_object('cycles', v_new_cycles);
            END IF;

            v_new_cycles := '[]'::JSONB;
            FOR v_cycle IN SELECT * FROM jsonb_array_elements(v_plan->'cycles') LOOP
                -- Fix names based on duration
                IF (v_cycle->>'durationValue')::INTEGER = 1 AND v_cycle->>'durationUnit' = 'days' THEN
                    v_cycle := v_cycle || '{"name": "Daily"}'::jsonb;
                ELSIF (v_cycle->>'durationValue')::INTEGER = 7 AND v_cycle->>'durationUnit' = 'days' THEN
                    v_cycle := v_cycle || '{"name": "Weekly"}'::jsonb;
                END IF;

                -- ENFORCE 1 day for daily plans if it was mistakenly set to months
                IF v_cycle->>'name' ILIKE '%Daily%' OR v_cycle->>'name' ILIKE '%1 Day%' THEN
                    v_cycle := v_cycle || '{"durationValue": 1, "durationUnit": "days"}'::jsonb;
                END IF;
                
                v_new_cycles := v_new_cycles || v_cycle;
            END LOOP;
            v_plan := v_plan || jsonb_build_object('cycles', v_new_cycles);
            
            v_new_plans := v_new_plans || v_plan;
        END LOOP;
        
        UPDATE system_settings 
        SET value = v_pricing || jsonb_build_object('plans', v_new_plans)
        WHERE key = 'pricing_plans';
    END IF;
END $$;
