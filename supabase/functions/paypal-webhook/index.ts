// @ts-nocheck
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

    const rawBody = await req.text();
    let event: any;
    try {
        event = JSON.parse(rawBody);
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    console.log(`📨 PayPal webhook received: ${event.event_type}`);

    // We only care about completed sale payments (which covers subscription renewals)
    if (event.event_type !== 'PAYMENT.SALE.COMPLETED') {
        return jsonRes({ received: true, action: 'ignored', reason: 'unhandled_event' });
    }

    try {
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') || '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
        );

        const resource = event.resource;
        
        // In PAYMENT.SALE.COMPLETED, the subscription ID is billing_agreement_id
        const subscriptionId = resource.billing_agreement_id;
        const paymentId = resource.id;
        
        const amount = parseFloat(resource.amount?.total || '0');
        const currency = resource.amount?.currency || 'EUR';

        console.log(`Payment info: payment=${paymentId}, sub=${subscriptionId}, amount=${amount}`);

        if (!subscriptionId) {
            // Not a subscription payment, probably a one-time checkout
            return jsonRes({ received: true, action: 'ignored', reason: 'no_subscription_id' });
        }

        // ── Look up original transaction ─────────────────────────────────────
        const { data: originalTxns, error: txnErr } = await supabaseAdmin
            .from('transactions')
            .select('*')
            .eq('payment_method', 'paypal')
            .or(`provider_transaction_id.eq.${subscriptionId},metadata->>paypal_subscription_id.eq.${subscriptionId},metadata->>subscription_id.eq.${subscriptionId}`)
            .order('created_at', { ascending: true })
            .limit(1);

        if (txnErr || !originalTxns || originalTxns.length === 0) {
            console.warn(`No original transaction found for PayPal subscription: ${subscriptionId}`);
            return jsonRes({ received: true, action: 'skipped', reason: 'transaction_not_found' });
        }

        const originalTxn = originalTxns[0];

        // ── Check if we already logged this renewal (Idempotency) ────────────
        const { data: existingRenewal } = await supabaseAdmin
            .from('transactions')
            .select('id')
            .eq('provider_transaction_id', paymentId)
            .maybeSingle();

        if (existingRenewal) {
            console.log(`ℹ️ Renewal transaction already exists for payment ${paymentId}`);
            return jsonRes({ received: true, action: 'skipped', reason: 'already_exists' });
        }

        // ── Insert Renewal Transaction ───────────────────────────────────────
        console.log(`Processing PayPal renewal transaction for subscription=${subscriptionId}`);
        
        const { error: insertErr } = await supabaseAdmin
            .from('transactions')
            .insert({
                user_id: originalTxn.user_id,
                plan_id: originalTxn.plan_id,
                amount: amount,
                currency: currency,
                status: 'completed',
                payment_method: 'paypal_autopay',
                provider_transaction_id: paymentId,
                metadata: {
                    subscription_id: subscriptionId,
                    is_renewal: true,
                    original_transaction_id: originalTxn.id,
                    webhook_event: event.event_type
                }
            });

        if (insertErr) {
            console.error('❌ Failed to insert PayPal renewal transaction:', insertErr.message);
            throw insertErr;
        }

        console.log(`✅ PayPal renewal transaction inserted for payment ${paymentId}`);

        // Grant plan/subscription extensions (only for app subscriptions)
        const isStoreTransaction = !['global', 'elite', 'pro', 'explorer'].includes(originalTxn.plan_id || '');
        if (!isStoreTransaction && originalTxn.user_id) {
            let targetTier = 'pro';
            switch (originalTxn.plan_id) {
                case 'global':
                case 'elite': targetTier = 'global'; break;
                case 'pro': targetTier = 'pro'; break;
                case 'explorer': targetTier = 'initiate'; break;
            }

            const durVal = originalTxn.duration_value || 1;
            const durUnit = originalTxn.duration_unit || 'months';

            const { data: profile } = await supabaseAdmin
                .from('profiles')
                .select('subscription_expiry_date')
                .eq('id', originalTxn.user_id)
                .single();
            
            let oldExpiry = profile?.subscription_expiry_date ? new Date(profile.subscription_expiry_date) : null;
            let newExpiry = new Date();
            
            if (oldExpiry && oldExpiry > new Date()) {
                newExpiry = oldExpiry;
            }
            
            if (durUnit === 'months') {
                newExpiry.setMonth(newExpiry.getMonth() + durVal);
            } else if (durUnit === 'years') {
                newExpiry.setFullYear(newExpiry.getFullYear() + durVal);
            } else if (durUnit === 'days') {
                newExpiry.setDate(newExpiry.getDate() + durVal);
            }

            await supabaseAdmin
                .from('profiles')
                .update({
                    selected_plan: originalTxn.plan_id,
                    subscription_tier: targetTier,
                    subscription_expiry_date: newExpiry.toISOString(),
                    updated_at: new Date().toISOString()
                })
                .eq('id', originalTxn.user_id);

            console.log(`✅ Profile updated: tier=${targetTier}, expiry=${newExpiry.toISOString()}`);
        }

        return jsonRes({ received: true, action: 'processed', subscription_id: subscriptionId, payment_id: paymentId });

    } catch (err: any) {
        console.error('paypal-webhook error:', err.message);
        return jsonRes({ received: true, error: err.message });
    }
});

function jsonRes(body: object) {
    return new Response(JSON.stringify(body), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
}
