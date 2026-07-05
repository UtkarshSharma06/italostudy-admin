// @ts-nocheck
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, dodo-signature, webhook-signature',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// ── Webhook Signature verification ─────────────────────────────────────────
async function verifyDodoSignature(body: string, signature: string, secret: string): Promise<boolean> {
    try {
        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            'raw',
            encoder.encode(secret),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        );
        const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
        const expectedSig = Array.from(new Uint8Array(sigBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        return expectedSig === signature;
    } catch {
        return false;
    }
}

Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

    const rawBody = await req.text();
    const webhookSecret = Deno.env.get('DODO_WEBHOOK_SECRET');
    
    if (webhookSecret) {
        const signature = req.headers.get('dodo-signature') || req.headers.get('webhook-signature') || '';
        if (signature) {
            const valid = await verifyDodoSignature(rawBody, signature, webhookSecret);
            if (!valid) {
                console.error('❌ Dodo webhook signature mismatch');
                return new Response(JSON.stringify({ error: 'Invalid signature' }), {
                    status: 401,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }
        }
    } else {
        console.warn('⚠️ DODO_WEBHOOK_SECRET not set — skipping signature verification');
    }

    let event: any;
    try {
        event = JSON.parse(rawBody);
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    console.log(`📨 Dodo webhook received: ${event.type || event.event}`);

    const eventType = event.type || event.event;
    
    if (eventType !== 'payment.succeeded' && eventType !== 'subscription.renewed') {
        return jsonRes({ received: true, action: 'ignored', reason: 'unhandled_event' });
    }

    try {
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') || '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
        );

        const paymentData = event.data || event.payload || event;
        const paymentId = paymentData.payment_id || paymentData.id;
        const subscriptionId = paymentData.subscription_id;
        
        const amount = (paymentData.total_amount || paymentData.amount || 0) / 100;
        const currency = paymentData.currency || 'EUR';

        console.log(`Payment info: payment=${paymentId}, sub=${subscriptionId}, amount=${amount}`);

        if (!subscriptionId) {
            return jsonRes({ received: true, action: 'ignored', reason: 'no_subscription_id' });
        }

        const { data: originalTxns, error: txnErr } = await supabaseAdmin
            .from('transactions')
            .select('*')
            .eq('payment_method', 'dodo')
            .or(`provider_transaction_id.eq.${subscriptionId},metadata->>dodo_subscription_id.eq.${subscriptionId},metadata->>subscription_id.eq.${subscriptionId}`)
            .order('created_at', { ascending: true })
            .limit(1);

        if (txnErr || !originalTxns || originalTxns.length === 0) {
            console.warn(`No original transaction found for Dodo subscription: ${subscriptionId}`);
            return jsonRes({ received: true, action: 'skipped', reason: 'transaction_not_found' });
        }

        const originalTxn = originalTxns[0];

        let targetTransactionId = originalTxn.id;
        const isStoreTransaction = !['global', 'elite', 'pro', 'explorer'].includes(originalTxn.plan_id || '');

        if (originalTxn.status === 'pending') {
            console.log(`Processing initial Dodo payment for txn=${originalTxn.id}`);
            const { error: updErr } = await supabaseAdmin
                .from('transactions')
                .update({
                    status: 'completed',
                    provider_transaction_id: paymentId,
                    metadata: {
                        ...(originalTxn.metadata || {}),
                        payment_id: paymentId,
                        subscription_id: subscriptionId,
                        webhook_event: eventType
                    }
                })
                .eq('id', originalTxn.id);

            if (updErr) {
                console.error('❌ Failed to update initial Dodo transaction:', updErr.message);
                throw updErr;
            }
        } else {
            if (originalTxn.provider_transaction_id === paymentId || originalTxn.metadata?.payment_id === paymentId) {
                console.log(`Payment ${paymentId} is the initial payment. Already processed.`);
                return jsonRes({ received: true, action: 'skipped', reason: 'initial_payment' });
            }

            const { data: existingRenewal } = await supabaseAdmin
                .from('transactions')
                .select('id')
                .eq('provider_transaction_id', paymentId)
                .maybeSingle();

            if (existingRenewal) {
                console.log(`ℹ️ Renewal transaction already exists for payment ${paymentId}`);
                return jsonRes({ received: true, action: 'skipped', reason: 'already_exists' });
            }

            console.log(`Processing Dodo renewal transaction for subscription=${subscriptionId}`);
            
            const { data: insertedRenewal, error: insertErr } = await supabaseAdmin
                .from('transactions')
                .insert({
                    user_id: originalTxn.user_id,
                    plan_id: originalTxn.plan_id,
                    amount: amount,
                    currency: currency,
                    status: 'completed',
                    payment_method: 'dodo_autopay',
                    provider_transaction_id: paymentId,
                    metadata: {
                        subscription_id: subscriptionId,
                        is_renewal: true,
                        original_transaction_id: originalTxn.id,
                        webhook_event: eventType
                    }
                })
                .select('id')
                .single();

            if (insertErr || !insertedRenewal) {
                console.error('❌ Failed to insert Dodo renewal transaction:', insertErr?.message);
                throw insertErr;
            }
            targetTransactionId = insertedRenewal.id;
            console.log(`✅ Dodo renewal transaction inserted for payment ${paymentId}`);
        }

        // Grant plan/subscription extensions (only for app subscriptions)
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

        return jsonRes({ received: true, action: 'processed', subscription_id: subscriptionId, payment_id: paymentId, transaction_id: targetTransactionId });

    } catch (err: any) {
        console.error('dodo-webhook error:', err.message);
        return jsonRes({ received: true, error: err.message });
    }
});

function jsonRes(body: object) {
    return new Response(JSON.stringify(body), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
}
