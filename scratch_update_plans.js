import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
    const { data: plansData } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'pricing_plans')
        .single();

    if (!plansData) {
        console.log("No plans data found");
        return;
    }

    const config = plansData.value;
    
    // Find the global plan
    const globalPlan = config.plans.find(p => p.id === 'global');
    if (globalPlan) {
        // Find monthly cycle
        const monthlyCycle = globalPlan.cycles.find(c => c.id === 'global_monthly');
        if (monthlyCycle) {
            monthlyCycle.dodoId = 'pdt_0NbobrLv3coI87Lz4zrLQ';
        }
        
        // Find quarterly cycle 
        const quarterlyCycle = globalPlan.cycles.find(c => c.id === 'global_quarterly');
        if (quarterlyCycle) {
            quarterlyCycle.dodoId = 'pdt_0Nd4FnRtbnuE854RDWzRO';
        }
    }

    const { error } = await supabase
        .from('system_settings')
        .update({ value: config })
        .eq('key', 'pricing_plans');

    if (error) {
        console.error("Failed to update:", error);
    } else {
        console.log("Successfully updated pricing_plans with Dodo IDs");
    }
}

run();
