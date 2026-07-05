// @ts-nocheck
// ============================================================
// razorpay-webhook — Handles Razorpay subscription events
//
// Key behavior:
//   subscription.charged (invoice_count == 1, discount_applied == true)
//     → Swaps the subscription's plan from the temp discounted plan
//       back to the original plan so all future renewals charge full price.
//
// Setup:
//   1. Deploy this function: supabase functions deploy razorpay-webhook --no-verify-jwt
//   2. In Razorpay Dashboard → Webhooks → Add New:
//      URL: https://<project-ref>.supabase.co/functions/v1/razorpay-webhook
//      Events: subscription.charged
//      Secret: (set a secret, add as RAZORPAY_WEBHOOK_SECRET env var)
// ============================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-razorpay-signature',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// ── Signature verification ──────────────────────────────────────────────────
async function verifyRazorpaySignature(body: string, signature: string, secret: string): Promise<boolean> {
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

    // ── Signature check ────────────────────────────────────────────────────────
    const webhookSecret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET');
    if (webhookSecret) {
        const signature = req.headers.get('x-razorpay-signature') || '';
        const valid = await verifyRazorpaySignature(rawBody, signature, webhookSecret);
        if (!valid) {
            console.error('❌ Razorpay webhook signature mismatch — ignoring request');
            return new Response(JSON.stringify({ error: 'Invalid signature' }), {
                status: 401,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }
    } else {
        console.warn('⚠️ RAZORPAY_WEBHOOK_SECRET not set — skipping signature verification (not recommended for production)');
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

    console.log(`📨 Razorpay webhook received: ${event.event}`);

    // ── Only handle subscription.charged ──────────────────────────────────────
    if (event.event !== 'subscription.charged') {
        console.log(`Ignoring event: ${event.event}`);
        return new Response(JSON.stringify({ received: true, action: 'ignored' }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    try {
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') || '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
        );

        // ── Load Razorpay credentials ──────────────────────────────────────────
        let rzpKeyId = Deno.env.get('RAZORPAY_KEY_ID');
        let rzpKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

        if (!rzpKeyId || !rzpKeySecret) {
            const { data: cfg } = await supabaseAdmin
                .from('system_settings').select('value').eq('key', 'payment_gateways').single();
            rzpKeyId = rzpKeyId || cfg?.value?.razorpay?.key_id;
            rzpKeySecret = rzpKeySecret || cfg?.value?.razorpay?.key_secret;
        }

        if (!rzpKeyId || !rzpKeySecret) {
            console.error('Razorpay credentials not configured');
            return jsonRes({ error: 'Gateway credentials missing' });
        }

        const auth = btoa(`${rzpKeyId}:${rzpKeySecret}`);

        // ── Extract event data ─────────────────────────────────────────────────
        const subscriptionId = event.payload?.subscription?.entity?.id;
        const invoiceCount   = event.payload?.subscription?.entity?.paid_count
                            ?? event.payload?.subscription?.entity?.invoice_count
                            ?? null;
        const paymentId      = event.payload?.payment?.entity?.id;

        console.log(`subscription.charged: sub=${subscriptionId} invoice_count=${invoiceCount} payment=${paymentId}`);

        if (!subscriptionId) {
            console.warn('No subscription ID in webhook payload');
            return jsonRes({ received: true, action: 'skipped', reason: 'no_subscription_id' });
        }

        // ── Look up our transaction record by the subscription ID ──────────────
        const { data: txn, error: txnErr } = await supabaseAdmin
            .from('transactions')
            .select('*')
            .eq('provider_transaction_id', subscriptionId)
            .maybeSingle();

        if (txnErr || !txn) {
            // Also try searching inside metadata (in case provider_transaction_id wasn't set yet at creation time)
            const { data: txnByMeta } = await supabaseAdmin
                .from('transactions')
                .select('*')
                .contains('metadata', { razorpay_subscription_id: subscriptionId })
                .maybeSingle();

            if (!txnByMeta) {
                console.warn(`No transaction found for subscription: ${subscriptionId}`);
                // Return 200 so Razorpay doesn't keep retrying for unknown subscriptions
                return jsonRes({ received: true, action: 'skipped', reason: 'transaction_not_found' });
            }

            // Use the metadata-matched transaction
            Object.assign(txn ?? {}, txnByMeta);
        }

        const finalTxn = txn;

        // ── Check if this subscription used a discounted temp plan ─────────────
        const discountApplied     = finalTxn?.metadata?.discount_applied === true;
        const originalPlanId      = finalTxn?.metadata?.razorpay_plan_id;      // original plan
        const activePlanId        = finalTxn?.metadata?.razorpay_active_plan_id; // may be temp plan
        const alreadyMigrated     = finalTxn?.metadata?.plan_migrated_to_original === true;

        console.log(`discount_applied=${discountApplied} invoice_count=${invoiceCount} original_plan=${originalPlanId} active_plan=${activePlanId} already_migrated=${alreadyMigrated}`);

        // ── Swap back to original plan after 1st charge ───────────────────────
        // Conditions:
        //   1. A discount WAS applied (temp plan was used)
        //   2. This is the FIRST charge (invoice_count === 1 or paid_count === 1)
        //   3. We know the original plan ID
        //   4. We haven't already migrated this subscription
        const isFirstCharge = invoiceCount === 1;

        if (discountApplied && isFirstCharge && originalPlanId && activePlanId !== originalPlanId && !alreadyMigrated) {
            console.log(`🔄 First charge complete on discounted plan. Migrating subscription ${subscriptionId} → original plan ${originalPlanId}`);

            // Razorpay API: Update subscription plan
            // This changes the plan for the NEXT billing cycle onwards
            const updateRes = await fetch(`https://api.razorpay.com/v1/subscriptions/${subscriptionId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plan_id: originalPlanId,
                    // schedule_change_at: 'now' means it takes effect from the very next cycle
                    schedule_change_at: 'cycle_end',
                }),
            });

            const updateData = await updateRes.json();
            console.log('Razorpay plan update response:', JSON.stringify(updateData));

            if (updateData.id || updateData.plan_id === originalPlanId) {
                // ── Record that migration was done ─────────────────────────────
                await supabaseAdmin
                    .from('transactions')
                    .update({
                        metadata: {
                            ...finalTxn.metadata,
                            plan_migrated_to_original: true,
                            plan_migration_at: new Date().toISOString(),
                            first_payment_id: paymentId,
                        },
                    })
                    .eq('id', finalTxn.id);

                console.log(`✅ Subscription plan migrated: ${subscriptionId} → ${originalPlanId}. All future renewals will charge full price.`);
            } else {
                const errMsg = updateData.error?.description || 'Unknown error';
                console.error(`❌ Plan migration failed for ${subscriptionId}: ${errMsg}`);
                // Don't fail — just log. Razorpay will retry the webhook.
                // The subscription may still charge discounted price next cycle.
            }
        } else if (discountApplied && !isFirstCharge && !alreadyMigrated) {
            // Safety net: if somehow the webhook fires again and migration wasn't done,
            // try to migrate now
            console.warn(`⚠️ Discount applied but not yet migrated (invoice_count=${invoiceCount}). Attempting migration...`);

            if (originalPlanId && activePlanId !== originalPlanId) {
                const updateRes = await fetch(`https://api.razorpay.com/v1/subscriptions/${subscriptionId}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Basic ${auth}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        plan_id: originalPlanId,
                        schedule_change_at: 'cycle_end',
                    }),
                });
                const updateData = await updateRes.json();
                if (updateData.id || updateData.plan_id === originalPlanId) {
                    await supabaseAdmin
                        .from('transactions')
                        .update({
                            metadata: {
                                ...finalTxn.metadata,
                                plan_migrated_to_original: true,
                                plan_migration_at: new Date().toISOString(),
                                migration_invoice_count: invoiceCount,
                            },
                        })
                        .eq('id', finalTxn.id);
                    console.log(`✅ Late migration done for ${subscriptionId}`);
                }
            }
        } else {
            console.log(`No plan migration needed (discount=${discountApplied}, first=${isFirstCharge}, migrated=${alreadyMigrated})`);
        }

        // ── Record renewal transaction for billing history ─────────────────────
        if (!isFirstCharge && invoiceCount > 1 && finalTxn) {
            console.log(`Processing renewal transaction for invoice_count=${invoiceCount}`);
            const paymentAmount = (event.payload?.payment?.entity?.amount || 0) / 100;
            const paymentCurrency = event.payload?.payment?.entity?.currency || 'EUR';

            // Idempotency check: see if we already logged this exact payment
            const { data: existingRenewal } = await supabaseAdmin
                .from('transactions')
                .select('id')
                .eq('provider_transaction_id', paymentId)
                .maybeSingle();

            if (!existingRenewal && paymentId) {
                const { error: insertErr } = await supabaseAdmin
                    .from('transactions')
                    .insert({
                        user_id: finalTxn.user_id,
                        plan_id: finalTxn.plan_id,
                        amount: paymentAmount,
                        currency: paymentCurrency,
                        status: 'completed',
                        payment_method: 'razorpay',
                        provider_transaction_id: paymentId,
                        metadata: {
                            razorpay_subscription_id: subscriptionId,
                            invoice_count: invoiceCount,
                            is_renewal: true,
                            original_transaction_id: finalTxn.id
                        }
                    });

                if (insertErr) {
                    console.error('❌ Failed to insert renewal transaction:', insertErr.message);
                } else {
                    console.log(`✅ Renewal transaction inserted for payment ${paymentId}`);

                    // Grant plan/subscription extensions (only for app subscriptions)
                    const isStoreTransaction = !['global', 'elite', 'pro', 'explorer'].includes(finalTxn.plan_id || '');
                    if (!isStoreTransaction && finalTxn.user_id) {
                        let targetTier = 'pro';
                        switch (finalTxn.plan_id) {
                            case 'global':
                            case 'elite': targetTier = 'global'; break;
                            case 'pro': targetTier = 'pro'; break;
                            case 'explorer': targetTier = 'initiate'; break;
                        }

                        const durVal = finalTxn.duration_value || 1;
                        const durUnit = finalTxn.duration_unit || 'months';

                        const { data: profile } = await supabaseAdmin
                            .from('profiles')
                            .select('subscription_expiry_date')
                            .eq('id', finalTxn.user_id)
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
                                selected_plan: finalTxn.plan_id,
                                subscription_tier: targetTier,
                                subscription_expiry_date: newExpiry.toISOString(),
                                updated_at: new Date().toISOString()
                            })
                            .eq('id', finalTxn.user_id);

                        console.log(`✅ Profile updated: tier=${targetTier}, expiry=${newExpiry.toISOString()}`);
                    }
                }
            } else if (existingRenewal) {
                console.log(`ℹ️ Renewal transaction already exists for payment ${paymentId}`);
            }
        }

        return jsonRes({ received: true, action: 'processed', subscription_id: subscriptionId });

    } catch (err: any) {
        console.error('razorpay-webhook error:', err.message);
        // Return 200 to prevent Razorpay from retrying indefinitely
        return jsonRes({ received: true, error: err.message });
    }
});

function jsonRes(body: object) {
    return new Response(JSON.stringify(body), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
}
