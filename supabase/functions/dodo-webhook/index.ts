// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

serve(async (req: Request) => {
    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
        const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole);
        const environment = Deno.env.get('DODO_ENVIRONMENT') || 'test_mode';
        const isLive = environment === 'live_mode' || environment === 'live' || environment === 'production';

        // Read body FIRST (can only read once)
        const payloadText = await req.text();

        // ── Signature Verification (Standard Webhooks spec) ────────────────────
        let webhookSecret = Deno.env.get('DODO_WEBHOOK_SECRET');
        if (!webhookSecret) {
            const { data: cfg } = await supabaseAdmin
                .from('system_settings').select('value').eq('key', 'payment_gateways').single();
            webhookSecret = cfg?.value?.dodo?.webhook_secret;
        }

        if (webhookSecret) {
            const webhookId        = req.headers.get('webhook-id') || '';
            const webhookTimestamp = req.headers.get('webhook-timestamp') || '';
            const webhookSignature = req.headers.get('webhook-signature') || '';

            if (webhookId && webhookTimestamp && webhookSignature) {
                try {
                    const signedContent = `${webhookId}.${webhookTimestamp}.${payloadText}`;

                    // Dodo secret: strip "whsec_" prefix, then base64-decode
                    const b64 = webhookSecret.startsWith('whsec_') ? webhookSecret.slice(6) : webhookSecret;
                    let secretBytes: Uint8Array;
                    try {
                        secretBytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
                    } catch {
                        secretBytes = new TextEncoder().encode(webhookSecret);
                    }

                    const key = await crypto.subtle.importKey(
                        'raw', secretBytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
                    );
                    const sigBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signedContent));
                    const computed = btoa(String.fromCharCode(...new Uint8Array(sigBuf)));

                    // Header format: "v1,BASE64SIG" (space-separated if multiple)
                    const isValid = webhookSignature.split(' ').some(s => {
                        const parts = s.split(',');
                        return parts.length >= 2 && parts[1] === computed;
                    });

                    if (!isValid) {
                        console.warn('⚠️ Signature mismatch. Computed:', computed, 'Got:', webhookSignature);
                        if (isLive) {
                            return new Response('Invalid signature', { status: 401 });
                        }
                        // In test mode: log and continue (lets us debug without blocking events)
                        console.warn('TEST MODE: Proceeding despite signature mismatch');
                    } else {
                        console.log('✅ Signature verified');
                    }
                } catch (sigErr: any) {
                    console.error('Signature check error:', sigErr.message);
                    if (isLive) return new Response('Signature error', { status: 401 });
                }
            } else {
                console.warn('Missing webhook-id/timestamp/signature headers');
                if (isLive) return new Response('Missing signature headers', { status: 400 });
            }
        } else {
            console.warn('No DODO_WEBHOOK_SECRET configured — skipping signature check');
            if (isLive) return new Response('Webhook secret not configured', { status: 500 });
        }

        // ── Parse Event ──────────────────────────────────────────────────────────
        const event = JSON.parse(payloadText);
        console.log('Dodo event type:', event.type, '| status:', event.data?.status);

        const SUCCESS_TYPES = new Set([
            'payment.succeeded',
            'subscription.active',
            'subscription.renewed',
            'subscription.succeeded',
        ]);

        const isSuccessEvent =
            SUCCESS_TYPES.has(event.type) ||
            event.data?.status === 'succeeded' ||
            event.data?.status === 'paid' ||
            event.data?.status === 'active';

        if (!isSuccessEvent) {
            console.log('Non-success event, ignoring:', event.type);
            return new Response(JSON.stringify({ received: true, action: 'ignored' }), {
                headers: { 'Content-Type': 'application/json' }, status: 200
            });
        }

        // ── Find our transaction ──────────────────────────────────────────────────
        const data = event.data || {};
        // Dodo passes metadata back exactly as we sent it
        const transactionId =
            data.metadata?.transaction_id ||
            data.reference_id ||
            event.metadata?.transaction_id ||
            data.client_reference_id;

        if (!transactionId) {
            console.error('No transaction_id in webhook. Full event:', JSON.stringify(event));
            return new Response('Missing transaction_id in metadata', { status: 400 });
        }

        console.log('Processing transaction:', transactionId);

        const { data: txn, error: txnError } = await supabaseAdmin
            .from('transactions')
            .select('*')
            .eq('id', transactionId)
            .single();

        if (txnError || !txn) {
            console.error('Transaction not found:', transactionId, txnError?.message);
            return new Response('Transaction not found', { status: 404 });
        }

        // Mark transaction completed (idempotent)
        if (txn.status !== 'completed') {
            const { error: updateErr } = await supabaseAdmin
                .from('transactions')
                .update({
                    status: 'completed',
                    provider_transaction_id: data.payment_id || data.subscription_id || data.id,
                    metadata: { ...txn.metadata, dodo_event: event }
                })
                .eq('id', transactionId);

            if (updateErr) {
                console.error('Failed to update transaction:', updateErr.message);
                return new Response('Failed to update transaction', { status: 500 });
            }
        }

        // ── Calculate expiry & subscription tier ───────────────────────────────
        const planId = txn.plan_id || 'pro';
        let tier = 'pro';
        if (planId === 'global' || planId === 'elite') tier = 'global';
        else if (planId === 'explorer') tier = 'initiate';

        let expiryDate = new Date();

        if (data.next_billing_date) {
            expiryDate = new Date(data.next_billing_date);
        } else if (data.current_period_end) {
            expiryDate = new Date(data.current_period_end * 1000); // Unix timestamp
        } else {
            // Fallback: use duration from transaction metadata (set when creating the order)
            const durationValue = parseInt(
                txn.metadata?.duration_value ?? txn.duration_value ?? '1', 10
            ) || 1;
            const durationUnit = txn.metadata?.duration_unit ?? txn.duration_unit ?? 'months';

            if (durationUnit === 'years') expiryDate.setFullYear(expiryDate.getFullYear() + durationValue);
            else if (durationUnit === 'days') expiryDate.setDate(expiryDate.getDate() + durationValue);
            else expiryDate.setMonth(expiryDate.getMonth() + durationValue);
        }

        // 2-day grace period for webhook delivery delays
        expiryDate.setDate(expiryDate.getDate() + 2);

        // ── Update profile ────────────────────────────────────────────────────────
        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .update({
                selected_plan: planId,
                subscription_tier: tier,
                subscription_expiry_date: expiryDate.toISOString(),
                payment_provider: 'dodo',
                provider_subscription_id: data.subscription_id || data.id || transactionId,
                updated_at: new Date().toISOString(),
            })
            .eq('id', txn.user_id);

        if (profileError) {
            console.error('Failed to update profile:', profileError.message);
            return new Response('Failed to update profile', { status: 500 });
        }

        console.log(`✅ User ${txn.user_id} → plan:${planId} tier:${tier} expires:${expiryDate.toISOString()}`);

        return new Response(JSON.stringify({ received: true }), {
            headers: { 'Content-Type': 'application/json' }, status: 200
        });

    } catch (err: any) {
        console.error('Webhook unhandled error:', err.message, err.stack);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }
});
