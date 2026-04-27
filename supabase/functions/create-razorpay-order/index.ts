import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Razorpay from "npm:razorpay@2.9.2"

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
        // Check for Environment Variables
        const key_id = Deno.env.get('RAZORPAY_KEY_ID')
        const key_secret = Deno.env.get('RAZORPAY_KEY_SECRET')

        if (!key_id || !key_secret) {
            throw new Error("Razorpay keys not set in Supabase secrets.")
        }

        const { transactionId, gatewayPlanId } = await req.json()

        if (!gatewayPlanId) {
            throw new Error("Gateway Plan ID is required for subscriptions.");
        }

        const instance = new Razorpay({
            key_id: key_id,
            key_secret: key_secret,
        })

        // Create a Subscription
        const options = {
            plan_id: gatewayPlanId,
            customer_notify: 1,
            total_count: 120, 
            notes: {
                transaction_id: transactionId
            }
        };

        console.log("Initiating Razorpay Subscription for Plan:", gatewayPlanId);
        const subscription = await instance.subscriptions.create(options);

        return new Response(JSON.stringify({
            subscription_id: subscription.id,
            short_url: subscription.short_url,
            raw_subscription: subscription
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })
    } catch (error: any) {
        console.error("Error creating Razorpay subscription:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
