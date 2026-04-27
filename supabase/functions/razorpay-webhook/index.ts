import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

serve(async (req: Request) => {
    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
        const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole);

        // Fetch Razorpay Webhook Secret from environment
        const webhookSecret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET');

        if (!webhookSecret) {
            console.error("Razorpay Webhook Secret not configured.");
            return new Response("Webhook secret not configured", { status: 500 });
        }

        // Verify Razorpay Signature (x-razorpay-signature)
        const signatureHeader = req.headers.get('x-razorpay-signature');
        if (!signatureHeader) {
            return new Response("Missing signature header", { status: 400 });
        }

        const payloadText = await req.text();
        
        // standard HMAC SHA256 verification
        const key = await crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(webhookSecret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["verify", "sign"]
        );

        const signatureBuffer = await crypto.subtle.sign(
            "HMAC",
            key,
            new TextEncoder().encode(payloadText)
        );

        const signatureHex = Array.from(new Uint8Array(signatureBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        if (signatureHex !== signatureHeader) {
            console.warn("Signature mismatch. Expected:", signatureHex, "Got:", signatureHeader);
            return new Response("Invalid signature", { status: 401 });
        }

        const event = JSON.parse(payloadText);

        // Razorpay Subscription Events: subscription.charged, subscription.authenticated
        if (event.event === 'payment.captured' || event.event === 'subscription.charged') {
            const data = event.payload.payment?.entity || event.payload.subscription?.entity;
            const transactionId = data.notes?.transaction_id;
            
            if (!transactionId) {
                console.error("No transaction_id mapping in webhook payload", event);
                return new Response("Missing transaction_id in notes", { status: 400 });
            }

            // Get Transaction
            const { data: txn, error: txnError } = await supabaseAdmin
                .from('transactions')
                .select('*')
                .eq('id', transactionId)
                .single();

            if (txnError || !txn) {
                console.error("Transaction not found:", transactionId);
                return new Response("Transaction not found", { status: 404 });
            }

            if (txn.status !== 'completed') {
                await supabaseAdmin
                    .from('transactions')
                    .update({ 
                        status: 'completed',
                        provider_transaction_id: data.id,
                        metadata: { ...txn.metadata, razorpay_event: event }
                    })
                    .eq('id', transactionId);
            }

            // Give profile features
            const planId = txn.plan_id;
            let tier = 'pro';
            if (planId === 'global' || planId === 'elite') tier = 'global';

            let expiryDate = new Date();
            
            // For Subscriptions, read the next billing date from Razorpay payload if available
            const subEntity = event.payload.subscription?.entity;
            if (subEntity && subEntity.charge_at) {
                expiryDate = new Date(subEntity.charge_at * 1000);
            } else {
                const durationValue = parseInt(txn.metadata?.duration_value || '1', 10);
                const durationUnit = txn.metadata?.duration_unit || 'months';

                if (durationUnit === 'years') {
                    expiryDate.setFullYear(expiryDate.getFullYear() + durationValue);
                } else if (durationUnit === 'days') {
                    expiryDate.setDate(expiryDate.getDate() + durationValue);
                } else {
                    expiryDate.setMonth(expiryDate.getMonth() + durationValue);
                }
            }

            expiryDate.setDate(expiryDate.getDate() + 2); // Grace period
            
            const gatewaySubscriptionId = subEntity?.id || data.order_id; // Save Razorpay sub_id for cancellation

            const { error: profileError } = await supabaseAdmin
                .from('profiles')
                .update({ 
                    selected_plan: planId,
                    subscription_tier: tier,
                    subscription_expiry_date: expiryDate.toISOString(),
                    payment_provider: 'razorpay',
                    provider_subscription_id: gatewaySubscriptionId || transactionId
                })
                .eq('id', txn.user_id);

            if (profileError) {
                console.error("Failed to update profile:", profileError);
                return new Response("Failed to update profile", { status: 500 });
            }

            console.log(`✅ Webhook processed. User ${txn.user_id} upgraded/renewed. Expiry: ${expiryDate.toISOString()}`);
        }

        return new Response(JSON.stringify({ received: true }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });

    } catch (error: any) {
        console.error("Webhook Error:", error);
        return new Response(`Webhook Error: ${error.message}`, { status: 400 });
    }
});
