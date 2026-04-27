import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req: Request) => {
    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
        const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole);

        // Validate webhook secret token passed as query parameter
        // In PayPal dashboard, set your webhook URL to: .../paypal-webhook?secret=YOUR_SECRET
        const url = new URL(req.url);
        const webhookSecret = Deno.env.get('PAYPAL_WEBHOOK_SECRET');
        const requestSecret = url.searchParams.get('secret');

        if (webhookSecret && requestSecret !== webhookSecret) {
            console.warn('PayPal webhook: invalid secret token');
            return new Response('Unauthorized', { status: 401 });
        }

        // Note: Full PayPal signature verification requires calling their
        // /v1/notifications/verify-webhook-signature endpoint with the request headers.
        // The above token check provides basic protection against untargeted requests.

        const payloadText = await req.text();
        const event = JSON.parse(payloadText);

        // Subscriptions webhook types
        if (event.event_type === 'BILLING.SUBSCRIPTION.ACTIVATED' || event.event_type === 'PAYMENT.SALE.COMPLETED' || event.event_type === 'BILLING.SUBSCRIPTION.RE-ACTIVATED') {
            
            // Extract the custom_id (which we map to transaction_id if we pass it, otherwise we fall back to finding by subscription_id)
            const resource = event.resource;
            const gatewaySubscriptionId = resource.id || resource.billing_agreement_id;
            let transactionId = resource.custom_id;

            // If we don't have transactionId natively in custom_id, we need to look up the user by the provider_subscription_id instead
            let query = supabaseAdmin.from('transactions').select('*');
            if (transactionId) {
                query = query.eq('id', transactionId);
            } else if (gatewaySubscriptionId) {
                query = query.eq('provider_transaction_id', gatewaySubscriptionId);
            } else {
                return new Response("No valid identifier found", { status: 400 });
            }

            const { data: txn, error: txnError } = await query.single();

            if (txnError || !txn) {
                // If it's a completely new payment for an existing subscription and we can't find the transaction, look up the profile directly!
                const { data: profile } = await supabaseAdmin.from('profiles').select('id, selected_plan').eq('provider_subscription_id', gatewaySubscriptionId).single();
                
                if (profile) {
                    // Just extend the user's subscription
                    let expiryDate = new Date();
                    if (resource.billing_info && resource.billing_info.next_billing_time) {
                        expiryDate = new Date(resource.billing_info.next_billing_time);
                    } else {
                        expiryDate.setMonth(expiryDate.getMonth() + 1); // rough fallback
                    }
                    expiryDate.setDate(expiryDate.getDate() + 2); // Grace period

                    await supabaseAdmin.from('profiles').update({ 
                        subscription_expiry_date: expiryDate.toISOString()
                    }).eq('id', profile.id);

                    console.log(`✅ Webhook processed (Renewed). User ${profile.id} extended via PayPal.`);
                    return new Response(JSON.stringify({ received: true }), { status: 200 });
                }
                
                return new Response("Transaction or Profile not found", { status: 404 });
            }

            // Update Transaction
            if (txn.status !== 'completed') {
                await supabaseAdmin
                    .from('transactions')
                    .update({ 
                        status: 'completed',
                        provider_transaction_id: gatewaySubscriptionId || resource.id,
                        metadata: { ...txn.metadata, paypal_event: event }
                    })
                    .eq('id', txn.id);
            }

            const planId = txn.plan_id;
            let tier = 'pro';
            if (planId === 'global' || planId === 'elite') tier = 'global';

            let expiryDate = new Date();
            
            if (resource.billing_info && resource.billing_info.next_billing_time) {
                expiryDate = new Date(resource.billing_info.next_billing_time);
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

            await supabaseAdmin
                .from('profiles')
                .update({ 
                    selected_plan: planId,
                    subscription_tier: tier,
                    subscription_expiry_date: expiryDate.toISOString(),
                    payment_provider: 'paypal',
                    provider_subscription_id: gatewaySubscriptionId || txn.id
                })
                .eq('id', txn.user_id);

            console.log(`✅ Webhook processed. User ${txn.user_id} upgraded via PayPal.`);
        }

        return new Response(JSON.stringify({ received: true }), { headers: { 'Content-Type': 'application/json' }, status: 200 });

    } catch (error: any) {
        console.error("Webhook Error:", error);
        return new Response(`Webhook Error: ${error.message}`, { status: 400 });
    }
});
