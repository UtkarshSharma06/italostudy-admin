import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve('d:/italostudy/italostudy-admin/.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceKey);

async function run() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', 'sara.belniak@uczen.hoffmanowa.pl')
    .single();

  console.log('User profile:', data);
  
  // also check course_transactions
  const { data: tx, error: e2 } = await supabase
    .from('course_transactions')
    .select('*')
    .eq('user_id', data?.id);
    
  console.log('Transactions:', tx);
}

run();
