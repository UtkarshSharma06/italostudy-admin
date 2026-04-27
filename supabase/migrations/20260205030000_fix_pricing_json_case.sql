-- Standardize Pricing JSON Field Names
-- Date: 2026-02-05

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
            v_new_cycles := '[]'::JSONB;
            
            IF v_plan ? 'cycles' THEN
                FOR v_cycle IN SELECT * FROM jsonb_array_elements(v_plan->'cycles') LOOP
                    -- Standardize duration_value -> durationValue
                    IF v_cycle ? 'duration_value' AND NOT (v_cycle ? 'durationValue') THEN
                        v_cycle := v_cycle || jsonb_build_object('durationValue', v_cycle->'duration_value');
                        v_cycle := v_cycle - 'duration_value';
                    END IF;
                    
                    -- Standardize duration_unit -> durationUnit
                    IF v_cycle ? 'duration_unit' AND NOT (v_cycle ? 'durationUnit') THEN
                        v_cycle := v_cycle || jsonb_build_object('durationUnit', v_cycle->'duration_unit');
                        v_cycle := v_cycle - 'duration_unit';
                    END IF;
                    
                    -- Explicit fix for "1 Day" if it exists but is accidentally set to months
                    IF v_cycle->>'name' ILIKE '%1 Day%' OR v_cycle->>'name' ILIKE '%Daily%' THEN
                        v_cycle := v_cycle || '{"durationValue": 1, "durationUnit": "days"}'::jsonb;
                    END IF;

                    v_new_cycles := v_new_cycles || v_cycle;
                END LOOP;
                v_plan := v_plan || jsonb_build_object('cycles', v_new_cycles);
            END IF;
            
            v_new_plans := v_new_plans || v_plan;
        END LOOP;
        
        UPDATE system_settings 
        SET value = v_pricing || jsonb_build_object('plans', v_new_plans)
        WHERE key = 'pricing_plans';
    END IF;
END $$;
