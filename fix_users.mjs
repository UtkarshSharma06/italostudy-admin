import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve('d:/italostudy/italostudy-admin/.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceKey);

async function run() {
    const { data, error } = await supabase
        .from('profiles')
        .update({ selected_plan: 'explorer', subscription_tier: 'initiate' })
        .in('subscription_tier', ['global', 'elite', 'pro'])
        .is('subscription_expiry_date', null)
        .select('id');
        
    if (error) {
        console.error(error);
    } else {
        console.log('Fixed users: ' + data.length);
    }
}

run();
