import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req: Request) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
        const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
        const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

        // Use service role client for config access, but validate user JWT
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole);

        console.log('📦 Cashfree Order Request Received');
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            console.error('❌ Missing Authorization header');
            throw new Error("Missing Authorization header");
        }
        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(authHeader.replace('Bearer ', ''));

        if (authError || !user) {
            throw new Error("Unauthorized: " + (authError?.message || "Invalid token"));
        }

        // Get Cashfree config from DB
        const { data: configData, error: configError } = await supabaseAdmin
            .from('system_settings')
            .select('value')
            .eq('key', 'payment_gateways')
            .single();

        if (configError) {
            console.error('❌ Database Error (Config):', configError);
        }

        if (configError || !configData?.value?.cashfree) {
            throw new Error("Cashfree configuration not found in database.");
        }

        const cashfree = configData.value.cashfree;
        const appId = cashfree.app_id;
        const secretKey = cashfree.secret_key;
        const environment = cashfree.environment || 'sandbox';

        if (!appId || !secretKey) {
            console.error('❌ Missing Cashfree keys:', { appId: !!appId, secretKey: !!secretKey });
            throw new Error("Cashfree keys (App ID or Secret) not set.");
        }

        const { amount, currency, transactionId, customerPhone } = await req.json();

        // Validate that this transaction belongs to the user and is pending
        const { data: transaction, error: txnError } = await supabaseAdmin
            .from('transactions')
            .select('*')
            .eq('id', transactionId)
            .eq('user_id', user.id)
            .eq('status', 'pending')
            .single();

        if (txnError) {
            console.error('❌ Database Error (Transaction):', txnError);
        }

        if (txnError || !transaction) {
            throw new Error("Invalid or missing transaction.");
        }

        const endpoint = environment === 'production'
            ? 'https://api.cashfree.com/pg/orders'
            : 'https://sandbox.cashfree.com/pg/orders';

        console.log('🚀 Creating Cashfree Order:', { endpoint, orderId: transactionId, amount: transaction.amount });

        const siteUrl = environment === 'production'
            ? 'https://italostudy.com'
            : (req.headers.get('origin') || 'https://italostudy.com');

        const orderData = {
            order_id: transactionId,
            order_amount: Number(transaction.amount),
            order_currency: transaction.currency,
            customer_details: {
                customer_id: user.id,
                customer_email: user.email,
                customer_phone: customerPhone || '9999999999'
            },
            order_meta: {
                return_url: `${siteUrl}/payment/callback?order_id=${transactionId}`
            }
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'x-client-id': appId,
                'x-client-secret': secretKey,
                'x-api-version': '2023-08-01',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create Cashfree order');
        }

        return new Response(JSON.stringify({
            ...data,
            environment: environment
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });

    } catch (error: any) {
        console.error("❌ Error creating Cashfree order:", error);

        return new Response(JSON.stringify({
            error: error.message || 'Internal Server Error',
            details: error.toString()
        }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
