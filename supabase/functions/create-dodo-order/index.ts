// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        console.log("=== DODO CHECKOUT START ===");

        const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
        const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole);

        // ─── Auth (same pattern as create-cashfree-order which works) ────────────
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            console.error('Missing Authorization header');
            return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
                status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(
            authHeader.replace('Bearer ', '')
        );

        if (authError || !user) {
            console.error('Auth error:', authError?.message);
            return new Response(JSON.stringify({ error: `Unauthorized: ${authError?.message || 'Invalid session'}` }), {
                status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        console.log("Authenticated user:", user.email);

        // ─── Dodo Config ──────────────────────────────────────────────────────────
        let apiKey = Deno.env.get('DODO_API_KEY');
        const environment = Deno.env.get('DODO_ENVIRONMENT') || 'test_mode';

        if (!apiKey) {
            const { data: cfg } = await supabaseAdmin
                .from('system_settings').select('value').eq('key', 'payment_gateways').single();
            apiKey = cfg?.value?.dodo?.api_key;
        }
        if (!apiKey) {
            return new Response(JSON.stringify({
                error: 'DODO_API_KEY is not configured.',
                tip: 'Go to Supabase Dashboard → Project Settings → Edge Functions → Secrets and add DODO_API_KEY'
            }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        const isLive = environment === 'live_mode' || environment === 'production' || environment === 'live';
        const apiBase = isLive ? 'https://live.dodopayments.com' : 'https://test.dodopayments.com';

        // ─── Site URL for return_url ──────────────────────────────────────────────
        // Priority: Origin header (from browser) → SITE_URL secret → production URL
        // Using Origin header means it works automatically for any environment
        // without needing to change secrets between local dev and production.
        const requestOrigin = req.headers.get('origin') || req.headers.get('referer');
        let siteUrl: string;
        if (requestOrigin) {
            // Strip trailing slashes and path from referer
            try {
                const url = new URL(requestOrigin);
                siteUrl = `${url.protocol}//${url.host}`;
            } catch {
                siteUrl = requestOrigin.replace(/\/$/, '');
            }
        } else {
            siteUrl = Deno.env.get('SITE_URL') || (isLive ? 'https://italostudy.com' : 'http://localhost:8080');
        }
        console.log(`Site URL resolved to: ${siteUrl}`);

        // ─── Request Body ─────────────────────────────────────────────────────────
        const body = await req.json();
        const { transactionId, gatewayPlanId, productId, amount, currency } = body;

        console.log("Payload:", JSON.stringify({ transactionId, gatewayPlanId, productId, amount, currency }));

        if (!transactionId) {
            return new Response(JSON.stringify({ error: 'Missing transactionId' }), {
                status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // ─── Lookup transaction (admin bypasses RLS) ──────────────────────────────
        const { data: transaction, error: txnError } = await supabaseAdmin
            .from('transactions')
            .select('*')
            .eq('id', transactionId)
            .single();

        if (txnError || !transaction) {
            console.error("Transaction lookup failed:", txnError?.message);
            return new Response(JSON.stringify({ error: `Transaction not found: ${txnError?.message}` }), {
                status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        console.log("Transaction:", transaction.id, "plan:", transaction.plan_id);

        // ─── Subscription vs One-time detection ───────────────────────────────────
        // Main website → subscription (gatewayPlanId = Dodo product ID for subscription plan)
        // Store → one-time payment (gatewayPlanId is null or 'STORE_ORDER')
        const isSubscription = !!gatewayPlanId && gatewayPlanId !== 'STORE_ORDER';

        // For subscriptions: use the Dodo subscription product ID (e.g. prod_abc123)
        // For one-time store: use productId or DODO_PRODUCT_ID from env
        const targetProductId = isSubscription
            ? gatewayPlanId
            : (productId || Deno.env.get('DODO_PRODUCT_ID'));

        const returnUrl = `${siteUrl}/payment/callback?order_id=${transactionId}`;
        const customerName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Customer';

        console.log(`Mode: ${isSubscription ? 'SUBSCRIPTION' : 'ONE-TIME PAYMENT'}`);
        console.log(`Product ID: ${targetProductId}`);
        console.log(`Return URL: ${returnUrl}`);

        if (!targetProductId) {
            return new Response(JSON.stringify({
                error: 'No Dodo Product ID configured.',
                tip: isSubscription
                    ? 'Set the dodoId on the plan cycle in Admin Panel → Plans → [Plan] → Cycles → Dodo ID'
                    : 'Set DODO_PRODUCT_ID in Supabase Secrets for store one-time payments'
            }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        // ─── Build product_cart item ───────────────────────────────────────────────
        const productCartItem: any = {
            product_id: targetProductId,
            quantity: 1,
        };

        // For store one-time orders where pricing is custom (Pay What You Want):
        // Include amount in cents. For subscription products, Dodo uses the plan price — DO NOT pass amount.
        if (!isSubscription && amount) {
            const amountCents = Math.round(Number(amount) * 100);
            if (amountCents > 0) {
                productCartItem.amount = amountCents;
            }
        }

        // ─── Call Dodo /checkouts API ──────────────────────────────────────────────
        // Per Dodo docs, /checkouts works for BOTH one-time and subscription products.
        // It returns: { session_id, checkout_url }
        const checkoutPayload: any = {
            product_cart: [productCartItem],
            customer: {
                email: user.email,
                name: customerName,
            },
            return_url: returnUrl,
            metadata: {
                transaction_id: transactionId,
                user_id: user.id,
                plan_id: transaction.plan_id || 'STORE_ORDER',
            },
        };

        console.log(`Calling ${apiBase}/checkouts`);
        console.log("Dodo payload:", JSON.stringify(checkoutPayload, null, 2));

        const dodoResponse = await fetch(`${apiBase}/checkouts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkoutPayload),
        });

        let dodoData: any;
        try {
            dodoData = await dodoResponse.json();
        } catch (e) {
            console.error("Could not parse Dodo response as JSON");
            return new Response(JSON.stringify({ error: `Dodo API returned non-JSON response (status ${dodoResponse.status})` }), {
                status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        console.log("Dodo status:", dodoResponse.status);
        console.log("Dodo response:", JSON.stringify(dodoData));

        if (!dodoResponse.ok) {
            const errorMsg = dodoData?.message || dodoData?.detail || dodoData?.error || JSON.stringify(dodoData);
            console.error(`Dodo rejected (${dodoResponse.status}):`, errorMsg);
            return new Response(JSON.stringify({
                error: `Dodo API Error (${dodoResponse.status}): ${errorMsg}`,
                tip: 'Check: (1) DODO_API_KEY is valid, (2) the product ID exists in Dodo dashboard, (3) DODO_ENVIRONMENT matches your key type (test_mode or live_mode)'
            }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        // Dodo returns checkout_url in the session response
        const checkoutUrl = dodoData.checkout_url || dodoData.payment_link || dodoData.url;

        if (!checkoutUrl) {
            console.error("No checkout URL in Dodo response:", JSON.stringify(dodoData));
            return new Response(JSON.stringify({
                error: 'Dodo session created but no checkout_url returned.',
                raw: dodoData,
                tip: 'Ensure the product is active and published in Dodo dashboard'
            }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        console.log("✅ Checkout URL ready:", checkoutUrl);

        return new Response(JSON.stringify({
            checkout_url: checkoutUrl,
            transaction_id: transactionId,
            session_id: dodoData.session_id,
        }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

    } catch (err: any) {
        console.error("UNHANDLED ERROR:", err.message);
        return new Response(JSON.stringify({
            error: err.message || 'Unexpected server error',
            tip: 'Check edge function logs: Supabase Dashboard → Edge Functions → create-dodo-order → Logs'
        }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
